'use client';

import React from 'react';

interface DevanagariTextProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

/**
 * Component for displaying Sanskrit text in Devanagari script
 * Uses Noto Sans Devanagari font for proper rendering
 */
export function DevanagariText({
  children,
  className = '',
  size = 'md',
  weight = 'normal'
}: DevanagariTextProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  return (
    <span
      className={`font-devanagari ${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
      lang="sa"
    >
      {children}
    </span>
  );
}
