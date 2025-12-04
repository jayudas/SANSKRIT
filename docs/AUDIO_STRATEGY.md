# Audio Strategy - Sanskrit Learning Platform

**Last Updated:** December 3, 2024
**Related:** Audio playback implementation will use Howler.js

---

## Audio Requirements

The Sanskrit learning platform requires audio for three main categories:

1. **Phonemes** - Individual sounds (vowels, consonants, conjuncts)
2. **Vocabulary** - Word pronunciations
3. **Sentences** - Example sentences and phrases

---

## Phased Audio Approach

### Phase 1A: Critical Phonetic Elements (Priority 1)
**Needed for Month 1, Week 1-2**

**Vowels (14 sounds):**
- अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ
- File naming: `a.mp3`, `aa.mp3`, `i.mp3`, etc.
- Location: `/public/audio/phonemes/vowels/`

**Consonants (33 sounds):**
- क ख ग घ ङ (velar)
- च छ ज झ ञ (palatal)
- ट ठ ड ढ ण (retroflex)
- त थ द ध न (dental)
- प फ ब भ म (labial)
- य र ल व (semivowels)
- श ष स ह (sibilants and h)
- File naming: `ka.mp3`, `kha.mp3`, etc.
- Location: `/public/audio/phonemes/consonants/`

**Common Conjuncts (50-100 combinations):**
- क्त क्र क्ष त्र ज्ञ, etc.
- Location: `/public/audio/phonemes/conjuncts/`

**Total: ~150 audio files**

### Phase 1B: Month 1 Vocabulary (Priority 2)
**Needed for Month 1, Weeks 3-4**

**First 50 vocabulary words:**
- Core nouns (नरः, गजः, वृक्षः, etc.)
- Basic verbs (गच्छति, पठति, etc.)
- Common adjectives
- Location: `/public/audio/words/month-1/`

**Example sentences (20-30):**
- Simple sentence constructions
- Location: `/public/audio/sentences/month-1/`

### Phase 1C: Months 2-6 Vocabulary
**Incremental addition as we build**

- Month 2: +100 words (cases, verbs)
- Month 3: +100 words (feminine/neuter nouns, adjectives)
- Month 4: +100 words (verb tenses)
- Month 5: +100 words (compounds, pronouns)
- Month 6: +100 words (reading texts)

**Total Phase 1: ~500-600 vocabulary words**

---

## Audio Sourcing Strategy

### Option 1: Professional Recording (Recommended)
**Approach:** Hire fluent Sanskrit speaker for recording sessions

**Pros:**
- Highest quality and authenticity
- Consistent voice across all content
- Professional pronunciation
- Can re-record if needed

**Cons:**
- Cost: $2000-5000 for full set
- Requires scheduling and coordination
- Need proper recording equipment/studio

**Best For:** Phonemes and core vocabulary (first 500 words)

### Option 2: Existing Resources
**Approach:** Source from free/licensed Sanskrit educational content

**Resources:**
- Sanskrit learning websites (sanskritdocuments.org)
- University courses (MIT, Harvard open courseware)
- Vedic chanting recordings (public domain)
- Sanskrit radio broadcasts

**Pros:**
- Free or low cost
- Immediately available
- Often high quality

**Cons:**
- Inconsistent voices
- Licensing concerns
- May not have exact words needed
- Quality varies

**Best For:** Supplemental content, example sentences, classical texts

### Option 3: Text-to-Speech (Fallback)
**Approach:** Use TTS for missing content

**Services:**
- Google Cloud TTS (Hindi voice): $4 per 1M characters
- Amazon Polly (Hindi voice): Similar pricing
- Azure TTS: Similar pricing

**Pros:**
- Instant generation
- No recording needed
- Good for placeholder during development

**Cons:**
- Lower quality than native speakers
- Hindi approximation (not pure Sanskrit)
- Lacks natural prosody
- May mispronounce

**Best For:** Development placeholders, less critical content, user-generated sentences

---

## Audio File Specifications

**Format:**
- Primary: MP3 (128kbps, 44.1kHz)
- Alternative: WebM (Opus codec, for web optimization)

**Naming Convention:**
```
phonemes:   [character].mp3           (e.g., ka.mp3, aa.mp3)
words:      [transliteration].mp3     (e.g., narah.mp3, gacchati.mp3)
sentences:  [id].mp3                  (e.g., ex-001.mp3, sent-m1w1-01.mp3)
```

**Directory Structure:**
```
public/audio/
├── phonemes/
│   ├── vowels/
│   │   ├── a.mp3
│   │   ├── aa.mp3
│   │   └── ...
│   ├── consonants/
│   │   ├── ka.mp3
│   │   ├── kha.mp3
│   │   └── ...
│   └── conjuncts/
│       ├── kta.mp3
│       ├── tra.mp3
│       └── ...
├── words/
│   ├── month-1/
│   │   ├── narah.mp3
│   │   ├── gacchati.mp3
│   │   └── ...
│   ├── month-2/
│   └── ...
└── sentences/
    ├── month-1/
    │   ├── ex-001.mp3
    │   └── ...
    └── month-2/
```

---

## Audio Integration in Components

**AudioPlayer Component:**
```typescript
interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  showControls?: boolean;
  onComplete?: () => void;
}
```

**Usage Examples:**
```tsx
// In lesson
<AudioPlayer src="/audio/phonemes/vowels/a.mp3" showControls />

// In flashcard
<AudioPlayer
  src={vocabulary.audioUrl}
  autoPlay={false}
  onComplete={handleAudioComplete}
/>

// In exercise
<AudioPlayer
  src={question.audioUrl}
  showControls={false}
/>
```

---

## Audio Recording Guidelines (For Hired Speaker)

**Recording Requirements:**
1. **Environment:** Quiet room, minimal echo
2. **Equipment:** Quality USB microphone (Blue Yeti or similar)
3. **Format:** WAV (uncompressed), 44.1kHz, 16-bit
4. **Style:** Clear, moderate pace, neutral tone
5. **Consistency:** Same equipment, environment, and distance throughout

**Recording Script:**
- Provide organized spreadsheet with:
  - Devanagari text
  - Romanization
  - Context (vowel, consonant, word, sentence)
  - Any special pronunciation notes

**Post-Processing:**
- Normalize volume levels
- Remove silence from beginning/end
- Convert to MP3 (128kbps)
- Generate WebM alternative

---

## Placeholder Strategy During Development

While sourcing professional audio:
1. Use TTS for initial development
2. Mark files as "placeholder" in database
3. Replace with professional recordings in batches
4. Maintain version tracking (placeholder vs. professional)

**Database field:**
```prisma
model Vocabulary {
  audioUrl       String?
  audioStatus    String? // "placeholder", "professional", "missing"
  audioRecordedAt DateTime?
}
```

This allows development to proceed while audio is being sourced/recorded incrementally.

---

**For audio playback implementation details, see the AudioPlayer component in `apps/web/src/components/audio/`**
