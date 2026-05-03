# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-05-02

### Added
- **Core SSL Error Handling**: Event-driven SSL certificate error handling for both Android and iOS
- **Secure WebView Component**: `SecureWebView` component that extends `react-native-webview` with proper SSL handling
- **Auto-Proceed Support**: `autoProceedDomains` prop to automatically trust certificates from specified domains (e.g., `imeicolombia.com.co`)
- **Manual Control**: `proceedSslError(proceed: boolean)` function for manual decision making
- **TypeScript Support**: Full TypeScript definitions and types
- **Cross-Platform**: Native implementation for Android (`WebViewClient`) and iOS (`WKWebView` delegate)
- **Google Play Compliant**: No more dangerous build-time `handler.proceed()` patches
- **Event System**: `onReceivedSslError` callback with `errorCode` and `url`

### Security
- Replaced blanket SSL bypass with secure, event-driven decision making
- Follows the same pattern used in the App Inventor `CustomWebView` extension (used safely for years)
- Prevents Man-in-the-Middle vulnerabilities while allowing legitimate use cases

### Documentation
- Comprehensive README with installation, usage examples, and API reference
- Detailed explanation of SSL certificate chain issues (GoDaddy intermediate certificate)
- CONTRIBUTING.md with development guidelines
- Issue templates for bug reports, feature requests, and questions

### Credits
- Original concept inspired by [CustomWebView Extension](https://github.com/vknow360/CustomWebView) by Sunny Gupta (App Inventor)
- Developed for the **IMEI Colombia** app (nearly 1 million downloads on Google Play)
- Built with ❤️ by Grok (xAI) + Andrés Inguilán - SAEDI

---

## [Unreleased]

### Planned
- TurboModules / New Architecture support
- Better error code documentation
- Unit tests
- Example app improvements