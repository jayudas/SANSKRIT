# Git Workflow & Best Practices

This document outlines mandatory Git workflows and best practices for the SMS project.

---

## ⚠️ MANDATORY: Feature Branch Workflow

**BEFORE WRITING ANY CODE, Claude MUST follow this workflow:**

### Rule 1: NEVER Work on Main Branch Directly

🚫 **FORBIDDEN**: Making any commits directly to the `main` branch
✅ **REQUIRED**: Always create a feature branch before writing code

### Rule 2: Create Feature Branch Before Coding

**Before writing ANY code, tests, or configuration:**

```bash
# Step 1: Ensure you're on main and it's up to date
git checkout main
git pull origin main

# Step 2: Create and switch to a new feature branch
git checkout -b feature/descriptive-name

# Examples:
git checkout -b feature/instagram-oauth
git checkout -b feature/post-scheduling
git checkout -b feature/apscheduler-integration
```

### Rule 3: Commit Frequently

**Commit granularly** - after completing each logical unit of work:
- ✅ Commit after creating a new file
- ✅ Commit after implementing a function/class
- ✅ Commit after writing tests for a component
- ✅ Commit after fixing a bug
- ✅ Commit after updating documentation

**DON'T** wait to commit everything at once.

### Rule 4: Push Feature Branch to GitHub Frequently

**⚠️ CRITICAL: Push after EVERY phase of work is complete!**

After making commits on your feature branch:

```bash
# First push - creates remote branch
git push -u origin feature/your-feature-name

# Subsequent pushes - updates remote branch
git push origin feature/your-feature-name
```

**When to Push:**
- ✅ **After completing each phase** of a multi-phase task
- ✅ **After each significant commit** (new file, major function, tests)
- ✅ **Before taking any break** or pausing work
- ✅ **Before creating a Pull Request** (obviously)
- ✅ **At the end of every session** with Claude

**Why This Matters:**
- 🛡️ **Prevents work loss** if local state is lost or corrupted
- 🛡️ **Enables proper PR reviews** - all commits visible on GitHub
- 🛡️ **Avoids orphaned commits** in reflog that don't make it to PR
- 🛡️ **Provides backup** of work in progress

**Example - Multi-Phase Implementation:**
```bash
# Phase 1: Models - PUSH IMMEDIATELY
git add app/models/
git commit -m "feat(models): add OAuth token model with encryption"
git push origin feature/oauth  # ← PUSH HERE

# Phase 2: Handler - PUSH IMMEDIATELY
git add app/oauth/
git commit -m "feat(oauth): implement Instagram OAuth handler"
git push origin feature/oauth  # ← PUSH HERE

# Phase 3: Tests - PUSH IMMEDIATELY
git add tests/
git commit -m "test(oauth): add comprehensive OAuth unit tests"
git push origin feature/oauth  # ← PUSH HERE

# Now create PR - all commits are on remote!
gh pr create
```

### Rule 5: Verify Remote Before Creating PR

**⚠️ MANDATORY: Always verify remote branch has all commits before creating PR!**

```bash
# Step 1: Check local commits
git log --oneline -10

# Step 2: Check remote has same commits
git log origin/feature/your-feature-name --oneline -10

# Step 3: If they differ, push immediately
git push origin feature/your-feature-name

# Step 4: Verify again
git log origin/feature/your-feature-name --oneline -10
```

**RED FLAG - If remote is behind local:**
```bash
# BAD - Remote doesn't have all your work!
$ git log --oneline -5
abc123 (HEAD -> feature/oauth) test: add OAuth tests
def456 feat: implement OAuth handler
ghi789 feat: add OAuth models

$ git log origin/feature/oauth --oneline -5
ghi789 (origin/feature/oauth) feat: add OAuth models
# ⚠️ Remote is missing 2 commits! PUSH NOW!

$ git push origin feature/oauth
# ✅ Now safe to create PR
```

### Rule 6: Merge Only After Review

When feature is complete:
1. Push feature branch to GitHub
2. Create Pull Request
3. Review changes
4. Merge to main (via GitHub PR or locally)
5. Delete feature branch

```bash
# After merge is complete
git checkout main
git pull origin main
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

### Example Workflow

```bash
# 1. Starting new feature: Instagram OAuth
git checkout main
git pull origin main
git checkout -b feature/instagram-oauth

# 2. Create OAuth handler file
# (Claude writes app/oauth/instagram.py)
git add app/oauth/instagram.py
git commit -m "feat(oauth): add Instagram OAuth handler class"

