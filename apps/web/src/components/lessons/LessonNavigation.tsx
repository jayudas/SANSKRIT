import Link from 'next/link';
import { Button } from '../ui';

interface LessonNavigationProps {
  currentLessonId: string;
  previousLesson?: {
    id: string;
    title: string;
  } | null;
  nextLesson?: {
    id: string;
    title: string;
  } | null;
}

export function LessonNavigation({
  currentLessonId,
  previousLesson,
  nextLesson
}: LessonNavigationProps) {
  return (
    <div className="border-t border-gray-200 pt-6 mt-8">
      <div className="flex items-center justify-between">
        {/* Previous Lesson */}
        <div className="flex-1">
          {previousLesson ? (
            <Link href={`/lessons/${previousLesson.id}`}>
              <Button variant="outline" size="md">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Previous</div>
                  <div className="text-sm font-medium truncate max-w-[200px]">
                    {previousLesson.title}
                  </div>
                </div>
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        {/* Back to Lessons */}
        <div className="flex-shrink-0 mx-4">
          <Link href="/lessons">
            <Button variant="ghost" size="md">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              All Lessons
            </Button>
          </Link>
        </div>

        {/* Next Lesson */}
        <div className="flex-1 flex justify-end">
          {nextLesson ? (
            <Link href={`/lessons/${nextLesson.id}`}>
              <Button variant="primary" size="md">
                <div className="text-right">
                  <div className="text-xs text-primary-100">Next</div>
                  <div className="text-sm font-medium truncate max-w-[200px]">
                    {nextLesson.title}
                  </div>
                </div>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
