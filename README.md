# TranslateAPI JavaScript SDK

[![npm version](https://img.shields.io/npm/v/translate-api.svg)](https://www.npmjs.com/package/translate-api)
[![npm downloads](https://img.shields.io/npm/dm/translate-api.svg)](https://www.npmjs.com/package/translate-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/docs-forcekeys.com-blue.svg)](https://translate.forcekeys.com/docs)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Official JavaScript/TypeScript client library for the TranslateAPI translation service. Translate text, documents, and images between 70+ languages with a simple, intuitive interface. Works in Node.js, browsers, and React Native.

## Features

- **Text Translation**: Translate text between 70+ languages
- **Document Translation**: Support for PDF, DOCX, TXT files
- **Image OCR**: Extract and translate text from images
- **Language Detection**: Automatically detect language of text
- **Batch Translation**: Translate multiple texts in a single request
- **Account Management**: Check usage, credits, and account info
- **TypeScript Support**: Full TypeScript definitions included
- **Browser & Node.js**: Works everywhere
- **React Native**: Compatible with mobile apps
- **Zero Dependencies**: Lightweight and fast

## Installation

### npm

```bash
npm install translate-api
```

### yarn

```bash
yarn add translate-api
```

### pnpm

```bash
pnpm add translate-api
```

### CDN (Browser)

```html
<script src="https://cdn.jsdelivr.net/npm/translate-api/dist/translate-api.min.js"></script>
```

### Manual Installation

```bash
git clone https://github.com/forcekeys/translate-api-js.git
cd translate-api-js
npm install
```

## Quick Start

### 1. Get Your API Key

First, sign up at [translate.forcekeys.com](https://translate.forcekeys.com) to get your free API key.

### 2. Basic Usage

#### Node.js / TypeScript

```javascript
import { TranslateAPI } from 'translate-api';

// Initialize with your API key
const api = new TranslateAPI('your_api_key_here');

// Translate text
const result = await api.translate('Hello, world!', {
  source: 'en',
  target: 'fr'
});

console.log('Translated:', result.translatedText);
console.log('Characters used:', result.charactersUsed);
console.log('Processing time:', result.processingTimeMs + 'ms');

// Auto-detect source language
const autoResult = await api.translate('Bonjour le monde', {
  target: 'en'
});

console.log('Detected language:', autoResult.sourceLang);
console.log('Translated:', autoResult.translatedText);
```

#### Browser

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/translate-api/dist/translate-api.min.js"></script>
</head>
<body>
  <script>
    const api = new TranslateAPI('your_api_key_here');
    
    async function translateText() {
      const result = await api.translate('Hello, world!', {
        source: 'en',
        target: 'fr'
      });
      document.getElementById('output').textContent = result.translatedText;
    }
    
    translateText();
  </script>
  <div id="output"></div>
</body>
</html>
```

## Comprehensive Examples

### Text Translation

```javascript
import { TranslateAPI } from 'translate-api';

const api = new TranslateAPI('your_api_key_here');

// Basic translation
const result = await api.translate('Hello, how are you?', {
  source: 'en',
  target: 'es'
});

// With formality control
const formalResult = await api.translate('Hello, how are you?', {
  source: 'en',
  target: 'de',
  formality: 'formal'  // or 'informal'
});

// Translation with context
const contextResult = await api.translate('The bank is closed on Sunday.', {
  source: 'en',
  target: 'fr',
  context: 'financial'  // Helps with ambiguous words
});
```

### Document Translation

```javascript
// In Node.js - translate a document file
const result = await api.translateDocument('document.pdf', {
  source: 'en',
  target: 'es'
});

// Save translated text to file
const fs = require('fs');
fs.writeFileSync('translated_document.txt', result.translatedText);

console.log(`Translated ${result.pages} pages`);
console.log(`Used ${result.charactersUsed} characters`);
```

### Image OCR and Translation

```javascript
// Extract text from image and translate
const result = await api.ocrAndTranslate('receipt.png', {
  source: 'en',
  target: 'fr'
});

console.log('Extracted text:', result.extractedText);
console.log('Translated text:', result.translatedText);
console.log('Confidence:', result.confidence + '%');
```

### Language Detection

```javascript
// Detect language of text
const detection = await api.detect('Bonjour le monde');

console.log('Detected language:', detection.language);
console.log('Language name:', detection.languageName);
console.log('Confidence:', detection.confidence + '%');

// Show alternative possibilities
for (const alt of detection.alternatives) {
  console.log(`  - ${alt.language}: ${alt.confidence}%`);
}
```

### Batch Translation

```javascript
// Translate multiple texts at once
const texts = [
  'Hello',
  'Goodbye',
  'Thank you',
  'Please'
];

const results = await api.batchTranslate(texts, {
  source: 'en',
  target: 'de'
});

for (const item of results.translations) {
  console.log(`${item.original} => ${item.translated}`);
}
```

### Account Information

```javascript
// Get account details
const account = await api.account();

console.log('Email:', account.email);
console.log('Plan:', account.plan);
console.log('Status:', account.status);

// Usage statistics
const limits = account.planLimits;
console.log(`Daily translations: ${limits.todayUsed}/${limits.dailyTranslations}`);
console.log(`Remaining today: ${limits.remainingToday}`);

// Balance information
const balance = account.balance;
console.log(`Available balance: $${balance.available.toFixed(2)}`);
console.log(`Total spent: $${balance.totalSpent.toFixed(2)}`);
```

### Supported Languages

```javascript
// Get all supported languages
const languages = await api.languages();

console.log(`Total languages: ${languages.count}`);
for (const lang of languages.languages) {
  console.log(`${lang.flag} ${lang.code}: ${lang.name}`);
}
```

## Advanced Configuration

### Custom Configuration

```javascript
import { TranslateAPI } from 'translate-api';

// Configure with custom options
const api = new TranslateAPI('your_api_key', {
  baseURL: 'https://api.translate.forcekeys.com/api/v1',
  timeout: 30000,  // 30 seconds
  retries: 3,      // Number of retry attempts
  headers: {
    'X-Custom-Header': 'value'
  }
});
```

### Environment Variables

```javascript
// Read API key from environment variable
const apiKey = process.env.FORCEKEYS_API_KEY;
const api = new TranslateAPI(apiKey);
```

### Error Handling

```javascript
import { TranslateAPI, APIError } from 'translate-api';

const api = new TranslateAPI('your_api_key');

try {
  const result = await api.translate('Hello', { source: 'en', target: 'fr' });
} catch (error) {
  if (error instanceof APIError) {
    console.log('API Error:', error.code, '-', error.message);
    console.log('Status Code:', error.statusCode);
    
    if (error.code === 'rate_limit_exceeded') {
      console.log('Retry after:', error.retryAfter, 'seconds');
    } else if (error.code === 'insufficient_credits') {
      console.log('Please add credits to your account');
    }
  } else {
    console.log('Unexpected error:', error.message);
  }
}
```

### React Integration

```jsx
import React, { useState } from 'react';
import { TranslateAPI } from 'translate-api';

function TranslationComponent() {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  
  const api = new TranslateAPI(process.env.REACT_APP_FORCEKEYS_API_KEY);
  
  const handleTranslate = async () => {
    setLoading(true);
    try {
      const result = await api.translate(text, {
        source: 'en',
        target: 'fr'
      });
      setTranslation(result.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleTranslate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate'}
      </button>
      {translation && <div>Translation: {translation}</div>}
    </div>
  );
}
```

### Next.js Integration

```javascript
// lib/translate.js
import { TranslateAPI } from 'translate-api';

let apiInstance = null;

export function getTranslateAPI() {
  if (!apiInstance) {
    apiInstance = new TranslateAPI(process.env.FORCEKEYS_API_KEY);
  }
  return apiInstance;
}

// pages/api/translate.js
import { getTranslateAPI } from '../../lib/translate';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { text, source, target } = req.body;
    const api = getTranslateAPI();
    const result = await api.translate(text, { source, target });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

## API Reference

### TranslateAPI Class

```javascript
new TranslateAPI(apiKey: string, options?: TranslateAPIOptions)
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseURL` | string | `https://api.translate.forcekeys.com/api/v1` | API base URL |
| `timeout` | number | `30000` | Request timeout in milliseconds |
| `retries` | number | `3` | Number of retry attempts |
| `headers` | object | `{}` | Additional headers to send |
| `fetch` | function | `global.fetch` | Custom fetch implementation |

#### Methods

All methods return a Promise.

| Method | Description | Parameters |
|--------|-------------|------------|
| `translate(text, options)` | Translate text | `text`: Text to translate<br>`options.source`: Source language code (optional, auto-detected)<br>`options.target`: Target language code<br>`options.formality`: "formal" or "informal"<br>`options.context`: Context hint |
| `translateDocument(file, options)` | Translate document file | `file`: File object or path (Node.js)<br>`options.source`: Source language code<br>`options.target`: Target language code |
| `ocrAndTranslate(image, options)` | Extract text from image and translate | `image`: File object or path (Node.js)<br>`options.source`: Source language code<br>`options.target`: Target language code<br>`options.enhance`: Apply image enhancement |
| `detect(text)` | Detect language of text | `text`: Text to analyze |
| `batchTranslate(texts, options)` | Translate multiple texts | `texts`: Array of texts to translate<br>`options.source`: Source language code<br>`options.target`: Target language code |
| `languages()` | Get supported languages | |
| `account()` | Get account information | |

### Response Objects

All methods return typed response objects with the following common properties:

- `status`: "success" or "error"
- `processingTimeMs`: Processing time in milliseconds
- `charactersUsed`: Number of characters used

#### Translation Response
- `translatedText`: Translated text
- `sourceLang`: Source language code
- `targetLang`: Target language code

#### Document Translation Response
- `translatedText`: Translated text
- `pages`: Number of pages processed
- `charactersUsed`: Characters used

#### OCR Response
- `extractedText`: Text extracted from image
- `translatedText`: Translated text (if translation requested)
- `confidence`: OCR confidence percentage
- `languageDetected`: Detected language in image

#### Detection Response
- `language`: Detected language code
- `languageName`: Full language name
- `confidence`: Detection confidence percentage
- `alternatives`: Array of alternative possibilities

#### Account Response
- `email`: User email
- `plan`: Subscription plan
- `status`: Account status
- `planLimits`: Object with usage limits
- `balance`: Object with balance information
- `statistics`: Usage statistics

## Error Codes

The SDK throws `APIError` for API errors:

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `invalid_request` | Missing or malformed parameters | 400 |
| `unauthorized` | Invalid or missing API key | 401 |
| `forbidden` | Feature not available on your plan | 403 |
| `payload_too_large` | File or text exceeds size limit | 413 |
| `unsupported_language` | Language code not supported | 422 |
| `rate_limit_exceeded` | Too many requests | 429 |
| `insufficient_credits` | Not enough credits | 402 |
| `internal_error` | Server error | 500 |

## Rate Limits

Rate limits vary by plan:

| Plan | Requests/Minute | Monthly Requests | Max Characters/Request |
|------|----------------|------------------|------------------------|
| Free | 10 | 500/day | 2,000 |
| Starter | 60 | 50,000 | 5,000 |
| Professional | 300 | 1,000,000 | 10,000 |
| Enterprise | Unlimited | Unlimited | Unlimited |

## TypeScript Support

The SDK includes full TypeScript definitions:

```typescript
import { TranslateAPI, TranslationResult, APIError } from 'translate-api';

const api = new TranslateAPI('your_api_key');

async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const result: TranslationResult = await api.translate(text, {
      target: targetLang
    });
    return result.translatedText;
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`API Error: ${error.code}`);
    }
    throw error;
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Documentation**: [translate.forcekeys.com/docs](https://translate.forcekeys.com/docs)
- **Issues**: [GitHub Issues](https://github.com/forcekeys/translate-api-js/issues)
- **Email**: support@forcekeys.com
- **Discord**: [Join our Discord](https://discord.gg/forcekeys)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [TranslateAPI Python SDK](https://github.com/forcekeys/translate-api-python)
- [TranslateAPI PHP SDK](https://github.com/forcekeys/translate-api-php)
- [TranslateAPI Java SDK](https://github.com/forcekeys/translate-api-java)
- [TranslateAPI .NET SDK](https://github.com/forcekeys/translate-api-dotnet)
- [TranslateAPI Shell](https://github.com/forcekeys/translate-api-shell)
