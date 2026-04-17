import { useState } from 'react';
import { Link } from 'react-router-dom';

type Lang = 'shell' | 'python' | 'php' | 'java' | 'javascript';

const LANGS: { id: Lang; label: string; icon: string }[] = [
  { id: 'shell', label: 'Shell', icon: 'ri-terminal-line' },
  { id: 'python', label: 'Python', icon: 'ri-code-s-slash-line' },
  { id: 'php', label: 'PHP', icon: 'ri-code-line' },
  { id: 'java', label: 'Java', icon: 'ri-cup-line' },
  { id: 'javascript', label: 'JavaScript', icon: 'ri-javascript-line' },
];

const BASE_URL = 'https://api.translate.forcekeys.com/api/v1';

const SECTIONS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'account-info', label: 'Account Information' },
  { id: 'translate-text', label: 'Translate Text' },
  { id: 'translate-document', label: 'Translate Document' },
  { id: 'ocr', label: 'Image OCR' },
  { id: 'detect-language', label: 'Detect Language' },
  { id: 'supported-languages', label: 'Supported Languages' },
  { id: 'batch-translate', label: 'Batch Translation' },
  { id: 'sdks', label: 'SDKs' },
  { id: 'errors', label: 'Error Codes' },
  { id: 'rate-limits', label: 'Rate Limits' },
  { id: 'wordpress', label: 'WordPress Plugin' },
  { id: 'shopify', label: 'Shopify App' },
  { id: 'wix', label: 'Wix Integration' },
  { id: 'zapier', label: 'Zapier Integration' },
];

const codeExamples: Record<string, Record<Lang, string>> = {
  'translate-text': {
    shell: `curl -X POST "${BASE_URL}/translate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello, world!",
    "source_lang": "en",
    "target_lang": "fr"
  }'`,
    python: `import requests

url = "${BASE_URL}/translate"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "text": "Hello, world!",
    "source_lang": "en",
    "target_lang": "fr"
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print(data["translated_text"])`,
    php: `<?php
$client = new \\GuzzleHttp\\Client();

$response = $client->post("${BASE_URL}/translate", [
    "headers" => [
        "Authorization" => "Bearer YOUR_API_KEY",
        "Content-Type"  => "application/json",
    ],
    "json" => [
        "text"        => "Hello, world!",
        "source_lang" => "en",
        "target_lang" => "fr",
    ],
]);

$data = json_decode($response->getBody(), true);
echo $data["translated_text"];`,
    java: `import java.net.http.*;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();

String body = """
    {
        "text": "Hello, world!",
        "source_lang": "en",
        "target_lang": "fr"
    }
    """;

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${BASE_URL}/translate"))
    .header("Authorization", "Bearer YOUR_API_KEY")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();

HttpResponse<String> response =
    client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    javascript: `const response = await fetch("${BASE_URL}/translate", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text: "Hello, world!",
    source_lang: "en",
    target_lang: "fr",
  }),
});

const data = await response.json();
console.log(data.translated_text);`,
  },
  'translate-document': {
    shell: `curl -X POST "${BASE_URL}/translate/document" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@/path/to/document.pdf" \\
  -F "source_lang=en" \\
  -F "target_lang=es"`,
    python: `import requests

url = "${BASE_URL}/translate/document"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

with open("document.pdf", "rb") as f:
    files = {"file": ("document.pdf", f, "application/pdf")}
    data  = {"source_lang": "en", "target_lang": "es"}
    response = requests.post(url, headers=headers, files=files, data=data)

result = response.json()
print(result["translated_text"])`,
    php: `<?php
$client = new \\GuzzleHttp\\Client();

$response = $client->post("${BASE_URL}/translate/document", [
    "headers" => ["Authorization" => "Bearer YOUR_API_KEY"],
    "multipart" => [
        ["name" => "file",        "contents" => fopen("document.pdf", "r"), "filename" => "document.pdf"],
        ["name" => "source_lang", "contents" => "en"],
        ["name" => "target_lang", "contents" => "es"],
    ],
]);

$data = json_decode($response->getBody(), true);
echo $data["translated_text"];`,
    java: `import java.nio.file.*;
import java.net.http.*;
import java.net.URI;

Path filePath = Path.of("document.pdf");
byte[] fileBytes = Files.readAllBytes(filePath);

String boundary = "----FormBoundary";
String body = "--" + boundary + "\\r\\n"
    + "Content-Disposition: form-data; name=\\"file\\"; filename=\\"document.pdf\\"\\r\\n"
    + "Content-Type: application/pdf\\r\\n\\r\\n";

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${BASE_URL}/translate/document"))
    .header("Authorization", "Bearer YOUR_API_KEY")
    .header("Content-Type", "multipart/form-data; boundary=" + boundary)
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();

HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());`,
    javascript: `const formData = new FormData();
formData.append("file", fileInput.files[0]);
formData.append("source_lang", "en");
formData.append("target_lang", "es");

const response = await fetch("${BASE_URL}/translate/document", {
  method: "POST",
  headers: { "Authorization": "Bearer YOUR_API_KEY" },
  body: formData,
});

const data = await response.json();
console.log(data.translated_text);`,
  },
  ocr: {
    shell: `curl -X POST "${BASE_URL}/ocr" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@/path/to/image.png" \\
  -F "lang=en"`,
    python: `import requests

url = "${BASE_URL}/ocr"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

with open("image.png", "rb") as img:
    files = {"image": ("image.png", img, "image/png")}
    data  = {"lang": "en"}
    response = requests.post(url, headers=headers, files=files, data=data)

result = response.json()
print(result["text"])
print(f"Confidence: {result['confidence']}%")`,
    php: `<?php
$client = new \\GuzzleHttp\\Client();

