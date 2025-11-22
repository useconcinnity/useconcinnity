"use client";

import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import { Video } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import VideoInterface from "@/components/stream/VideoInterface";

export default function VideoPage() {
    const router = useRouter();
    const [joinValue, setJoinValue] = useState("");
    const [joinError, setJoinError] = useState<string | null>(null);

    const handleJoin: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const raw = joinValue.trim();

        if (!raw) {
            setJoinError("Enter a meeting link or ID");
            return;
        }

        // Support both bare IDs and full URLs containing /meeting/{id}
        let id = raw;
        const match = raw.match(/\/meeting\/([^/?#]+)/);
        if (match?.[1]) {
            id = match[1];
        }

        setJoinError(null);
        router.push(`/meeting/${id}`);
    };

    return (
        <div className="flex h-full flex-col">
            <PageHeader
                title="Video"
                description="Start or join secure HD meetings that stay in sync with the rest of your workspace."
            />

            <div className="mb-6 space-y-3">
                <form
                    onSubmit={handleJoin}
                    className="flex flex-col gap-3 rounded-3xl border border-white/40 bg-white/80 p-4 shadow-sm backdrop-blur-xl md:flex-row md:items-center"
                >
                    <div className="flex flex-1 items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-slate-50 shadow-sm">
                            <Video className="h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            value={joinValue}
                            onChange={(e) => setJoinValue(e.target.value)}
                            placeholder="Paste a Concinnity meeting link or ID"
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
                    >
                        Join with link
                    </button>
                </form>
                {joinError && (
                    <p className="text-xs text-red-500">{joinError}</p>
                )}
            </div>

            <div className="flex-1">
                <VideoInterface />
            </div>
        </div>
    );
}
