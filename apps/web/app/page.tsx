import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Concinnity
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Work Together, Brilliantly
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            The all-in-one business management platform that brings your team together
            with powerful tools for communication, collaboration, and productivity.
          </p>

          <div className="flex gap-4 justify-center">
            {userId ? (
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/sign-in"
                  className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Real-time Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seamless communication with your team
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Smart Calendar
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Schedule and manage meetings effortlessly
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Video Conferencing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                High-quality video calls built-in
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
