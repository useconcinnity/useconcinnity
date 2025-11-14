'use client';

import { useParams, useRouter } from 'next/navigation';
import { VideoCall } from '@/components/video/VideoCall';

export default function MeetingPage() {
  const params = useParams();
  const router = useRouter();
  const meetingId = params.id as string;

  const handleLeave = () => {
    router.push('/dashboard');
  };

  return <VideoCall meetingId={meetingId} onLeave={handleLeave} />;
}

