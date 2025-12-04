'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, DevanagariText } from '../ui';
import { AudioPlayer } from '../audio';

interface VowelItem {
  // Standard fields for consonants/vowels
  devanagari?: string;
  iast: string;
  pronunciation: string;
  ipa?: string;
  audioFile?: string;
  category?: string;
  note?: string;
  examples?: Array<{
    word: string;
    iast: string;
    meaning: string;
    audioFile?: string;
  }>;
  // Additional fields for vowel marks (Lesson 5)
  vowel?: string;
  mark?: string;
  example?: string;
  exampleIast?: string;
  independent?: string;
  // Additional fields for conjuncts (Lesson 6)
  conjunct?: string;
  components?: string;
  word?: string;
  visual?: string;
  breakdown?: string;
  syllables?: string;
  meaning?: string;
  name?: string;
  combination?: string;
}

interface LessonSection {
  type: 'introduction' | 'content' | 'summary' | 'practice';
  order: number;
  title: string;
  content: string;
  items?: VowelItem[];
}

interface LessonContent {
  sections: LessonSection[];
}

interface LessonViewerProps {
  lesson: {
    id: string;
    title: string;
    type: string;
    content: LessonContent;
  };
}

/**
 * Component for displaying lesson content
 * Handles different section types and renders appropriately
 */
export function LessonViewer({ lesson }: LessonViewerProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
        <p className="text-sm text-gray-500 uppercase">{lesson.type} Lesson</p>
      </div>

      <div className="space-y-6">
        {lesson.content.sections
          .sort((a, b) => a.order - b.order)
          .map((section, idx) => (
            <LessonSection key={idx} section={section} />
          ))}
      </div>
    </div>
  );
}

function LessonSection({ section }: { section: LessonSection }) {
  if (section.type === 'introduction') {
    return (
      <Card variant="bordered">
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{section.content}</p>
        </CardContent>
      </Card>
    );
  }

  if (section.type === 'content' && section.items) {
    return (
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
          <p className="text-sm text-gray-600 mt-1">{section.content}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items.map((item, idx) => (
              <VowelCard key={idx} item={item} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (section.type === 'summary') {
    return (
      <Card variant="bordered" className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">{section.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 leading-relaxed">{section.content}</p>
        </CardContent>
      </Card>
    );
  }

  if (section.type === 'practice') {
    return (
      <Card variant="bordered" className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">{section.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-800 leading-relaxed">{section.content}</p>
        </CardContent>
      </Card>
    );
  }

  return null;
}

function VowelCard({ item }: { item: VowelItem }) {
  // Determine which Devanagari field to display (flexible for different lesson types)
  const devanagariText = item.devanagari || item.vowel || item.conjunct || item.word || item.example || item.combination || '';

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {devanagariText && (
            <DevanagariText size="2xl" weight="semibold" className="text-primary-600">
              {devanagariText}
            </DevanagariText>
          )}
          <div>
            <div className="text-sm font-medium text-gray-700">{item.iast || item.exampleIast}</div>
            {item.ipa && <div className="text-xs text-gray-500">{item.ipa}</div>}
          </div>
        </div>
        {item.audioFile && <AudioPlayer src={item.audioFile} variant="inline" />}
      </div>

      <p className="text-sm text-gray-600 mb-2">{item.pronunciation}</p>

      {/* Display additional fields specific to vowel marks (Lesson 5) */}
      {item.mark && (
        <p className="text-xs text-gray-700 mb-1">
          <span className="font-medium">Mark:</span> {item.mark}
        </p>
      )}
      {item.independent && item.independent !== item.vowel && (
        <p className="text-xs text-gray-700 mb-1">
          <span className="font-medium">Independent form:</span> <DevanagariText className="inline">{item.independent}</DevanagariText>
        </p>
      )}

      {/* Display additional fields for conjuncts (Lesson 6) */}
      {item.components && (
        <p className="text-xs text-gray-700 mb-1">
          <span className="font-medium">Components:</span> {item.components}
        </p>
      )}
      {item.visual && (
        <p className="text-xs text-gray-700 mb-1">
          <span className="font-medium">Visual:</span> {item.visual}
        </p>
      )}
      {item.breakdown && (
        <p className="text-xs text-gray-700 mb-1">
          <span className="font-medium">Breakdown:</span> {item.breakdown}
        </p>
      )}
      {item.syllables && (
        <p className="text-xs text-gray-700 mb-1">
          <span className="font-medium">Syllables:</span> {item.syllables}
        </p>
      )}
      {item.meaning && (
        <p className="text-xs text-gray-700 mb-1">
          <span className="font-medium">Meaning:</span> {item.meaning}
        </p>
      )}
      {item.name && (
        <p className="text-xs text-gray-700 mb-1">
          <span className="font-medium">Name:</span> {item.name}
        </p>
      )}

      {item.note && (
        <p className="text-xs text-amber-600 italic mb-2">{item.note}</p>
      )}

      {item.examples && item.examples.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-2">Examples:</p>
          {item.examples.map((example, idx) => (
            <div key={idx} className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <DevanagariText size="md" className="text-gray-900">
                  {example.word}
                </DevanagariText>
                <span className="text-xs text-gray-500">
                  ({example.iast}) - {example.meaning}
                </span>
              </div>
              {example.audioFile && (
                <AudioPlayer src={example.audioFile} variant="inline" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
