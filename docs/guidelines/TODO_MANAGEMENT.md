# Project Todo Management Workflow

This document outlines the todo list hierarchy and management workflow for the SMS project.

---

## Overview

The SMS project uses a **progressive, nested todo list system** to track development progress across all 13 phases (7-9 weeks). This workflow ensures clear visibility into project status while maintaining flexibility to adjust plans as implementation progresses.

---

## Todo List Hierarchy

The project uses **four levels** of todo lists:

```
📋 Master Project Todo List (PROJECT_TODOS.md)
  │
  ├─ 📅 Weekly/Phase Todo Lists (WEEK_X_TODOS.md)
  │   │
  │   ├─ 📆 Daily Todo Lists (TodoWrite tool during session)
  │   │   │
  │   │   └─ ✅ Task-Level Todo Lists (TodoWrite for complex tasks)
  │   │
  │   └─ ...
  │
  └─ ...
```

---

## Level 1: Master Project Todo List

**File**: `PROJECT_TODOS.md` (project root)

**Purpose**: High-level tracking of all 13 phases

**Maintained By**: Updated at end of each week/phase

**Structure**:
- List all 13 phases with status (✅ Complete, ⏳ In Progress, ⏳ Pending)
- Include phase-level success criteria
- Track overall project progress (X of 13 phases complete)
- Link to weekly todo files

**Example**:
```markdown
### ✅ Phase 0: Research & Documentation (Week 0 - Complete)
- [x] Social media research
- [x] API research
- [x] Documentation updates

### ⏳ Phase 1: Core Infrastructure + Backend API (Week 1 - IN PROGRESS)
- [ ] Day 1: Project Setup
- [ ] Day 2: Database Configuration
- ...
(See WEEK_1_TODOS.md for details)

### ⏳ Phase 2: Instagram OAuth (Week 2 - PENDING)
(Details will be created at start of Week 2)
```

**When to Update**:
- Start of each week: Update status to "IN PROGRESS"
- End of each day: Mark daily tasks complete
- End of each week: Mark phase complete, update progress summary

---

## Level 2: Weekly/Phase Todo Lists

**Files**: `WEEK_1_TODOS.md`, `WEEK_2_TODOS.md`, etc. (project root)

**Purpose**: Detailed breakdown of each week into daily tasks

**Created When**: At start of each week/phase

**Maintained By**: Updated daily during the week

**Structure**:
- Overview of week's goals and deliverables
- Daily breakdown (Day 1-7) with task lists
- Success criteria for the week
- Progress tracking section

**Example**:
```markdown
## Daily Breakdown

### ✅ Day 1: Project Setup & Flask-RESTX Configuration
**Status**: Not started
**Estimated Time**: 6-8 hours

#### Tasks
- [ ] Initialize Python virtual environment
- [ ] Install core dependencies
- [ ] Set up Flask application structure
- [ ] Configure Flask-RESTX with OpenAPI/Swagger
...

**Success Criteria**:
- [ ] Flask runs on localhost:5000
- [ ] Swagger UI accessible
...
```

**When to Update**:
- Start of week: Create file with all daily breakdowns
- Start of each day: Use TodoWrite to track daily tasks
- End of each day: Mark completed tasks, update status
- End of week: Mark all days complete, update master list

---

## Level 3: Daily Todo Lists

**Tool**: `TodoWrite` (Claude Code tool, in-session tracking)

**Purpose**: Real-time tracking of tasks for current day

**Created When**: At start of each day/session

**Maintained By**: Updated throughout the day as tasks complete

**Structure**:
- List of tasks for the current day
- Status: pending, in_progress, completed
- Active form (present continuous) for in-progress tasks

**Example**:
```javascript
TodoWrite({
  todos: [
    {content: "Initialize Python virtual environment", status: "completed", activeForm: "Initializing..."},
    {content: "Install core dependencies", status: "in_progress", activeForm: "Installing dependencies"},
    {content: "Set up Flask application structure", status: "pending", activeForm: "Setting up Flask"}
  ]
})
```

**When to Update**:
- Start of day: Create todo list from WEEK_X_TODOS.md
- Throughout day: Mark tasks in_progress → completed
- End of day: Update WEEK_X_TODOS.md with daily progress

---

## Level 4: Task-Level Todo Lists (Optional)

**Tool**: `TodoWrite` (for complex tasks)

**Purpose**: Break down complex tasks into sub-tasks

**Created When**: When a task is complex and needs further breakdown

**Example**:
If "Configure Flask-RESTX with OpenAPI/Swagger" is complex:

```javascript
TodoWrite({
  todos: [
    {content: "Import Flask-RESTX in app/__init__.py", status: "completed", activeForm: "Importing..."},
    {content: "Initialize Api object", status: "in_progress", activeForm: "Initializing Api"},
    {content: "Configure Swagger UI route", status: "pending", activeForm: "Configuring Swagger"},
    {content: "Test Swagger UI loads", status: "pending", activeForm: "Testing Swagger"}
  ]
})
```

