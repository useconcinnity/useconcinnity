'use client';

import { useParams, useRouter } from 'next/navigation';
// import { VideoCall } from '@/components/video/VideoCall';

export default function MeetingPage() {
  const params = useParams();
  const router = useRouter();
  const meetingId = params.id as string;

  const handleLeave = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">Video Meeting</h1>
        <p className="mb-4 text-gray-400">Meeting ID: {meetingId}</p>
        <p className="mb-8 text-yellow-500">Video integration coming soon...</p>
        <button
          onClick={handleLeave}
          className="rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  // TODO: Fix Dyte SDK integration
  // return <VideoCall meetingId={meetingId} onLeave={handleLeave} />;
}

