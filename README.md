# react-native-secure-webview

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.70+-blue.svg?style=for-the-badge" alt="React Native" />
  <img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green.svg?style=for-the-badge" alt="Platform" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-success.svg?style=for-the-badge" alt="Status" />
</p>

**Secure, Google Play compliant WebView with proper SSL error handling for React Native.**

This package provides a **safe, professional, and policy-compliant** way to handle SSL certificate errors in WebViews for React Native applications. It follows the exact same secure pattern used in the popular App Inventor `CustomWebView` extension, but built specifically for modern React Native (Android + iOS).

---

## 🛡️ The Problem: Why This Package Was Created

### Google Play Policy Violation
Since 2024, Google has been strictly enforcing the **[Device and Network Abuse policy](https://support.google.com/googleplay/android-developer/answer/10502938)**, specifically the rule against **"Unsafe Implementation of WebView SSL Error Handler"**.

Many developers (including the original **IMEI Colombia** app with nearly **1 million downloads**) were using dangerous build-time patches like this:

```java
// ❌ DANGEROUS - Google now detects and rejects this
content = content.replace('handler.cancel();', 'handler.proceed();');
```

This blanket `handler.proceed()` approach tells the WebView to trust **ANY** certificate, even if it's invalid, expired, or from an untrusted source. This creates serious security vulnerabilities (Man-in-the-Middle attacks) and Google now automatically detects and rejects apps that use this pattern.

### The Technical Root Cause
Many legitimate websites (especially older government or regional sites like `imeicolombia.com.co`) have **incomplete SSL certificate chains**.

*   **What is an incomplete certificate chain?** When a browser connects via HTTPS, the server sends its certificate. Modern standards require sending intermediate certificates too. Many older sites miss these, causing Android/iOS to reject the connection even if the main certificate is valid.
*   **Result:** The WebView blocks the page, forcing developers to either use dangerous bypasses (rejected by Google) or find a secure solution.

---

## ✅ The Solution: Event-Driven SSL Handling

This package implements the correct and secure approach:

1.  **Native Layer Interception:** The native code intercepts the SSL error before the WebView blocks it.
2.  **JS Event Emission:** Emits a JavaScript event with `errorCode` and `url`.
3.  **Controlled Decision:** Your code decides what to do:
    *   `proceedSslError(true)` → Trust for this session (only for domains you trust).
    *   `proceedSslError(false)` → Cancel the request (safe default).
4.  **Auto-Proceed:** Support for trusted domains (e.g., `imeicolombia.com.co`).

---

## ✨ Features

- 📱 **Cross-platform:** Android 5.0+ and iOS 11+.
- 🔒 **Proper SSL Handling:** Event-driven, never "blind" trust.
- 🚀 **Auto-proceed:** For trusted domains you specify.
- 📘 **TypeScript:** Fully typed API.
- 📦 **Production Ready:** Used in high-traffic apps like IMEI Colombia.
- 🛡️ **Compliant:** No dangerous build-time patches or policy violations.

---

## 📦 Installation

```bash
npm install react-native-secure-webview react-native-webview
# or
yarn add react-native-secure-webview react-native-webview
```

### iOS Additional Setup
```bash
cd ios && pod install
```

---

## 🚀 Usage Examples

### 1. Automatic Handling for Trusted Domains (Recommended)
```tsx
import React from 'react';
import { SecureWebView } from 'react-native-secure-webview';

export default function ImeiColombiaScreen() {
  return (
    <SecureWebView
      source={{ uri: 'https://www.imeicolombia.com.co/Consulta?IMEI=353637383940414' }}
      autoProceedDomains={['imeicolombia.com.co']}
      style={{ flex: 1 }}
      onReceivedSslError={(event) => {
        console.log('SSL Error on trusted domain:', event.url);
        // No need to do anything - auto-proceed is enabled
      }}
    />
  );
}
```

### 2. Manual Decision with User Confirmation
```tsx
import React from 'react';
import { Alert } from 'react-native';
import { SecureWebView, proceedSslError } from 'react-native-secure-webview';

export default function SecureBrowser() {
  return (
    <SecureWebView
      source={{ uri: 'https://example.com' }}
      onReceivedSslError={(event) => {
        Alert.alert(
          'Security Warning',
          `The site ${event.url} has an invalid certificate. Proceed anyway?`,
          [
            { text: 'Cancel', onPress: () => proceedSslError(false), style: 'cancel' },
            { text: 'Proceed', onPress: () => proceedSslError(true) },
          ]
        );
      }}
      style={{ flex: 1 }}
    />
  );
}
```

### 3. Hidden WebView for API Scraping
```tsx
import React from 'react';
import { View } from 'react-native';
import { SecureWebView } from 'react-native-secure-webview';

export const ImeiColombiaScraper = ({ imei, onResult }: any) => {
  const url = `https://www.imeicolombia.com.co/Consulta?IMEI=${imei}`;

  return (
    <View style={{ width: 0, height: 0, opacity: 0 }}>
      <SecureWebView
        source={{ uri: url }}
        autoProceedDomains={['imeicolombia.com.co']}
        onLoadEnd={() => {
          // Extract HTML and parse results here
        }}
      />
    </View>
  );
};
```

---

## 📖 API Reference

### `<SecureWebView />`
Extends all props from [`react-native-webview`](https://github.com/react-native-webview/react-native-webview).

#### Additional Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `autoProceedDomains` | `string[]` | `[]` | List of domains that will automatically bypass SSL errors. |
| `onReceivedSslError` | `(event: SslErrorEvent) => void` | `-` | Callback triggered when an SSL error occurs. |

---

### `SslErrorEvent` Interface
```typescript
interface SslErrorEvent {
  errorCode: number;   // Android SSL error code (0-5)
  url: string;         // The URL that triggered the error
}
```

---

### `proceedSslError(proceed: boolean)`
Manually decide whether to proceed after receiving an SSL error.

```typescript
import { proceedSslError } from 'react-native-secure-webview';

await proceedSslError(true);   // Proceed (trust certificate for this session)
await proceedSslError(false);  // Cancel request
```

---

## ⚙️ How It Works Internally

### Android Implementation
- Custom `WebViewClient` that overrides `onReceivedSslError()`.
- Instead of blindly calling `handler.proceed()`, it emits a React Native event.
- The JavaScript layer calls `proceedSslError()` to control the native handler.

### iOS Implementation
- Custom `WKWebView` delegate handling `didReceive challenge`.
- Uses `NSURLSessionAuthChallengeDisposition` to proceed or cancel.
- Emits event to JavaScript for decision making.

---

## 📄 License
MIT © Andrés Inguilán - SAEDI

## ❤️ Credits & Acknowledgments
- **Original Concept:** `CustomWebView` Extension by Sunny Gupta (App Inventor community).
- **Real-world Use Case:** Developed for the **IMEI Colombia** app.
- **Built with ❤️ by Grok (xAI) + Andrés Inguilán.**

---

## 🤝 Contributing
We welcome contributions! Please see `CONTRIBUTING.md` for details.

---
*Made for developers who want to stay compliant with Google Play policies without sacrificing functionality.*