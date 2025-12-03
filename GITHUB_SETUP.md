# GitHub Repository Setup Guide

## Current Status

✅ **Completed:**
- Git repository initialized locally
- Initial commit created with all project files
- All development guidelines and best practices imported

📋 **Next Steps:**
1. Create GitHub repository
2. Connect local repository to GitHub
3. Push initial commit

---

## Step 1: Create GitHub Repository

You have two options:

### Option A: Using GitHub CLI (Recommended)

```bash
cd /Users/johnkitchin/AI/SANSKRIT/sanskrit-learning-platform

# Create public repository
gh repo create SANSKRIT --public --source=. --remote=origin --push

# OR create private repository
gh repo create SANSKRIT --private --source=. --remote=origin --push
```

This command will:
- Create the repository on GitHub
- Add it as a remote named "origin"
- Push your initial commit automatically

### Option B: Using GitHub Web Interface

1. Go to https://github.com/new
2. Repository name: `SANSKRIT`
3. Description: "Interactive web-based Classical Sanskrit learning application"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

Then connect your local repository:

```bash
cd /Users/johnkitchin/AI/SANSKRIT/sanskrit-learning-platform

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/SANSKRIT.git

# Verify remote was added
git remote -v

# Push initial commit
git push -u origin main
```

---

## Step 2: Verify GitHub Setup

After pushing, verify everything is on GitHub:

1. Visit your repository: `https://github.com/YOUR_USERNAME/SANSKRIT`
2. Check that all files are present:
   - ✅ CLAUDE.md
   - ✅ README.md
   - ✅ SETUP.md
   - ✅ docs/guidelines/ (all 10 guideline files)
   - ✅ apps/web/ (Next.js application)
   - ✅ packages/ (database and types)

3. Verify the initial commit is visible in the commit history

---

## Step 3: Set Up Repository Settings (Optional)

### Add Repository Description

On GitHub repository page:
- Go to Settings
- Edit description: "Interactive web-based Classical Sanskrit learning application"
- Add topics: `sanskrit`, `education`, `language-learning`, `nextjs`, `typescript`, `react`

### Enable Branch Protection (Recommended)

To protect the main branch:

1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Require conversation resolution before merging

### Add Collaborators (If Needed)

- Go to Settings → Collaborators
- Add team members or collaborators

---

## Git Workflow Summary

From now on, **ALWAYS** follow the feature branch workflow:

### Creating a New Feature

```bash
# 1. Ensure main is up to date
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# Example:
git checkout -b feature/devanagari-text-component
git checkout -b feature/lesson-viewer
git checkout -b feature/flashcard-system

# 3. Make changes and commit frequently
git add <files>
git commit -m "feat(scope): description"

# 4. Push to GitHub (CRITICAL: Do this after EVERY phase of work)
git push -u origin feature/your-feature-name  # First push
git push origin feature/your-feature-name     # Subsequent pushes

# 5. Create Pull Request
gh pr create --title "feat: Add feature name" --body "Description of changes"

# 6. After PR is approved and merged
git checkout main
git pull origin main
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

### Important Rules

⚠️ **NEVER commit directly to main** - Always use feature branches
⚠️ **ALWAYS push after each phase** - Don't wait until the end
⚠️ **VERIFY before PR** - Check remote has all commits: `git log origin/branch --oneline`
⚠️ **Test before committing** - Follow the 6-level testing workflow

---

## Commit Message Format

Follow Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies, config

### Examples:

```bash
git commit -m "feat(lessons): add Devanagari character viewer component"
git commit -m "feat(flashcards): implement SM-2 spaced repetition algorithm"
git commit -m "fix(audio): resolve playback issue on Safari"
git commit -m "docs(setup): add PostgreSQL installation instructions"
git commit -m "test(vocab): add unit tests for vocabulary import"
git commit -m "chore(deps): update Next.js to v14.0.4"
```

---

## Quick Reference Commands

```bash
# Check current branch
git branch

# Check status
git status

# View commit history
git log --oneline -10

# View remote branches
git branch -r

# Create and switch to new branch
git checkout -b feature/name

# Push current branch to GitHub
git push origin $(git branch --show-current)

# Create Pull Request
gh pr create

# View Pull Requests
gh pr list

# Merge Pull Request
gh pr merge <number>
```

---

## Next Session Checklist

When starting your next Claude Code session:

1. ✅ Read CLAUDE.md for context
2. ✅ Check current branch: `git branch`
3. ✅ If on main, create feature branch before coding
4. ✅ Follow Testing Workflow before every commit
5. ✅ Push after every phase of work
6. ✅ Verify remote before creating PR

---

## Resources

- [Git Workflow Guide](docs/guidelines/GIT_WORKFLOW.md) - Full workflow documentation
- [Testing Workflow](docs/guidelines/TESTING_WORKFLOW.md) - Testing requirements
- [Pre-Commit Checklist](docs/guidelines/PRE_COMMIT_CHECKLIST.md) - Review before commits
- [Documentation Standards](docs/guidelines/DOCUMENTATION_STANDARDS.md) - How to document

---

**Ready to push to GitHub!** Use the commands above to create your repository and push your initial commit.
