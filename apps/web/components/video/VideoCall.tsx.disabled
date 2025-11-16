'use client';

import { useEffect, useState } from 'react';
import { DyteMeeting, DyteProvider, useDyteClient } from '@dytesdk/react-ui-kit';
import { useUser } from '@clerk/nextjs';

interface VideoCallProps {
  meetingId: string;
  onLeave?: () => void;
}

export function VideoCall({ meetingId, onLeave }: VideoCallProps) {
  const { user } = useUser();
  const [meeting, initMeeting] = useDyteClient();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const joinMeeting = async () => {
      if (!user) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        // Call your API to join the meeting and get auth token
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/meetings/join`, {
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
          throw new Error('Failed to join meeting');
        }

        const data = await response.json();
        setAuthToken(data.authToken);

        // Initialize Dyte meeting
        await initMeeting({
          authToken: data.authToken,
          defaults: {
            audio: false,
            video: false,
          },
        });

        setLoading(false);
      } catch (err) {
        console.error('Error joining meeting:', err);
        setError(err instanceof Error ? err.message : 'Failed to join meeting');
        setLoading(false);
      }
    };

    joinMeeting();
  }, [meetingId, user, initMeeting]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-white">Joining meeting...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="rounded-lg bg-red-500/10 p-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-red-500">Error</h2>
          <p className="text-white">{error}</p>
          {onLeave && (
            <button
              onClick={onLeave}
              className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!meeting) {
    return null;
  }

  return (
    <div className="h-screen w-full">
      <DyteProvider value={meeting}>
        <DyteMeeting
          meeting={meeting}
          showSetupScreen={true}
          mode="fill"
          onMeetingEnded={onLeave}
        />
      </DyteProvider>
    </div>
  );
}

