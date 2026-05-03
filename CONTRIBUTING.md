# Contributing to react-native-secure-webview

Thank you for your interest in contributing to **react-native-secure-webview**! This package helps developers stay compliant with Google Play policies while maintaining secure WebView functionality.

---

## 🚀 How to Contribute

### 🐛 Reporting Bugs
1. Check if the issue already exists in the [Issues](https://github.com/anding1111/react-native-secure-webview/issues) section.
2. If not, open a new issue using the **Bug Report** template.
3. Please include:
   - React Native version.
   - Platform (Android/iOS) and OS version.
   - Clear steps to reproduce the issue.
   - Expected vs. actual behavior.
   - Relevant code snippets or screenshots.

### 💡 Suggesting Features
1. Open an issue using the **Feature Request** template.
2. Clearly describe:
   - The problem you're trying to solve.
   - Your proposed solution.
   - Any alternative solutions you've considered.

### 🛠️ Code Contributions
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes.
4. Test on both **Android** and **iOS** whenever possible.
5. Commit your changes using [Conventional Commits](#-commit-message-convention).
6. Push to your fork: `git push origin feature/your-feature-name`.
7. Open a **Pull Request**.

---

## 💻 Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/anding1111/react-native-secure-webview.git
cd react-native-secure-webview

# 2. Install root dependencies
npm install

# 3. Run the example project
cd example
npm install
npx react-native run-android  # or run-ios
```

---

## 🎨 Code Style
To maintain consistency, please follow these guidelines:
- **Use TypeScript**: All new code must be fully typed.
- **Patterns**: Follow existing architectural patterns in the codebase.
- **Documentation**: Add JSDoc comments for any new public APIs or props.
- **Focus**: Keep Pull Requests focused and minimal. Avoid unrelated changes.

---

## 📝 Commit Message Convention
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Type | Description |
| :--- | :--- |
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `test` | Adding missing tests or correcting existing tests |
| `chore` | Changes to the build process or auxiliary tools and libraries |

**Example:** `feat: add support for custom SSL error messages`

---

## ❓ Questions?
Feel free to open an issue with the `Question` label or contact the maintainer.

Thank you for helping make WebView development safer and more compliant! 🚀