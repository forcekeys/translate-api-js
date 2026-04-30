/**
 * TranslateAPI JavaScript SDK
 * Official JavaScript client for the TranslateAPI translation service.
 * https://github.com/forcekeys/translate-api-js
 * 
 * Example:
 * ```javascript
 * const api = new TranslateAPI('your_api_key');
 * const result = await api.translate('Hello, world!', 'en', 'fr');
 * console.log(result.translatedText);
 * ```
 */

class APIError extends Error {
    constructor(message, errorCode, statusCode, retryAfter) {
        super(message);
        this.name = 'APIError';
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.retryAfter = retryAfter;
    }
}

class TranslateAPI {
    /**
     * Initialize TranslateAPI client
     * 
     * @param {string} apiKey Your API key
     * @param {string} baseUrl API base URL
     * @param {number} timeout Request timeout in milliseconds
     */
    constructor(apiKey, baseUrl = 'https://api.deeptranslate.online/api/v1', timeout = 30000) {
        if (!apiKey) {
            throw new Error('API key is required');
        }
        
        this.apiKey = apiKey;
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.timeout = timeout;
    }
    
    /**
     * Make API request
     * 
     * @param {string} endpoint API endpoint
     * @param {string} method HTTP method
     * @param {object} data Request data
     * @param {FormData} formData Form data for file uploads
     * @returns {Promise<object>} API response
     * @throws {APIError} If API returns an error
     */
    async makeRequest(endpoint, method = 'GET', data = null, formData = null) {
        const url = `${this.baseUrl}/${endpoint}`;
        
        const headers = {
            'Authorization': `Bearer ${this.apiKey}`,
            'User-Agent': 'TranslateAPI-JS/1.0.0'
        };
        
        let body = null;
        
        if (formData) {
            // For file uploads, use FormData directly
            body = formData;
            // Don't set Content-Type header for FormData - browser will set it with boundary
        } else if (data && method === 'POST') {
            body = JSON.stringify(data);
            headers['Content-Type'] = 'application/json';
        }
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        
        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            const result = await response.json();
            
            if (!response.ok) {
                const errorCode = result.code || 'http_error';
                const errorMsg = result.message || `HTTP error: ${response.status}`;
                const retryAfter = result.retry_after || null;
                throw new APIError(errorMsg, errorCode, response.status, retryAfter);
            }
            
            if (result.status === 'error') {
                const errorCode = result.code || 'api_error';
                const errorMsg = result.message || 'Unknown API error';
                const retryAfter = result.retry_after || null;
                throw new APIError(errorMsg, errorCode, response.status, retryAfter);
            }
            
            return result;
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new APIError('Request timeout', 'timeout', 0, null);
            }
            
            if (error instanceof APIError) {
                throw error;
            }
            
