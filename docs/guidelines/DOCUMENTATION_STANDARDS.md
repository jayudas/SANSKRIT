# Documentation Standards

This document outlines documentation requirements and best practices for the SMS project.

---

## Overview

When implementing new features or making significant changes, Claude MUST maintain comprehensive documentation throughout the development process. This ensures project continuity, facilitates handoffs, and provides clear audit trails.

## Documentation Directory Structure

All feature documentation lives in:
```
docs/
├── app-info/                    # Feature development documentation
│   ├── YYYY-MM-DD_desired_functionality.md
│   ├── YYYY-MM-DD_implementation_update.md
│   └── YYYY-MM-DD_current_state.md
├── session-logs/                # Session summaries (see Session Management)
├── architecture/                # Architecture diagrams and decisions
└── guidelines/                  # Project guidelines (Git, docs, etc.)
```

---

## Feature Development Documentation Workflow

**When implementing new features or significant changes, follow this three-stage documentation process:**

### 1. Before Implementation: Requirements Document

**Create**: `docs/app-info/YYYY-MM-DD_desired_functionality.md`

**Purpose**: Document what needs to be built and why

**Required Contents**:
```markdown
# Desired Functionality: [Feature Name]

**Date**: YYYY-MM-DD
**Feature**: Brief description
**Status**: Planning

## Overview
What feature is being added or changed?

## Requirements
- Functional requirement 1
- Functional requirement 2
- Non-functional requirement (performance, security, etc.)

## Platform-Specific Constraints
- Instagram API limits: 25 posts/day, JPEG only, etc.
- Rate limiting considerations
- OAuth token expiration handling
- Database constraints

## Business Logic
- User flow and interactions
- Data validation rules
- Error handling requirements
- Edge cases to consider

## Success Criteria
- [ ] Criterion 1 (testable/measurable)
- [ ] Criterion 2
- [ ] All unit tests passing
- [ ] Integration tests complete
- [ ] Documentation updated

## Technical Approach
Brief outline of implementation strategy

## Dependencies
- External libraries needed
- API endpoints required
- Database changes needed

## Open Questions
- Question 1?
- Question 2?
```

**Example**: `docs/app-info/2025-01-07_desired_instagram_oauth.md`

---

### 2. After Implementation: Implementation Update

**Create**: `docs/app-info/YYYY-MM-DD_implementation_update.md`

**Purpose**: Document what was built and how it works

**Required Contents**:
```markdown
# Implementation Update: [Feature Name]

**Date**: YYYY-MM-DD
**Feature**: Brief description
**Status**: Implemented | In Progress | Blocked

## Summary
Brief summary of what was implemented

## Files Created
- `app/oauth/instagram.py` - Instagram OAuth handler
- `tests/test_instagram_oauth.py` - Unit tests
- `app/models/social_account.py` - Database model

## Files Modified
- `app/__init__.py` - Added OAuth blueprint
- `config.py` - Added Instagram API configuration
- `requirements.txt` - Added requests-oauthlib

## Technical Implementation Details

### OAuth Flow
1. User clicks "Connect Instagram"
2. Redirect to Instagram authorization URL
3. Instagram redirects back with code
4. Exchange code for access token
5. Store encrypted token in database

### Key Components
- **InstagramOAuthHandler**: Manages OAuth flow
- **TokenEncryption**: Fernet encryption for tokens
- **SocialAccount Model**: Stores account data

### Database Changes
- Added `social_accounts` table
- Added `oauth_tokens` table with encrypted fields
- Migration: `2025-01-07_add_social_accounts.py`

### Configuration
Environment variables required:
- `INSTAGRAM_CLIENT_ID`
- `INSTAGRAM_CLIENT_SECRET`
- `INSTAGRAM_REDIRECT_URI`
- `ENCRYPTION_KEY`

## Testing

### Test Results
- ✅ Unit tests: 15/15 passing
- ✅ Integration tests: 5/5 passing
- ✅ Manual testing: OAuth flow works end-to-end
- ✅ Code coverage: 87%

### Build Status
- ✅ All tests passing
- ✅ No linting errors
- ✅ Type hints validated

## Errors Encountered & Solutions

**⚠️ MANDATORY**: Document ALL errors/issues encountered during implementation

For each error, include:
- **Problem**: What error occurred (with error message if applicable)
- **Root Cause**: Why it happened
- **Solution**: How it was fixed
- **File**: Where the fix was applied (with line number if relevant)
- **Prevention**: How to avoid in future (optional)

### Example Format:
```markdown
### Issue 1: Port Conflict
**Problem**: Flask failed to start - "Port 5000 is in use"
**Root Cause**: macOS AirPlay Receiver uses port 5000
**Solution**: Changed port to 5001 in run.py
**File**: `run.py:20`
**Prevention**: Always check port availability on macOS
```

## Known Issues
- [ ] Token refresh logic not yet implemented (see #42)
- [ ] Rate limiting not enforced yet (see #43)

## Pending Items
- [ ] Add token refresh background job
- [ ] Implement rate limit tracking
- [ ] Add user notification for expired tokens

## Lessons Learned

**Document key learnings from this implementation:**
- What worked well
- What to avoid next time
- Unexpected discoveries
- Performance insights

## Related Documentation
- Requirements: `docs/app-info/2025-01-07_desired_instagram_oauth.md`
- API Research: `MASTER_RESEARCH.md` (OAuth 2.0 section)
```

