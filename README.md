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

console.log('Extracted text:', result.ext
