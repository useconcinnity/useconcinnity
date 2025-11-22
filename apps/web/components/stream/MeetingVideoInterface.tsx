"use client";

import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface MeetingVideoInterfaceProps {
  callId: string;
}

export default function MeetingVideoInterface({
  callId,
}: MeetingVideoInterfaceProps) {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client || !callId) return;

    const streamCall = client.call("default", callId);

    streamCall
      .join({ create: true })
      .then(() => setCall(streamCall))
      .catch((err) => {
        console.error("Failed to join Stream call", err);
        setError(err?.message ?? "Failed to join call");
      });

    return () => {
      streamCall.leave().catch(() => {
        // ignore cleanup errors
      });
    };
  }, [client, callId]);

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-900">
        <div className="text-center">
          <p className="mb-2 text-sm font-semibold text-red-400">
            Could not join call
          </p>
          <p className="text-xs text-slate-200/80">{error}</p>
        </div>
      </div>
    );
  }

  if (!call) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <StreamTheme>
      <StreamCall call={call}>
        <div className="flex h-screen w-full flex-col bg-slate-900">
          <div className="relative flex-1">
            <SpeakerLayout participantsBarPosition="bottom" />
            <div className="absolute right-4 top-4">
              <CallParticipantsList onClose={() => {}} />
            </div>
          </div>
          <div className="border-t border-slate-800 bg-slate-900/80">
            <CallControls />
          </div>
        </div>
      </StreamCall>
    </StreamTheme>
  );
}

