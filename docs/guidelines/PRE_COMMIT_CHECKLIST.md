# ⛔️ ABSOLUTE BLOCKER: Pre-Commit Checklist ⛔️

**Status:** 🚨 **ABSOLUTE BLOCKER** - STOP before EVERY git commit
**Created:** November 25, 2025
**Last Updated:** December 3, 2024

---

## 🚨 STOP - READ THIS BEFORE TYPING `git commit` 🚨

**YOU ARE ABOUT TO COMMIT CODE. BEFORE YOU DO:**

1. **STOP** - Do not proceed with commit yet
2. **READ** this entire checklist
3. **VERIFY** every single item is checked
4. **IF ANY ITEM IS UNCHECKED** → Stop, complete it, then return
5. **ONLY WHEN ALL ITEMS CHECKED** → Proceed with commit

---

## Purpose

**This checklist exists to prevent commits that violate the testing workflow.**

**Why it was created:**
- **Session 6 (SMS):** Claude Code skipped mandatory user browser testing and committed untested frontend code
- **Session 5 (SANSKRIT):** Claude Code committed content structure WITHOUT running ANY of the 6 testing levels
- These violations required remediation and wasted time

**Absolute Rule:** Before running `git commit`, Claude Code MUST answer "YES" to EVERY question below.

---

## ⛔️ MANDATORY PRE-COMMIT GATE - ANSWER EVERY QUESTION ⛔️

**Type "YES" or "NO" for each question. If ANY answer is "NO", DO NOT COMMIT.**

```
QUESTION 1: Did I complete Level 1 (Build Compilation)?
            (npm run build / pytest / tsc)
Answer: ____

QUESTION 2: Did I complete Level 2 (Dev Server Startup)?
            (Verified server starts without errors)
Answer: ____

QUESTION 3: Did I complete Level 3 (Runtime Error Check)?
            (Checked console, no errors on load)
Answer: ____

QUESTION 4: Did I complete Level 4 (Component/Feature Testing)?
            (ALL features tested and working)
            For frontend: USER confirmed browser testing passed
Answer: ____

QUESTION 5: Did I complete Level 5 (Integration Testing)?
            (No regressions, works with existing code)
Answer: ____

QUESTION 6: Did I complete Level 6 (Documentation)?
            (Test results documented)
Answer: ____

QUESTION 7: For frontend code: Did USER explicitly confirm testing passed?
            (If not frontend code, answer YES)
Answer: ____

QUESTION 8: Did I read this entire Pre-Commit Checklist document?
Answer: ____

---

COUNT YOUR "YES" ANSWERS: ____

REQUIRED "YES" COUNT: 8

IF COUNT < 8: STOP - DO NOT COMMIT
IF COUNT = 8: PROCEED WITH COMMIT
```

---

## 🚨 MANDATORY Pre-Commit Checklist 🚨

### Before EVERY `git commit` command, Claude Code MUST confirm:

#### 1. Code Type Check
- [ ] **Identify code type:** Is this backend code, frontend code, or both?

#### 2. Testing Level Completion (ALL 6 Levels)

##### ✅ Level 1: Build Compilation
- [ ] Code compiles without errors
- [ ] No TypeScript/ESLint errors
- [ ] Build command succeeded

##### ✅ Level 2: Dev Server Startup
- [ ] Dev server starts cleanly
- [ ] No startup errors
- [ ] Server runs without crashes

##### ✅ Level 3: Runtime Error Check
- [ ] No console errors when app loads
- [ ] No warnings about missing dependencies
- [ ] Runtime is clean

##### ✅ Level 4: Component/Feature Testing

**For Backend Code:**
- [ ] All pytest tests pass
- [ ] Coverage meets threshold (80%+)
- [ ] New code is tested

**For Frontend Code:** ⚠️ **CRITICAL - CANNOT SKIP**
- [ ] **USER has tested in browser** ✋ **BLOCKER**
- [ ] Claude Code provided testing checklist to user
- [ ] Claude Code WAITED for user confirmation
- [ ] User explicitly confirmed: "all tests passed" or "everything works"
- [ ] All user-reported issues fixed and re-tested
- [ ] **NO FRONTEND CODE COMMITS WITHOUT USER CONFIRMATION**

##### ✅ Level 5: Integration Testing
- [ ] New code works with existing code
- [ ] No regressions detected
- [ ] Common workflows still work

##### ✅ Level 6: Documentation
- [ ] Code changes documented
- [ ] Test results documented
- [ ] Any errors/issues documented

#### 3. Git Workflow Compliance
- [ ] Working on feature branch (not main)
- [ ] Branch name follows convention
- [ ] Commit message follows conventional commits format
- [ ] Only related changes staged (no unrelated files)

#### 4. Final Verification
- [ ] All tests passing (backend AND frontend)
- [ ] No TODO comments left for critical issues
- [ ] No console.log() debugging statements left in code
- [ ] No commented-out code blocks (unless intentional)