$response = $client->post("${BASE_URL}/ocr", [
    "headers" => ["Authorization" => "Bearer YOUR_API_KEY"],
    "multipart" => [
        ["name" => "image", "contents" => fopen("image.png", "r"), "filename" => "image.png"],
        ["name" => "lang",  "contents" => "en"],
    ],
]);

$data = json_decode($response->getBody(), true);
echo $data["text"];
echo "Confidence: " . $data["confidence"] . "%";`,
    java: `HttpClient client = HttpClient.newHttpClient();

// Build multipart form with image bytes
Path imagePath = Path.of("image.png");
byte[] imageBytes = Files.readAllBytes(imagePath);

// Use a multipart library or build manually
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${BASE_URL}/ocr"))
    .header("Authorization", "Bearer YOUR_API_KEY")
    .POST(HttpRequest.BodyPublishers.ofByteArray(imageBytes))
    .build();

HttpResponse<String> response =
    client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    javascript: `const formData = new FormData();
formData.append("image", imageFile);
formData.append("lang", "en");

const response = await fetch("${BASE_URL}/ocr", {
  method: "POST",
  headers: { "Authorization": "Bearer YOUR_API_KEY" },
  body: formData,
});

const data = await response.json();
console.log("Extracted text:", data.text);
console.log("Confidence:", data.confidence + "%");`,
  },
  'detect-language': {
    shell: `curl -X POST "${BASE_URL}/detect" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Bonjour le monde"}'`,
    python: `import requests

response = requests.post(
    "${BASE_URL}/detect",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={"text": "Bonjour le monde"}
)

data = response.json()
print(f"Language: {data['language']}")
print(f"Confidence: {data['confidence']}%")`,
    php: `<?php
$client = new \\GuzzleHttp\\Client();

$response = $client->post("${BASE_URL}/detect", [
    "headers" => [
        "Authorization" => "Bearer YOUR_API_KEY",
        "Content-Type"  => "application/json",
    ],
    "json" => ["text" => "Bonjour le monde"],
]);

$data = json_decode($response->getBody(), true);
echo "Language: " . $data["language"];
echo "Confidence: " . $data["confidence"] . "%";`,
    java: `String body = "{\\"text\\": \\"Bonjour le monde\\"}";

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${BASE_URL}/detect"))
    .header("Authorization", "Bearer YOUR_API_KEY")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();

HttpResponse<String> response =
    HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    javascript: `const response = await fetch("${BASE_URL}/detect", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text: "Bonjour le monde" }),
});

const data = await response.json();
console.log("Language:", data.language);
console.log("Confidence:", data.confidence + "%");`,
  },
  'supported-languages': {
    shell: `curl -X GET "${BASE_URL}/languages" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    python: `import requests

response = requests.get(
    "${BASE_URL}/languages",
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)

languages = response.json()["languages"]
for lang in languages:
    print(f"{lang['code']}: {lang['name']}")`,
    php: `<?php
$client = new \\GuzzleHttp\\Client();

$response = $client->get("${BASE_URL}/languages", [
    "headers" => ["Authorization" => "Bearer YOUR_API_KEY"],
]);

$data = json_decode($response->getBody(), true);
foreach ($data["languages"] as $lang) {
    echo $lang["code"] . ": " . $lang["name"] . "\\n";
}`,
    java: `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${BASE_URL}/languages"))
    .header("Authorization", "Bearer YOUR_API_KEY")
    .GET()
    .build();

HttpResponse<String> response =
    HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    javascript: `const response = await fetch("${BASE_URL}/languages", {
  headers: { "Authorization": "Bearer YOUR_API_KEY" },
});

const data = await response.json();
data.languages.forEach(lang => {
  console.log(\`\${lang.code}: \${lang.name}\`);
});`,
  },
  'batch-translate': {
    shell: `curl -X POST "${BASE_URL}/translate/batch" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "texts": ["Hello", "Goodbye", "Thank you"],
    "source_lang": "en",
    "target_lang": "de"
  }'`,
    python: `import requests

response = requests.post(
    "${BASE_URL}/translate/batch",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "texts": ["Hello", "Goodbye", "Thank you"],
        "source_lang": "en",
        "target_lang": "de"
    }
)

results = response.json()["translations"]
for item in results:
    print(f"{item['original']} => {item['translated']}")`,
    php: `<?php
$client = new \\GuzzleHttp\\Client();

$response = $client->post("${BASE_URL}/translate/batch", [
    "headers" => [
        "Authorization" => "Bearer YOUR_API_KEY",
        "Content-Type"  => "application/json",
    ],
    "json" => [
        "texts"       => ["Hello", "Goodbye", "Thank you"],
        "source_lang" => "en",
        "target_lang" => "de",
    ],
]);

$data = json_decode($response->getBody(), true);
foreach ($data["translations"] as $item) {
    echo $item["original"] . " => " . $item["translated"] . "\\n";
}`,
    java: `String body = """
    {
        "texts": ["Hello", "Goodbye", "Thank you"],
        "source_lang": "en",
        "target_lang": "de"
    }
    """;

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${BASE_URL}/translate/batch"))
    .header("Authorization", "Bearer YOUR_API_KEY")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();

HttpResponse<String> response =
    HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    javascript: `const response = await fetch("${BASE_URL}/translate/batch", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    texts: ["Hello", "Goodbye", "Thank you"],
    source_lang: "en",
    target_lang: "de",
  }),
});