**When to Use**:
- Task estimated > 2 hours
- Task has multiple steps
- Task is blocking and needs detailed tracking

---

## Claude's Responsibilities

### At Start of Each Week

1. **Check PROJECT_TODOS.md** - Understand current phase
2. **Check if WEEK_X_TODOS.md exists** - If not, create it
3. **Create weekly todo breakdown** - All 5-7 days with tasks
4. **Update PROJECT_TODOS.md** - Mark week as "IN PROGRESS"

### At Start of Each Day

1. **Read WEEK_X_TODOS.md** - See what tasks are planned for today
2. **Use TodoWrite to create daily list** - Real-time task tracking
3. **Share daily plan with user** - "Here's what we'll accomplish today"

### Throughout the Day

1. **Mark tasks in_progress** when starting them
2. **Mark tasks completed** immediately when done
3. **Create task-level todos** for complex tasks
4. **Update user on progress** regularly

### At End of Each Day

1. **Update WEEK_X_TODOS.md** - Mark daily tasks complete
2. **Review day's accomplishments** with user
3. **Plan for next day** - Preview tomorrow's tasks
4. **Commit work to git** with descriptive messages

### At End of Each Week

1. **Update WEEK_X_TODOS.md** - Mark all days complete
2. **Update PROJECT_TODOS.md** - Mark phase complete
3. **Verify success criteria** - All checkboxes met
4. **Prepare for next week** - Preview next phase
5. **Create WEEK_X+1_TODOS.md** for next week

---

## Best Practices

### DO

✅ **Create weekly todos at start of week** - Don't skip this step
✅ **Use TodoWrite daily** - Real-time progress tracking
✅ **Mark tasks completed immediately** - Don't batch updates
✅ **Update weekly files daily** - Keep documentation current
✅ **Adjust plans as needed** - Stay flexible
✅ **Celebrate milestones** - Mark phases complete
✅ **Link between levels** - Reference detailed files from master list

### DON'T

❌ **Don't create all detailed todos upfront** - Progressive detail only
❌ **Don't skip weekly todo creation** - Essential for tracking
❌ **Don't let todos get stale** - Update daily
❌ **Don't batch complete tasks** - Mark as you finish
❌ **Don't forget to update master list** - Weekly updates required

---

## Example Workflow

### Monday Morning (Week 1, Day 1)

```
1. User: "Let's start Phase 1, Day 1"

2. Claude checks:
   - PROJECT_TODOS.md → Phase 1 is current
   - WEEK_1_TODOS.md → Exists (created in advance)

3. Claude reads WEEK_1_TODOS.md → Day 1 tasks

4. Claude uses TodoWrite:
   [
     {content: "Initialize Python venv", status: "pending", ...},
     {content: "Install dependencies", status: "pending", ...},
     ...
   ]

5. Claude: "Today we're setting up the Flask project. Let's start!"

6. Throughout day:
   - Mark tasks in_progress → completed
   - Update WEEK_1_TODOS.md at end

7. End of day:
   - Update WEEK_1_TODOS.md: "Day 1: ✅ Complete"
   - Preview Day 2 tasks
```

### Friday Evening (End of Week 1)

```
1. All Day 1-7 tasks complete in WEEK_1_TODOS.md

2. Claude updates PROJECT_TODOS.md:
   - Phase 1: ✅ Complete
   - Verify all success criteria met

3. Claude previews Week 2:
   - "Phase 1 complete! Next week: Instagram OAuth"

4. Claude creates WEEK_2_TODOS.md:
   - Day 1-7 breakdown for OAuth implementation
```

---

## File Locations

```
SMS/
├── PROJECT_TODOS.md           # Master list (all 13 phases)
├── WEEK_1_TODOS.md            # Week 1 detailed breakdown
├── WEEK_2_TODOS.md            # Week 2 detailed breakdown
├── ...
└── WEEK_11_TODOS.md           # Week 11 detailed breakdown
```

**Note**: Daily todos tracked with TodoWrite (in-session), not separate files.

---

## Benefits

✅ **Clear visibility** - Always know project status
✅ **Flexibility** - Adjust plans without overwhelming detail upfront
✅ **Accountability** - Track what's done vs. pending
✅ **Documentation** - Complete record of development journey
✅ **Session continuity** - Easy to resume work across sessions
✅ **Progress celebration** - Mark milestones as they complete

---

## Summary

| Level | File/Tool | Created When | Updated When | Purpose |
|-------|-----------|--------------|--------------|---------|
| **Master** | `PROJECT_TODOS.md` | Once (done) | Weekly | Track 13 phases |
| **Weekly** | `WEEK_X_TODOS.md` | Start of week | Daily | Break down week into days |
| **Daily** | `TodoWrite` tool | Start of day | Throughout day | Real-time task tracking |
| **Task** | `TodoWrite` tool | As needed | During task | Break down complex tasks |

**This workflow ensures the SMS project stays organized, trackable, and flexible throughout the 7-9 week development timeline.**
