# NEXT SESSION - Handoff Document

**Last Updated:** December 3, 2024 (Session 6 - UI Components & Classical Pronunciation)
**Current Phase:** Phase 1A - Month 1, Week 1 Implementation (IN PROGRESS)
**Next Phase:** Continue consonants and complete Week 1 content
**Latest Log:** `logs/PHASE0_FOUNDATION_LOG.md` (see Session 6)

---

## 🚨 IMPORTANT: HOW TO START THE NEXT SESSION 🚨

**When you start the next session, your FIRST message to Claude should be:**

```
Read CLAUDE.md
```

**This will trigger Claude to:**
1. Read CLAUDE.md explicitly with the Read tool
2. See the MANDATORY SESSION START PROTOCOL
3. Automatically read NEXT_SESSION.md (this file)
4. Automatically read the latest log file
5. Confirm context and ask what to do next

**You should see Claude use the Read tool 3 times before responding.**

---

## 🎯 Where We Are

### ✅ Completed This Session (Session 6)

**MAJOR ACCOMPLISHMENT: Classical Pronunciation Foundation Established**

This was a CRITICAL session that established the foundational approach for the entire course:

1. ✅ **Classical Pronunciation System Implemented**
   - User requested reconstructed classical Sanskrit pronunciation (~500 BCE-500 CE)
   - NOT modern Indian tradition influenced by Hindi/regional languages
   - All 14 vowels updated with correct classical IPA values
   - Comprehensive documentation created

2. ✅ **UI Components Complete**
   - DevanagariText component (Sanskrit character display)
   - AudioPlayer component (inline and full variants)
   - Card and Button components (multiple variants)
   - LessonViewer component (comprehensive lesson display)
   - All tested in browser (Safari) and working

3. ✅ **Real Curriculum Content Extracted**
   - All 14 vowels with proper classical pronunciation
   - Complete lesson structure with examples
   - Fixed "13 vowel" bug (now showing all 14)

4. ✅ **Comprehensive Documentation**
   - PRONUNCIATION_PHILOSOPHY.md - Why classical, comparison chart
   - CLASSICAL_PHONEME_INVENTORY.md - All 47 phonemes documented
   - UI_COMPONENTS_TEST_RESULTS.md - Complete testing documentation

### 📊 Current State

**Repository:** https://github.com/jayudas/SANSKRIT
**Branch:** feature/ui-components
**Latest Commits:**
- 66cdf23: UI components
- 5a6ef57: Classical pronunciation system
**Uncommitted Work:** None
**Working Directory:** Clean
**All Changes Pushed:** ✅

**Database:**
- Name: sanskrit_learning
- Status: Running and operational
- Tables: 16 tables
- Content: 1 lesson with all 14 vowels (classical pronunciation)

**Dev Server:**
- Running on: http://localhost:3000
- Status: Active (may need restart in new session)

---

## 🚀 Immediate Next Steps

**Next session should focus on: CONSONANTS**

### Step 1: Extract First 10 Consonants (Month 1, Week 1)

From curriculum: "first 10 consonants (क-त series)"

**Tasks:**
1. Read CLASSICAL_PHONEME_INVENTORY.md to understand classical consonant pronunciation
2. Extract ka-varga (क ख ग घ ङ) and ca-varga (च छ ज झ ञ) - that's 10 consonants
3. Create lesson-2-consonants.json with:
   - Classical IPA values (e.g., क /k/, ख /kʰ/, च /c/ or /tɕ/, etc.)
   - Clear pronunciation guides
   - Notes explaining classical vs. modern (especially च/छ/ज/झ palatals)
   - Example words for each consonant
   - Audio file paths (placeholder)

**Important Classical Pronunciation Points for Consonants:**
- Aspiration: ख /kʰ/, छ /cʰ/, etc. - strong puff of air
- Palatals: च छ ज झ - may be true palatal stops [c ɟ] not affricates
- All distinctions maintained (no mergers like modern)

### Step 2: Import Consonant Lesson

```bash
npm run import:content -- --phase 1 --month 1 --week 1
```

### Step 3: Test in Browser

Verify consonants display with classical pronunciation notes.

### Step 4: Commit and Push

Follow ABSOLUTE BLOCKER checklist (all 6 testing levels).

---

## 📝 Important Context for Next Session

### CRITICAL: Classical Pronunciation Standard

**This is now the FOUNDATIONAL approach for the entire course.**

All future content MUST follow classical pronunciation:
- Use IPA values from CLASSICAL_PHONEME_INVENTORY.md
- Add notes explaining classical vs. modern where relevant
- Reference PRONUNCIATION_PHILOSOPHY.md for rationale
- All audio must be classical pronunciation (when sourced)

**Key Differences to Remember:**
- Short 'a': /ɐ/ not /ə/
- Tense i/u: /i/ /u/ not lax
- No schwa deletion
- Sibilants: Three-way distinction (श /ɕ/, ष /ʂ/, स /s/)
- True retroflexes

### Git Workflow

**Current Branch:** feature/ui-components
- Has UI components + classical pronunciation
- Ready for more content commits

**When to Create New Branch:**
- If starting a significantly different feature
- Otherwise, continue on feature/ui-components

### Database Connection

```env
DATABASE_URL="postgresql://johnkitchin@localhost:5432/sanskrit_learning"
```

Location: `.env` and `packages/database/.env`

### Key Commands

```bash
# Check if server is running (ALWAYS do this first!)
lsof -ti:3000

# Start dev server (if not running)
npm run dev

# Import content
npm run import:content -- --phase 1 --month 1 --week 1

# Build project
npm run build

# Check database
psql -d sanskrit_learning -c "SELECT * FROM lessons;"

# TypeScript check
npx tsc --noEmit
```

