"use client";

import { useState } from "react";
import {
    Channel,
    ChannelHeader,
    ChannelList,
    MessageInput,
    MessageList,
    Thread,
    Window,
    useChatContext,
} from "stream-chat-react";
import { Menu, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateChannelDialog from "./CreateChannelDialog";

export default function ChatInterface() {
    const { client } = useChatContext();
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    if (!client) return null;

    return (
        <>
            <div className="flex h-[calc(100vh-8rem)] w-full overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-xl shadow-xl ring-1 ring-white/50">
                {/* Sidebar / Channel List */}
                <div className={cn(
                    "w-full md:w-80 flex-shrink-0 border-r border-white/40 bg-white/30 md:block",
                    showMobileNav ? "block" : "hidden"
                )}>
                    <div className="flex items-center justify-between border-b border-white/40 p-4">
                        <h2 className="text-lg font-semibold text-slate-800">Messages</h2>
                        <button
                            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-white/50"
                            onClick={() => setShowCreateDialog(true)}
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                    <ChannelList
                        filters={{ type: "messaging", members: { $in: [client.userID!] } }}
                        sort={{ last_message_at: -1 }}
                        options={{ state: true, presence: true, limit: 10 }}
                        showChannelSearch
                    />
                </div>

                {/* Chat Window */}
                <div
                    className={cn(
                        "flex flex-1 flex-col bg-white/20",
                        showMobileNav ? "hidden md:flex" : "flex"
                    )}
                >
                    <Channel>
                        <Window>
                            <div className="flex items-center border-b border-white/40 p-4 md:hidden">
                                <button onClick={() => setShowMobileNav(true)} className="mr-4">
                                    <Menu className="h-6 w-6 text-slate-600" />
                                </button>
                                <span className="font-semibold">Chat</span>
                            </div>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput />
                        </Window>
                        <Thread />
                    </Channel>
                </div>
            </div>

            <CreateChannelDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
            />
        </>
    );
}
