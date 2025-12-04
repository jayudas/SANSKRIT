# Content Directory Structure

This directory contains all curriculum content for the Sanskrit Learning Platform, organized by phase, month, and week.

## Directory Organization

```
content/
├── phases/
│   ├── phase-1/           # Foundation (Months 1-6)
│   │   ├── month-1/
│   │   │   ├── week-1/
│   │   │   │   ├── meta.json           # Week metadata
│   │   │   │   ├── lesson-*.json       # Individual lesson files
│   │   │   │   └── exercises.json      # Week exercises
│   │   │   └── week-2/
│   │   └── month-2/
│   ├── phase-2/           # Intermediate (Months 7-12)
│   ├── phase-3/           # Advanced (Months 13-18)
│   └── phase-4/           # Mastery (Months 19-24)
│
└── shared/
    ├── vocabulary/        # Shared vocabulary entries
    ├── grammar/          # Grammar reference files
    └── references/       # Additional reference materials
```

## JSON Schemas

### 1. Week Metadata (`meta.json`)

Describes the goals and structure of each week.

**Schema:**
```json
{
  "week": number,
  "month": number,
  "phase": number,
  "title": string,
  "description": string,
  "objectives": string[],
  "estimatedHours": number,
  "order": number
}
```

**Example:** See `phases/phase-1/month-1/week-1/meta.json`

---

### 2. Lesson Content (`lesson-*.json`)

Individual lesson with structured learning content.

**Schema:**
```json
{
  "lessonId": string,              // Format: "p{phase}-m{month}-w{week}-l{lesson}"
  "title": string,
  "order": number,
  "estimatedMinutes": number,
  "objectives": string[],
  "sections": [
    {
      "type": "introduction" | "content" | "practice" | "summary",
      "title": string,
      "content": string,          // Main text content
      "order": number,
      "items": [                  // For content sections (optional)
        {
          "devanagari": string,   // Sanskrit character/word
          "iast": string,         // IAST romanization
          "ipa": string,          // IPA pronunciation (optional)
          "pronunciation": string, // English pronunciation guide
          "audioFile": string,    // Path to audio file
          "category": string,     // E.g., "short-vowel", "consonant"
          "examples": [           // Word examples (optional)
            {
              "word": string,
              "iast": string,
              "meaning": string,
              "audioFile": string
            }
          ],
          "note": string          // Additional notes (optional)
        }
      ],
      "exerciseId": string        // For practice sections (optional)
    }
  ],
  "resources": [                  // Optional reference materials
    {
      "type": "reference" | "practice" | "video",
      "title": string,
      "url": string
    }
  ]
}
```

**Example:** See `phases/phase-1/month-1/week-1/lesson-1-vowels.json`

**Section Types:**
- `introduction` - Overview and context
- `content` - Main teaching content with items
- `practice` - Links to exercises
- `summary` - Recap and next steps

---

### 3. Vocabulary (`vocabulary/*.json`)

Shared vocabulary entries with rich metadata.

**Schema:**
```json
{
  "vocabulary": [
    {
      "id": string,               // Unique ID (e.g., "vocab-001")
      "devanagari": string,       // Sanskrit word in Devanagari
      "iast": string,             // IAST romanization
      "ipa": string,              // IPA pronunciation
      "meaning": string,          // English meaning
      "partOfSpeech": "noun" | "verb" | "adjective" | "pronoun" | "adverb" | "preposition",
      "gender": "masculine" | "feminine" | "neuter" | null,
      "difficulty": number,       // 1-5 scale
      "frequency": "very-high" | "high" | "medium" | "low" | "rare",
      "etymology": string,        // Word origin (optional)
      "audioFile": string,        // Path to audio pronunciation
      "tags": string[],           // Categorization tags
      "examples": [               // Usage examples
        {
          "sentence": string,     // Devanagari sentence
          "iast": string,         // IAST romanization
          "translation": string,  // English translation
          "audioFile": string     // Sentence audio (optional)
        }
      ],
      "relatedWords": [           // Related vocabulary (optional)
        {
          "word": string,
          "iast": string,
          "relation": string,     // E.g., "synonym", "antonym", "root"
          "meaning": string
        }
      ],
      "culturalNotes": string,    // Cultural context (optional)
      "moduleId": string,         // Which module introduces this word
      "weekIntroduced": number    // Which week it's introduced
    }
  ]
}
```

**Example:** See `shared/vocabulary/example-vocabulary.json`

---

### 4. Exercises (`exercises.json`)

Interactive exercises for practice and assessment.

