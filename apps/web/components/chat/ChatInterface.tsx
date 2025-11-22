"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@clerk/nextjs";
import { Send, Paperclip, Search, MoreVertical, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    content: string;
    userId: string;
    createdAt: string;
    user?: {
        firstName?: string;
        lastName?: string;
        imageUrl?: string;
    };
}

interface Channel {
    id: string;
    name: string;
    type: "PUBLIC" | "PRIVATE" | "DIRECT";
}

export function ChatInterface() {
    const { user } = useUser();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [activeChannel, setActiveChannel] = useState<Channel>({ id: "general", name: "General", type: "PUBLIC" });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Mock channels for now
    const channels: Channel[] = [
        { id: "general", name: "General", type: "PUBLIC" },
        { id: "random", name: "Random", type: "PUBLIC" },
        { id: "engineering", name: "Engineering", type: "PUBLIC" },
        { id: "design", name: "Design", type: "PUBLIC" },
    ];

    useEffect(() => {
        // Connect to the backend Socket.IO server
        // Assuming the backend is running on port 4000 based on previous analysis
        const newSocket = io("http://localhost:4000", {
            withCredentials: true,
            autoConnect: true,
        });

        newSocket.on("connect", () => {
            console.log("Connected to chat server");
            setIsConnected(true);

            // Join the default channel
            newSocket.emit("join_channel", {
                channelId: activeChannel.id,
                userId: user?.id,
            });
        });

        newSocket.on("disconnect", () => {
            console.log("Disconnected from chat server");
            setIsConnected(false);
        });

        newSocket.on("new_message", (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user?.id, activeChannel.id]);

    useEffect(() => {
        // Scroll to bottom when messages change
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !socket || !user) return;

        // Optimistic update (optional, but good for UX)
        // For now, we'll rely on the server echo to keep it simple and consistent

        socket.emit("send_message", {
            channelId: activeChannel.id,
            userId: user.id,
            content: inputValue,
        });

        setInputValue("");
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] rounded-3xl glass overflow-hidden border border-white/20 shadow-2xl">
            {/* Sidebar - Channels */}
            <div className="w-80 bg-white/5 border-r border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search channels..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Channels
                    </div>
                    {channels.map((channel) => (
                        <button
                            key={channel.id}
                            onClick={() => setActiveChannel(channel)}
                            className={cn(
                                "w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                activeChannel.id === channel.id
                                    ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400 border border-teal-500/20"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                            )}
                        >
                            # {channel.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-white/5">
                {/* Header */}
                <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                        <h2 className="font-semibold text-lg"># {activeChannel.name}</h2>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <button className="hover:text-foreground transition-colors"><Phone className="w-5 h-5" /></button>
                        <button className="hover:text-foreground transition-colors"><Video className="w-5 h-5" /></button>
                        <button className="hover:text-foreground transition-colors"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                                <Send className="w-8 h-8" />
                            </div>
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg, i) => {
                            const isMe = msg.userId === user?.id;
                            return (
                                <div key={i} className={cn("flex gap-4", isMe && "flex-row-reverse")}>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-white font-medium text-sm shrink-0 border-2 border-white/10">
                                        {msg.user?.firstName?.[0] || msg.userId.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div className={cn("max-w-[70%]", isMe ? "items-end" : "items-start")}>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-sm font-medium text-foreground">
                                                {isMe ? "You" : (msg.user?.firstName || "User")}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div className={cn(
                                            "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                                            isMe
                                                ? "bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-tr-none"
                                                : "bg-white/10 backdrop-blur-md border border-white/10 rounded-tl-none"
                                        )}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white/5 backdrop-blur-md border-t border-white/10">
                    <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                        <button
                            type="button"
                            className="p-3 rounded-xl hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={`Message #${activeChannel.name}...`}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all placeholder:text-muted-foreground/50"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || !isConnected}
                            className="p-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-500/20"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
