# NEXT SESSION - Handoff Document

**Last Updated:** December 3, 2024 (Session 4)
**Current Phase:** Phase 0 - Foundation (Complete - Protocol Testing Pending)
**Next Phase:** Protocol Validation, then Database Setup & Content Structure
**Latest Log:** `logs/PHASE0_FOUNDATION_LOG.md`

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

### ✅ Completed This Session (Session 4 - Session Start Protocol Refinement)
- **Critical issue identified:** Claude wasn't automatically following MANDATORY SESSION START PROTOCOL
- **Root cause:** Claude sees CLAUDE.md in system context but doesn't explicitly READ it
- **Solution implemented:** User now says "Read CLAUDE.md" to trigger protocol
- **Documentation updated:**
  - CLAUDE.md: Added "FOR USER: SESSION START COMMAND" at very top
  - NEXT_SESSION.md: Added session start instructions (this section)
  - Log file: Documented issue and solution
- **Next:** Test protocol in new session to validate it works

### ✅ Previously Completed (Session 3 - Documentation Optimization)
- **MANDATORY SESSION START PROTOCOL added:** At top of CLAUDE.md to ensure context files are ALWAYS read automatically
- **CLAUDE.md optimized:** Reduced from 45.9k to 33.5k chars (27% reduction) - now under 40k threshold
- **New documentation files created:**
  - `docs/DATABASE_SCHEMA.md` - Complete database schema reference
  - `docs/CONTENT_STRUCTURE.md` - Curriculum mapping and JSON schemas
  - `docs/AUDIO_STRATEGY.md` - Audio sourcing and file specifications
- **Git:** All changes committed (07748a2) and pushed to GitHub
- **Testing:** Build confirmed working

### ✅ Previously Completed (Sessions 1-2)
- Session 2: Project directory restructuring (moved to root level)
- Session 1: Project foundation (Next.js 14, Prisma schema, TypeScript types, guidelines)
- Git repository initialized
- GitHub repository created: **https://github.com/jayudas/SANSKRIT**

### 📊 Current State
- **Repository:** https://github.com/jayudas/SANSKRIT
- **Branch:** main
- **Latest Commit:** 5b99de4 (Project restructuring)
- **All code:** Committed and pushed ✅
- **Uncommitted work:** None
- **Working directory:** Clean
- **Project structure:** Root level (no more subfolder nesting)
- **Tests:** Build ✅ | Dev server ✅

---

## 🚀 Immediate Next Steps

### Step 1: Set Up PostgreSQL Database (30 minutes)

**Why:** Need database running to develop features

**Actions:**
1. Check if PostgreSQL is installed:
   ```bash
   which psql
   ```

2. If not installed, install PostgreSQL:
   ```bash
   # macOS
   brew install postgresql@14
   brew services start postgresql@14
   ```

3. Create database:
   ```bash
   createdb sanskrit_learning
   ```

4. Create environment file:
   ```bash
   cd /Users/johnkitchin/AI/SANSKRIT/packages/database
   cp ../../.env.example .env
   ```

