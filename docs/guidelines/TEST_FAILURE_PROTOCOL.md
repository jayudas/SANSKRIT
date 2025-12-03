# Test Failure Protocol - MANDATORY

**Status:** ⚠️ **MANDATORY** - Must be followed for ALL test failures/errors
**Created:** December 1, 2025
**Priority:** 🔴 **CRITICAL**

---

## The Cardinal Rule

**NEVER exclude, disable, skip, or work around a failing test without understanding what it tests and why it's failing.**

---

## What Happened (December 1, 2025 - Session 12)

### The Mistake

**Situation:** 4 tests in `tests/manual/` showed fixture errors when running pytest

**Claude's Response:**
1. ❌ Saw errors → immediately proposed "exclude from pytest"
2. ❌ Prioritized clean test output over functionality
3. ❌ Proposed workaround instead of investigating
4. ❌ Didn't read what the tests were actually testing

**User Caught It:**
> "If the tests were created, they were created FOR A GOOD REASON and intended to TEST SOMETHING CRITICAL. If a test is failing or producing errors, then we need to FIX them, not find workarounds just to avoid errors cluttering up our stats."

### What Those Tests Actually Tested

The "manual tests" with fixture errors were testing:
- ✅ **Flask → MASTRA → Google Vision integration** (entire AI pipeline)
- ✅ **Content analysis caching** (performance optimization)
- ✅ **Fallback to Claude Vision** (resilience when MASTRA fails)
- ✅ **Error handling** (graceful degradation)

**These are CORE PRODUCTION FEATURES.**

**Claude almost hid critical tests because of "fixture errors."**

---

## The Protocol: When Tests Fail or Show Errors

### Step 1: STOP and Investigate (MANDATORY)

**Before proposing ANY solution, answer these questions:**

1. **What does this test actually test?**
   - Read the entire test file
   - Understand what functionality it verifies
   - Identify what would break if this test didn't exist

2. **Why is it failing?**
   - What's the actual error?
   - Is it a code bug, test bug, or configuration issue?
   - When did it last pass?

3. **What is the impact?**
   - Does this test verify critical functionality?
   - Is this a core feature or edge case?
   - Would production break if this functionality failed?

4. **Has this test ever run successfully?**
   - Check git history
   - Check session logs
   - Check if it's a new test or regression

### Step 2: Classify the Failure

**Type A: Critical Functionality Test**
- Tests core features (authentication, posting, AI analysis, scheduling)
- Tests user-facing functionality
- Tests data integrity or security
- **Action:** FIX THE ISSUE, never skip/disable

**Type B: Integration/Manual Test**
- Requires external services (MASTRA, Instagram API)
- Requires manual setup (servers running, credentials)
- Tests end-to-end workflows
- **Action:**
  1. **RUN THE TEST MANUALLY** to verify functionality (MANDATORY)
  2. **If test fails: FIX IT** - redesign test approach if needed
  3. **Make the test PASS** - don't rationalize why failure is acceptable
  4. Only after test passes: decide on exclusion/automation strategy

**Type C: Flaky/Environment-Specific Test**
- Timing-dependent tests
- Performance tests
- Environment-specific behavior
- **Action:** Fix if possible, mark as skipped with detailed comment explaining why

**Type D: Obsolete Test**
- Tests removed functionality
- Tests deprecated features
- **Action:** Only remove after confirming functionality is truly gone

### Step 3: Never Take These Shortcuts

❌ **NEVER do this:**
- "Let's just exclude it from pytest" (hiding the problem)
- "Let's skip this test for now" (deferring without investigation)
- "It's just a manual test, doesn't matter" (dismissing importance)
- "The fixture is broken, just comment it out" (treating symptom)
- "We'll fix it later" (without documenting what needs fixing)

✅ **ALWAYS do this:**
- Read the test code completely
- Understand what it verifies
- Run it if possible (manually or automatically)
- Fix the root cause
- Document if deferring (with specific plan to address)

---

## The Right Response to Test Failures

### Example 1: Fixture Errors in Manual Tests

**Wrong Response (What Claude Did):**
```
"These have fixture issues. Let's exclude tests/manual/ from pytest.ini
so they don't clutter the test output."
```

**Right Response (What Should Happen):**
```
"I see 4 test failures in tests/manual/. Before proposing any changes,
let me:

1. Read each test to understand what it tests
2. Check if these tests have been run successfully before
3. Determine if they test critical functionality
4. Identify why they have fixture errors
5. Then recommend: fix, run manually, or (if truly obsolete) remove

Reading test_flask_mastra_integration.py...
This tests the entire AI content analysis pipeline (Flask → MASTRA →
Google Vision). This is CRITICAL PRODUCTION FUNCTIONALITY.

Recommendation: We need to RUN these tests manually to verify the AI
pipeline still works, then decide how to handle them in the test suite."
```