**Example**: `docs/app-info/2025-01-07_implementation_instagram_oauth.md`

---

### 3. Current State Documentation: Living Document

**Maintain**: `docs/app-info/YYYY-MM-DD_current_state.md`

**Purpose**: Up-to-date snapshot of ALL current functionality

**Update Frequency**: After each major feature completion

**Required Contents**:
```markdown
# SMS Application - Current State

**Last Updated**: YYYY-MM-DD
**Version**: Phase X - Feature Y

## Application Overview
Multi-Platform Social Media Scheduler - Instagram-first scheduling application

## Implemented Features

### ✅ Phase 0: Research & Planning (Complete)
- [x] Instagram API research
- [x] OAuth 2.0 security documentation
- [x] APScheduler integration research
- [x] Heroku deployment research
- [x] MASTRA.AI integration research

### ✅ Phase 1: Core Infrastructure (Complete)
- [x] Flask application setup
- [x] PostgreSQL database configuration
- [x] SQLAlchemy models (Users, SocialAccounts, OAuthTokens)
- [x] Alembic migrations
- [x] Environment configuration

### 🔄 Phase 2: Instagram OAuth (In Progress)
- [x] OAuth authorization flow
- [x] Token storage with encryption
- [x] Token validation
- ⏳ Token refresh (pending)
- ⏳ Token revocation handling (pending)

### ⏳ Phase 3: Content Publishing (Pending)
- [ ] Media upload API
- [ ] Single photo posts
- [ ] Video posts
- [ ] Carousel posts
- [ ] Caption and hashtag support

### ⏳ Phase 4: Scheduling Engine (Pending)
- [ ] APScheduler integration
- [ ] Job persistence
- [ ] Retry logic
- [ ] Error handling

### ⏳ Phase 5: MASTRA.AI Integration (Pending)
- [ ] Content optimizer agent
- [ ] Caption generator agent
- [ ] Hashtag recommender agent

## Platform Support

### Instagram
**Status**: OAuth complete, Publishing in progress
**Limitations**:
- 25 posts per day
- JPEG format only for images
- 2-step publish flow (create container → publish)
- Media containers expire after 24 hours

### Future Platforms (Part 2)
- ⏳ Facebook
- ⏳ TikTok
- ⏳ YouTube
- ⏳ Threads

## Database Schema

### Current Tables
- ✅ `users` - User accounts
- ✅ `social_accounts` - Connected social media accounts
- ✅ `oauth_tokens` - Encrypted access/refresh tokens
- ⏳ `scheduled_posts` - Posts scheduled for publishing (pending)
- ⏳ `post_history` - Published post records (pending)
- ⏳ `apscheduler_jobs` - APScheduler job store (pending)

## API Endpoints

### Implemented
- `GET /` - Homepage
- `GET /oauth/instagram/authorize` - Start Instagram OAuth
- `GET /oauth/instagram/callback` - Handle OAuth callback
- `POST /oauth/instagram/disconnect` - Disconnect account

### Pending
- `POST /api/posts/schedule` - Schedule a post
- `GET /api/posts` - List scheduled posts
- `DELETE /api/posts/:id` - Cancel scheduled post
- `GET /api/posts/:id/status` - Check post status

## Testing Status
- Unit Tests: 87% coverage
- Integration Tests: 5 tests (OAuth flow)
- End-to-End Tests: Not yet implemented

## Deployment Status
- **Environment**: Local development
- **Database**: SQLite (local)
- **Production**: Not yet deployed
- **CI/CD**: Not yet configured

## Known Issues
1. Token refresh not implemented (#42)
2. Rate limiting not enforced (#43)
3. No error monitoring/logging (#44)

## Next Milestones
1. Complete Instagram OAuth (token refresh)
2. Implement content publishing API
3. Integrate APScheduler for post scheduling
4. Deploy to Heroku staging environment

## Technical Debt
- Add comprehensive error logging
- Implement health check endpoints
- Add API rate limiting middleware
- Create admin dashboard

## Configuration

### Required Environment Variables
- `DATABASE_URL`
- `SECRET_KEY`
- `INSTAGRAM_CLIENT_ID`
- `INSTAGRAM_CLIENT_SECRET`
- `INSTAGRAM_REDIRECT_URI`
- `ENCRYPTION_KEY`

### Optional Environment Variables
- `OPENAI_API_KEY` (for MASTRA)
- `ANTHROPIC_API_KEY` (for MASTRA)
```

