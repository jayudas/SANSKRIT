# Sanskrit Learning Platform - Setup Guide

## Initial Setup Complete! ✅

The project structure has been initialized with:
- ✅ Next.js 14 with TypeScript
- ✅ Turborepo monorepo structure
- ✅ Tailwind CSS configuration
- ✅ Prisma database schema
- ✅ Shared type definitions
- ✅ Basic UI layout

## Next Steps

### 1. Set Up PostgreSQL Database

**Option A: Install PostgreSQL Locally**

```bash
# macOS (using Homebrew)
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb sanskrit_learning
```

**Option B: Use Docker**

```bash
# Create and start PostgreSQL container
docker run --name sanskrit-postgres \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=sanskrit_learning \
  -p 5432:5432 \
  -d postgres:14
```

### 2. Configure Environment Variables

Create `.env` file in `packages/database/`:

```bash
cd packages/database
cp ../../.env.example .env
```

Edit `.env` and update the DATABASE_URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/sanskrit_learning"
```

### 3. Initialize the Database

```bash
# From packages/database directory
cd packages/database

# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

### 4. Start the Development Server

```bash
# Return to root directory
cd ../..

# Start all apps
npm run dev
```

The application will be available at `http://localhost:3000`

## What's Next?

After completing the setup, we'll build:

### Week 1-2: Core Components
1. **Lesson Viewer** - Display formatted lesson content
2. **Audio Player** - Play pronunciation samples
3. **Devanagari Text Renderer** - Beautiful Sanskrit text display
4. **Flashcard Component** - Interactive vocabulary cards
5. **Progress Tracker** - Visual progress indicators

### Week 3: Content Import
1. Extract Phase 1, Month 1, Week 1 content from curriculum
2. Create JSON data structures
3. Import into database
4. Add audio file placeholders

### Week 4: Interactive Features
1. Quiz engine (multiple choice, fill-in-blank)
2. Script practice tool (basic version)
3. User progress tracking
4. Basic authentication

## Project Structure

```
SANSKRIT/
├── apps/
│   └── web/                    # Next.js application
│       ├── src/
│       │   ├── app/            # App router pages
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   └── globals.css
│       │   ├── components/     # React components (to build)
│       │   └── lib/            # Utilities (to build)
│       ├── public/             # Static assets
│       ├── package.json
│       ├── next.config.js
│       └── tailwind.config.ts
├── packages/
│   ├── database/               # Prisma & database
│   │   ├── prisma/
│   │   │   └── schema.prisma   # Database schema ✅
│   │   ├── index.ts
│   │   └── package.json
│   └── types/                  # Shared TypeScript types
│       ├── index.ts            # Type definitions ✅
│       └── package.json
├── content/                    # Course content (to create)
│   └── phases/
│       └── phase-1/
│           └── month-1/
│               └── week-1/
├── public/                     # Audio files (to create)
│   └── audio/
│       ├── phonemes/
│       ├── words/
│       └── sentences/
├── package.json
├── turbo.json
└── README.md
```

## Database Schema Overview

The Prisma schema includes tables for:

- **Users** - User accounts and authentication
- **Phases/Modules/Lessons** - Course structure
- **Vocabulary** - Sanskrit word database
- **Exercises** - Quizzes and practice exercises
- **UserFlashcards** - Spaced repetition system
- **UserProgress** - Learning progress tracking
- **Achievements** - Gamification elements
- **DailyStats** - Study analytics

## Troubleshooting

### Database Connection Issues

If you get a database connection error:

1. Verify PostgreSQL is running: `pg_isready`
2. Check DATABASE_URL in `.env` is correct
3. Ensure database exists: `psql -l | grep sanskrit`

### Dependency Issues

If npm install fails:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Port Already in Use

If port 3000 is taken:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format

# Database commands (from packages/database)
npm run db:studio      # Open Prisma Studio
npm run db:migrate     # Create migrations
npm run db:push        # Push schema changes
npm run db:seed        # Seed sample data
```

## Need Help?

Check the main README.md for more information, or review the inline code comments.

---

**Ready to build!** 🚀

Once you've completed the database setup, let me know and we'll start building the core components and importing the first month of content.
