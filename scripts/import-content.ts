#!/usr/bin/env ts-node

/**
 * Content Import Script
 *
 * Imports curriculum content from JSON files into the database.
 *
 * Usage:
 *   npm run import:content                    # Import all content
 *   npm run import:content -- --phase 1       # Import phase 1
 *   npm run import:content -- --phase 1 --month 1 --week 1  # Import specific week
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// ============================================================================
// Types matching our Prisma schema
// ============================================================================

interface WeekMeta {
  week: number;
  month: number;
  phase: number;
  title: string;
  description: string;
  objectives: string[];
  estimatedHours: number;
  order: number;
}

interface LessonContent {
  lessonId: string;
  title: string;
  order: number;
  estimatedMinutes: number;
  objectives: string[];
  sections: any[];  // Stored as JSON
  resources?: any[];
}

interface VocabularyEntry {
  id: string;
  devanagari: string;
  iast: string;
  ipa: string;
  meaning: string;
  partOfSpeech: string;
  gender?: string;
  difficulty: number;
  frequency: string;
  etymology?: string;
  audioFile: string;
  tags: string[];
  examples?: any[];
  relatedWords?: any[];
  culturalNotes?: string;
  moduleId: string;
  weekIntroduced: number;
}

interface Exercise {
  exerciseId: string;
  title: string;
  type: string;
  difficulty: string;
  estimatedMinutes: number;
  instructions: string;
  passingScore: number;
  tags: string[];
  questions?: any[];
  pairs?: any[];
  characters?: any[];
  explanation?: string;
  passingCriteria?: string;
}

// ============================================================================
// Configuration
// ============================================================================

interface ImportOptions {
  phase?: number;
  month?: number;
  week?: number;
  verbose?: boolean;
}

const CONTENT_DIR = path.join(__dirname, '../content');

// ============================================================================
// Helper Functions
// ============================================================================

function log(message: string, options: ImportOptions = {}) {
  if (options.verbose !== false) {
    console.log(message);
  }
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

function getWeekDirectory(phase: number, month: number, week: number): string {
  return path.join(
    CONTENT_DIR,
    'phases',
    `phase-${phase}`,
    `month-${month}`,
    `week-${week}`
  );
}

// ============================================================================
// Import Functions matching Prisma schema
// ============================================================================

async function importPhase(phaseNum: number, options: ImportOptions = {}) {
  log(`\n📦 Importing Phase ${phaseNum}...`, options);

  // Schema: id (Int), name, description, durationMonths, orderIndex
  const phase = await prisma.phase.upsert({
    where: { id: phaseNum },
    update: {},
    create: {
      id: phaseNum,
      name: `Phase ${phaseNum}`,
      description: `Phase ${phaseNum} content`,
      durationMonths: 6,  // 6 months per phase
      orderIndex: phaseNum,
    },
  });

  log(`✅ Phase ${phaseNum} ready (ID: ${phase.id})`, options);
  return phase;
}

async function importModule(
  phaseId: number,
  monthNum: number,
  weekNum: number,
  meta: WeekMeta,
  options: ImportOptions = {}
) {
  log(`\n📚 Importing Module: Month ${monthNum}, Week ${weekNum}...`, options);

  const moduleOrderIndex = (monthNum - 1) * 4 + weekNum; // Sequential module numbering

  // Schema: id (cuid), phaseId, month, week, title, description, learningObjectives (Json), orderIndex
  const module = await prisma.module.create({
    data: {
      phaseId,
      month: monthNum,
      week: weekNum,
      title: meta.title,
      description: meta.description,
      learningObjectives: meta.objectives,
      orderIndex: moduleOrderIndex,
    },
  });

  log(`✅ Module created: ${module.title} (ID: ${module.id})`, options);
  return module;
}

async function importLesson(
  moduleId: string,
  lessonData: LessonContent,
  options: ImportOptions = {}
) {
  log(`  📖 Importing Lesson: ${lessonData.title}...`, options);

  // Schema: id (cuid), moduleId, title, type, content (Json), durationMinutes, orderIndex
  const lesson = await prisma.lesson.create({
    data: {
      moduleId,
      title: lessonData.title,
      type: 'text',  // Default type
      content: {
        objectives: lessonData.objectives,
        sections: lessonData.sections,
        resources: lessonData.resources || [],
      },
      durationMinutes: lessonData.estimatedMinutes,
      orderIndex: lessonData.order,
    },
  });

  log(`  ✅ Lesson: ${lesson.title}`, options);
  return lesson;
}

async function importExercise(
  moduleId: string,
  exercise: Exercise,
  orderIndex: number,
  options: ImportOptions = {}
) {
  log(`  🎯 Importing Exercise: ${exercise.title}...`, options);

  // Schema: id (cuid), moduleId, type, title, instructions, content (Json), difficultyLevel, points, timeLimitSeconds
  const difficultyMap: Record<string, number> = {
    'beginner': 1,
    'intermediate': 2,
    'advanced': 3,
  };

  const dbExercise = await prisma.exercise.create({
    data: {
      moduleId,
      type: exercise.type,
      title: exercise.title,
      instructions: exercise.instructions,
      content: {
        passingScore: exercise.passingScore,
        tags: exercise.tags,
        questions: exercise.questions,
        pairs: exercise.pairs,
        characters: exercise.characters,
        explanation: exercise.explanation,
        passingCriteria: exercise.passingCriteria,
      },
      difficultyLevel: difficultyMap[exercise.difficulty] || 1,
      points: 10,  // Default points
      timeLimitSeconds: exercise.estimatedMinutes * 60,
    },
  });

  // Import questions if they exist (for multiple-choice type)
  if (exercise.questions) {
    for (const [index, question] of exercise.questions.entries()) {
      // Schema: id (cuid), exerciseId, questionData (Json), correctAnswer (Json), explanation, orderIndex
      await prisma.exerciseQuestion.create({
        data: {
          exerciseId: dbExercise.id,
          questionData: question,
          correctAnswer: question.options?.find((opt: any) => opt.isCorrect) || {},
          explanation: question.explanation,
          orderIndex: index + 1,
        },
      });
    }
  }

  log(`  ✅ Exercise: ${exercise.title} (${exercise.questions?.length || 0} questions)`, options);
  return dbExercise;
}

async function importVocabulary(
  vocab: VocabularyEntry,
  options: ImportOptions = {}
) {
  log(`  📝 Importing Vocabulary: ${vocab.devanagari} (${vocab.iast})...`, options);

  // Schema: id (cuid), sanskrit, devanagari, transliteration, english, partOfSpeech, gender,
  //         declensionType, exampleSentence, audioUrl, difficultyLevel, frequencyRank, tags (Json)

  const frequencyRankMap: Record<string, number> = {
    'very-high': 1,
    'high': 2,
    'medium': 3,
    'low': 4,
    'rare': 5,
  };

  await prisma.vocabulary.create({
    data: {
      sanskrit: vocab.iast,  // Using IAST as sanskrit field
      devanagari: vocab.devanagari,
      transliteration: vocab.iast,
      english: vocab.meaning,
      partOfSpeech: vocab.partOfSpeech,
      gender: vocab.gender || null,
      exampleSentence: vocab.examples?.[0]?.sentence || null,
      audioUrl: vocab.audioFile,
      difficultyLevel: vocab.difficulty,
      frequencyRank: frequencyRankMap[vocab.frequency] || 3,
      tags: {
        tags: vocab.tags,
        etymology: vocab.etymology,
        culturalNotes: vocab.culturalNotes,
        examples: vocab.examples,
        relatedWords: vocab.relatedWords,
      },
    },
  });

  log(`  ✅ Vocabulary: ${vocab.devanagari}`, options);
}

async function importWeek(
  phaseNum: number,
  monthNum: number,
  weekNum: number,
  options: ImportOptions = {}
) {
  const weekDir = getWeekDirectory(phaseNum, monthNum, weekNum);

  if (!fs.existsSync(weekDir)) {
    log(`⚠️  Week directory not found: ${weekDir}`, options);
    return;
  }

  log(`\n${'='.repeat(60)}`, options);
  log(`📦 Importing Phase ${phaseNum}, Month ${monthNum}, Week ${weekNum}`, options);
  log(`${'='.repeat(60)}`, options);

  // Import phase
  const phase = await importPhase(phaseNum, options);

  // Read week metadata
  const metaPath = path.join(weekDir, 'meta.json');
  const meta = readJsonFile<WeekMeta>(metaPath);

  if (!meta) {
    log(`❌ meta.json not found in ${weekDir}`, options);
    return;
  }

  // Import module
  const module = await importModule(phase.id, monthNum, weekNum, meta, options);

  // Import lessons
  const lessonFiles = fs.readdirSync(weekDir).filter(f => f.startsWith('lesson-') && f.endsWith('.json'));
  for (const lessonFile of lessonFiles) {
    const lessonPath = path.join(weekDir, lessonFile);
    const lessonData = readJsonFile<LessonContent>(lessonPath);
    if (lessonData) {
      await importLesson(module.id, lessonData, options);
    }
  }

  // Import exercises
  const exercisesPath = path.join(weekDir, 'exercises.json');
  if (fs.existsSync(exercisesPath)) {
    const exercisesData = readJsonFile<{exercises: Exercise[]}>(exercisesPath);
    if (exercisesData && exercisesData.exercises) {
      for (const [index, exercise] of exercisesData.exercises.entries()) {
        await importExercise(module.id, exercise, index + 1, options);
      }
    }
  }

  log(`\n✅ Week ${weekNum} import complete!`, options);
}

async function importAllVocabulary(options: ImportOptions = {}) {
  log(`\n📝 Importing all vocabulary...`, options);

  const vocabDir = path.join(CONTENT_DIR, 'shared', 'vocabulary');

  if (!fs.existsSync(vocabDir)) {
    log(`⚠️  Vocabulary directory not found: ${vocabDir}`, options);
    return;
  }

  const vocabFiles = fs.readdirSync(vocabDir).filter(f => f.endsWith('.json'));

  for (const vocabFile of vocabFiles) {
    const vocabPath = path.join(vocabDir, vocabFile);
    const vocabData = readJsonFile<{vocabulary: VocabularyEntry[]}>(vocabPath);

    if (vocabData && vocabData.vocabulary) {
      for (const vocab of vocabData.vocabulary) {
        await importVocabulary(vocab, options);
      }
    }
  }

  log(`✅ Vocabulary import complete!`, options);
}

// ============================================================================
// Main Function
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const options: ImportOptions = {
    verbose: true,
  };

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--phase' && args[i + 1]) {
      options.phase = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--month' && args[i + 1]) {
      options.month = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--week' && args[i + 1]) {
      options.week = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--quiet') {
      options.verbose = false;
    }
  }

  console.log('\n🚀 Sanskrit Content Import Tool\n');

  try {
    // Import specific week if specified
    if (options.phase && options.month && options.week) {
      await importWeek(options.phase, options.month, options.week, options);
    }
    // Import all content
    else {
      // For this initial version, just import Phase 1, Month 1, Week 1
      await importWeek(1, 1, 1, options);

      // Import shared vocabulary
      await importAllVocabulary(options);
    }

    console.log('\n✅ Import complete!\n');
  } catch (error) {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// ============================================================================
// Execute
// ============================================================================

main();
