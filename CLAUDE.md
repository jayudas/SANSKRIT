# CLAUDE.md - Sanskrit Learning Platform

## Project Context Document
**Last Updated:** December 3, 2024 (Session 4 - Refined Session Start Protocol)
**Project Status:** Foundation Complete - Ready for Component Development

---

## 🚨 FOR USER: SESSION START COMMAND 🚨

**⚠️ AT THE START OF EVERY NEW SESSION, YOUR FIRST MESSAGE TO CLAUDE SHOULD BE:**

```
Read CLAUDE.md
```

**This command will trigger Claude to:**
1. ✅ Use the Read tool to explicitly read the entire CLAUDE.md file
2. ✅ See and follow the MANDATORY SESSION START PROTOCOL below
3. ✅ Automatically read NEXT_SESSION.md and the latest log file
4. ✅ Confirm full context and ask: "What would you like me to do next?"

**Why this works:**
- Forces Claude to explicitly READ the file (not just see it in system context)
- Triggers Claude to follow the protocol inside
- Simple, verifiable, foolproof
- No ambiguity or missed steps

**You should see Claude use the Read tool 3 times:**
1. Read CLAUDE.md
2. Read NEXT_SESSION.md
3. Read latest log file

---

## 🚨 CRITICAL: MANDATORY SESSION START PROTOCOL (FOR CLAUDE) 🚨

**⚠️ AT THE START OF EVERY NEW SESSION, BEFORE DOING ANYTHING ELSE:**

### STEP 1: READ SESSION CONTEXT (MANDATORY - NO EXCEPTIONS)

**YOU MUST AUTOMATICALLY READ THESE FILES IN THIS ORDER:**

1. **`NEXT_SESSION.md`** (read FIRST - immediate context and next steps)
   ```
   Read file: /Users/johnkitchin/AI/SANSKRIT/NEXT_SESSION.md
   ```

2. **Current log file based on development phase** (AUTOMATIC - determined from NEXT_SESSION.md)
   ```
   After reading NEXT_SESSION.md, check "Latest Log:" field
   Read that specific log file (e.g., logs/M1A_LOG.md)

   Log file naming convention:
   - Phase 0 (Infrastructure): PHASE0_FOUNDATION_LOG.md
   - Month-based development: M1A_LOG.md, M1B_LOG.md, M2A_LOG.md, etc.
     Format: M{month}{module}_LOG.md where module is A, B, C, D...
     - M1A = Month 1, Module A (typically weeks 1-2)
     - M1B = Month 1, Module B (typically weeks 3-4)
     - M2A = Month 2, Module A
     - M2B = Month 2, Module B
   ```

   **IMPORTANT:** Always use the log file specified in NEXT_SESSION.md - it tells you which phase you're in!

**DO NOT:**
- ❌ Wait for user to tell you to read these files
- ❌ Ask if you should read them
- ❌ Skip them because you "remember" from previous sessions
- ❌ Read only partial content

**DO:**
- ✅ AUTOMATICALLY read both files at session start
- ✅ Read ENTIRE files (use chunks if needed for large files)
- ✅ THEN ask user: "What would you like me to do next?"

**WHY THIS MATTERS:**
- Each Claude session has NO memory of previous sessions
- NEXT_SESSION.md contains critical handoff information
- Log files document decisions and context you MUST know
- Skipping this causes confusion, repeated work, and mistakes

**THIS IS THE #1 RULE - NEVER FORGET THIS!**

---

## 1. Project Overview

### What We're Building
An interactive web-based application for teaching Classical Sanskrit to English speakers, based on a comprehensive 24-month curriculum. The platform will feature:

- **Interactive Lessons** - Structured learning modules with text, audio, and visual content
- **Flashcard System** - Spaced repetition (SRS) for vocabulary retention
- **Devanagari Script Practice** - Canvas-based character writing practice
- **Grammar Drills** - Interactive exercises for declensions, conjugations, sandhi rules
- **Progress Tracking** - Comprehensive analytics and achievement system
- **Audio Integration** - Pronunciation examples for all phonetic elements
- **Quiz Engine** - Multiple exercise types (multiple choice, fill-blank, matching, etc.)

### Why This Approach
The project owner is an American English speaker who wants to learn Classical Sanskrit using the comprehensive curriculum document (`classical_sanskrit_course.md` in parent directory). The curriculum is excellent but needs:

1. **Interactivity** - Transform static text into engaging, hands-on learning
2. **Progressive Structure** - Build month-by-month, testing each module thoroughly
3. **Audio Resources** - Record/source audio as we build each section
4. **Spaced Repetition** - Implement proven SRS algorithms for vocabulary retention
5. **Immediate Feedback** - Real-time validation and explanation of exercises

