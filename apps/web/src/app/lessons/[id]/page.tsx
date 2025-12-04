import { prisma } from '@/../../packages/database';
import { LessonViewer, LessonNavigation } from '@/components/lessons';
import { notFound } from 'next/navigation';

export default async function LessonDetailPage({ params }: { params: { id: string } }) {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.id
    }
  });

  if (!lesson) {
    notFound();
  }

  // Get all lessons in order to determine previous/next
  const allLessons = await prisma.lesson.findMany({
    orderBy: {
      orderIndex: 'asc'
    },
    select: {
      id: true,
      title: true,
      orderIndex: true
    }
  });

  // Find current lesson index
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div>
      <LessonViewer lesson={lesson as any} />
      <div className="max-w-4xl mx-auto px-8 pb-12">
        <LessonNavigation
          currentLessonId={lesson.id}
          previousLesson={previousLesson}
          nextLesson={nextLesson}
        />
      </div>
    </div>
  );
}
