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
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function VideoInterface() {
    const client = useStreamVideoClient();
    const [call, setCall] = useState<Call | null>(null);

    useEffect(() => {
        if (!client) return;

        // Create a call with a random ID or specific ID
        // For demo, we'll use a fixed ID or generate one
        const callId = "default-call";
        const myCall = client.call("default", callId);

        myCall.join({ create: true }).then(() => {
            setCall(myCall);
        }).catch((err) => {
            console.error("Failed to join call", err);
        });

        return () => {
            // myCall.leave(); // Optional
        };
    }, [client]);

    if (!call) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
            </div>
        );
    }

    return (
        <StreamTheme>
            <StreamCall call={call}>
                <div className="flex h-[calc(100vh-8rem)] w-full flex-col overflow-hidden rounded-[2.5rem] border border-white/60 bg-slate-900 shadow-2xl ring-1 ring-black/10">
                    <div className="flex-1 relative">
                        <SpeakerLayout participantsBarPosition="bottom" />
                        <div className="absolute top-4 right-4">
                            <CallParticipantsList onClose={() => { }} />
                        </div>
                    </div>
                    <CallControls />
                </div>
            </StreamCall>
        </StreamTheme>
    );
}
