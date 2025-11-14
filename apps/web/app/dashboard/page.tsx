import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.firstName || 'User'}!
              </span>
              <img
                src={user?.imageUrl}
                alt={user?.firstName || 'User'}
                className="h-10 w-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Chat Card */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-3">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Chat</h2>
            </div>
            <p className="text-gray-600">
              Real-time messaging with your team
            </p>
            <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Open Chat
            </button>
          </div>

          {/* Calendar Card */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-3">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Calendar</h2>
            </div>
            <p className="text-gray-600">
              Schedule and manage meetings
            </p>
            <button className="mt-4 w-full rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
              View Calendar
            </button>
          </div>

          {/* Video Card */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-3">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Video</h2>
            </div>
            <p className="text-gray-600">
              Start or join video conferences
            </p>
            <button className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              Start Meeting
            </button>
          </div>

          {/* Marketplace Card */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-orange-100 p-3">
                <svg
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Marketplace</h2>
            </div>
            <p className="text-gray-600">
              Browse and install apps
            </p>
            <button className="mt-4 w-full rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
              Explore Apps
            </button>
          </div>

          {/* Analytics Card */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-pink-100 p-3">
                <svg
                  className="h-6 w-6 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
            </div>
            <p className="text-gray-600">
              View usage and insights
            </p>
            <button className="mt-4 w-full rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700">
              View Analytics
            </button>
          </div>

          {/* Settings Card */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-gray-100 p-3">
                <svg
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
            </div>
            <p className="text-gray-600">
              Manage your account and preferences
            </p>
            <button className="mt-4 w-full rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700">
              Open Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