**Example**: `docs/app-info/2025-01-07_current_state.md`

---

## When to Create Documentation

### REQUIRED Documentation

Documentation is **MANDATORY** for:

1. ✅ **New features** (all three documents required)
   - New OAuth provider integration
   - New API endpoints
   - New database models
   - New scheduling features

2. ✅ **Significant changes** (implementation update + current state update)
   - Database schema changes
   - API breaking changes
   - Security updates
   - Major refactoring

3. ✅ **Current state updates** (after any feature completion)
   - Update after each phase completion
   - Mark features as ✅ complete or ⏳ pending
   - Keep milestone tracking current

### OPTIONAL Documentation

Documentation is **RECOMMENDED** but optional for:

- Minor bug fixes (unless security-related)
- Code style improvements
- Comment additions
- Documentation typo fixes

---

## Documentation Best Practices

### DO

✅ **Use clear status markers**:
- ✅ Completed/Implemented
- ⏳ Pending/In Progress
- ❌ Blocked/Deprecated

✅ **Keep current state document updated** after every feature
✅ **Reference issue numbers** when applicable
✅ **Include code examples** in implementation docs
✅ **Document platform-specific constraints** (Instagram 25/day limit, etc.)
✅ **List all file changes** with descriptions
✅ **Include test results** and coverage metrics
✅ **Note pending items** and known issues
✅ **Document ALL errors encountered** with root cause and solution (MANDATORY)
✅ **Include "Lessons Learned"** section in implementation docs
✅ **Track performance metrics** (time vs estimate)

### DON'T

❌ Don't create documentation for trivial changes
❌ Don't leave outdated documentation (update current state!)
❌ Don't skip success criteria in requirements docs
❌ Don't forget to document environment variables
❌ Don't omit known issues or pending work

---

## Documentation Maintenance

### Claude's Responsibilities

1. **Before coding**: Check if requirements doc exists, create if needed
2. **After coding**: Always create implementation update doc
3. **After feature complete**: Update current state doc
4. **During session**: Reference documentation in commit messages
5. **End of session**: Ensure all docs are current

### Example Workflow

```bash
# 1. Starting new feature
git checkout -b feature/instagram-publishing

# 2. Create requirements doc
# (Claude creates docs/app-info/2025-01-07_desired_instagram_publishing.md)

# 3. Implement feature
# (Claude writes code, tests)

# 4. Create implementation update
# (Claude creates docs/app-info/2025-01-07_implementation_instagram_publishing.md)

# 5. Update current state
# (Claude updates docs/app-info/2025-01-07_current_state.md)

# 6. Commit with reference
git commit -m "feat(instagram): implement content publishing API

See docs/app-info/2025-01-07_implementation_instagram_publishing.md
for complete implementation details."

# 7. Push and merge
git push -u origin feature/instagram-publishing
```

---

## Template Files

**Quick Start**: Copy template files from `docs/templates/` (to be created):
- `desired_functionality_template.md`
- `implementation_update_template.md`
- `current_state_template.md`

---

## Session Log Format

Location: `docs/session-logs/YYYY-MM-DD-feature-name.md`

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

---

## Code Documentation Standards

### Python Docstrings

```python
def generate_tokens(user_id: int) -> dict:
    """Generate JWT access and refresh tokens for a user.

    Args:
        user_id: The database ID of the user

    Returns:
        Dictionary containing:
            - access_token: JWT access token (1 hour expiry)
            - refresh_token: JWT refresh token (30 days expiry)

    Example:
        >>> tokens = generate_tokens(user_id=42)
        >>> print(tokens['access_token'])
    """
    # Implementation...
```

### Inline Comments

- Use comments to explain **WHY**, not **WHAT**
- Comment complex business logic
- Document workarounds and their reasons
- Reference issue/ticket numbers for context

```python
# Convert user_id to string for JWT (Flask-JWT-Extended requirement)
# See: https://flask-jwt-extended.readthedocs.io/
identity = str(user_id)

# Workaround for Instagram API rate limit (#42)
# Wait 1 second between API calls to avoid 429 errors
time.sleep(1)
```

---

## API Documentation Standards

Use Flask-RESTX decorators for automatic Swagger generation:

```python
@auth_ns.doc('register_user',
    responses={
        201: 'User created successfully',
        400: 'Invalid request data',
        409: 'Email already registered'
    })
@auth_ns.expect(register_model, validate=True)
@auth_ns.marshal_with(token_response, code=201)
def post(self):
    """Register a new user account."""
    # Implementation...
```
