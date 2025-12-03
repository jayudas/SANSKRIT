# Module-Level Code Guidelines

**Version:** 1.0
**Date:** December 1, 2025
**Status:** MANDATORY

---

## Rule: Never Use Module-Level Side Effects

### ⚠️ CRITICAL RULE

**NEVER write code at module level that:**
- Mutates global state (Zustand stores, Redux, etc.)
- Makes API calls
- Modifies the DOM
- Sets timers/intervals
- Performs I/O operations

### Why This Matters

Module-level code executes **immediately when the file is imported**, not when:
- The component renders
- The route is visited
- The function is called

This creates **invisible side effects** that are extremely hard to debug.

---

## Examples

### ❌ BAD: Module-Level Side Effects

```typescript
// DashboardTestPage.tsx (WRONG)
import { usePostStore } from '@/store/postStore'

const mockData = [...]

// ⚠️ DANGER: This runs when file is imported!
usePostStore.setState({
  posts: mockData,
  fetchPosts: async () => console.log('Mocked'),
})

export default function DashboardTestPage() {
  // Component code...
}
```

**Problem:** Any file that imports this (even indirectly) will execute the `setState` call, polluting the global store.

### ✅ GOOD: Side Effects in useEffect

```typescript
// DashboardTestPage.tsx (CORRECT)
import { useEffect } from 'react'
import { usePostStore } from '@/store/postStore'

const mockData = [...] // Constants are fine

export default function DashboardTestPage() {
  useEffect(() => {
    // ✅ SAFE: Only runs when component mounts
    usePostStore.setState({
      posts: mockData,
      fetchPosts: async () => console.log('Mocked'),
    })

    // Cleanup: restore original state when unmounting
    return () => {
      usePostStore.setState({
        posts: [],
        fetchPosts: originalFetchPosts, // Restore original
      })
    }
  }, [])

  return <div>...</div>
}
```

**Benefits:**
- Only executes when component mounts
- Can clean up on unmount
- Scoped to component lifecycle
- Easy to debug with React DevTools

### ✅ BETTER: Isolated Test Utilities

```typescript
// utils/testHelpers.ts
export function setupMockPostStore() {
  const mockData = [...]
  usePostStore.setState({
    posts: mockData,
    fetchPosts: async () => console.log('Mocked'),
  })
}

export function resetMockPostStore() {
  usePostStore.setState({
    posts: [],
    // Restore original fetchPosts from initial state
  })
}

// DashboardTestPage.tsx
import { useEffect } from 'react'
import { setupMockPostStore, resetMockPostStore } from '@/utils/testHelpers'

export default function DashboardTestPage() {
  useEffect(() => {
    setupMockPostStore()
    return () => resetMockPostStore()
  }, [])

  return <div>...</div>
}
```

---

## What IS Safe at Module Level

### ✅ Safe Module-Level Code

```typescript
// Constants
export const API_URL = 'https://api.example.com'
export const MAX_RETRIES = 3

// Type definitions
export interface User {
  id: number
  name: string
}

// Pure functions (no side effects)
export function formatDate(date: Date): string {
  return date.toISOString()
}

// Class definitions
export class UserManager {
  constructor() {
    // This is fine - constructor only runs when `new UserManager()` is called
  }
}

// Component definitions
export default function MyComponent() {
  // This is fine - function is defined but not executed until rendered
  return <div>Hello</div>
}
```

---

## Testing Best Practices

### For Test Pages (like DashboardTestPage)

1. **Use `useEffect` for setup:**
   ```typescript
   useEffect(() => {
     setupTestData()
     return () => cleanupTestData()
   }, [])
   ```

2. **Or use lazy imports:**
   ```typescript
   // App.tsx
   const DashboardTestPage = lazy(() => import('./pages/DashboardTestPage'))
   ```
   - This delays import until route is visited
   - But still doesn't solve module-level side effects!

3. **Or separate test routes into a separate app:**
   ```
   src/
     main.tsx          # Production app
     test-app.tsx      # Test-only app (not imported by main)
   ```

### For Mock Data

1. **Keep mock data in separate files that aren't auto-imported:**
   ```typescript
   // utils/testData.ts
   export const mockPosts = [...] // Just data, no side effects

   // DashboardTestPage.tsx
   import { mockPosts } from '@/utils/testData'

   useEffect(() => {
     usePostStore.setState({ posts: mockPosts })
   }, [])
   ```

2. **Use functions instead of immediate execution:**
   ```typescript
   // utils/testData.ts
   export function initMockData() {
     usePostStore.setState({ posts: [...] })
   }

   // DashboardTestPage.tsx
   useEffect(() => {
     initMockData() // Explicitly called, not automatic
   }, [])
   ```

---

## Code Review Checklist

When reviewing code, check for:

- [ ] No `setState`, `dispatch`, or store mutations at module level
- [ ] No API calls outside functions/hooks
- [ ] No `console.log` in production code at module level (debugging only)
- [ ] Test pages use `useEffect` for setup/teardown
- [ ] Mock data utilities are functions, not auto-executing code

---

## Real-World Example: The Bug We Found

**File:** `frontend/src/pages/DashboardTestPage.tsx`

**Lines 112-120:**
```typescript
// ❌ WRONG: Module-level store mutation
usePostStore.setState({
  scheduledPosts: mockScheduledPosts,
  publishedPosts: mockPublishedPosts,
  fetchPosts: async () => {
    console.log('[TEST] Skipping API call - using mock data')
  },
})
```

**Impact:**
- `App.tsx` imported this file (line 11)
- Store was polluted with mock data immediately
- Real dashboard showed 3 mock posts instead of 2 real posts
- `fetchPosts` was replaced with no-op function
- Took 3+ hours to debug

**Fix:** Commented out import in `App.tsx`

**Better fix:** Move to `useEffect`:
```typescript
export default function DashboardTestPage() {
  useEffect(() => {
    const originalFetchPosts = usePostStore.getState().fetchPosts

    usePostStore.setState({
      scheduledPosts: mockScheduledPosts,
      publishedPosts: mockPublishedPosts,
      fetchPosts: async () => {
        console.log('[TEST] Skipping API call - using mock data')
      },
    })

    return () => {
      // Restore original state on unmount
      usePostStore.setState({
        scheduledPosts: [],
        publishedPosts: [],
        fetchPosts: originalFetchPosts,
      })
    }
  }, [])

  return <div>...</div>
}
```

---

## Additional Resources

- [React useEffect Documentation](https://react.dev/reference/react/useEffect)
- [JavaScript Modules (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Zustand Best Practices](https://github.com/pmndrs/zustand)

---

---

## Implementation Status

### ✅ Completed
- **Documentation:** This guideline document created
- **Error documentation:** MODULE_LEVEL_SIDE_EFFECTS_BUG.md created
- **CLAUDE.md updated:** Added as CRITICAL guideline
- **Bug fixed:** DashboardTestPage import disabled in App.tsx

### 📋 Planned (Next Session)
- **ESLint rules:** Automated detection of violations
- **Pre-commit hooks:** Block bad commits before they happen
- **Verification tests:** Ensure protection works end-to-end

### 🔮 Future
- **CI/CD integration:** GitHub Actions workflow
- **Test page isolation:** Separate directory and app
- **Architectural separation:** Physical isolation of test code

---

**Last Updated:** December 1, 2025 (Session 8)
**Review:** Annually or after any module-level bugs
**Next Steps:** Implement ESLint rules and pre-commit hooks (Session 9)
