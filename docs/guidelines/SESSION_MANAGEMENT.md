# Session Management & Token Efficiency

This document outlines session management protocols and token efficiency guidelines for Claude Code sessions.

---

## Token Efficiency Guidelines

Claude should maximize efficiency with token usage by following these guidelines:

### Use Background Agents Proactively

✅ **ALWAYS use background agents** (Task tool with subagent_type) for:
- Research and documentation gathering
- Codebase exploration
- Multi-file searches
- Parallel independent tasks

✅ **Deploy agents concurrently** when tasks are independent:
```python
# Good: Launch multiple agents in one message
agent1: research Instagram API
agent2: research APScheduler
agent3: research OAuth security
```

✅ **Use specialized agents** over direct tool calls:
- **Explore agent**: For codebase exploration, file searches
- **Plan agent**: For task planning and breaking down work
- **General-purpose agent**: For complex multi-step tasks

### Avoid Redundant Context

❌ **Don't repeatedly read** the same files
❌ **Don't re-search** for already found information
❌ **Don't regenerate** already available documentation

✅ **Cache information** from previous reads
✅ **Reference previous findings** instead of re-researching
✅ **Use existing documentation** files

### Minimize Token-Heavy Operations

- Use `Glob` instead of `ls` when searching for files
- Use `Grep` instead of reading entire files for searches
- Use `head_limit` in Grep to limit output
- Read specific line ranges instead of entire large files

---

## Session Management Protocols

### When to Advise New Session

Claude should advise starting a new session when:

1. **Beginning a new feature or major component**
   - Example: "We're done with OAuth implementation. Starting the scheduling engine would be a good time for a new session."

2. **Switching between phases**
   - Example: "Phase 1 (Infrastructure) complete. Before starting Phase 2 (API Integration), consider a new session."

3. **Context becomes stale**
   - Files have changed significantly
   - Working directory has changed
   - Significant time has passed

4. **After completing a major milestone**
   - All tests passing for a feature
   - Deployment successful
   - Release completed

### 20% Token Warning Protocol ⚠️ MANDATORY

**CRITICAL**: When token budget reaches **20% remaining (40,000 tokens)**, Claude MUST:

1. **IMMEDIATELY alert the user** (no exceptions):
   ```
   🚨 TOKEN BUDGET ALERT: 20% remaining (40,000 tokens)

   We've reached the 20% threshold. To ensure we don't lose work or hit session limits,
   I strongly recommend:

   1. Let me complete the current task (if nearly done)
   2. Create a comprehensive session summary
   3. Update NEXT_SESSION.md with detailed handoff
   4. Start a fresh session to continue

   Shall I proceed with creating the session summary and handoff?
   ```

2. **Complete current task if close to done** (< 5 minutes remaining):
   - Finish current file edit
   - Commit in-progress work
   - Don't start any new tasks

3. **Create session summary** using `/summarize` command with:
   - Work completed in this session
   - Current state of the codebase
   - Files created/modified
   - Next steps and open tasks
   - Any blockers or questions
   - Links to relevant files and documentation

4. **Update NEXT_SESSION.md** with detailed handoff:
   - Current branch and git status
   - Test counts and coverage
   - Exact next steps with commands
   - Context needed for next session
   - Critical reminders

5. **Commit and push documentation**:
   ```bash
   git add logs/WeekXLOG.md NEXT_SESSION.md
   git commit -m "docs(session): add session summary and update handoff"
   git push origin branch-name
   ```

6. **Recommend starting new session**:
   ```
   ✅ Session summary and handoff complete!

   Ready to start a new session. The next session should:
   1. Read logs/WeekXLOG.md for context
   2. Read NEXT_SESSION.md for immediate next steps
   3. Continue from where we left off

   Start a new session when you're ready!
   ```

**Why 20% instead of 15%?**
- Provides buffer for summary creation (~10k tokens)
- Ensures clean handoff without rushing
- Prevents hitting hard limit during documentation
- Allows proper git commit workflow

### Session Log Format

Location: `docs/session-logs/YYYY-MM-DD-feature-name.md` or `logs/WeekXLOG.md`

```markdown
# Session Log: YYYY-MM-DD - Feature Name

## Session Context
- **Date**: YYYY-MM-DD
- **Duration**: Start time - End time
- **Focus**: Brief description of session goals

## Accomplishments
- [x] Task 1 completed
- [x] Task 2 completed
- [x] Task 3 completed

## Code Changes
### Files Created
- `path/to/file1.py` - Description
- `path/to/file2.py` - Description

### Files Modified
- `path/to/file3.py` - Changes made
- `path/to/file4.py` - Changes made

## Testing Status
- [ ] Unit tests written
- [x] Integration tests passing
- [ ] Manual testing completed

## Current State
Brief description of where the project stands

## Next Steps
1. Next task to complete
2. Another task
3. Open questions

## Blockers
- Blocker 1 (if any)
- Blocker 2 (if any)

## References
- Link to relevant documentation
- Link to relevant PRs/issues
```

