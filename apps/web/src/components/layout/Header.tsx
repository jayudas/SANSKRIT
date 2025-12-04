import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="text-2xl font-bold text-primary-600 devanagari">संस्कृत</div>
            <div className="text-lg font-semibold text-gray-900">Sanskrit Learning</div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            <Link
              href="/"
              className="px-4 py-2 bg-gray-100 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium border border-gray-200"
            >
              Home
            </Link>
            <Link
              href="/lessons"
              className="px-4 py-2 bg-gray-100 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium border border-gray-200"
            >
              Lessons
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
