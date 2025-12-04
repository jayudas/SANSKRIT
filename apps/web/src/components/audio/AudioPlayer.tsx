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
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
        } ${className}`}
        title={error ? 'Audio not available' : 'Play audio'}
      >
        <audio
          ref={audioRef}
          src={src}
          onEnded={handleEnded}
          onError={handleError}
          autoPlay={autoPlay}
        />
        {error ? (
          <span className="text-xs">✕</span>
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