### Session Efficiency Tips

✅ **Start each session with clear goals**
✅ **Use session logs** to resume context quickly
✅ **Batch related tasks** in one session
✅ **Save before token limit** is reached
✅ **Keep sessions focused** on one feature/area

---

## Session Start Best Practices

### Loading Context Efficiently

When starting a new session, prioritize reading:

1. **Session logs first** - `logs/WeekXLOG.md` or `NEXT_SESSION.md`
   - Get high-level context quickly
   - Understand what was completed and what's pending

2. **Weekly todos** - `WEEK_X_TODOS.md`
   - See current week's plan
   - Identify today's tasks

3. **Specific code files** - Only as needed
   - Don't read all files upfront
   - Read files when you need to modify them

### Context Loading Example

**Good** (token-efficient):
```
1. Read logs/Week1LOG.md (high-level context)
2. Read WEEK_1_TODOS.md (today's tasks)
3. Start working on tasks
4. Read specific files only when modifying them
```

**Bad** (token-wasteful):
```
1. Read all Python files in app/
2. Read all test files
3. Read all documentation
4. Then start working
```

---

## Managing Long Sessions

### Mid-Session Checkpoints

Every ~50,000 tokens (25% of budget), take a checkpoint:

1. **Review progress** - What's been completed?
2. **Update todos** - Mark tasks complete
3. **Commit work** - Save progress to git
4. **Assess remaining work** - Can it fit in remaining tokens?

### If Running Low on Tokens

When approaching 40,000 tokens remaining (20%):

1. **ALERT USER IMMEDIATELY** - Use the 20% Token Warning Protocol (see above)
2. **Finish current task** - Don't leave work half-done
3. **Commit all changes** - Ensure nothing is lost
4. **Update documentation** - Session log, WEEK_X_TODOS.md
5. **Create handoff notes** - NEXT_SESSION.md or update logs
6. **Inform user** - Recommend starting fresh session

---

## Cross-Session Continuity

### NEXT_SESSION.md File

Create this file at end of session when work is incomplete:

```markdown
# Next Session Priorities

**Date Created**: YYYY-MM-DD
**Current Branch**: feature/xyz

## Priority Tasks (in order)

### 1. Task Name (5 minutes)
**What**: Brief description
**Why**: Reason this is priority #1
**How**:
```bash
# Exact commands to run
command1
command2
```
**Success Criteria**: What success looks like

### 2. Next Task (30 minutes)
...

## Context Summary
- Current state in 2-3 sentences
- Any blockers or issues
- Relevant file locations

## Quick Links
- [Week 1 Log](logs/Week1LOG.md)
- [Week 1 Todos](WEEK_1_TODOS.md)
- [Implementation Doc](docs/app-info/2025-11-18_implementation_phase1.md)
```

### Using Session Logs

Always update session log files:
- `logs/Week1LOG.md` - Continuous log for entire week
- `docs/session-logs/YYYY-MM-DD-feature.md` - Feature-specific log

Include:
- What was accomplished
- What was tried but didn't work
- Any errors and solutions
- Next steps

---

## Token Budget Awareness

### Current Budget

- **Total**: 200,000 tokens per session
- **⚠️ MANDATORY WARNING threshold**: 40,000 tokens remaining (20%) - MUST alert user
- **Checkpoint interval**: 50,000 tokens (25%) - Good practice to check in

### Monitoring Usage

Claude Code shows token usage after each tool call:
```
Token usage: 40012/200000; 159988 remaining
```

Track this and plan accordingly.

### High Token Operations

These operations use significant tokens:
- Reading large files (>500 lines)
- Reading CLAUDE.md (now split into smaller files)
- Reading multiple files in parallel
- Extensive Grep output without head_limit

---

## Best Practices Summary

### DO

✅ Read session logs first for context
✅ Use TodoWrite to track progress
✅ Commit work frequently
✅ Update documentation as you go
✅ Use background agents for research
✅ Create NEXT_SESSION.md when ending incomplete work
✅ Monitor token usage throughout session

### DON'T

❌ Read all files at session start
❌ Re-read the same files multiple times
❌ Run searches without head_limit
❌ Wait until end to commit/document
❌ Let token budget reach 0%
❌ Leave work uncommitted at session end
