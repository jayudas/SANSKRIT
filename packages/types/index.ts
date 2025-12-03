// Lesson Types
export interface LessonContent {
  sections: LessonSection[]
}

export interface LessonSection {
  id: string
  type: 'text' | 'devanagari' | 'table' | 'example' | 'audio' | 'exercise'
  title?: string
  content: string | object
  audioUrl?: string
  metadata?: Record<string, any>
}

// Exercise Types
export type ExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'matching'
  | 'sentence-construction'
  | 'translation'
  | 'audio-recognition'
  | 'script-practice'

export interface MultipleChoiceQuestion {
  id: string
  question: string
  devanagari?: string
  audioUrl?: string
  options: string[]
  correctAnswer: string
  explanation?: string
  hints?: string[]
}

export interface FillBlankQuestion {
  id: string
  sentence: string
  blanks: {
    position: number
    correctAnswer: string
    alternatives?: string[]
  }[]
  explanation?: string
}

export interface MatchingQuestion {
  id: string
  pairs: {
    left: string
    right: string
  }[]
  instructions?: string
}

// Flashcard Types
export interface FlashcardData {
  id: string
  front: {
    text: string
    devanagari?: string
    audioUrl?: string
  }
  back: {
    text: string
    examples?: string[]
    notes?: string
  }
  tags: string[]
}

export interface SRSCardState {
  easeFactor: number
  intervalDays: number
  repetitions: number
  lastReviewed?: Date
  nextReview: Date
  status: 'new' | 'learning' | 'review' | 'relearning'
}

// User Progress Types
export interface UserProgressData {
  userId: string
  currentPhase: number
  currentMonth: number
  currentWeek: number
  wordsLearned: number
  wordsReviewed: number
  vocabularyRetention: number
  scriptFluency: number
  readingLevel: number
  writingLevel: number
  speakingLevel: number
  dailyStreak: number
  totalStudyMinutes: number
  lessonsCompleted: number
  exercisesCompleted: number
  quizAccuracy: number
}

// Vocabulary Types
export interface VocabularyWord {
  id: string
  sanskrit: string
  devanagari: string
  transliteration: string
  english: string
  partOfSpeech: string
  gender?: 'masculine' | 'feminine' | 'neuter'
  declensionType?: string
  exampleSentence?: string
  audioUrl?: string
  difficultyLevel: number
  tags: string[]
}

// Grammar Types
export interface DeclensionPattern {
  type: string
  gender: 'masculine' | 'feminine' | 'neuter'
  example: string
  forms: {
    case: string
    singular: string
    dual: string
    plural: string
  }[]
}

export interface ConjugationPattern {
  verb: string
  root: string
  class: number
  tense: string
  forms: {
    person: 1 | 2 | 3
    singular: string
    dual: string
    plural: string
  }[]
}

// Audio Types
export interface AudioResource {
  id: string
  type: 'phoneme' | 'word' | 'sentence'
  text: string
  devanagari?: string
  url: string
  duration?: number
  speaker?: string
}

// Quiz Result Types
export interface QuizResult {
  attemptId: string
  exerciseId: string
  score: number
  maxScore: number
  percentage: number
  timeSpentSeconds: number
  answers: {
    questionId: string
    userAnswer: any
    correctAnswer: any
    isCorrect: boolean
    timeSpent: number
  }[]
}

// Achievement Types
export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  criteria: {
    type: string
    target: number
    current?: number
  }
  earnedAt?: Date
}

export interface DevanagariCharacter {
  unicode: string
  romanization: string
  category: 'vowel' | 'consonant' | 'conjunct' | 'modifier'
  audioUrl: string
  strokes?: StrokeData[]
}

export interface StrokeData {
  path: string // SVG path data
  order: number
  direction: 'top-to-bottom' | 'left-to-right' | 'diagonal'
}
