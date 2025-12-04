# Content Structure - Sanskrit Learning Platform

**Last Updated:** December 3, 2024
**Related:** See `classical_sanskrit_course.md` for full curriculum source

---

## Curriculum Mapping

The source curriculum (`classical_sanskrit_course.md`) is a comprehensive 24-month course divided into 4 phases. Here's how it maps to our application:

### Phase 1: Foundation (Months 1-6)
**Goal:** Devanagari script, basic grammar, 500+ vocabulary words

**Month 1: The Devanagari Script**
- Week 1-2: Vowels and Basic Consonants (14 vowels, 10 consonants)
- Week 3-4: Remaining Consonants and Special Characters (23 more consonants, conjuncts)

**Month 2: Basic Grammar Foundations**
- Week 1: Nouns - Introduction to Cases (8 cases, masculine a-stems)
- Week 2: Verbs - Present Tense Introduction
- Week 3-4: Basic Sentence Construction (SOV word order)

**Month 3: Expanding Grammar**
- Week 1-2: Feminine and Neuter Nouns
- Week 3-4: Adjectives and Agreement

**Month 4: Verb System Expansion**
- Week 1-2: Past Tense (Imperfect)
- Week 3-4: Future Tense

**Month 5: Complex Grammar Introduction**
- Week 1-2: Compound Words (Samasa)
- Week 3-4: Pronouns and Demonstratives

**Month 6: Reading and Writing Practice**
- Week 1-2: First Simple Texts (Hitopadesha, Panchatantra, Subhashitas)
- Week 3-4: Composition Practice

### Phase 2: Intermediate (Months 7-12)
**Goal:** Advanced declensions, verb classes, 1500+ vocabulary

**Month 7:** Advanced Noun Declensions (I-stems, U-stems, consonant stems)
**Month 8:** Verb System Deep Dive (10 verb classes, perfect tense, moods)
**Month 9:** Participles and Infinitives
**Month 10:** Sandhi Rules (vowel, consonant, internal)
**Month 11:** Syntax and Advanced Grammar
**Month 12:** Reading Fluency Development

### Phase 3: Advanced (Months 13-18)
**Goal:** Literary texts, composition, conversation, 3000+ vocabulary

**Months 13-14:** Classical Literature Introduction
**Month 15:** Poetics and Prosody (meters, figures of speech)
**Month 16:** Philosophical Texts
**Month 17:** Drama and Conversation
**Month 18:** Composition and Style

### Phase 4: Mastery (Months 19-24)
**Goal:** Mastery level, specialization, 4000+ vocabulary

**Months 19-20:** Advanced Literature
**Month 21:** Specialized Study (choice of focus)
**Months 22-23:** Fluency Consolidation
**Month 24:** Mastery Assessment and Future Planning

---

## Content Data Structure

Each piece of content follows a structured JSON format:

### Lesson Structure

```json
{
  "id": "phase-1-m1-w1-l1",
  "moduleId": "module-uuid",
  "title": "Devanagari Vowels: अ आ इ ई",
  "type": "interactive",
  "orderIndex": 1,
  "durationMinutes": 30,
  "content": {
    "sections": [
      {
        "id": "intro",
        "type": "text",
        "title": "Introduction to Sanskrit Vowels",
        "content": "Sanskrit has 14 vowels..."
      },
      {
        "id": "vowel-a",
        "type": "devanagari",
        "title": "The vowel अ (a)",
        "content": "अ",
        "audioUrl": "/audio/phonemes/a.mp3",
        "metadata": {
          "romanization": "a",
          "ipa": "ə",
          "description": "Short neutral vowel"
        }
      },
      {
        "id": "practice",
        "type": "exercise",
        "content": {
          "exerciseId": "exercise-uuid",
          "type": "audio-recognition"
        }
      }
    ]
  }
}
```

### Vocabulary Entry Structure

```json
{
  "id": "vocab-uuid",
  "sanskrit": "narah",
  "devanagari": "नरः",
  "transliteration": "naraḥ",
  "english": "man, person",
  "partOfSpeech": "noun",
  "gender": "masculine",
  "declensionType": "a-stem",
  "exampleSentence": "नरः गच्छति। (The man goes.)",
  "audioUrl": "/audio/words/narah.mp3",
  "difficultyLevel": 1,
  "frequencyRank": 15,
  "tags": ["phase-1", "month-2", "basic-vocabulary", "masculine-nouns"]
}
```

### Exercise Structure

```json
{
  "id": "exercise-uuid",
  "moduleId": "module-uuid",
  "type": "multiple-choice",
  "title": "Vowel Recognition",
  "instructions": "Listen to the audio and select the correct vowel.",
  "difficultyLevel": 1,
  "points": 10,
  "content": {
    "questions": [
      {
        "id": "q1",
        "audioUrl": "/audio/phonemes/aa.mp3",
        "devanagari": "?",
        "options": ["अ", "आ", "इ", "ई"],
        "correctAnswer": "आ",
        "explanation": "This is the long 'ā' sound (आ), which is held twice as long as short 'a' (अ)."
      }
    ]
  }
}
```

---

## Content Organization

```
content/
├── phases/
│   └── phase-1/
│       ├── meta.json                    # Phase metadata
│       └── month-1/
│           ├── meta.json                # Month metadata
│           ├── week-1/
│           │   ├── meta.json            # Week metadata
│           │   ├── lessons/
│           │   │   ├── lesson-1.json
│           │   │   ├── lesson-2.json
│           │   │   └── lesson-3.json
│           │   ├── vocabulary.json      # Week's vocabulary list
│           │   └── exercises/
│           │       ├── exercise-1.json
│           │       └── exercise-2.json
│           └── week-2/
│               └── ...
│
└── shared/
    ├── vocabulary/
    │   └── all-vocabulary.json          # Master vocabulary list
    ├── grammar/
    │   ├── declensions.json
    │   ├── conjugations.json
    │   └── sandhi-rules.json
    └── references/
        └── devanagari-chart.json
```

---

## Metadata Files

Each level has a `meta.json` describing structure and objectives:

### Phase meta.json

```json
{
  "id": 1,
  "name": "Foundation",
  "description": "Devanagari script, basic grammar, essential vocabulary",
  "durationMonths": 6,
  "totalVocabulary": 500,
  "objectives": [
    "Master Devanagari script",
    "Understand basic grammar",
    "Build 500-word vocabulary",
    "Read simple texts"
  ]
}
```

---

**For full curriculum details, see `classical_sanskrit_course.md` in the project root.**
