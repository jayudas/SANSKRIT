import { prisma } from '@/../../packages/database';
import Link from 'next/link';
import { Card } from '@/components/ui';

export default async function LessonsPage() {
  // Fetch all lessons from the database
  const lessons = await prisma.lesson.findMany({
    orderBy: {
      orderIndex: 'asc'
    },
    include: {
      module: true
    }
  });

  if (lessons.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Lessons Found</h1>
          <p className="text-gray-600">
            No lessons have been imported yet. Run the import script to add content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Lessons</h1>
        <p className="text-gray-600 mb-8">Classical Sanskrit Learning Path</p>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-2">{lesson.title}</h2>
                      <p className="text-sm text-gray-500 mb-3">{lesson.module.title}</p>
                      {lesson.durationMinutes && (
                        <p className="text-sm text-primary-600">
                          Estimated time: {lesson.durationMinutes} minutes
                        </p>
                      )}
                    </div>
                    <div className="ml-4 text-primary-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