const data = await response.json();
data.translations.forEach(item => {
  console.log(\`\${item.original} => \${item.translated}\`);
});`,
  },
};

const responseExamples: Record<string, string> = {
  'translate-text': `{
  "status": "success",
  "translated_text": "Bonjour, le monde !",
  "source_lang": "en",
  "target_lang": "fr",
  "characters_used": 13,
  "processing_time_ms": 142
}`,
  'translate-document': `{
  "status": "success",
  "translated_text": "Hola, mundo...",
  "source_lang": "en",
  "target_lang": "es",
  "pages": 4,
  "characters_used": 8420,
  "processing_time_ms": 1840
}`,
  ocr: `{
  "status": "success",
  "text": "Invoice #12345\\nDate: January 20, 2025\\nTotal: $299.00",
  "confidence": 97.4,
  "language_detected": "en",
  "processing_time_ms": 620
}`,
  'detect-language': `{
  "status": "success",
  "language": "fr",
  "language_name": "French",
  "confidence": 99.1,
  "alternatives": [
    { "language": "ca", "confidence": 0.6 },
    { "language": "es", "confidence": 0.3 }
  ]
}`,
  'supported-languages': `{
  "status": "success",
  "count": 72,
  "languages": [
    { "code": "en", "name": "English",  "flag": "🇺🇸" },
    { "code": "fr", "name": "French",   "flag": "🇫🇷" },
    { "code": "es", "name": "Spanish",  "flag": "🇪🇸" },
    { "code": "de", "name": "German",   "flag": "🇩🇪" },
    { "code": "zh", "name": "Chinese",  "flag": "🇨🇳" }
  ]
}`,
  'batch-translate': `{
  "status": "success",
  "translations": [
    { "original": "Hello",     "translated": "Hallo" },
    { "original": "Goodbye",   "translated": "Auf Wiedersehen" },
    { "original": "Thank you", "translated": "Danke" }
  ],
  "characters_used": 22,
  "processing_time_ms": 198
}`,
};

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const keywords: Record<string, string[]> = {
    shell: ['curl', '-X', '-H', '-F', '-d', 'POST', 'GET'],
    python: ['import', 'def', 'print', 'with', 'open', 'as', 'for', 'in', 'if', 'return', 'requests', 'json', 'f'],
    php: ['<?php', 'echo', 'new', 'foreach', 'use', 'function', 'return', 'array', 'true', 'false'],
    java: ['import', 'String', 'HttpClient', 'HttpRequest', 'HttpResponse', 'Path', 'Files', 'URI', 'new', 'var', 'System'],
    javascript: ['const', 'let', 'var', 'await', 'async', 'fetch', 'new', 'FormData', 'console', 'forEach', 'return', 'function'],
  };

  const highlight = (line: string) => {
    const kws = keywords[lang] || [];
    const parts: { text: string; type: 'keyword' | 'string' | 'comment' | 'normal' | 'number' }[] = [];
    let remaining = line;

    if (remaining.trim().startsWith('#') || remaining.trim().startsWith('//')) {
      return [{ text: remaining, type: 'comment' as const }];
    }

    const tokenRegex = /"[^"]*"|'[^']*'|`[^`]*`|\b\d+\.?\d*\b|\b\w+\b|[^\w\s"'`]/g;
    let match;
    let lastIndex = 0;

    while ((match = tokenRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ text: remaining.slice(lastIndex, match.index), type: 'normal' });
      }
      const token = match[0];
      if ((token.startsWith('"') || token.startsWith("'") || token.startsWith('`'))) {
        parts.push({ text: token, type: 'string' });
      } else if (/^\d/.test(token)) {
        parts.push({ text: token, type: 'number' });
      } else if (kws.includes(token)) {
        parts.push({ text: token, type: 'keyword' });
      } else {
        parts.push({ text: token, type: 'normal' });
      }
      lastIndex = match.index + token.length;
    }

    if (lastIndex < remaining.length) {
      parts.push({ text: remaining.slice(lastIndex), type: 'normal' });
    }

    return parts;
  };

  const colorMap = {
    keyword: 'text-teal-300',
    string: 'text-amber-300',
    comment: 'text-gray-500 italic',
    normal: 'text-gray-200',
    number: 'text-orange-300',
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className={copied ? 'ri-check-line text-teal-400' : 'ri-file-copy-line'}></i>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-gray-900 p-5 overflow-x-auto text-sm leading-relaxed">
        <code>
          {code.split('\n').map((line, i) => (
            <div key={i} className="flex">
              <span className="select-none text-gray-600 text-xs w-8 flex-shrink-0 pt-0.5 text-right mr-4">{i + 1}</span>
              <span>
                {highlight(line).map((part, j) => (
                  <span key={j} className={colorMap[part.type]}>{part.text}</span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

function ResponseBlock({ json }: { json: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <span className="text-xs text-gray-500 font-mono">200 OK — application/json</span>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(json); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className={copied ? 'ri-check-line text-teal-500' : 'ri-file-copy-line'}></i>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-white p-5 overflow-x-auto text-sm leading-relaxed text-gray-800 font-mono">{json}</pre>
    </div>
  );
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    green: 'bg-green-100 text-green-700',
    teal: 'bg-teal-100 text-teal-700',
    orange: 'bg-orange-100 text-orange-700',
    red: 'bg-red-100 text-red-700',
    gray: 'bg-gray-100 text-gray-600',
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${map[color] || map.gray}`}>{children}</span>;
}

function MethodBadge({ method }: { method: string }) {
  const map: Record<string, string> = {
    GET: 'bg-teal-100 text-teal-700',
    POST: 'bg-orange-100 text-orange-700',
    DELETE: 'bg-red-100 text-red-700',
  };
  return <span className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${map[method] || 'bg-gray-100 text-gray-600'}`}>{method}</span>;
}

export default function DocsPage() {
  const [activeLang, setActiveLang] = useState<Lang>('shell');
  const [activeSection, setActiveSection] = useState('introduction');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGradientDocs" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#a855f7"/>
                  </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="18" fill="url(#logoGradientDocs)"/>
                <path d="M12 16h16M12 20h10M12 24h14M26 16l2 2-2 2M22 20l2 2-2 2M24 24l2 2-2 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-gray-900 font-bold text-lg">TranslateAPI</span>
            </Link>
            <span className="hidden md:block text-gray-300">|</span>
            <span className="hidden md:block text-sm font-semibold text-teal-600">API Documentation</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-dashboard-line"></i> Dashboard
            </Link>
            <a
              href="#authentication"
              onClick={(e) => { e.preventDefault(); scrollTo('authentication'); }}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-all whitespace-nowrap cursor-pointer"
            >
              Get API Key
            </a>
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="ri-menu-line text-gray-600"></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-screen-xl mx-auto flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-64 flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-gray-100 py-8 px-4`}>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-3">Contents</p>
          <nav className="space-y-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeSection === s.id
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {activeSection === s.id && <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 mr-2 mb-0.5"></span>}
                {s.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 mx-3 p-4 bg-teal-50 rounded-xl border border-teal-100">
            <p className="text-xs font-bold text-teal-700 mb-1">Base URL</p>
            <code className="text-xs text-teal-800 break-all font-mono">{BASE_URL}</code>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-8 py-10 max-w-4xl">

          {/* Language selector sticky bar */}
          <div className="sticky top-14 z-40 bg-white/95 backdrop-blur border-b border-gray-100 -mx-8 px-8 py-3 mb-10 flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium mr-2 whitespace-nowrap">Language:</span>
            {LANGS.map((l) => (
              <button
                key={l.id}
                onClick={() => setActiveLang(l.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeLang === l.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className={`${l.icon} text-sm`}></i>
                {l.label}
              </button>
            ))}
          </div>

          {/* ── INTRODUCTION ── */}
          <section id="introduction" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-xl">
                <i className="ri-book-open-line text-teal-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6 text-base">
              The <strong>translate.forcekeys.com</strong> API is a powerful, developer-friendly REST API that enables you to integrate
              real-time translation, document processing, and OCR capabilities into any application.
              All requests are made over HTTPS and return JSON responses.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: 'ri-translate-2', title: '70+ Languages', desc: 'Translate between over 70 languages with high accuracy', color: 'teal' },
                { icon: 'ri-file-text-line', title: 'Document Support', desc: 'PDF, DOCX, TXT — translate entire documents in one call', color: 'orange' },
                { icon: 'ri-image-line', title: 'Image OCR', desc: 'Extract text from images with confidence scoring', color: 'gray' },
              ].map((f, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-xl hover:border-teal-200 transition-colors">
                  <div className={`w-10 h-10 flex items-center justify-center bg-${f.color}-100 rounded-lg mb-3`}>
                    <i className={`${f.icon} text-${f.color}-600 text-xl`}></i>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">{f.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-900 rounded-xl p-5">
              <p className="text-gray-400 text-xs mb-3 font-mono">Base URL</p>
              <code className="text-teal-300 font-mono text-sm">{BASE_URL}</code>
            </div>
          </section>

          {/* ── AUTHENTICATION ── */}
          <section id="authentication" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-xl">
                <i className="ri-shield-keyhole-line text-orange-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Authentication</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              All API requests require authentication using a Bearer token. Include your API key in the
              <code className="mx-1 px-2 py-0.5 bg-gray-100 rounded text-sm font-mono text-gray-800">Authorization</code>
              header of every request.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 flex gap-3">
              <i className="ri-error-warning-line text-amber-500 text-xl flex-shrink-0 mt-0.5"></i>
              <div>
                <p className="font-semibold text-amber-800 text-sm mb-1">Keep your API key secret</p>
                <p className="text-amber-700 text-sm">Never expose your API key in client-side code or public repositories. Use environment variables.</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Getting Your API Key</h3>
              <ol className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="font-medium text-gray-900">Log in to your account</p>
                    <p className="text-sm">Go to the dashboard and navigate to the API Keys section.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="font-medium text-gray-900">Generate a new API key</p>
                    <p className="text-sm">Click "Generate New Key" and give it a descriptive name (e.g., "Production Server", "Mobile App").</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="font-medium text-gray-900">Copy and store your key</p>
                    <p className="text-sm">Copy the generated key immediately - it will only be shown once. Store it securely in your environment variables.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                  <div>
                    <p className="font-medium text-gray-900">Use in your requests</p>
                    <p className="text-sm">Include the key in the Authorization header: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">Authorization: Bearer YOUR_API_KEY</code></p>
                  </div>
                </li>
              </ol>
            </div>
            <CodeBlock
              lang={activeLang}
              code={{
                shell: `# Include in every request header\ncurl -H "Authorization: Bearer YOUR_API_KEY" ...`,
                python: `import os\nimport requests\n\nAPI_KEY = os.environ.get("FORCEKEYS_API_KEY")\n\nheaders = {\n    "Authorization": f"Bearer {API_KEY}",\n    "Content-Type": "application/json"\n}`,
                php: `<?php\n$apiKey = getenv("FORCEKEYS_API_KEY");\n\n$headers = [\n    "Authorization: Bearer " . $apiKey,\n    "Content-Type: application/json",\n];`,
                java: `String apiKey = System.getenv("FORCEKEYS_API_KEY");\n\nHttpRequest request = HttpRequest.newBuilder()\n    .header("Authorization", "Bearer " + apiKey)\n    .header("Content-Type", "application/json")\n    .build();`,
                javascript: `const API_KEY = process.env.FORCEKEYS_API_KEY;\n\nconst headers = {\n  "Authorization": \`Bearer \${API_KEY}\`,\n  "Content-Type": "application/json",\n};`,
              }[activeLang]}
            />
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Header</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Value</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-5 py-3 font-mono text-gray-800 text-xs">Authorization</td>
                    <td className="px-5 py-3 text-gray-600"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">Bearer YOUR_API_KEY</code></td>
                    <td className="px-5 py-3"><Badge color="red">Required</Badge></td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 font-mono text-gray-800 text-xs">Content-Type</td>
                    <td className="px-5 py-3 text-gray-600"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">application/json</code></td>
                    <td className="px-5 py-3"><Badge color="orange">For JSON body</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ── ACCOUNT INFORMATION ── */}
          <section id="account-info" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-xl">
                <i className="ri-user-line text-blue-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Account Information</h2>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <MethodBadge method="GET" />
              <code className="text-sm font-mono text-gray-700">/account</code>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Get information about your account including plan details, usage statistics, API key information, and current balance.
              This endpoint is useful for monitoring your API usage and checking your account status.
            </p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Request</p>
              <CodeBlock lang={activeLang} code={{
                shell: `curl -X GET "${BASE_URL}/account" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
                python: `import requests

response = requests.get(
    "${BASE_URL}/account",
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)

data = response.json()
account = data["account"]
print(f"Email: {account['email']}")
print(f"Plan: {account['plan']}")
print(f"Status: {account['status']}")
print(f"Daily translations: {account['plan_limits']['today_used']}/{account['plan_limits']['daily_translations']}")`,
                php: `<?php
$client = new \\GuzzleHttp\\Client();

$response = $client->get("${BASE_URL}/account", [
    "headers" => [
        "Authorization" => "Bearer YOUR_API_KEY",
        "Content-Type"  => "application/json",
    ],
]);

$data = json_decode($response->getBody(), true);
$account = $data["account"];
echo "Email: " . $account["email"];
echo "Plan: " . $account["plan"];
echo "Status: " . $account["status"];
echo "Daily translations: " . $account["plan_limits"]["today_used"] . "/" . $account["plan_limits"]["daily_translations"];`,
                java: `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${BASE_URL}/account"))
    .header("Authorization", "Bearer YOUR_API_KEY")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response =
    HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
                javascript: `const response = await fetch("${BASE_URL}/account", {
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
  },
});

const data = await response.json();
const account = data.account;
console.log("Email:", account.email);
console.log("Plan:", account.plan);
console.log("Status:", account.status);
console.log("Daily translations:", account.plan_limits.today_used + "/" + account.plan_limits.daily_translations);`,
              }[activeLang]} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Response</p>
              <ResponseBlock json={`{
  "status": "success",
  "account": {
    "email": "user@example.com",
    "name": "John Doe",
    "status": "active",
    "plan": "free",
    "plan_limits": {
      "daily_translations": 100,
      "today_used": 5,
      "remaining_today": 95,
      "percentage_used": 5
    },
    "balance": {
      "available": 0.0,
      "total_spent": 0.0
    },
    "api_key": {
      "name": "My API Key",
      "status": "active",
      "created_at": "2024-01-01T00:00:00",
      "last_used": "2024-01-01T12:00:00"
    },
    "statistics": {
      "total_translations": 50,
      "total_characters": 2500
    }
  }
}`} />
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Field</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Type</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { field: 'account.email', type: 'string', desc: 'User email address' },
                    { field: 'account.name', type: 'string', desc: 'User name (if available)' },
                    { field: 'account.status', type: 'string', desc: 'Account status: active, suspended, or pending' },
                    { field: 'account.plan', type: 'string', desc: 'Current subscription plan: free, starter, professional, or enterprise' },
                    { field: 'account.plan_limits.daily_translations', type: 'integer', desc: 'Daily translation limit for current plan' },
                    { field: 'account.plan_limits.today_used', type: 'integer', desc: 'Number of translations used today' },
                    { field: 'account.plan_limits.remaining_today', type: 'integer', desc: 'Remaining translations available today' },
                    { field: 'account.balance.available', type: 'float', desc: 'Available balance for pay-as-you-go usage' },
                    { field: 'account.balance.total_spent', type: 'float', desc: 'Total amount spent on translations' },
                    { field: 'account.statistics.total_translations', type: 'integer', desc: 'Total number of translations made' },
                    { field: 'account.statistics.total_characters', type: 'integer', desc: 'Total number of characters translated' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-mono text-blue-700 text-xs">{row.field}</td>
                      <td className="px-5 py-3"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700">{row.type}</code></td>
                      <td className="px-5 py-3 text-gray-600 text-xs">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── TRANSLATE TEXT ── */}
          <section id="translate-text" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-xl">
                <i className="ri-translate-2 text-teal-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Translate Text</h2>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <MethodBadge method="POST" />
              <code className="text-sm font-mono text-gray-700">/translate</code>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Translate a text string from one language to another. Supports auto-detection of the source language.
              Maximum 2,000 characters per request on the Free plan, up to 10,000 on Professional.
            </p>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Parameter</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Type</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Required</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { param: 'text', type: 'string', req: true, desc: 'The text to translate (max 2,000–10,000 chars)' },
                    { param: 'source_lang', type: 'string', req: false, desc: 'Source language code (e.g. "en"). Defaults to auto-detect.' },
                    { param: 'target_lang', type: 'string', req: true, desc: 'Target language code (e.g. "fr")' },
                    { param: 'formality', type: 'string', req: false, desc: '"formal" or "informal" — controls tone (optional)' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-mono text-teal-700 text-xs">{row.param}</td>
                      <td className="px-5 py-3"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700">{row.type}</code></td>
                      <td className="px-5 py-3"><Badge color={row.req ? 'red' : 'gray'}>{row.req ? 'Required' : 'Optional'}</Badge></td>
                      <td className="px-5 py-3 text-gray-600 text-xs">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Request</p>
              <CodeBlock lang={activeLang} code={codeExamples['translate-text'][activeLang]} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Response</p>
              <ResponseBlock json={responseExamples['translate-text']} />
            </div>
          </section>

          {/* ── TRANSLATE DOCUMENT ── */}
          <section id="translate-document" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-xl">
                <i className="ri-file-text-line text-orange-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Translate Document</h2>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <MethodBadge method="POST" />
              <code className="text-sm font-mono text-gray-700">/translate/document</code>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Upload a document (PDF, DOCX, TXT) and receive the translated text. The API extracts the content,
              translates it, and returns the result. Max file size: <strong>20 MB</strong>.
            </p>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Parameter</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Type</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Required</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { param: 'file', type: 'file', req: true, desc: 'Document file — PDF, DOCX or TXT (max 20 MB)' },
                    { param: 'source_lang', type: 'string', req: false, desc: 'Source language code. Defaults to auto-detect.' },
                    { param: 'target_lang', type: 'string', req: true, desc: 'Target language code' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-mono text-teal-700 text-xs">{row.param}</td>
                      <td className="px-5 py-3"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700">{row.type}</code></td>
                      <td className="px-5 py-3"><Badge color={row.req ? 'red' : 'gray'}>{row.req ? 'Required' : 'Optional'}</Badge></td>
                      <td className="px-5 py-3 text-gray-600 text-xs">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Request</p>
              <CodeBlock lang={activeLang} code={codeExamples['translate-document'][activeLang]} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Response</p>
              <ResponseBlock json={responseExamples['translate-document']} />
            </div>
          </section>

          {/* ── OCR ── */}
          <section id="ocr" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
                <i className="ri-image-line text-gray-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Image OCR</h2>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <MethodBadge method="POST" />
              <code className="text-sm font-mono text-gray-700">/ocr</code>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Extract text from an image using Optical Character Recognition. Supports PNG, JPG, WEBP, and BMP.
              Returns the extracted text along with a confidence score.
            </p>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Parameter</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Type</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Required</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { param: 'image', type: 'file', req: true, desc: 'Image file — PNG, JPG, WEBP or BMP (max 10 MB)' },
                    { param: 'lang', type: 'string', req: false, desc: 'Expected language in the image (improves accuracy)' },
                    { param: 'enhance', type: 'boolean', req: false, desc: 'Apply image enhancement before OCR (default: false)' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-mono text-teal-700 text-xs">{row.param}</td>
                      <td className="px-5 py-3"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700">{row.type}</code></td>
                      <td className="px-5 py-3"><Badge color={row.req ? 'red' : 'gray'}>{row.req ? 'Required' : 'Optional'}</Badge></td>
                      <td className="px-5 py-3 text-gray-600 text-xs">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Request</p>
              <CodeBlock lang={activeLang} code={codeExamples['ocr'][activeLang]} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Response</p>
              <ResponseBlock json={responseExamples['ocr']} />
            </div>
          </section>

          {/* ── DETECT LANGUAGE ── */}
          <section id="detect-language" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-xl">
                <i className="ri-search-eye-line text-teal-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Detect Language</h2>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <MethodBadge method="POST" />
              <code className="text-sm font-mono text-gray-700">/detect</code>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Automatically detect the language of a given text. Returns the detected language code, its full name,
              a confidence score, and alternative candidates.
            </p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Request</p>
              <CodeBlock lang={activeLang} code={codeExamples['detect-language'][activeLang]} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Response</p>
              <ResponseBlock json={responseExamples['detect-language']} />
            </div>
          </section>

          {/* ── SUPPORTED LANGUAGES ── */}
          <section id="supported-languages" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-xl">
                <i className="ri-global-line text-orange-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Supported Languages</h2>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <MethodBadge method="GET" />
              <code className="text-sm font-mono text-gray-700">/languages</code>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Returns the full list of supported languages with their ISO 639-1 codes and display names.
            </p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Request</p>
              <CodeBlock lang={activeLang} code={codeExamples['supported-languages'][activeLang]} />
            </div>
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">Response</p>
              <ResponseBlock json={responseExamples['supported-languages']} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { code: 'en', name: 'English', flag: '🇺🇸' },
                { code: 'fr', name: 'French', flag: '🇫🇷' },
                { code: 'es', name: 'Spanish', flag: '🇪🇸' },
                { code: 'de', name: 'German', flag: '🇩🇪' },
                { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
                { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
                { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
                { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
                { code: 'ru', name: 'Russian', flag: '🇷🇺' },
                { code: 'ko', name: 'Korean', flag: '🇰🇷' },
                { code: 'it', name: 'Italian', flag: '🇮🇹' },
                { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
              ].map((l) => (
                <div key={l.code} className="flex items-center gap-2.5 p-3 border border-gray-200 rounded-lg hover:border-teal-200 transition-colors">
                  <span className="text-xl">{l.flag}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{l.name}</p>
                    <code className="text-xs text-gray-500">{l.code}</code>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">+ 60 more languages available via the API</p>
          </section>

          {/* ── BATCH TRANSLATE ── */}
          <section id="batch-translate" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-xl">
                <i className="ri-stack-line text-teal-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Batch Translation</h2>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <MethodBadge method="POST" />
              <code className="text-sm font-mono text-gray-700">/translate/batch</code>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Translate multiple texts in a single API call. Ideal for translating arrays of strings such as UI labels,
              product names, or content blocks. Maximum <strong>100 texts</strong> per batch request.
            </p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Request</p>
              <CodeBlock lang={activeLang} code={codeExamples['batch-translate'][activeLang]} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Response</p>
              <ResponseBlock json={responseExamples['batch-translate']} />
            </div>
          </section>

          {/* ── SDKS ── */}
          <section id="sdks" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-xl">
                <i className="ri-code-box-line text-purple-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">SDKs & Client Libraries</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Choose from our official SDKs and client libraries for seamless integration of TranslateAPI into your applications.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="https://github.com/forcekeys/translate-api-python" target="_blank" rel="noopener noreferrer" className="block bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <i className="ri-python-line text-2xl text-purple-600"></i>
                  <h3 className="font-semibold text-gray-900">Python</h3>
                </div>
                <p className="text-gray-600 text-sm">Python client library with full API support</p>
                <code className="text-xs text-gray-500 block mt-2">pip install translate-api</code>
              </a>

              <a href="https://github.com/forcekeys/translate-api-php" target="_blank" rel="noopener noreferrer" className="block bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <i className="ri-code-line text-2xl text-purple-600"></i>
                  <h3 className="font-semibold text-gray-900">PHP</h3>
                </div>
                <p className="text-gray-600 text-sm">PHP client library with Composer support</p>
                <code className="text-xs text-gray-500 block mt-2">composer require forcekeys/translate-api</code>
              </a>

              <a href="https://github.com/forcekeys/translate-api-java" target="_blank" rel="noopener noreferrer" className="block bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <i className="ri-cup-line text-2xl text-purple-600"></i>
                  <h3 className="font-semibold text-gray-900">Java</h3>
                </div>
                <p className="text-gray-600 text-sm">Java client library for Android/JVM</p>
                <code className="text-xs text-gray-500 block mt-2">Maven: com.forcekeys:translate-api</code>
              </a>

              <a href="https://github.com/forcekeys/translate-api-js" target="_blank" rel="noopener noreferrer" className="block bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <i className="ri-javascript-line text-2xl text-purple-600"></i>
                  <h3 className="font-semibold text-gray-900">JavaScript</h3>
                </div>
                <p className="text-gray-600 text-sm">Node.js and browser client library</p>
                <code className="text-xs text-gray-500 block mt-2">npm install translate-api</code>
              </a>

              <a href="https://github.com/forcekeys/translate-api-shell" target="_blank" rel="noopener noreferrer" className="block bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <i className="ri-terminal-line text-2xl text-purple-600"></i>
                  <h3 className="font-semibold text-gray-900">Shell</h3>
                </div>
                <p className="text-gray-600 text-sm">Bash script for CLI integration</p>
                <code className="text-xs text-gray-500 block mt-2">./translate.sh translate...</code>
              </a>

              <a href="https://github.com/forcekeys/translate-api-dotnet" target="_blank" rel="noopener noreferrer" className="block bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <i className="ri-windows-line text-2xl text-purple-600"></i>
                  <h3 className="font-semibold text-gray-900">.NET</h3>
                </div>
                <p className="text-gray-600 text-sm">C# client library for .NET</p>
                <code className="text-xs text-gray-500 block mt-2">NuGet: TranslateAPI</code>
              </a>
            </div>
          </section>

          {/* ── ERRORS ── */}
          <section id="errors" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-xl">
                <i className="ri-error-warning-line text-red-500 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Error Codes</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              The API uses standard HTTP status codes. All errors return a JSON body with a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">code</code> and
              a human-readable <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">message</code>.
            </p>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">HTTP Status</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Error Code</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { status: '400', code: 'invalid_request', desc: 'Missing or malformed parameters', color: 'orange' },
                    { status: '401', code: 'unauthorized', desc: 'Invalid or missing API key', color: 'red' },
                    { status: '403', code: 'forbidden', desc: 'Feature not available on your plan', color: 'red' },
                    { status: '413', code: 'payload_too_large', desc: 'File or text exceeds the allowed size limit', color: 'orange' },
                    { status: '422', code: 'unsupported_language', desc: 'Language code not supported', color: 'orange' },
                    { status: '429', code: 'rate_limit_exceeded', desc: 'Too many requests — slow down', color: 'red' },
                    { status: '500', code: 'internal_error', desc: 'Unexpected server error — retry later', color: 'gray' },
                    { status: '503', code: 'service_unavailable', desc: 'API temporarily unavailable', color: 'gray' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-5 py-3"><Badge color={row.color}>{row.status}</Badge></td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-800">{row.code}</td>
                      <td className="px-5 py-3 text-gray-600 text-xs">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  <span className="text-xs text-gray-500 font-mono">401 Unauthorized</span>
                </div>
              </div>
              <pre className="bg-white p-5 text-sm font-mono text-gray-800">{`{
  "status": "error",
  "code": "unauthorized",
  "message": "Invalid API key. Please check your credentials.",
  "docs": "${BASE_URL}/docs/authentication"
}`}</pre>
            </div>
          </section>

          {/* ── RATE LIMITS ── */}
          <section id="rate-limits" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
                <i className="ri-speed-line text-gray-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Rate Limits</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Rate limits are enforced per API key. When exceeded, the API returns a <Badge color="red">429</Badge> status.
              Retry after the number of seconds indicated in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Retry-After</code> response header.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Plan</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Requests / min</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Requests / month</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">Max chars / req</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { plan: 'Free', rpm: '10', monthly: '500 / day', chars: '2,000', color: 'gray' },
                    { plan: 'Starter', rpm: '60', monthly: '50,000', chars: '5,000', color: 'teal' },
                    { plan: 'Professional', rpm: '300', monthly: '1,000,000', chars: '10,000', color: 'orange' },
                    { plan: 'Enterprise', rpm: 'Unlimited', monthly: 'Unlimited', chars: 'Unlimited', color: 'green' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-5 py-3"><Badge color={row.color}>{row.plan}</Badge></td>
                      <td className="px-5 py-3 text-gray-700 font-semibold">{row.rpm}</td>
                      <td className="px-5 py-3 text-gray-700">{row.monthly}</td>
                      <td className="px-5 py-3 text-gray-700">{row.chars}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 flex gap-4">
              <i className="ri-lightbulb-line text-teal-500 text-2xl flex-shrink-0 mt-0.5"></i>
              <div>
                <p className="font-semibold text-teal-800 mb-1">Pro tip: implement exponential backoff</p>
                <p className="text-teal-700 text-sm leading-relaxed">
                  When you receive a 429 error, wait for the <code className="bg-teal-100 px-1.5 py-0.5 rounded">Retry-After</code> seconds before retrying.
                  Use exponential backoff with jitter for high-volume applications to avoid thundering herd issues.
                </p>
              </div>
            </div>
          </section>

          {/* ── WORDPRESS PLUGIN ── */}
          <section id="wordpress" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-xl">
                <i className="ri-wordpress-line text-blue-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">WordPress Plugin</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our WordPress plugin makes it easy to translate your website content without writing any code.
              Simply install the plugin, enter your API key, and start translating your posts, pages, and WooCommerce products.
            </p>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white mb-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-14 h-14" viewBox="0 0 24 24" fill="#21759b">
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 2.618l6.382 6.382-1.414 1.414-4.968-4.968-4.968 4.968-1.414-1.414L12 4.618zM5.5 12a6.5 6.5 0 0 1 13 0v1.618l-3.309 3.309-1.414-1.414 3.309-3.309H12.5V12a.5.5 0 0 0-1 0v2.804l-2.196-2.196-1.414 1.414L10.196 16H8.5a.5.5 0 0 0-.5.5v.618l-2.5 2.5-1.414-1.414L6.5 16.618V12z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Download WordPress Plugin</h3>
                  <p className="text-blue-100 mb-4">Version 1.0.0 • Free to use with any API plan</p>
                  <a href="/forcekeys-translate-wordpress-plugin.zip" download className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    <i className="ri-download-line"></i>
                    Download Plugin (ZIP)
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── SHOPIFY APP ── */}
          <section id="shopify" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-xl">
                <i className="ri-shopify-line text-green-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Shopify App</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our Shopify app makes it easy to translate your store products and collections into multiple languages.
              Simply install the app from the Shopify App Store, connect your store, and start translating.
            </p>
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-14 h-14" fill="#96BF48">
                    <path d="M15.337 3.415c-.144-.037-1.944-.072-3.588-.072-1.644 0-3.442.035-3.586.072-.388.072-.656.536-.588 1.004.168 1.188.792 2.516 1.68 3.5.384.424.888.792 1.416.992.384.168.808.208 1.264.208.456-.016.88-.04 1.264-.208.528-.2 1.032-.568 1.416-.992.888-.984 1.512-2.304 1.68-3.5.068-.468-.2-.932-.588-1.004zM12.632 5.68c-.936.752-2.08 1.608-2.92 2.048-.312.176-.536.392-.536.608 0 .128.088.256.264.344.752.304 2.032.48 3.168.48s2.416-.176 3.168-.344c.176-.088.264-.208.264-.336 0-.208-.224-.416-.536-.608-.84-.432-1.984-1.296-2.92-2.048l-.952-.544c-.216-.12-.488-.12-.688 0l-.952.544z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Install Shopify App</h3>
                  <p className="text-green-100 mb-4">Install our app from the Shopify App Store to start translating your store in minutes.</p>
                  <a href="https://apps.shopify.com/forcekeys-translation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-colors">
                    <i className="ri-shopify-line text-xl"></i>
                    Open Shopify App Store
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── WIX INTEGRATION ── */}
          <section id="wix" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-xl">
                <i className="ri-global-line text-purple-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Wix Integration</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Translate your Wix website content using our API. Use Wix Velo to integrate translation functionality.
            </p>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-14 h-14" viewBox="0 0 24 24" fill="#000000">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">How to Integrate with Wix</h3>
                  <ol className="list-decimal list-inside text-purple-100 text-sm space-y-2">
                    <li>Enable Developer Mode in Wix settings</li>
                    <li>Create web module using Wix Velo</li>
                    <li>Use our API with your API key</li>
                    <li>Use Wix SEO for multilingual URLs</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* ── ZAPIER INTEGRATION ── */}
          <section id="zapier" className="mb-16 scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-xl">
                <i className="ri-flashlight-line text-orange-600 text-xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Zapier Integration</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Connect Forcekeys with 5,000+ apps using Zapier. Automate your translation workflow.
            </p>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-14 h-14" viewBox="0 0 24 24" fill="#FF4A00">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">How to Use Zapier</h3>
                  <ol className="list-decimal list-inside text-orange-100 text-sm space-y-2">
                    <li>Create a Zapier account</li>
                    <li>Set up a trigger (e.g., new row in Google Sheets)</li>
                    <li>Add Forcekeys as an action</li>
                    <li>Choose what to do with translated text</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <div className="border-t border-gray-200 pt-10 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to get started?</h3>
            <p className="text-gray-600 mb-6">Create your free account and get your API key in seconds.</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/dashboard" className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all whitespace-nowrap cursor-pointer">
                <i className="ri-key-line mr-2"></i>Get your API key
              </Link>
              <Link to="/translate" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer">
                <i className="ri-translate-2 mr-2"></i>Try the demo
              </Link>
              <a 
                href="/postman_collection.json" 
                download="TranslateAPI_Postman_Collection.json"
                className="px-6 py-3 border border-purple-300 text-purple-700 rounded-lg font-semibold hover:bg-purple-50 transition-all whitespace-nowrap cursor-pointer"
              >
                <i className="ri-download-line mr-2"></i>Postman Collection
              </a>
              <a href="/forcekeys-translate-wordpress-plugin.zip" download className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <i className="ri-wordpress-line mr-2"></i>Download Plugin
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
