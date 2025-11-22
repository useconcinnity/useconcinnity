"use client";

import ChatInterface from "@/components/stream/ChatInterface";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function ChatPage() {
    return (
        <div className="flex h-full flex-col">
            <PageHeader
                title="Team Chat"
                description="Collaborate with your team in real-time, with channels that mirror how your org works."
            />
            <ChatInterface />
        </div>
    );
}
