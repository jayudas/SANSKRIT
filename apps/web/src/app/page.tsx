import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Sanskrit Learning Platform
        </h1>

        <div className="mb-8 text-center">
          <p className="text-xl mb-4 devanagari">
            नमस्ते
          </p>
          <p className="text-gray-600">
            Welcome to your Classical Sanskrit training course
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">Phase 1: Foundation</h2>
            <p className="text-gray-600">
              Devanagari script, basic grammar, and essential vocabulary
            </p>
            <p className="mt-4 text-sm text-primary-600 font-medium">
              Months 1-6 · 500+ words
            </p>
          </div>

          <div className="p-6 border rounded-lg opacity-50">
            <h2 className="text-2xl font-semibold mb-2">Phase 2: Intermediate</h2>
            <p className="text-gray-600">
              Complex grammar, verb systems, and expanded vocabulary
            </p>
            <p className="mt-4 text-sm text-gray-500 font-medium">
              Coming soon
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/lessons">
            <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Start Learning
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