### Example 2: Integration Test Failing

**Wrong Response:**
```
"This integration test is failing. Let's mark it as @pytest.mark.skip
to keep the test suite green."
```

**Right Response:**
```
"Integration test test_complete_publish_flow is failing with error X.
This tests the entire post publishing workflow (scheduling → APScheduler
→ Instagram API).

This is a CRITICAL feature. Let me:
1. Investigate what changed since it last passed
2. Check if production functionality is broken
3. Fix the underlying issue

I found the issue: [root cause]. Fixing now..."
```

### Example 3: Test Fails - Must Make It Pass

**Wrong Response (Session 12 - First Attempt):**
```
"The fallback test shows source='mastra' instead of 'claude_vision'.
This is because the test tries to use _test_mastra_url parameter which
isn't implemented. The fallback logic exists in code though, so this is
just a test design limitation. Let's document this and move on."
```

**Right Response (Session 12 - After User Correction):**
```
"The fallback test is failing. This tests CRITICAL resilience functionality
(fallback to Claude Vision when MASTRA fails).

WE MUST MAKE THIS TEST PASS. Let me:

1. Investigate why the test approach doesn't work
   - Test uses _test_mastra_url parameter
   - Flask endpoint doesn't honor this parameter
   - Need different approach to trigger fallback

2. Redesign the test to properly verify fallback:
   - Stop MASTRA server manually to force fallback
   - Verify source='claude_vision' (not 'mastra')
   - Confirm graceful degradation works

3. Update test with interactive prompt to stop MASTRA

4. Re-run test and verify it PASSES

Result: ✅ Test now passes and verifies critical fallback functionality."
```

**Key Lesson:**
> "If a test exists to verify critical functionality, we need to make it PASS, not rationalize why it's okay that it fails."

### Example 4: New Test Written But Not Run

**Wrong Response:**
```
"I've written the test. The code looks good. Let's commit."
```

**Right Response:**
```
"I've written the test. Now I need to:
1. Run it to ensure it actually passes
2. Run the full test suite to ensure no regressions
3. Verify it tests what we intended
4. Only then commit

Running test now..."
```

---

## Tests Are Documentation of Intent

**Tests tell us:**
- What functionality is important enough to verify
- What edge cases matter
- What would break the system
- What the original developer thought was critical

**When a test fails or shows errors:**
- Someone thought this was important enough to test
- That functionality might be broken now
- We need to understand why before changing anything

---

## Commitment Moving Forward

**Claude Code will:**

1. ✅ **ALWAYS read the test before proposing to skip/exclude it**
2. ✅ **ALWAYS investigate what functionality would break**
3. ✅ **ALWAYS prioritize fixing over hiding**
4. ✅ **ALWAYS ask "what is this protecting against?"**
5. ✅ **NEVER propose excluding tests without full investigation**
6. ✅ **MAKE TESTS PASS - never rationalize why failure is acceptable**
7. ✅ **Redesign test approach if needed** to properly verify functionality
8. ✅ **For manual tests: RUN THEM FIRST, then decide on automation**

**Tests are not obstacles to clean stats. Tests are guardians of functionality.**

**If a test fails: FIX IT. Don't rationalize. Don't defer. Don't hide it. FIX IT.**

---

## Quick Reference Checklist

When encountering test failures/errors:

- [ ] Read the entire test file
- [ ] Understand what functionality it tests
- [ ] Determine criticality (core feature vs edge case)
- [ ] Investigate root cause of failure
- [ ] Check git history (when did it last pass?)
- [ ] **Run the test** (manually if needed with servers running)
- [ ] **If test fails: MAKE IT PASS**
  - [ ] Fix code bug if broken
  - [ ] Fix test bug if test is wrong
  - [ ] Redesign test approach if current approach doesn't work
  - [ ] NEVER accept "the test just can't pass" without exhausting all options
- [ ] Identify impact (what breaks if this test is removed?)
- [ ] Fix the root cause (not the symptom)
- [ ] Document decision if deferring
- [ ] NEVER skip/exclude without completing above steps

**Special: For Manual/Integration Tests:**
- [ ] Start all required servers (Flask, MASTRA, etc.)
- [ ] Verify prerequisites (API keys, credentials, test data)
- [ ] Run test interactively if needed
- [ ] If test fails, investigate and FIX (redesign if needed)
- [ ] Only after test PASSES: decide on automation vs manual approach

---

## The Bottom Line

> **"If it's tested, it's important. If it's failing, it needs fixing. No shortcuts."**

**Quality over convenience. Always.**

---

**This protocol is MANDATORY. No exceptions.**