# 3. Add configuration
# (Claude updates config.py)
git add config.py
git commit -m "feat(oauth): add Instagram OAuth configuration"

# 4. Write tests
# (Claude writes tests/test_instagram_oauth.py)
git add tests/test_instagram_oauth.py
git commit -m "test(oauth): add unit tests for Instagram OAuth flow"

# 5. Push to GitHub
git push -u origin feature/instagram-oauth

# 6. Feature complete - merge to main
git checkout main
git merge feature/instagram-oauth
git push origin main

# 7. Clean up
git branch -d feature/instagram-oauth
git push origin --delete feature/instagram-oauth
```

### Claude's Responsibilities

When implementing ANY code changes, Claude MUST:

1. ✅ **Check current branch** before writing code
2. ✅ **Create feature branch** if on main
3. ✅ **Write code** in feature branch
4. ✅ **Commit frequently** with descriptive messages
5. ✅ **Push to GitHub after EVERY phase** of work
6. ✅ **Verify remote has all commits** before creating PR
7. ✅ **Never commit** directly to main

**⚠️ CRITICAL: Push Verification Protocol**

Before creating ANY Pull Request, Claude MUST run:

```bash
# 1. Show local branch commits
git log --oneline -20

# 2. Show remote branch commits
git log origin/feature-branch-name --oneline -20

# 3. If different, push immediately
git push origin feature-branch-name

# 4. Verify they now match
git log origin/feature-branch-name --oneline -20
```

**If the remote is behind local, the PR WILL NOT include all work!**

This verification step is **MANDATORY** and **NON-NEGOTIABLE**.

### Exception: Documentation-Only Changes

Minor documentation updates MAY be committed directly to main:
- Typo fixes in README
- Comment updates
- Session log additions

**BUT** - when in doubt, use a feature branch.

---

## 🔴 Critical Incident: Week 2 OAuth Orphaned Commits (2025-11-20)

### What Happened

On 2025-11-20, Phases 3-6 of Week 2 OAuth implementation (5 commits, 162 tests, ~1500 lines of code) were completed but **never pushed to remote** before PR #3 was created. When the feature branch was deleted after merge, these commits became orphaned in the reflog. They had to be recovered manually using `git reflog` and cherry-picking.

### Root Cause Analysis

**The Problem:**
1. ✅ Work was completed (Phases 3-6: OAuth handler, API endpoints, comprehensive tests)
2. ✅ Commits were made to local `feature/week2-instagram-oauth` branch
3. ❌ **Commits were NEVER pushed to remote**
4. ❌ PR #3 was created with only 3 commits (documentation from Phase 1-2)
5. ❌ PR was merged, feature branch deleted from remote
6. ❌ 5 commits orphaned in local reflog only

**Timeline:**
- 08:14 - Commit: `feat(oauth): implement Instagram OAuth handler module` ← NOT PUSHED
- 08:20 - Commit: `feat(oauth): implement Instagram OAuth API endpoints` ← NOT PUSHED
- 08:28 - Commit: `test(oauth): add comprehensive OAuth unit tests` ← NOT PUSHED
- 08:30 - Commit: `docs: update Week 2 log with completion summary` ← NOT PUSHED
- 08:38 - Commit: `docs(oauth): add comprehensive OAuth docs` ← NOT PUSHED
- 08:45 - **PR #3 created** - Only had 3 earlier commits from phases 1-2
- 08:45 - **PR #3 merged** - Missing all Phase 3-6 work!
- 08:45 - **Feature branch deleted** - 5 commits orphaned

**Detection:**
- After merge, `pytest tests/ -q` showed "101 passed" instead of expected "162 passed"
- Investigation revealed OAuth implementation files missing from main
- `git reflog` showed orphaned commits existed locally
- Had to recover by creating new branch from reflog commit

### Lessons Learned

1. **Never assume commits are pushed** - Always verify with `git log origin/branch`
2. **Push after every phase** - Not just at the end
3. **Verify before PR** - Check remote has all commits before creating PR
4. **Count tests** - Final test count is a verification metric
5. **Check file existence** - Verify expected files exist on main after merge

### Prevention Measures (Now Mandatory)

#### 1. Push After Every Phase
```bash
# After completing Phase X
git add .
git commit -m "phase X: description"
git push origin feature/branch-name  # ← MANDATORY
```

#### 2. Verification Before PR Creation
```bash
# MANDATORY before 'gh pr create'
git log --oneline -20
git log origin/feature-branch --oneline -20
# These MUST match! If not, push immediately.
```

#### 3. Post-Merge Verification
```bash
# After merging PR to main
git checkout main
git pull origin main
pytest tests/ -q  # Verify test count matches expectation
ls -la app/oauth/  # Verify expected files exist
```

#### 4. Claude Must Always:
- ✅ Push after every significant commit
- ✅ Verify remote before creating PR
- ✅ Verify test count after merge
- ✅ Verify file existence after merge
- ✅ Alert user if anything looks wrong

### Recovery Process (For Future Reference)

If commits become orphaned:

```bash
# 1. Find orphaned commits
git reflog --all --date=iso | grep "2025-11-20"