**Schema:**
```json
{
  "exercises": [
    {
      "exerciseId": string,       // Format: "p{phase}-m{month}-w{week}-e{exercise}"
      "title": string,
      "type": "multiple-choice" | "matching" | "fill-in-blank" | "canvas-drawing",
      "difficulty": "beginner" | "intermediate" | "advanced",
      "estimatedMinutes": number,
      "instructions": string,
      "passingScore": number,     // Percentage (e.g., 70)
      "tags": string[],

      // Type-specific fields:

      // For "multiple-choice":
      "questions": [
        {
          "id": string,
          "questionText": string,
          "audioFile": string,    // Optional audio for question
          "questionType": "audio-to-character" | "character-matching" | "audio-classification",
          "options": [
            {
              "id": string,
              "text": string,
              "isCorrect": boolean
            }
          ],
          "explanation": string,
          "points": number
        }
      ],

      // For "matching":
      "pairs": [
        {
          "id": string,
          "left": {
            "text": string,
            "audioFile": string   // Optional
          },
          "right": {
            "text": string,
            "audioFile": string   // Optional
          }
        }
      ],
      "explanation": string,

      // For "fill-in-blank":
      "questions": [
        {
          "id": string,
          "sentence": string,     // With _ for blank
          "blankPosition": number,
          "audioFile": string,    // Optional audio
          "correctAnswer": string,
          "acceptedAnswers": string[], // Variations accepted
          "hint": string,         // Optional hint
          "explanation": string,
          "points": number
        }
      ],

      // For "canvas-drawing":
      "characters": [
        {
          "character": string,
          "strokeOrder": [
            {
              "path": string,     // SVG path data
              "order": number
            }
          ],
          "referenceImage": string, // Path to reference image
          "audioFile": string   // Character pronunciation
        }
      ],
      "passingCriteria": string
    }
  ]
}
```

**Example:** See `phases/phase-1/month-1/week-1/exercises.json`

**Exercise Types:**
- `multiple-choice` - Select correct answer from options
- `matching` - Match pairs of items (e.g., short/long vowels)
- `fill-in-blank` - Type missing character/word
- `canvas-drawing` - Draw characters with stroke order

---

## Content Import Process

Content is imported into the database using the import script:

```bash
# Import all content
npm run import:content

# Import specific phase/month/week
npm run import:content -- --phase 1 --month 1 --week 1
```

The import script (`scripts/import-content.ts`) will:
1. Read JSON files from the content directory
2. Validate schema structure
3. Create database entries (phases, modules, lessons, vocabulary, exercises)
4. Link related entities (lessons to modules, exercises to lessons)
5. Verify audio file paths exist

---

## Content Creation Workflow

### Adding a New Week

1. **Create directory structure:**
   ```bash
   mkdir -p content/phases/phase-{P}/month-{M}/week-{W}
   ```

2. **Create `meta.json`:**
   - Define week objectives, title, description
   - Set estimated hours

3. **Create lesson files:**
   - Name: `lesson-{N}-{topic}.json` (e.g., `lesson-1-vowels.json`)
   - Follow lesson schema
   - Include sections: introduction, content, practice, summary

4. **Create `exercises.json`:**
   - Design 3-5 exercises per week
   - Mix exercise types for variety
   - Ensure audio files are planned

5. **Add vocabulary:**
   - Create entries in `shared/vocabulary/`
   - Link to module via `moduleId` and `weekIntroduced`

6. **Run import:**
   ```bash
   npm run import:content -- --phase {P} --month {M} --week {W}
   ```

7. **Verify in Prisma Studio:**
   ```bash
   npm run db:studio
   ```

---

## Audio File Organization

Audio files referenced in content should be organized as:

```
apps/web/public/audio/
├── phonemes/
│   ├── vowels/
│   │   ├── a.mp3
│   │   ├── aa.mp3
│   │   └── ...
│   └── consonants/
│       ├── ka.mp3
│       └── ...
├── words/
│   ├── agni.mp3
│   ├── deva.mp3
│   └── ...
└── sentences/
    └── ...
```

**Audio File Naming:**
- Use IAST romanization (lowercase)
- Use hyphens for multi-word phrases
- Format: MP3 (128kbps, 44.1kHz)

---

## Validation

Before committing content, validate:

1. **JSON syntax:** All files are valid JSON
2. **Required fields:** All required schema fields present
3. **IDs are unique:** No duplicate lessonId, exerciseId, vocab id
4. **Audio paths:** All referenced audio files exist or are planned
5. **Order numbers:** Sequential within each week

---

## Notes

- All Devanagari text should be in Unicode (not images)
- IAST romanization should use proper diacritics (ā, ī, ū, ṛ, ṝ, ḷ, ṃ, ḥ, ṅ, ñ, ṭ, ḍ, ṇ, ś, ṣ)
- Audio files are optional during initial content creation but should be added before user testing
- Cultural notes and etymology enrich learning but are optional

---

**Last Updated:** December 3, 2024
