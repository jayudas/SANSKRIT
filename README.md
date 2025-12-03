# Sanskrit Learning Platform

An interactive web-based application for learning Classical Sanskrit, based on a comprehensive 24-month curriculum.

## Project Structure

```
SANSKRIT/
├── apps/
│   └── web/                 # Next.js 14 web application
├── packages/
│   ├── database/            # Prisma schema and database utilities
│   └── types/               # Shared TypeScript types
├── content/                 # Course content (to be added)
└── public/                  # Static assets (to be added)
```

## Tech Stack

- **Frontend**: Next.js 14 (React) with TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand + React Query
- **Audio**: Howler.js
- **Monorepo**: Turborepo

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or pnpm

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Create a PostgreSQL database:

```bash
createdb sanskrit_learning
```

Create a `.env` file in `packages/database/`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/sanskrit_learning"
```

### 3. Initialize Database

```bash
# Generate Prisma Client
cd packages/database
npm run db:generate

# Run migrations
npm run db:push

# (Optional) Seed with sample data
npm run db:seed
```

### 4. Start Development Server

```bash
# From root directory
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Development Workflow

### Adding New Content

Content is organized by Phase → Month → Week → Lesson structure.

1. Create content files in `content/phases/phase-X/month-X/`
2. Run import scripts to populate database
3. Content automatically appears in the application

### Database Changes

```bash
# Make changes to packages/database/prisma/schema.prisma

# Create migration
npm run db:migrate

# Generate new Prisma Client
npm run db:generate
```

### Testing

```bash
npm run test
```

## Project Status

### ✅ Completed
- Project structure setup
- Database schema design
- Type definitions
- Basic UI layout

### 🚧 In Progress
- Authentication system
- Core components (Flashcard, Quiz, Audio Player)
- Phase 1, Month 1 content

### 📋 Planned
- Script practice tool
- Progress tracking dashboard
- Complete 24-month curriculum
- Audio recording integration
- Mobile responsiveness

## Course Structure

### Phase 1: Foundation (Months 1-6)
- Devanagari script mastery
- Basic grammar and sentence structure
- Essential vocabulary (500+ words)
- Simple reading and writing

### Phase 2: Intermediate (Months 7-12)
- Complex grammar and verb systems
- Expanded vocabulary (1500+ words)
- Reading simple texts
- Basic conversation

### Phase 3: Advanced (Months 13-18)
- Literary texts
- Advanced grammar and composition
- Fluent reading and writing
- Conversational proficiency

### Phase 4: Mastery (Months 19-24)
- Classical literature
- Poetry and drama
- Advanced composition
- Idiomatic expression

## Contributing

This is a personal learning project. Contributions welcome!

## License

MIT