# 2. Identify the last good commit
git show abc123 --stat

# 3. Create recovery branch
git checkout -b recover/branch-name abc123

# 4. Verify all work is there
pytest tests/ -q
ls -la <expected-files>

# 5. Merge into main
git checkout main
git merge recover/branch-name --no-ff

# 6. Push and cleanup
git push origin main
git branch -d recover/branch-name
```

### Success Metrics

Going forward, these metrics confirm successful Git workflow:

- ✅ Feature branch exists on remote (visible on GitHub)
- ✅ Local and remote commit logs match exactly
- ✅ PR shows ALL commits from the feature
- ✅ Test count increases as expected after merge
- ✅ All expected files exist after merge

**This incident must never happen again.**

---

## Git Best Practices

### Commit Message Conventions

Follow **Conventional Commits** specification (https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Commit Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring (no feature or bug fix)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependencies, config
- **ci**: CI/CD configuration changes
- **build**: Build system or external dependencies

#### Examples

```bash
feat(instagram): implement OAuth 2.0 authentication flow
fix(scheduler): resolve duplicate job execution on restart
docs(readme): add installation instructions
refactor(api): extract token refresh logic into service
test(oauth): add unit tests for token encryption
chore(deps): update APScheduler to v3.10.4
```

#### Commit Message Rules

1. **Use imperative mood** in subject line ("add" not "added" or "adds")
2. **Keep subject under 72 characters**
3. **Capitalize first letter** of subject
4. **No period at end** of subject
5. **Separate subject from body** with blank line
6. **Wrap body at 72 characters**
7. **Use body to explain WHAT and WHY**, not HOW

### Branching Strategy

#### Main Branches

- **`main`** - Production-ready code, always stable
- **`develop`** - Integration branch for features (optional for solo projects)

#### Supporting Branches

- **`feature/*`** - New features
  - Example: `feature/instagram-oauth`, `feature/post-scheduling`
  - Branch from: `main` or `develop`
  - Merge to: `main` or `develop`

- **`bugfix/*`** - Bug fixes for development
  - Example: `bugfix/token-refresh-error`, `bugfix/rate-limit-handling`
  - Branch from: `main` or `develop`
  - Merge to: `main` or `develop`

- **`hotfix/*`** - Urgent production fixes
  - Example: `hotfix/security-patch`, `hotfix/api-endpoint-error`
  - Branch from: `main`
  - Merge to: `main` AND `develop`

- **`docs/*`** - Documentation updates
  - Example: `docs/api-reference`, `docs/deployment-guide`
  - Branch from: `main`
  - Merge to: `main`

#### Branch Naming Rules

- Use **lowercase with hyphens**
- Be **descriptive and concise**
- Include **issue/ticket number** if applicable
  - Example: `feature/123-instagram-carousel-support`

### Workflow Guidelines

#### Feature Development Workflow

```bash
# 1. Create and checkout feature branch
git checkout -b feature/instagram-oauth

# 2. Make changes and commit frequently
git add app/oauth/instagram.py
git commit -m "feat(oauth): add Instagram authorization URL generation"

git add tests/test_oauth.py
git commit -m "test(oauth): add tests for Instagram OAuth flow"

# 3. Keep branch updated with main (rebase)
git fetch origin
git rebase origin/main

# 4. Push to remote
git push origin feature/instagram-oauth

# 5. Create Pull Request on GitHub
# (Review, test, approve)

# 6. Merge to main (squash or merge commit)
# 7. Delete feature branch
git branch -d feature/instagram-oauth
git push origin --delete feature/instagram-oauth
```

#### Daily Workflow

```bash
# Start of day: Update local main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/new-feature

# Work, commit, push
git add .
git commit -m "feat(scope): description"
git push origin feature/new-feature

# End of day: Push work in progress
git add .
git commit -m "wip: work in progress on feature X"
git push origin feature/new-feature
```

### Pull Request (PR) Guidelines

#### PR Title Format

Same as commit messages:
```
feat(instagram): implement content publishing API
```

#### PR Description Template

```markdown
## Summary
Brief description of changes

## Changes Made
- List of changes
- Another change

## Testing
- How was this tested?
- What scenarios were covered?

## Screenshots/Recordings
(If applicable)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] All tests passing
```

#### PR Review Requirements

- At least 1 approval before merge (for team projects)
- All CI checks passing
- No merge conflicts
- Branch up to date with main

### Merge Strategies

#### When to Use Each Strategy

1. **Squash and Merge** (Recommended for features)
   - Combines all commits into one
   - Keeps main branch history clean
   - Use for: feature branches with many small commits

2. **Merge Commit** (For milestone merges)
   - Preserves all commits
   - Shows branch history
   - Use for: release branches, large features

3. **Rebase and Merge** (For linear history)
   - Replays commits on top of main
   - Linear history, no merge commits
   - Use for: small features, bug fixes

### Git Commit Best Practices

#### DO

✅ **Commit frequently** - Small, logical commits
✅ **Write descriptive messages** - Explain WHY, not just WHAT
✅ **Test before committing** - Ensure code works
✅ **Review changes** before commit (`git diff`)
✅ **Keep commits focused** - One logical change per commit
✅ **Use branches** - Never commit directly to main
✅ **Pull before push** - Avoid conflicts

#### DON'T

❌ **Commit broken code** to main
❌ **Commit sensitive data** (.env files, API keys, tokens)
❌ **Use vague messages** ("fix stuff", "update", "wip")
❌ **Commit large binary files** without Git LFS
❌ **Force push** to main/shared branches
❌ **Commit commented-out code** - Delete it instead
❌ **Skip testing** before committing

### Handling Sensitive Data

#### Never Commit

- API keys and secrets
- Database credentials
- OAuth tokens
- Private keys
- .env files with real values

#### Use Instead

- `.env.example` with placeholder values
- Environment variables
- Secret management services (Heroku Config Vars, AWS Secrets Manager)
- Git-ignored `.env` files locally

#### If You Accidentally Commit Secrets

```bash
# Remove from last commit (not yet pushed)
git reset --soft HEAD~1
git reset HEAD path/to/file-with-secret
# Edit file, remove secret
git add .
git commit -m "your commit message"

# Already pushed: ROTATE THE SECRET IMMEDIATELY
# Then use git-filter-branch or BFG Repo-Cleaner to remove from history
```

### GitHub-Specific Workflow

#### Setting Up Remote Repository

```bash
# Initialize local repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "chore: initial commit with project structure"

# Add GitHub remote
git remote add origin https://github.com/yourusername/SMS.git

# Push to GitHub
git push -u origin main
```

#### Keeping Fork Updated (if forked)

```bash
# Add upstream remote
git remote add upstream https://github.com/original/repo.git

# Fetch upstream changes
git fetch upstream

# Merge upstream into your branch
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

#### Using GitHub Issues

- Create issues for bugs, features, enhancements
- Reference issues in commits: `feat(api): add rate limiting (fixes #42)`
- Use labels: `bug`, `enhancement`, `documentation`, `good first issue`
- Assign issues to yourself when working on them
- Close issues with commits: `fix(auth): resolve token expiration bug (closes #15)`

---

## Quick Reference Commands

### Git Commands

```bash
# Status and diff
git status
git diff
git diff --staged

# Branching
git branch                        # List branches
git checkout -b feature/name      # Create and switch
git branch -d feature/name        # Delete local branch
git push origin --delete branch   # Delete remote branch

# Committing
git add .
git commit -m "type(scope): message"
git commit --amend                # Amend last commit

# Syncing
git fetch origin
git pull origin main
git push origin branch-name
git push -u origin branch-name    # Set upstream

# Rebasing
git rebase origin/main
git rebase -i HEAD~3              # Interactive rebase last 3 commits

# Stashing
git stash
git stash pop
git stash list

# Undoing changes
git restore file                  # Discard unstaged changes
git restore --staged file         # Unstage file
git reset --soft HEAD~1           # Undo last commit (keep changes)
git reset --hard HEAD~1           # Undo last commit (discard changes)
```

### GitHub CLI Commands (gh)

```bash
# Pull requests
gh pr create                      # Create PR
gh pr list                        # List PRs
gh pr view 123                    # View PR #123
gh pr checkout 123                # Checkout PR #123 locally
gh pr merge 123                   # Merge PR #123

# Issues
gh issue create                   # Create issue
gh issue list                     # List issues
gh issue view 42                  # View issue #42
gh issue close 42                 # Close issue #42

# Repository
gh repo view                      # View repository
gh repo clone owner/repo          # Clone repository
```
