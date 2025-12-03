# ESLint Rules for Preventing Module-Level Side Effects

**Version:** 1.0
**Date:** December 1, 2025

---

## Recommended ESLint Configuration

Add these rules to `.eslintrc.json` to automatically detect module-level side effects:

### 1. Install Required Packages

```bash
npm install --save-dev \
  eslint-plugin-react-hooks \
  eslint-plugin-import
```

### 2. Add Rules to `.eslintrc.json`

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "import"
  ],
  "rules": {
    // Prevent module-level side effects
    "no-restricted-syntax": [
      "error",
      {
        "selector": "Program > ExpressionStatement > CallExpression[callee.object.name='usePostStore'][callee.property.name='setState']",
        "message": "Do not call usePostStore.setState() at module level. Move to useEffect inside component."
      },
      {
        "selector": "Program > ExpressionStatement > CallExpression[callee.object.name='useAuthStore'][callee.property.name='setState']",
        "message": "Do not call useAuthStore.setState() at module level. Move to useEffect inside component."
      },
      {
        "selector": "Program > ExpressionStatement > CallExpression[callee.object.name='useChatStore'][callee.property.name='setState']",
        "message": "Do not call useChatStore.setState() at module level. Move to useEffect inside component."
      }
    ],

    // Warn about console.log at module level (debugging only)
    "no-console": ["warn", { "allow": ["warn", "error"] }],

    // Enforce React Hooks rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // Prevent side effect imports
    "import/no-unassigned-import": ["error", {
      "allow": ["**/*.css", "**/*.scss"]
    }]
  }
}
```

### 3. Custom ESLint Plugin (Advanced)

For more comprehensive detection, create a custom ESLint plugin:

**File:** `eslint-local-rules.js` (project root)

```javascript
module.exports = {
  'no-module-level-store-mutations': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow store mutations at module level',
        category: 'Best Practices',
        recommended: true,
      },
      messages: {
        moduleLevelMutation: 'Store mutation at module level detected. Move to useEffect inside component.',
      },
      schema: [],
    },
    create(context) {
      return {
        // Detect: useXxxStore.setState() at module level
        'Program > ExpressionStatement > CallExpression'(node) {
          if (
            node.callee.type === 'MemberExpression' &&
            node.callee.object.name &&
            node.callee.object.name.match(/^use\w+Store$/) &&
            node.callee.property.name === 'setState'
          ) {
            context.report({
              node,
              messageId: 'moduleLevelMutation',
            });
          }
        },
      };
    },
  },
};
```

**Update `.eslintrc.json`:**

```json
{
  "plugins": [
    "eslint-plugin-local-rules"
  ],
  "rules": {
    "local-rules/no-module-level-store-mutations": "error"
  }
}
```

---

## VS Code Integration

### settings.json

Add to `.vscode/settings.json` for real-time feedback:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.rules.customizations": [
    {
      "rule": "no-restricted-syntax",
      "severity": "error"
    },
    {
      "rule": "local-rules/no-module-level-store-mutations",
      "severity": "error"
    }
  ]
}
```

---

## Pre-Commit Hook

Add to `.husky/pre-commit` (using Husky):

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run ESLint on staged files
npx lint-staged

# Custom check for module-level side effects
if git diff --cached --name-only | grep -E '\.(ts|tsx)$' | xargs grep -n "usePostStore.setState\|useAuthStore.setState\|useChatStore.setState" | grep -v "useEffect\|function"; then
  echo "❌ Error: Module-level store mutations detected!"
  echo "Move store.setState() calls inside useEffect or functions."
  exit 1
fi
```

**Install Husky and lint-staged:**

```bash
npm install --save-dev husky lint-staged
npx husky install
```

**Add to `package.json`:**

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## CI/CD Integration

### GitHub Actions

**File:** `.github/workflows/lint.yml`

```yaml
name: Lint

on: [push, pull_request]

jobs:
  eslint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint

      # Custom check for module-level side effects
      - name: Check for module-level store mutations
        run: |
          if grep -rn "usePostStore.setState\|useAuthStore.setState\|useChatStore.setState" frontend/src/ | grep -v "useEffect\|function"; then
            echo "❌ Module-level store mutations detected!"
            exit 1
          fi
```

---

## Testing the Rules

### 1. Create a test file with violations:

**File:** `test-module-level.tsx`

```typescript
import { usePostStore } from '@/store/postStore'

// ❌ Should trigger error
usePostStore.setState({ posts: [] })

export default function Test() {
  return <div>Test</div>
}
```

### 2. Run ESLint:

```bash
npx eslint test-module-level.tsx
```

**Expected output:**
```
test-module-level.tsx
  3:1  error  Do not call usePostStore.setState() at module level. Move to useEffect inside component  no-restricted-syntax

✖ 1 problem (1 error, 0 warnings)
```

---

## Summary

| Tool | Purpose | When It Runs |
|------|---------|--------------|
| ESLint rules | Detect violations in editor | Real-time (VS Code) |
| Pre-commit hook | Block bad commits | Before `git commit` |
| CI/CD lint | Catch violations in PR | Before merge |
| Code review | Manual inspection | PR review |

**All layers combined = Maximum protection!**

---

**Last Updated:** December 1, 2025