### Development Philosophy
- **Incremental Development** - Build and complete Month 1 before moving to Month 2
- **Quality Over Speed** - Each module should be thorough and polished
- **Audio as We Go** - Source/record pronunciation for each section before moving on
- **User-Tested** - Owner will use each module to verify effectiveness
- **Local-First** - Development environment on local machine, deployment later

### Target User
- **Primary**: Project owner (intermediate web dev, beginner Sanskrit learner)
- **Future**: Other English speakers learning Classical Sanskrit
- **Age Range**: Adults with self-directed learning discipline
- **Technical Level**: Comfortable with web interfaces, no programming required

---

## 2. Technical Architecture

### Technology Stack

**Frontend/Backend (Full-Stack)**
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components + Radix UI primitives (planned)
- **State Management**: Zustand for client state, React Query for server state
- **Animation**: Framer Motion

**Database**
- **DBMS**: PostgreSQL 14+
- **ORM**: Prisma
- **Local Development**: Local PostgreSQL instance
- **Migrations**: Prisma Migrate

**Audio**
- **Playback**: Howler.js
- **Storage**: Local filesystem during development
- **Format**: MP3 (128kbps) and WebM

**Development Tools**
- **Monorepo**: Turborepo
- **Package Manager**: npm
- **Version Control**: Git
- **Node Version**: 18+

### Why These Choices

**Next.js 14**
- Full-stack framework (frontend + API routes)
- Excellent developer experience
- Built-in optimization (images, fonts, code splitting)
- Easy deployment when ready
- App Router for modern React patterns

**TypeScript**
- Type safety critical for complex data structures (declensions, conjugations)
- Better IDE support and autocomplete
- Catch errors at compile time
- Self-documenting code

**PostgreSQL + Prisma**
- Robust relational database for structured course content
- Prisma provides type-safe database access
- Great migration system
- Easy to work with complex relationships

**Tailwind CSS**
- Rapid UI development
- Consistent design system
- Great for responsive layouts
- Easy to customize

**Zustand + React Query**
- Lightweight state management (vs Redux complexity)
- React Query handles server caching automatically
- Simple API, easy to learn

### Project Structure

```
SANSKRIT/
├── apps/
│   └── web/                    # Next.js application
│       ├── src/
│       │   ├── app/            # App router pages
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   └── globals.css
│       │   ├── components/     # React components
│       │   │   ├── ui/         # Basic UI components
│       │   │   ├── lessons/    # Lesson-related components
│       │   │   ├── exercises/  # Exercise components
│       │   │   ├── flashcards/ # Flashcard components
│       │   │   └── audio/      # Audio player components
│       │   ├── lib/            # Utilities and helpers
│       │   │   ├── srs.ts      # Spaced repetition algorithm
│       │   │   ├── audio.ts    # Audio service
│       │   │   └── utils.ts    # General utilities
│       │   └── styles/
│       ├── public/
│       │   └── audio/          # Audio files
│       │       ├── phonemes/
│       │       ├── words/
│       │       └── sentences/
│       └── package.json
│
├── packages/
│   ├── database/               # Prisma & database
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Database schema
│   │   │   ├── migrations/     # Migration history
│   │   │   └── seed.ts         # Seed data script
│   │   ├── index.ts            # Prisma client export
│   │   └── package.json
│   │
│   └── types/                  # Shared TypeScript types
│       ├── index.ts            # All type definitions
│       └── package.json
│
├── content/                    # Course content (JSON/MD)
│   └── phases/
│       ├── phase-1/
│       │   ├── month-1/
│       │   │   ├── week-1/
│       │   │   │   ├── lessons.json
│       │   │   │   ├── vocabulary.json
│       │   │   │   └── exercises.json
│       │   │   └── week-2/
│       │   └── month-2/
│       ├── phase-2/
│       ├── phase-3/
│       └── phase-4/
│
├── scripts/                    # Build and utility scripts
│   ├── import-content.ts       # Import curriculum content
│   └── generate-exercises.ts   # Auto-generate exercises
│
├── package.json                # Root package.json
├── turbo.json                  # Turborepo config
├── README.md                   # General project info
├── SETUP.md                    # Setup instructions
└── CLAUDE.md                   # This file

```

