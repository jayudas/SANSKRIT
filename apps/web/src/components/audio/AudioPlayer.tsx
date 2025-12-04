'use client';

import React, { useRef, useState } from 'react';
import { Button } from '../ui/Button';

interface AudioPlayerProps {
  src: string;
  label?: string;
  autoPlay?: boolean;
  className?: string;
  variant?: 'inline' | 'full';
}

/**
 * Audio player component for pronunciation playback
 * Variants: inline (compact icon button), full (with label and controls)
 */
export function AudioPlayer({
  src,
  label,
  autoPlay = false,
  className = '',
  variant = 'inline'
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);

  const handlePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Audio playback failed:', err);
      setError(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleError = () => {
    console.error('Audio failed to load:', src);
    setError(true);
  };

  if (variant === 'inline') {
    return (
      <button
        onClick={handlePlay}
        disabled={error}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
          error
            ? 'bg-amber-50 text-amber-500 cursor-not-allowed border border-amber-200'
            : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
        } ${className}`}
        title={error ? 'Audio not yet available (placeholder)' : 'Play audio'}
      >
        <audio
          ref={audioRef}
          src={src}
          onEnded={handleEnded}
          onError={handleError}
          autoPlay={autoPlay}
        />
        {error ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : isPlaying ? (
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        onEnded={handleEnded}
        onError={handleError}
        autoPlay={autoPlay}
      />
      <Button
        onClick={handlePlay}
        disabled={error}
        variant="outline"
        size="sm"
      >
        {error ? (
          'Audio N/A'
        ) : isPlaying ? (
          <>
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Stop
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Play
          </>
        )}
      </Button>
      {label && <span className="text-sm text-gray-600">{label}</span>}
    </div>
  );
}