---

## 🔧 Technical Details

### Pronunciation Documentation

**Location:** `docs/`
- `PRONUNCIATION_PHILOSOPHY.md` - Why classical, comparison chart, references
- `CLASSICAL_PHONEME_INVENTORY.md` - All 47 phonemes with IPA, descriptions

**Usage:**
- Reference these when creating ANY content with pronunciation
- Copy IPA values directly from CLASSICAL_PHONEME_INVENTORY.md
- Add notes from PRONUNCIATION_PHILOSOPHY.md where helpful

### Content Structure

```
content/phases/phase-1/month-1/week-1/
├── meta.json
├── lesson-1-complete-vowels.json (✅ COMPLETE - classical pronunciation)
├── lesson-2-consonants.json (🔄 NEXT - to be created)
├── exercises.json
└── vocabulary.json
```

### UI Components Available

All ready to use:
- `<DevanagariText>` - Display Sanskrit characters
- `<AudioPlayer>` - Play audio (inline or full variant)
- `<Card>`, `<Button>` - Basic UI
- `<LessonViewer>` - Displays lessons automatically

### Browser Testing (Safari)

User uses Safari as primary browser. Remember:
- Cache clearing: `Command + Option + E`
- Hard refresh: `Command + R`
- May need to restart dev server to force database re-fetch

---

## 🚨 CRITICAL REMINDERS

### 1. BEFORE EVERY COMMIT - ABSOLUTE BLOCKER

**STOP** and verify ALL 8 questions are "YES":
1. ✅ Level 1: Build Compilation?
2. ✅ Level 2: Dev Server Startup?
3. ✅ Level 3: Runtime Error Check?
4. ✅ Level 4: Component/Feature Testing?
5. ✅ Level 5: Integration Testing?
6. ✅ Level 6: Documentation?
7. ✅ Frontend: USER browser testing confirmed?
8. ✅ Read Pre-Commit Checklist?

**Location:** CLAUDE.md section 10, PRE_COMMIT_CHECKLIST.md

### 2. Test Failure Protocol

If ANY test fails:
- DO NOT skip or exclude
- READ the test to understand what it protects
- FIX the root cause
- See: docs/guidelines/TEST_FAILURE_PROTOCOL.md

### 3. Server Management

**ALWAYS check if server is running before starting new one:**
```bash
lsof -ti:3000
```

If running, ask user whether to use existing or restart.

### 4. Classical Pronunciation

**ALL content must use classical pronunciation.**
- Reference: CLASSICAL_PHONEME_INVENTORY.md
- Philosophy: PRONUNCIATION_PHILOSOPHY.md
- Add notes explaining classical vs. modern

---

## 📚 Files to Review Before Starting

1. **NEXT_SESSION.md** (this file) - Start here
2. **logs/PHASE0_FOUNDATION_LOG.md** - Session 6 details
3. **docs/PRONUNCIATION_PHILOSOPHY.md** - Classical pronunciation rationale
4. **docs/CLASSICAL_PHONEME_INVENTORY.md** - Phoneme reference
5. **CLAUDE.md** - Full project context (especially ABSOLUTE BLOCKER)

---

## 🎓 What We're Building Next

**Month 1, Week 1 Remaining Content:**

1. **Consonants Lesson** (NEXT - Priority 1)
   - First 10 consonants: ka-varga (5) + ca-varga (5)
   - Classical pronunciation with IPA
   - Examples for each
   - Notes on aspiration, palatals, etc.

2. **Vowel Marks (Mātṛkās)** (Priority 2)
   - How vowels combine with consonants
   - Visual examples
   - Practice exercises

3. **Additional Exercises** (Priority 3)
   - Consonant recognition
   - Writing practice
   - Audio matching (when audio available)

4. **Vocabulary** (Priority 4)
   - Basic words using learned letters
   - With classical pronunciation

---

## ⚠️ Lessons Learned This Session

1. **Browser caching in Safari** - Different from Chrome/Firefox. Use `Cmd+Opt+E` to clear cache, may need server restart.

2. **Multiple lesson versions** - Import script can create duplicates. Clean up by deleting old lessons before final testing.

3. **Classical pronunciation is foundational** - This decision affects EVERYTHING. All future content must be consistent.

4. **IAST already implemented** - Proper transliteration (ṛ, ā, ṇ, ś, etc.) already working throughout.

5. **User confirmation critical** - For browser testing, always wait for user to confirm what they see before proceeding.

---

## 🎯 Success Criteria for Next Session

**Before ending next session:**
- [ ] Consonants lesson created with classical pronunciation
- [ ] All code tested (6 levels)
- [ ] User browser testing confirmed
- [ ] All code committed and pushed
- [ ] Session log updated
- [ ] NEXT_SESSION.md updated
- [ ] No uncommitted work (unless documented with reason)

---

## 📊 Project Progress

**Overall Progress:** ~20% of Phase 1A (Month 1, Week 1)

**Completed:**
- ✅ Project infrastructure
- ✅ Database setup
- ✅ UI components
- ✅ Classical pronunciation foundation
- ✅ All 14 vowels

**In Progress:**
- 🔄 Consonants (0 of 33)
- 🔄 Vowel marks
- 🔄 Exercises
- 🔄 Vocabulary

**Not Started:**
- ⏳ Audio files
- ⏳ Week 2-4 content
- ⏳ Progress tracking
- ⏳ Flashcard system

---

**Ready for next session!** 🚀

**Next session starts with:** User says "Read CLAUDE.md" → Extract and implement consonants with classical pronunciation

**Session 6 complete** ✅