            throw new APIError(`Network error: ${error.message}`, 'network_error', 0, null);
        }
    }
    
    /**
     * Translate text
     * 
     * @param {string} text Text to translate
     * @param {string} targetLang Target language code (e.g., 'fr')
     * @param {string} sourceLang Source language code (optional, auto-detect if null)
     * @param {string} formality Formality level: 'formal' or 'informal' (optional)
     * @returns {Promise<object>} Translation result
     */
    async translate(text, targetLang, sourceLang = null, formality = null) {
        const data = {
            text,
            target_lang: targetLang
        };
        
        if (sourceLang) {
            data.source_lang = sourceLang;
        }
        
        if (formality) {
            data.formality = formality;
        }
        
        const response = await this.makeRequest('translate', 'POST', data);
        
        return {
            translatedText: response.translated_text,
            sourceLang: response.source_lang,
            targetLang: response.target_lang,
            detectedLang: response.detected_lang || null,
            charactersUsed: response.characters_used || 0,
            processingTimeMs: response.processing_time_ms || 0
        };
    }
    
    /**
     * Translate document
     * 
     * @param {File} file Document file (PDF, DOCX, TXT)
     * @param {string} targetLang Target language code
     * @param {string} sourceLang Source language code (optional)
     * @returns {Promise<object>} Document translation result
     */
    async translateDocument(file, targetLang, sourceLang = null) {
        if (!(file instanceof File)) {
            throw new Error('File parameter must be a File object');
        }
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('target_lang', targetLang);
        
        if (sourceLang) {
            formData.append('source_lang', sourceLang);
        }
        
        const response = await this.makeRequest('translate/document', 'POST', null, formData);
        
        return {
            translatedText: response.translated_text,
            sourceLang: response.source_lang,
            targetLang: response.target_lang,
            pages: response.pages || 0,
            charactersUsed: response.characters_used || 0,
            processingTimeMs: response.processing_time_ms || 0
        };
    }
    
    /**
     * Extract text from image (OCR)
     * 
     * @param {File} image Image file (PNG, JPG, WEBP, BMP)
     * @param {string} lang Expected language (optional, improves accuracy)
     * @param {boolean} enhance Apply image enhancement (optional)
     * @returns {Promise<object>} OCR result
     */
    async ocr(image, lang = null, enhance = false) {
        if (!(image instanceof File)) {
            throw new Error('Image parameter must be a File object');
        }
        
        const formData = new FormData();
        formData.append('image', image);
        
        if (lang) {
            formData.append('lang', lang);
        }
        
        if (enhance) {
            formData.append('enhance', 'true');
        }
        
        const response = await this.makeRequest('ocr', 'POST', null, formData);
        
        return {
            text: response.text,
            confidence: response.confidence || 0.0,
            languageDetected: response.language_detected || '',
            processingTimeMs: response.processing_time_ms || 0
        };
    }
    
    /**
     * Detect language of text
     * 
     * @param {string} text Text to analyze
     * @returns {Promise<object>} Language detection result
     */
    async detectLanguage(text) {
        const data = { text };
        const response = await this.makeRequest('detect', 'POST', data);
        
        return {
            language: response.language,
            languageName: response.language_name || '',
            confidence: response.confidence || 0.0,
            alternatives: response.alternatives || []
        };
    }
    
    /**
     * Get supported languages
     * 
     * @returns {Promise<Array>} List of supported languages
     */
    async getSupportedLanguages() {
        const response = await this.makeRequest('languages', 'GET');
        return response.languages || [];
    }
    
    /**
     * Batch translate multiple texts
     * 
     * @param {Array<string>} texts Array of texts to translate
     * @param {string} targetLang Target language code
     * @param {string} sourceLang Source language code (optional)
     * @returns {Promise<object>} Batch translation result
     */
    async batchTranslate(texts, targetLang, sourceLang = null) {
        const data = {
            texts,
            target_lang: targetLang
        };
        
        if (sourceLang) {
            data.source_lang = sourceLang;
        }
        
        const response = await this.makeRequest('translate/batch', 'POST', data);
        
        return {
            translations: response.translations || [],
            charactersUsed: response.characters_used || 0,
            processingTimeMs: response.processing_time_ms || 0
        };
    }
    
    /**
     * Get account information
     * 
     * @returns {Promise<object>} Account information
     */
    async getAccountInfo() {
        const response = await this.makeRequest('account', 'GET');
        const account = response.account || {};
        const planLimits = account.plan_limits || {};
        const balance = account.balance || {};
        const statistics = account.statistics || {};
        
        return {
            email: account.email || '',
            name: account.name || '',
            plan: account.plan || 'free',
            status: account.status || 'active',
            dailyTranslations: planLimits.daily_translations || 0,
            todayUsed: planLimits.today_used || 0,
            remainingToday: planLimits.remaining_today || 0,
            availableBalance: balance.available || 0.0,
            totalSpent: balance.total_spent || 0.0,
            totalTranslations: statistics.total_translations || 0,
            totalCharacters: statistics.total_characters || 0
        };
    }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    // Node.js/CommonJS
    module.exports = TranslateAPI;
    module.exports.APIError = APIError;
} else if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function() {
        return TranslateAPI;
    });
} else {
    // Browser global
    window.TranslateAPI = TranslateAPI;
    window.TranslateAPIError = APIError;
}
