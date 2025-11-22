"use client";

import { useEffect } from "react";
import { useChatContext } from "stream-chat-react";

interface MeetingChatInitializerProps {
  meetingId: string;
}

export default function MeetingChatInitializer({
  meetingId,
}: MeetingChatInitializerProps) {
  const { client } = useChatContext();

  useEffect(() => {
    if (!client || !meetingId) return;

    let cancelled = false;

    const init = async () => {
      try {
        const channel = client.channel("messaging", `meeting-${meetingId}`, {
          meeting_id: meetingId,
          is_meeting: true,
        });

        await channel.watch();

        if (client.userID) {
          await channel.addMembers([client.userID]);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to initialize meeting chat channel", err);
        }
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [client, meetingId]);

  return null;
}

