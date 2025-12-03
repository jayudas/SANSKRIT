# Server Management - MANDATORY for All Sessions

**Status:**   **MANDATORY** - Must be followed for ALL server operations
**Created:** December 2, 2025
**Last Updated:** December 2, 2025

---

## =¨ CRITICAL RULE: ALWAYS Check Before Starting Any Server =¨

**This rule applies to:**
-  Dev servers (frontend, backend)
-  Testing servers
-  Production servers
-  Database servers
-  ANY server or service

**This rule applies when:**
-  Testing features
-  Debugging issues
-  Running demonstrations
-  ANY time you need to start a server

**NO EXCEPTIONS. EVERY TIME. EVERY SERVER.**

---

## The Mandatory Workflow

### BEFORE Starting ANY Server

**Step 1: Check if server is already running**

```bash
# Frontend dev server (Vite/React)
lsof -i :5173

# Backend dev server (Flask)
lsof -i :5001

# Backend production (Gunicorn, if running locally)
lsof -i :8000

# PostgreSQL (if running locally)
lsof -i :5432

# General format for any port
lsof -i :<PORT_NUMBER>
```

**Step 2: If server IS running:**

```bash
# Output will show:
COMMAND   PID        USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    91532 johnkitchin   18u  IPv6 0x9b535c1c08e36f48      0t0  TCP localhost:5173 (LISTEN)
```

**Then you MUST:**
1.  **Ask the user**: "A server is already running on port XXXX (PID: YYYY). Would you like me to use the existing server or restart with a fresh instance?"
2.  **Wait for user response**
3.  **If user says "use existing"**: Do NOT start new server, use existing
4.  **If user says "restart fresh"**: Kill existing (`kill <PID>`), THEN start new
5.  **NEVER start a new server without killing the old one first**

**Step 3: If server is NOT running:**

```bash
# Output will be empty (no processes found)
# OR you'll see a message like "No such process"
```

**Then you can:**
1.  Start the server normally
2.  Verify it starts on the EXPECTED port

---

## Why This Rule Exists

### Problems Prevented

1. **Multiple server instances** - Causes confusion about which code is running
2. **Port conflicts** - Server starts on unexpected port (5174 instead of 5173)
3. **Wasted resources** - Multiple servers consuming memory/CPU
4. **Old code running** - User thinks they're testing new code, but old server still running
5. **User frustration** - User has to manually kill servers
6. **Debugging hell** - "Why isn't my change showing up?" (because old server still running)

### Session 15 Example (What NOT to Do)

**L WRONG:**
```bash
# Claude just started server without checking
npm run dev
# Output: Port 5173 is in use, trying another one...
# Server starts on 5174
```

**Problem:** User had to ask "Why is it on 5174?" and manually clean up.

** CORRECT:**
```bash
# Step 1: Check first
lsof -i :5173
# Found: PID 91532 running

# Step 2: Ask user
"A dev server is already running on port 5173 (PID: 91532).
Would you like me to:
1. Use the existing server
2. Kill it and start a fresh one"

# Step 3: Wait for response, then act accordingly
```

---

## Command Reference

### Check If Server Running

```bash
# Frontend (port 5173)
lsof -i :5173

# Backend (port 5001)
lsof -i :5001

# Check multiple ports at once
lsof -i :5173 -i :5001

# Show all listening ports (overview)
lsof -iTCP -sTCP:LISTEN -P
```

### Kill Server

```bash
# Kill by PID (from lsof output)
kill <PID>

# Forcefully kill if needed
kill -9 <PID>

# Kill all node processes (USE WITH CAUTION)
pkill node

# Kill all Python processes (USE WITH CAUTION)
pkill python
```

### Verify Server Stopped

```bash
# Check port is now free
lsof -i :5173

# Should show no output or "No such process"
```

### Start Server (After Verification)

```bash
# Frontend
cd frontend && npm run dev

# Backend
source venv/bin/activate && flask run --port=5001

# Background mode (if needed)
npm run dev &  # Run in background
```

---

## Checklist: Before Starting ANY Server

- [ ] Run `lsof -i :<PORT>` to check if server is running
- [ ] If running: Ask user whether to use existing or restart
- [ ] If restarting: Kill existing server first
- [ ] Verify port is free before starting new server
- [ ] Start server and verify it's on EXPECTED port
- [ ] Document which server is running (if multiple sessions)

---

## Special Cases

### Multiple Ports Needed

If you need both frontend and backend running:

```bash
# Check both ports
lsof -i :5173  # Frontend
lsof -i :5001  # Backend

# Handle each independently
# Ask user about each running server
```

### Background vs Foreground

- **Foreground:** Server output visible, easy to stop (Ctrl+C)
- **Background:** Server runs in background, requires manual kill
- **Recommendation:** Use foreground for testing, background only if needed

### Port Already in Use (Non-Project Server)

If port is used by non-project process:
1. Ask user if they want to kill it
2. User might have other services running (e.g., other projects)
3. NEVER automatically kill without asking

---

## Integration with Other Workflows

### Testing Workflow (Level 2)

Server management is part of the Testing Workflow, but applies MORE BROADLY:
- Testing requires servers ’ follow server management rules
- BUT server management rules apply EVEN when not testing

### Session Handoff

When ending a session, document running servers:
```markdown
**Running Servers:**
- Frontend: http://localhost:5173 (PID: 91532)
- Backend: http://localhost:5001 (PID: 91533)
- User may want to keep these running or stop them
```

---

## Commitment

**Claude Code will:**
-  ALWAYS check for running servers before starting new ones
-  ALWAYS ask user if server already running
-  ALWAYS kill old server before starting new (if user requests)
-  ALWAYS verify server is on expected port
-  NEVER start multiple instances of same server
-  NEVER assume user wants old server killed
-  NEVER assume user wants new server started

**This applies to EVERY session, EVERY server, EVERY time.**

**No exceptions.**

---

## See Also

- [Testing Workflow](./TESTING_WORKFLOW.md) - Mandatory testing process
- [Session Management](./SESSION_MANAGEMENT.md) - Session continuity guidelines
