# Database Schema - Sanskrit Learning Platform

**Last Updated:** December 3, 2024
**Related:** See `packages/database/prisma/schema.prisma` for actual Prisma schema

---

## Overview

The database is designed to support:
- Course content hierarchy (Phase → Module → Lesson)
- Vocabulary management with rich metadata
- User progress tracking at multiple levels
- Spaced repetition flashcard system
- Exercise/quiz results and analytics
- Achievement and gamification system

---

## Core Tables

### User Management

```
users
- id (cuid)
- email (unique)
- name
- passwordHash
- createdAt
- lastLogin
```

### Course Structure

```
phases
- id (integer, 1-4)
- name
- description
- durationMonths
- orderIndex

modules
- id (cuid)
- phaseId (FK to phases)
- month (1-24)
- week (1-4)
- title
- description
- learningObjectives (JSON)
- orderIndex

lessons
- id (cuid)
- moduleId (FK to modules)
- title
- type (video, text, interactive, exercise)
- content (JSON - structured lesson content)
- durationMinutes
- orderIndex
```

### Vocabulary System

```
vocabulary
- id (cuid)
- sanskrit (romanized)
- devanagari (Sanskrit script)
- transliteration (IAST)
- english (meaning)
- partOfSpeech
- gender (masculine/feminine/neuter)
- declensionType
- exampleSentence
- audioUrl
- difficultyLevel (1-5)
- frequencyRank
- tags (JSON array)
```

### Exercise System

```
exercises
- id (cuid)
- moduleId (FK)
- type (multiple-choice, fill-blank, matching, etc.)
- title
- instructions
- content (JSON)
- difficultyLevel
- points
- timeLimitSeconds

exercise_questions
- id (cuid)
- exerciseId (FK)
- questionData (JSON - flexible question structure)
- correctAnswer (JSON)
- explanation
- orderIndex
```

### Flashcard & SRS System

```
user_flashcards
- id (cuid)
- userId (FK)
- vocabularyId (FK)
- easeFactor (float, default 2.5)
- intervalDays (integer)
- repetitions (integer)
- lastReviewed (timestamp)
- nextReview (timestamp)
- status (new, learning, review, relearning)

flashcard_reviews
- id (cuid)
- userFlashcardId (FK)
- userId (FK)
- reviewedAt (timestamp)
- quality (0-5 rating for SM-2 algorithm)
- timeSpentSeconds
```

### Progress Tracking

```
user_progress
- userId (FK)
- moduleId (FK)
- status (not-started, in-progress, completed)
- progressPercentage (0-100)
- startedAt
- completedAt

user_lesson_progress
- userId (FK)
- lessonId (FK)
- completed (boolean)
- timeSpentSeconds
- lastAccessed

user_daily_stats
- userId (FK)
- date
- studyMinutes
- lessonsCompleted
- exercisesCompleted
- flashcardsReviewed
- streakActive (boolean)
```

### Quiz Results

```
quiz_attempts
- id (cuid)
- userId (FK)
- exerciseId (FK)
- score
- maxScore
- percentage
- timeSpentSeconds
- completedAt

quiz_answers
- id (cuid)
- attemptId (FK)
- questionId (FK)
- userAnswer (JSON)
- isCorrect (boolean)
- timeSpentSeconds
```

### Achievements

```
achievements
- id (cuid)
- name
- description
- icon
- criteria (JSON - defines earning conditions)

user_achievements
- userId (FK)
- achievementId (FK)
- earnedAt
```

---

## Key Relationships

- User → Many Progress Records → Modules
- User → Many Flashcards → Vocabulary
- Module → Many Lessons
- Module → Many Exercises → Many Questions
- User → Many Quiz Attempts → Many Answers

---

## Indexes

Critical indexes for performance:

- `user_flashcards(userId, nextReview)` - For SRS scheduling
- `user_progress(userId, status)` - For progress queries
- `modules(phaseId, month, week)` - For navigation
- `vocabulary(difficultyLevel)` - For filtering
- `quiz_attempts(userId, exerciseId)` - For analytics

---

## Implementation

The actual database schema is implemented in Prisma:
- **Location:** `packages/database/prisma/schema.prisma`
- **Migrations:** `packages/database/prisma/migrations/`
- **Commands:**
  - `npm run db:generate` - Generate Prisma client
  - `npm run db:push` - Push schema to database
  - `npm run db:studio` - Open Prisma Studio
  - `npm run db:migrate` - Create new migration

---

**For implementation details, see the actual Prisma schema file.**
