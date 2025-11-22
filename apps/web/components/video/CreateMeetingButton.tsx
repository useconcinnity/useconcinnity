'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

interface CreateMeetingButtonProps {
  organizationId: string;
  channelId?: string;
  onMeetingCreated?: (meetingId: string) => void;
  className?: string;
}

const VIDEO_API_BASE_URL =
  process.env.NEXT_PUBLIC_VIDEO_URL ??
  process.env.NEXT_PUBLIC_VIDEO_SERVICE_URL ??
  process.env.NEXT_PUBLIC_API_URL;

export function CreateMeetingButton({
  organizationId,
  channelId,
  onMeetingCreated,
  className = '',
}: CreateMeetingButtonProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMeeting = async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    if (!VIDEO_API_BASE_URL) {
      setError('Video service URL is not configured.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${VIDEO_API_BASE_URL}/api/v1/meetings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Meeting by ${user.fullName || user.firstName}`,
          organizationId,
          channelId,
          createdById: user.id,
          scheduledAt: new Date().toISOString(),
          duration: 60,
          recordOnStart: false,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || 'Failed to create meeting');
      }

      const data = await response.json();

      if (onMeetingCreated) {
        onMeetingCreated(data.id);
      }
    } catch (err) {
      console.error('Error creating meeting:', err);
      setError(err instanceof Error ? err.message : 'Failed to create meeting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={createMeeting}
        disabled={loading}
        className={`rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 ${className}`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Creating...
          </span>
        ) : (
          '🎥 Start Video Call'
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
