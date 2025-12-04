import { prisma } from '@/../../packages/database';
import { LessonViewer } from '@/components/lessons';

export default async function LessonsPage() {
  // Fetch the first lesson from the database
  const lesson = await prisma.lesson.findFirst({
    orderBy: {
      orderIndex: 'asc'
    }
  });

  if (!lesson) {
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

  return <LessonViewer lesson={lesson as any} />;
}
