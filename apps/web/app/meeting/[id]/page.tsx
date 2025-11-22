'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import StreamClientProvider from '@/components/stream/StreamClientProvider';
import MeetingVideoInterface from '@/components/stream/MeetingVideoInterface';
import MeetingChatInitializer from '@/components/stream/MeetingChatInitializer';

const VIDEO_API_BASE_URL =
  process.env.NEXT_PUBLIC_VIDEO_URL ??
  process.env.NEXT_PUBLIC_VIDEO_SERVICE_URL ??
  process.env.NEXT_PUBLIC_API_URL;

export default function MeetingPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const meetingId = params.id as string;

  const [joinError, setJoinError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!VIDEO_API_BASE_URL) {
      setJoinError('Video service URL is not configured.');
      setIsJoining(false);
      return;
    }

    if (!user) {
      setJoinError('You must be signed in to join this meeting.');
      setIsJoining(false);
      return;
    }

    const joinMeeting = async () => {
      try {
        setJoinError(null);

        const response = await fetch(`${VIDEO_API_BASE_URL}/api/v1/meetings/join`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            meetingId,
            userId: user.id,
            userName: user.fullName || user.firstName || 'Guest',
            userPicture: user.imageUrl,
          }),
        });

        if (!response.ok) {
          let errorMessage = 'Failed to join meeting';

          if (response.status === 403) {
            errorMessage =
              'You do not have access to this meeting. Make sure you are signed into the correct organization or ask the organizer to invite you.';
          } else if (response.status === 404) {
            errorMessage =
              'This meeting could not be found. Check that the link or meeting ID is correct.';
          } else {
            const data = await response.json().catch(() => null);
            errorMessage = data?.message || errorMessage;
          }

          throw new Error(errorMessage);
        }
      } catch (err: any) {
        console.error('Error joining meeting', err);
        setJoinError(err?.message || 'Failed to join meeting');
      } finally {
        setIsJoining(false);
      }
    };

    joinMeeting();
  }, [meetingId, user, isLoaded]);

  const handleLeave = () => {
    router.push('/dashboard');
  };

  return (
    <StreamClientProvider>
      <MeetingChatInitializer meetingId={meetingId} />
      <div className="relative h-screen w-full bg-slate-900">
        <MeetingVideoInterface callId={meetingId} />

        {/* Top overlay with meeting info and leave button */}
        <div className="pointer-events-none absolute left-4 right-4 top-4 z-20 flex items-center justify-between">
          <div className="pointer-events-auto rounded-full bg-slate-900/80 px-4 py-1.5 text-xs text-slate-100 shadow-lg">
            Meeting ID: <span className="font-mono text-[11px] opacity-80">{meetingId}</span>
          </div>
          <button
            onClick={handleLeave}
            className="pointer-events-auto rounded-full bg-slate-800/90 px-4 py-2 text-xs font-medium text-slate-100 shadow-lg hover:bg-slate-700"
          >
            Leave &amp; Back to Dashboard
          </button>
        </div>

        {/* Joining status / error overlays */}
        {isJoining && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-slate-900/40">
            <div className="flex items-center gap-3 rounded-full bg-slate-900/90 px-5 py-2 text-xs text-slate-100 shadow-xl">
              <Loader2 className="h-4 w-4 animate-spin text-teal-400" />
              <span>Joining meeting...</span>
            </div>
          </div>
        )}

        {joinError && !isJoining && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2">
            <div className="pointer-events-auto max-w-md rounded-xl bg-red-900/90 px-4 py-3 text-xs text-red-50 shadow-xl">
              <div className="mb-1 text-[13px] font-semibold">Problem joining meeting</div>
              <div>{joinError}</div>
            </div>
          </div>
        )}
      </div>
    </StreamClientProvider>
  );
}
