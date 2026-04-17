/**
 * TranslateAPI JavaScript SDK
 * https://github.com/forcekeys/translate-api-js
 */

const BASE_URL = 'https://api.translate.forcekeys.com/api/v1';

class TranslateAPI {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.baseURL = options.baseURL || BASE_URL;
  }
  
  async request(endpoint, method = 'POST', data = null) {
    const url = `${this.baseURL}/${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
    
    const config = { method, headers };
    if (data) {
      config.body = JSON.stringify(data);
    }
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
  }
  
  async translate(text, options = {}) {
    const { source = 'auto', target = 'en' } = options;
    return this.request('translate', 'POST', { text, source_lang: source, target_lang: target });
  }
  
  async translateFile(filename, source, target, output) {
    return this.request('translate-file', 'POST', { filename, source_lang: source, target_lang: target });
  }
  
  async detect(text) {
    const result = await this.request('detect', 'POST', { text });
    return result.language;
  }
  
  async languages() {
    const result = await this.request('languages', 'GET');
    return result.languages || [];
  }
  
  async account() {
    return this.request('account', 'GET');
  }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TranslateAPI };
}

// Export for browser
if (typeof window !== 'undefined') {
  window.TranslateAPI = TranslateAPI;
}

export { TranslateAPI };