---

## 🛑 BLOCKERS - Cannot Commit If:

1. **Frontend code without user browser verification** ❌
   - User has NOT tested in browser
   - User has NOT confirmed it works
   - **Action:** STOP. Wait for user testing.

2. **Any test failures** ❌
   - Backend tests failing
   - Frontend tests failing
   - Build failing
   - **Action:** Fix tests before committing

3. **Console errors or warnings** ❌
   - Runtime errors in console
   - Unresolved warnings
   - **Action:** Fix errors before committing

4. **Missing documentation** ❌
   - No testing documentation for complex changes
   - No error documentation for bugs fixed
   - **Action:** Document before committing

---

## How Claude Code MUST Use This Checklist

### Before Every `git commit` Command:

1. **STOP** ✋
2. **Open this checklist** (mentally review or read file)
3. **Go through EVERY checkbox**
4. **If ANY checkbox is unchecked:**
   - ❌ DO NOT commit
   - Complete the missing step
   - Return to checklist
5. **Only when ALL checkboxes are checked:**
   - ✅ Proceed with `git commit`

### Example of Correct Process:

```
Claude: "I've written the ErrorBoundary component and unit tests.
        Before committing, let me check the pre-commit checklist."

Claude: "Checklist review:
        ✅ Level 1: Build compiles
        ✅ Level 2: Server starts
        ✅ Level 3: No runtime errors
        ⚠️ Level 4: This is FRONTEND code - requires USER browser testing

        I cannot proceed to commit. I need you to test this in the browser first."

Claude: "Please test the following in your browser:
        1. Start dev server: npm run dev
        2. Trigger an error to see ErrorBoundary
        3. Verify toast notifications work
        4. Confirm test mode is restricted to dev only

        Please let me know when you've verified everything works."

[WAITS FOR USER CONFIRMATION]

User: "Tested everything. All working correctly."

Claude: "Thank you for confirming. Now I can complete the checklist:
        ✅ Level 4: User confirmed browser testing passed
        ✅ Level 5: Integration testing passed
        ✅ Level 6: Documentation complete

        All checklist items complete. Proceeding with git commit."
```

### Example of WRONG Process (What Happened in Session 6):

```
❌ Claude: "Tests passing. Build successful. Committing now."
   [SKIPS checklist entirely]
   [SKIPS user browser testing]
   [Commits untested frontend code]
```

**This MUST NEVER happen again.**

---

## Special Case: Frontend Code

**EVERY frontend commit MUST answer YES to this question:**

> "Has the user tested this code in their browser and confirmed it works?"

**If answer is NO:**
- ❌ DO NOT commit
- ❌ DO NOT proceed
- ❌ DO NOT skip this step "to save time"
- ✅ WAIT for user testing
- ✅ Fix any issues user finds
- ✅ ONLY commit after user confirmation

**Why:** Automated tests CANNOT catch:
- Visual bugs (layout, colors, styling)
- Interaction bugs (clicks, hovers, animations)
- Browser-specific issues
- CSS framework issues (like Tailwind v4 breaking in Session 4)
- Integration issues between components
- Accessibility issues

**Session 4 proof:** User caught 3 bugs automated tests missed.

**Session 6 failure:** Claude Code committed ErrorBoundary and toast notifications without user verification.

---

## Accountability

**This checklist is:**
- ✅ Mandatory for every commit
- ✅ Non-negotiable
- ✅ No exceptions
- ✅ No shortcuts

**Claude Code is responsible for:**
- ✅ Reviewing this checklist before every commit
- ✅ Completing all items
- ✅ Waiting for user verification when required
- ✅ NOT committing until checklist is complete

**User is responsible for:**
- ✅ Testing in browser when asked
- ✅ Reporting any issues found
- ✅ Confirming when testing passes

---

## How to Enforce This

### For Claude Code:
1. Before typing `git commit`, mentally recall: "Have I checked the pre-commit checklist?"
2. If uncertain, read this file
3. If ANY item not completed, STOP and complete it
4. Only commit when ALL items checked

### For User:
1. If Claude Code commits frontend code without asking you to test: **Call it out immediately**
2. If Claude Code skips testing workflow: **Stop and remind about MANDATORY testing**
3. If bugs appear in production: **Review what testing was skipped**

---

## Success Criteria

**This checklist is working when:**
- ✅ No frontend code committed without user browser testing
- ✅ No commits with failing tests
- ✅ No commits with console errors
- ✅ All commits follow testing workflow
- ✅ Quality remains high
- ✅ Production bugs decrease

**This checklist has failed when:**
- ❌ Frontend code committed without user testing
- ❌ Commits made with test failures
- ❌ Commits made with errors
- ❌ Bugs reach production that testing should have caught

---

## Revision History

- **2025-11-25:** Initial creation after Session 6 testing workflow violation

---

**Remember:** The few minutes to complete this checklist saves hours of debugging later.

**No exceptions. No shortcuts. Quality first, always.**