### Monorepo Structure
- **apps/web** - Main Next.js application (only app for now)
- **packages/database** - Shared database schema and Prisma client
- **packages/types** - Shared TypeScript types used across the project
- **content/** - Course content as structured data files
- **scripts/** - Utilities for content import and generation

---

## 3. Database Schema

**📄 Full Details:** See [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)

**Quick Overview:**
- PostgreSQL database with Prisma ORM
- 15+ models covering all application features
- Core tables: users, phases, modules, lessons, vocabulary, exercises, flashcards, progress
- SM-2 spaced repetition system built-in
- Comprehensive progress tracking and analytics
- Achievement/gamification system

**Key Systems:**
- **Course Structure:** Phase → Module → Lesson hierarchy
- **Vocabulary:** Rich metadata with audio, difficulty, frequency
- **SRS Flashcards:** User-specific review scheduling
- **Exercises:** Flexible JSON-based question system
- **Progress:** Lesson, module, and daily tracking
- **Achievements:** Criteria-based reward system

**Implementation:**
- Schema: `packages/database/prisma/schema.prisma`
- See DATABASE_SCHEMA.md for complete table definitions

---

## 4. Development Plan

### Current Status: Foundation Complete ✅

**Completed:**
- ✅ Project structure initialized (Turborepo, Next.js 14)
- ✅ Database schema designed (Prisma)
- ✅ TypeScript type definitions created
- ✅ Tailwind CSS configured
- ✅ Basic home page layout
- ✅ Development documentation (README, SETUP)

**Next Immediate Steps:**
1. Set up local PostgreSQL database
2. Run Prisma migrations
3. Build core UI components
4. Create lesson viewer
5. Import Month 1, Week 1 content

### Phased Development Approach

#### Phase 0: Foundation (CURRENT)
**Goal:** Set up infrastructure and core components
**Timeline:** Week 1-2

Tasks:
- [x] Initialize project structure
- [x] Set up database schema
- [x] Create type definitions
- [ ] Set up PostgreSQL locally
- [ ] Initialize database with Prisma
- [ ] Build core UI components (Button, Card, DevanagariText)
- [ ] Create layout and navigation structure

#### Phase 1A: Month 1, Week 1 Implementation
**Goal:** Complete first week of Devanagari script lessons
**Timeline:** Week 2-3

Content Focus: Vowels and basic consonants
- [ ] Extract Week 1 content from curriculum
- [ ] Create lesson data structure
- [ ] Build lesson viewer component
- [ ] Build audio player component
- [ ] Source/record audio for 14 vowels
- [ ] Source/record audio for 10 consonants
- [ ] Create character recognition exercises
- [ ] Build basic script practice tool
- [ ] Test with user (project owner)

#### Phase 1B: Month 1, Week 2 Implementation
**Goal:** Complete second week (remaining consonants)
**Timeline:** Week 4

Content Focus: All 33 consonants, conjuncts
- [ ] Extract Week 2 content
- [ ] Record remaining consonant audio
- [ ] Add conjunct consonant audio
- [ ] Build more advanced exercises
- [ ] Enhance script practice tool
- [ ] Test Week 1-2 together

#### Phase 1C: Month 1, Week 3-4 Implementation
**Goal:** Basic grammar and noun cases
**Timeline:** Week 5-6

Content Focus: Nouns, cases, first 20 vocabulary words
- [ ] Build flashcard component
- [ ] Implement SRS algorithm (SM-2)
- [ ] Create vocabulary database (20 words)
- [ ] Record vocabulary audio
- [ ] Build grammar drill exercises
- [ ] Implement progress tracking
- [ ] Create user dashboard (basic)

#### Phase 1D: Complete Month 1
**Goal:** Polish and integrate all Month 1 content
**Timeline:** Week 7-8

- [ ] Build remaining Month 1 exercises
- [ ] Complete all audio recordings
- [ ] Add progress visualization
- [ ] Implement achievement system (basic)
- [ ] User testing and bug fixes
- [ ] Documentation for Month 1

### Month-by-Month Build Strategy

**Months 2-6 (Phase 1 of Curriculum):** Repeat the process
- Extract content from curriculum
- Structure as data files
- Build any new component types needed
- Source/record audio
- Test and polish

**Months 7-12 (Phase 2):** More complex features
- Advanced grammar exercises
- Reading comprehension tools
- Conversation practice features
- Enhanced audio integration

**Months 13-18 (Phase 3):** Literary focus
- Classical text reader
- Composition tools
- Advanced analytics

**Months 19-24 (Phase 4):** Mastery features
- Specialized study paths
- Community features (future)
- Advanced testing

---

## 5. Key Decisions

### Decision Log

#### Development Approach
**Decision:** Build month-by-month incrementally
**Rationale:** Allows testing and refinement before proceeding. User can start learning immediately after Month 1 is complete.
**Alternative Considered:** Build entire platform then add content
**Date:** December 3, 2024

#### Technology Stack
**Decision:** Next.js 14 full-stack with TypeScript
**Rationale:** Single framework for frontend and backend, excellent DX, easy deployment, strong typing
**Alternative Considered:** Separate React frontend + Node/Python backend
**Date:** December 3, 2024

#### Database Choice
**Decision:** PostgreSQL with Prisma ORM
**Rationale:** Relational structure fits course hierarchy, Prisma provides type safety and great migrations
**Alternative Considered:** MongoDB (too flexible), MySQL (less features)
**Date:** December 3, 2024

#### Audio Strategy
**Decision:** Record/source audio progressively as we build each module
**Rationale:** Ensures quality and completeness, allows testing pronunciation with each section
**Alternative Considered:** Use TTS for everything (lower quality), record all upfront (too much work before testing)
**Date:** December 3, 2024

#### Deployment Timing
**Decision:** Local development only initially, deploy after Month 1 complete
**Rationale:** Focus on functionality first, avoid deployment complexity during rapid development
**Alternative Considered:** Deploy immediately (adds overhead), wait until complete (delays testing)
**Date:** December 3, 2024

#### Spaced Repetition Algorithm
**Decision:** Implement SM-2 algorithm (SuperMemo 2)
**Rationale:** Well-tested, widely used in Anki and similar tools, proven effective
**Alternative Considered:** FSRS (newer, more complex), simple interval doubling (less effective)
**Date:** December 3, 2024

#### Content Storage Format
**Decision:** JSON files in `content/` directory, imported to database
**Rationale:** Easy to edit, version control friendly, clear structure, can regenerate database anytime
**Alternative Considered:** Direct database entry (hard to version control), Markdown with frontmatter (less structured)
**Date:** December 3, 2024

#### User Authentication
**Decision:** Defer implementation until Month 1 complete
**Rationale:** Single user (project owner) during development, authentication can be added later without affecting core features
**Alternative Considered:** Build auth first (unnecessary complexity early on)
**Date:** December 3, 2024

### Design Patterns

**Content Structure Pattern:**
- Curriculum → Phases (1-4) → Months (1-24) → Weeks (1-4) → Lessons
- Each level has metadata, learning objectives, and order
- Flexible JSON content allows different lesson types

**Component Architecture:**
- Feature-based organization (lessons/, exercises/, flashcards/)
- Shared UI components in ui/
- Each feature is self-contained with types, components, hooks

**State Management Pattern:**
- Server state: React Query (caching, fetching)
- Client state: Zustand (UI state, preferences)
- Form state: React Hook Form (when needed)

**Audio Service Pattern:**
- Centralized AudioService class
- Preload strategy for frequently used sounds
- Fallback handling for missing audio

---

## 6. Content Structure

**📄 Full Details:** See [docs/CONTENT_STRUCTURE.md](docs/CONTENT_STRUCTURE.md)

**Curriculum Overview:**
- 24-month course divided into 4 phases
- Source: `classical_sanskrit_course.md`
- Phase 1 (Months 1-6): Foundation - Script, basic grammar, 500+ vocab
- Phase 2 (Months 7-12): Intermediate - Advanced grammar, 1500+ vocab
- Phase 3 (Months 13-18): Advanced - Literary texts, 3000+ vocab
- Phase 4 (Months 19-24): Mastery - Specialization, 4000+ vocab

**Content Data Formats:**
- **Lessons:** JSON with structured sections (text, audio, exercises)
- **Vocabulary:** Rich metadata (Devanagari, IAST, audio, difficulty, tags)
- **Exercises:** Flexible JSON supporting multiple question types
- **Metadata:** Phase/Month/Week meta.json files for structure

**Content Directory:**
```
content/
├── phases/phase-1/month-1/week-1/
│   ├── lessons/ exercises/ vocabulary.json
└── shared/vocabulary/ grammar/ references/
```

See CONTENT_STRUCTURE.md for complete JSON schemas and curriculum mapping.

---

## 7. Audio Strategy

**📄 Full Details:** See [docs/AUDIO_STRATEGY.md](docs/AUDIO_STRATEGY.md)

**Audio Categories:**
1. **Phonemes** - Vowels (14), Consonants (33), Conjuncts (50-100)
2. **Vocabulary** - Word pronunciations (500+ for Phase 1)
3. **Sentences** - Example sentences and phrases

**Phased Approach:**
- **Phase 1A (Month 1, Week 1-2):** ~150 phoneme audio files (PRIORITY)
- **Phase 1B (Month 1, Week 3-4):** 50 vocabulary words + 20-30 sentences
- **Phase 1C (Months 2-6):** +100 words/month → ~500-600 total

**Sourcing Strategy:**
1. **Professional Recording (Recommended):** Hire Sanskrit speaker ($2000-5000)
2. **Existing Resources:** Free/licensed educational content
3. **TTS (Fallback):** Google Cloud TTS/Amazon Polly for placeholders

**Audio Specs:**
- Format: MP3 (128kbps, 44.1kHz) + WebM alternative
- Directory: `public/audio/phonemes/ words/ sentences/`
- Playback: Howler.js via AudioPlayer component

**Development Strategy:**
- Use TTS placeholders initially
- Track status in database: "placeholder" vs. "professional"
- Replace incrementally as professional audio becomes available

See AUDIO_STRATEGY.md for complete sourcing options, file structure, and recording guidelines.

---

## 8. Critical: Time and Quality Philosophy

## ⚠️ CRITICAL: TIME AND QUALITY PHILOSOPHY

**WE ARE NEVER UNDER TIME CONSTRAINTS. WE HAVE PLENTY OF TIME.**

- **NEVER** rush through implementation to "save time"
- **NEVER** take shortcuts to avoid "running short on time"
- **NEVER** skip proper debugging or error fixing due to time concerns
- **ALWAYS** prioritize quality, thorough testing, and proper error resolution
- **ALWAYS** take the time needed to understand and fix issues properly
- **EFFICIENCY** means writing quality code correctly, not rushing through tasks

**Testing, debugging, and error fixing are PRIORITIES, not time sinks.**

While we should be mindful of token usage and avoid unnecessary work, we should NEVER compromise on:
- Comprehensive testing
- Proper error handling
- Thorough debugging
- Complete implementation
- Code quality

**Remember: There is NO deadline. Quality over speed, always.**

---

## 9. Guidelines & Standards

The following guidelines are split into separate documents for better organization and performance:

### 📋 Development Workflows

1. **[Testing Workflow](docs/guidelines/TESTING_WORKFLOW.md)** ⚠️ **MANDATORY** ⭐ **CRITICAL**
   - 6-level testing process (MUST follow for ALL code changes)
   - Build compilation, runtime checks, component testing
   - Integration testing and documentation
   - Testing checklist template
   - NEVER commit untested code

2. **[Test Failure Protocol](docs/guidelines/TEST_FAILURE_PROTOCOL.md)** ⚠️ **MANDATORY** 🔴 **CRITICAL**
   - NEVER exclude, disable, or skip tests without investigation
   - Always read test code to understand what it protects
   - Always prioritize fixing over hiding
   - Tests document critical functionality
   - Quality over convenience - NO shortcuts

3. **[Git Workflow & Best Practices](docs/guidelines/GIT_WORKFLOW.md)** ⚠️ **MANDATORY**
   - Feature branch workflow (MUST follow)
   - Commit message conventions
   - Pull request guidelines
   - Branching strategy
   - Git best practices and quick reference
   - CRITICAL: Push after EVERY phase of work

4. **[Documentation Standards](docs/guidelines/DOCUMENTATION_STANDARDS.md)** ⚠️ **MANDATORY**
   - Three-stage documentation process
   - Requirements, implementation, and current state docs
   - Error documentation (MANDATORY for all errors)
   - Session log format
   - Code documentation standards

5. **[Todo Management Workflow](docs/guidelines/TODO_MANAGEMENT.md)** ⚠️ **MANDATORY**
   - Four-level todo hierarchy
   - Master project todos → Weekly todos → Daily todos → Task todos
   - Claude's responsibilities at each phase
   - Best practices and examples

6. **[Module-Level Code Guidelines](docs/guidelines/MODULE_LEVEL_CODE.md)** ⚠️ **MANDATORY** ⭐ **CRITICAL**
   - NEVER use module-level side effects
   - No store mutations at module level
   - Move side effects to useEffect
   - Prevents hard-to-debug global state pollution
   - Real-world examples and ESLint rules

7. **[Server Management](docs/guidelines/SERVER_MANAGEMENT.md)** ⚠️ **MANDATORY** ⭐ **CRITICAL**
   - ALWAYS check if server is running before starting new instance
   - Ask user whether to use existing or restart
   - Kill old server before starting new
   - Applies to ALL servers (dev, test, production) for ANY reason
   - Prevents port conflicts, multiple instances, confusion

8. **[Session Management & Token Efficiency](docs/guidelines/SESSION_MANAGEMENT.md)**
   - Token efficiency guidelines
   - When to start new sessions
   - 15% token warning protocol
   - Session log format
   - Cross-session continuity

9. **[Pre-Commit Checklist](docs/guidelines/PRE_COMMIT_CHECKLIST.md)** ⚠️ **MANDATORY** ⭐ **CRITICAL**
   - MUST review before EVERY commit
   - Complete ALL 6 testing levels
   - WAIT for user browser testing confirmation (frontend code)
   - NEVER commit frontend code without user verification
   - No exceptions, no shortcuts

---

## 10. Quick Start for Claude Code

**🚨 FIRST: Follow the "MANDATORY SESSION START PROTOCOL" at the top of this document! 🚨**

When starting a session:

1. **⚠️ MANDATORY: Read session context AUTOMATICALLY (see top of this document):**
   - `NEXT_SESSION.md` - Immediate context and next steps (read FIRST)
   - Latest log file in `logs/` directory (e.g., `logs/PHASE0_FOUNDATION_LOG.md`)
   - **DO THIS AUTOMATICALLY - Don't wait for user to ask!**

2. **⚠️ CRITICAL: Context Reading Protocol** ⚠️
   - **When user says "read X for context":**
     1. **Read the ENTIRE file(s) requested**
        - If a file is too large to read in one operation (>25,000 tokens), **AUTOMATICALLY read it in chunks**
        - Continue reading ALL chunks sequentially until the ENTIRE file is read
        - Do NOT stop after reading only the first chunk
        - Do NOT ask the user to tell you to read in chunks - do it automatically
        - Calculate approximate chunks needed: For a file with error "exceeds X tokens", read in chunks of 1,000-2,000 lines
     2. **AFTER reading ALL context completely, IMMEDIATELY ask: "What would you like me to do next?"**
     3. **WAIT for user response**
     4. **THEN take action based on user's instructions**
   - **NEVER take action immediately after reading context files**
   - **NEVER stop reading partway through a file - always read the ENTIRE file**
   - **Context reading ≠ permission to act**
   - **This rule applies EVERY TIME, without exception**

3. **Check current todos**: TodoWrite tool for active session tasks

4. **⛔️ BEFORE EVERY COMMIT - ABSOLUTE BLOCKER ⛔️**
   - **STOP** - Before typing `git commit`, scroll down to "ABSOLUTE BLOCKER" section
   - **READ** the 8-question checklist
   - **VERIFY** ALL answers are "YES"
   - **IF ANY "NO"** → Do NOT commit, complete missing step first

5. **Follow mandatory workflows**:
   - **Testing**: MANDATORY for ALL code (see [Testing Workflow](docs/guidelines/TESTING_WORKFLOW.md)) ⭐ **READ BEFORE EVERY COMMIT**
     - **⚠️ PROJECT-SPECIFIC TypeScript Check:** `npx tsc --project apps/web --noEmit`
     - Must run from project root (`/Users/johnkitchin/AI/SANSKRIT`)
     - Success = NO output (silent success means no errors)
     - If shows help text → INVESTIGATE - command is running incorrectly
     - This is a Turborepo monorepo - must specify project path!
   - **Test Failures**: ⚠️ **WHEN ANY TEST FAILS/ERRORS** → IMMEDIATELY follow [Test Failure Protocol](docs/guidelines/TEST_FAILURE_PROTOCOL.md) 🔴 **CRITICAL - NO EXCEPTIONS**
   - **Pre-Commit**: Review checklist before EVERY git commit (see [Pre-Commit Checklist](docs/guidelines/PRE_COMMIT_CHECKLIST.md)) ⭐ **MANDATORY**
   - **Git**: Always use feature branches (see [Git Workflow](docs/guidelines/GIT_WORKFLOW.md))
   - **Documentation**: Document all features and errors (see [Documentation Standards](docs/guidelines/DOCUMENTATION_STANDARDS.md))
   - **Todos**: Use TodoWrite to track progress (see [Todo Management](docs/guidelines/TODO_MANAGEMENT.md))

6. **Monitor token usage**: Alert at 15% remaining (see [Session Management](docs/guidelines/SESSION_MANAGEMENT.md))

### ⚠️ CRITICAL: Auto-Compact Warning Protocol ⚠️

**Important:** Claude Code CANNOT see the "15% Left before Auto-Compact" warning that appears in the user's UI. The user must notify Claude when this warning appears.

**When User Sees "15% Left before Auto-Compact":**

User should notify Claude by saying:
- "We're at 15% before auto-compact"
- "Auto-compact warning appeared"
- "Time to wrap up the session"

**Claude's Response Protocol:**

1. **STOP** starting any new complex tasks immediately
2. **Assess current state:**
   - If current task is nearly complete (< 5 minutes): Finish it
   - If current task is complex/incomplete: PAUSE without committing

3. **Update documentation:**
   - Update session log with detailed session summary
   - Update `NEXT_SESSION.md` with:
     - Exactly where we stopped
     - What's uncommitted (if anything) and why
     - What needs testing before commit
     - Next steps to resume
     - Any important context that might be lost in auto-compaction

4. **Commit decision:**
   - ✅ **Commit IF**: Task complete, tested, and working
   - ❌ **DON'T commit IF**:
     - Task incomplete
     - Not tested (especially frontend code)
     - In middle of multi-step work
     - Might break the build

5. **Document uncommitted work clearly:**
   ```markdown
   **⚠️ UNCOMMITTED WORK:**
   - Modified: file1.tsx, file2.tsx
   - Status: Migration complete but NOT YET TESTED in browser
   - Reason: Session ending, need user testing before commit
   - Next: User test X feature, then commit if working
   ```

**Why This Matters:**
Auto-compaction can compress or lose nuanced context. Proper documentation before compaction ensures continuity.

### 🚨 ABSOLUTE BLOCKER: STOP BEFORE EVERY GIT COMMIT 🚨

**⛔️ DO NOT PROCEED WITH `git commit` UNTIL YOU ANSWER "YES" TO EVERY QUESTION:**

```
MANDATORY PRE-COMMIT VERIFICATION CHECKLIST:

[ ] 1. Did I complete Level 1: Build Compilation? (npm run build / pytest)
[ ] 2. Did I complete Level 2: Dev Server Startup? (verify server starts)
[ ] 3. Did I complete Level 3: Runtime Error Check? (no console errors)
[ ] 4. Did I complete Level 4: Component/Feature Testing? (ALL features work)
[ ] 5. Did I complete Level 5: Integration Testing? (no regressions)
[ ] 6. Did I complete Level 6: Documentation? (test results documented)
[ ] 7. For frontend code: Did USER confirm browser testing passed?
[ ] 8. Did I read the Pre-Commit Checklist document?

IF ANY ANSWER IS "NO" → STOP IMMEDIATELY
DO NOT TYPE "git commit"
DO NOT CREATE ANY COMMITS
GO BACK AND COMPLETE THE MISSING STEP
```

**🚨 THIS IS AN ABSOLUTE RULE - NO EXCEPTIONS EVER 🚨**

**What to do RIGHT NOW before typing `git commit`:**
1. **STOP** - Do not proceed
2. **READ** [Pre-Commit Checklist](docs/guidelines/PRE_COMMIT_CHECKLIST.md) completely
3. **READ** [Testing Workflow](docs/guidelines/TESTING_WORKFLOW.md) completely
4. **VERIFY** all 6 testing levels completed
5. **DOCUMENT** test results
6. **ONLY THEN** proceed with commit

**Why this exists:**
- Session 5 (SANSKRIT project): Claude committed content structure without ANY testing
- This caused protocol violation and required remediation
- This blocker prevents future violations

**No exceptions. No shortcuts. No "I'll test it later". Test FIRST, commit SECOND.**

---

## 11. Session Documentation Protocol

### Session Logging System

**Purpose:** Maintain detailed history and enable seamless continuity across sessions

### Three-Document System

#### 1. Session Logs (`logs/` directory)

**Location:** `/logs/`

**Naming Convention:**
- **Phase-based:** `PHASE0_FOUNDATION_LOG.md`, `PHASE1_SETUP_LOG.md`
- **Month-based:** `M1A_LOG.md` (Month 1, Module A), `M1B_LOG.md` (Month 1, Module B)
- **Format:** M{month}{module}_LOG.md where module is A, B, C, D...

**Examples:**
```
logs/
├── PHASE0_FOUNDATION_LOG.md      # Infrastructure and planning
├── M1A_LOG.md                    # Month 1, Module A development
├── M1B_LOG.md                    # Month 1, Module B development
├── M2A_LOG.md                    # Month 2, Module A development
├── M2B_LOG.md                    # Month 2, Module B development
└── ...
```

**Content:** Detailed session history including:
- What was accomplished
- Decisions made
- Problems encountered and solved
- Code changes
- Testing results
- Time spent

**When to Create:**
- At END of each work session
- When completing a development phase
- Before moving to new curriculum module

#### 2. Handoff Document (`NEXT_SESSION.md`)

**Location:** Root directory (always)

**Purpose:** Bridge between sessions - tells next Claude session exactly where to start

**Updated:** At END of every session

**Critical Contents:**
1. **Current State:**
   - What phase/module we're on
   - What's completed
   - What's uncommitted (if anything)
   - Current git branch
   - Latest log file reference

2. **Immediate Next Steps:**
   - Numbered, specific action items
   - Order of operations
   - Success criteria for each step
   - Estimated time for each

3. **Important Context:**
   - Recent decisions
   - Blockers or issues to be aware of
   - Files that need review
   - Commands needed

4. **Git Status:**
   - Current branch
   - Uncommitted changes
   - What needs testing before commit

**Format:**
```markdown
# NEXT SESSION - Handoff Document

**Last Updated:** [Date]
**Current Phase:** [Phase name]
**Next Phase:** [What's next]
**Latest Log:** [Path to log file]

## Where We Are
- Completed this session
- Current state
- Uncommitted work

## Immediate Next Steps
1. Step 1 with details
2. Step 2 with details
...

## Important Context
- Key decisions
- Files to review
- Critical reminders
```

#### 3. Session Todos (TodoWrite tool)

**Purpose:** Track active tasks within current session

**Management:**
- Created at session start
- Updated as work progresses
- Marked complete as tasks finish
- Not persisted to files (tool-managed)

### Session Start Protocol

**At beginning of EVERY session, Claude MUST:**

1. **Read NEXT_SESSION.md** (if exists)
   - Understand current state
   - Identify immediate next steps
   - Note any uncommitted work

2. **Read latest log file**
   - Get detailed session history
   - Understand recent decisions
   - Learn from problems solved

3. **Read CLAUDE.md** (if needed for context)
   - Full project overview
   - Guidelines and workflows

4. **Ask user:** "What would you like to work on?"
   - Confirm next steps from NEXT_SESSION.md
   - Or get new direction from user

5. **Create feature branch** (if coding)
   - Before writing any code
   - Following Git workflow

### Session End Protocol

**At END of every session, Claude MUST:**

1. **Commit all tested code:**
   - Follow pre-commit checklist
   - Ensure all tests pass
   - Push to GitHub

2. **Update log file:**
   - **IMPORTANT:** Use the correct log file for current development phase:
     - Check NEXT_SESSION.md "Latest Log:" field to determine which file
     - Phase 0: PHASE0_FOUNDATION_LOG.md
     - Month 1 Module A: M1A_LOG.md
     - Month 1 Module B: M1B_LOG.md
     - Month 2 Module A: M2A_LOG.md (etc.)
   - Append to existing log file for current phase
   - Document what was accomplished
   - Note decisions and learnings
   - **Create NEW log file** when transitioning to a new curriculum module

3. **Update NEXT_SESSION.md:**
   - Current state
   - Immediate next steps (numbered, specific)
   - Important context
   - Git status

4. **Verify documentation:**
   - All changes documented
   - Clear handoff to next session
   - No missing context

### Auto-Compact Warning Protocol

**When user notifies of 15% token warning:**

1. **STOP** new complex tasks
2. **Finish** current task if < 5 minutes
3. **Update** log file with session summary
4. **Update** NEXT_SESSION.md with detailed handoff
5. **Commit** if work is tested and complete
6. **Document** any uncommitted work clearly

### Log File Content Guidelines

**Include:**
- ✅ Accomplishments (what was built/fixed)
- ✅ Decisions made and rationale
- ✅ Problems encountered and solutions
- ✅ Testing results
- ✅ Git commits made
- ✅ Next steps identified

**Exclude:**
- ❌ Excessive code snippets (link to files instead)
- ❌ Repeated information from previous sessions
- ❌ Obvious or trivial details

### Example Log Entry

```markdown
## Session 2024-12-03 (Phase 0 - Foundation)

### Accomplished
- ✅ Initialized Next.js 14 + TypeScript project
- ✅ Created Prisma database schema (15+ models)
- ✅ Configured Tailwind CSS
- ✅ Imported development guidelines from SMS project
- ✅ Created GitHub repository: https://github.com/jayudas/SANSKRIT

### Decisions Made
- **Repository name:** SANSKRIT (shortened for clarity)
- **Documentation system:** Phase-based logs + NEXT_SESSION.md handoff
- **Development approach:** Month-by-month incremental

### Git Activity
- Commit 1: Initial project structure
- Commit 2: Documentation updates
- Branch: main
- All code pushed to GitHub

### Next Steps
- Set up PostgreSQL database locally
- Create content data structure
- Import Month 1, Week 1 content
```

---

## 12. 🚨 CRITICAL: Test Failure Protocol 🚨

**⚠️ TRIGGER: Whenever you see test failures, errors, or any indication that tests are not passing:**

**STOP IMMEDIATELY and follow these steps (NO EXCEPTIONS):**

1. **DO NOT propose to skip, exclude, or work around the failing tests**
2. **DO NOT rationalize why test failures are acceptable**
3. **READ** the failing test files completely to understand what they test
4. **IDENTIFY** what critical functionality would break if tests didn't exist
5. **INVESTIGATE** why tests are failing (code bug? test bug? missing setup?)
6. **FIX** the root cause - make the tests PASS
7. **For manual tests**: RUN them manually first, verify they pass, THEN decide on automation

**Remember:**
- Tests document critical functionality
- If it's tested, it's important
- Test failures indicate broken functionality OR broken tests
- Either way: MUST BE FIXED, not hidden

**Full protocol:** [Test Failure Protocol](docs/guidelines/TEST_FAILURE_PROTOCOL.md)

---

**End of CLAUDE.md**

*This document should be updated as significant decisions are made or architecture changes occur.*

**Version History:**
- **v1.0** (2024-12-03): Initial version with project overview, architecture, and imported best practices from SMS project