5. Edit `.env` file with database connection:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sanskrit_learning"
   ```
   - Replace `username` with your PostgreSQL username (likely your macOS username)
   - Replace `password` with your PostgreSQL password (may be empty for local dev)

6. Run Prisma migrations:
   ```bash
   npm install
   npm run db:generate
   npm run db:push
   ```

7. Verify database is set up:
   ```bash
   npm run db:studio
   # Opens Prisma Studio - should show empty tables
   ```

**Success Criteria:**
- ✅ Database exists
- ✅ All tables created from Prisma schema
- ✅ Prisma Studio opens and shows tables
- ✅ No connection errors

---

### Step 2: Create Feature Branch for Content Structure (5 minutes)

**Before writing ANY code, create feature branch:**

```bash
git checkout main
git pull origin main
git checkout -b feature/content-structure
```

**Why:** Following Git workflow - NEVER work on main directly

---

### Step 3: Design Content Data Structure (1-2 hours)

**Goal:** Define how curriculum content will be stored and imported

**Tasks:**

1. **Create content directory structure:**
   ```bash
   mkdir -p content/phases/phase-1/month-1/week-1
   mkdir -p content/shared/vocabulary
   mkdir -p content/shared/grammar
   ```

2. **Design JSON schemas:**
   - Lesson content schema
   - Vocabulary entry schema
   - Exercise schema
   - Module metadata schema

3. **Create example files:**
   - `content/phases/phase-1/month-1/week-1/meta.json`
   - `content/phases/phase-1/month-1/week-1/lesson-1.json`
   - `content/shared/vocabulary/example.json`

4. **Create import script:**
   - `scripts/import-content.ts`
   - Script to read JSON files and populate database

**Reference:**
- Source curriculum: `/Users/johnkitchin/AI/SANSKRIT/classical_sanskrit_course.md`
- Start with Month 1, Week 1 content (vowels and basic consonants)

**Success Criteria:**
- ✅ Clear JSON schema defined
- ✅ Example content files created
- ✅ Import script can read files
- ✅ Content populates database correctly

---

### Step 4: Extract Month 1, Week 1 Content (2-3 hours)

**Source:** Classical Sanskrit Course (Month 1, Week 1-2: Vowels and Basic Consonants)

**Extract and structure:**

1. **Lesson Content:**
   - Introduction to 14 vowels
   - First 10 consonants
   - Vowel marks (mātras)

2. **Vocabulary:**
   - Devanagari characters with:
     - Unicode representation
     - Romanization (IAST)
     - Category (vowel/consonant)
     - Audio file path (placeholder initially)

3. **Exercises:**
   - Character recognition (multiple choice)
   - Audio matching
   - Writing practice data

**Output:**
- JSON files in `content/phases/phase-1/month-1/week-1/`
- Ready to import to database

---

## 📝 Important Context for Next Session

### Key Decisions Made
1. **Project structure:** Files now at root level of SANSKRIT/ (no subfolder nesting)
2. **Repository name:** SANSKRIT (shortened, cleaner)
3. **Documentation system:** Phase-based logs in `/logs/` + `NEXT_SESSION.md` handoff
4. **Development approach:** Build Month 1 completely before Month 2
5. **Audio strategy:** Record/source as we build each module

### Files to Review at Session Start
1. **NEXT_SESSION.md** (this file) - Start here for immediate context
2. **logs/PHASE0_FOUNDATION_LOG.md** - Session history (now includes Session 2)
3. **CLAUDE.md** - Full project context and guidelines
4. **SETUP.md** - Database setup instructions

### Git Workflow Reminder
- ⚠️ **ALWAYS** create feature branch before coding
- ⚠️ **NEVER** commit to main directly
- ⚠️ **PUSH** after every phase of work
- ⚠️ **TEST** everything before committing (6-level testing workflow)

### Testing Requirements
- Frontend code: **MUST** have user browser testing before commit
- All code: Follow 6-level testing workflow
- No exceptions, no shortcuts

---

## 🎓 What We're Building Next

**Phase 1A Goal:** Month 1, Week 1-2 Devanagari Script Lessons

**Features to build:**
1. Lesson viewer component
2. Devanagari character display
3. Audio player component
4. Character recognition exercises
5. Progress tracking (basic)

**Order of development:**
1. Database setup ← **START HERE**
2. Content structure
3. Content import
4. Core UI components
5. Lesson viewer
6. Audio integration

---

## 🔧 Commands Quick Reference

```bash
# Start database (if not running)
brew services start postgresql@14

# Check database
psql -l | grep sanskrit

# Start dev server
npm run dev

# Create feature branch
git checkout -b feature/name

# Run Prisma Studio
cd packages/database && npm run db:studio

# View current branch
git branch

# Check git status
git status
```

---

## ⚠️ Critical Reminders

1. **Read CLAUDE.md** - Contains all project context and mandatory workflows
2. **Create feature branch** - Before writing any code
3. **Follow testing workflow** - 6 levels, every commit
4. **Push frequently** - After every phase
5. **Update this file** - At end of next session

---

## 📂 Updated Project Structure (After Migration)

```
SANSKRIT/                           # Root directory (clean!)
├── apps/
│   └── web/                        # Next.js 14 application
├── packages/
│   ├── database/                   # Prisma schema
│   └── types/                      # Shared TypeScript types
├── docs/
│   └── guidelines/                 # 10 development guideline files
├── logs/
│   └── PHASE0_FOUNDATION_LOG.md   # Session history
├── classical_sanskrit_course.md    # 24-month curriculum
├── CLAUDE.md                       # Project context (44KB)
├── README.md
├── SETUP.md
├── GITHUB_SETUP.md
├── NEXT_SESSION.md                # This file
└── package.json
```

---

**Ready to begin database setup and content structuring!**

**Next session starts with:** Database setup (Step 1 above)

**Session 2 complete:** Project restructuring ✅
