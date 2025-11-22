"use client";

import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { useEffect, useState, ReactNode } from "react";
import "stream-chat-react/dist/css/v2/index.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export default function StreamClientProvider({ children }: { children: ReactNode }) {
    const { user, isLoaded } = useUser();
    const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
    const [chatClient, setChatClient] = useState<StreamChat | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoaded || !user || !apiKey) return;

        const init = async () => {
            try {
                // Token provider
                const tokenProvider = async () => {
                    const response = await fetch("/api/stream/token");
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Failed to fetch token");
                    }
                    const data = await response.json();
                    return data.token;
                };

                // 1. Initialize Chat Client
                const chat = StreamChat.getInstance(apiKey);

                // Connect Chat User
                if (!chat.userID) {
                    await chat.connectUser(
                        {
                            id: user.id,
                            name: user.fullName || user.id,
                            image: user.imageUrl,
                        },
                        tokenProvider
                    );
                }

                // 2. Initialize Video Client
                const video = new StreamVideoClient({
                    apiKey,
                    user: {
                        id: user.id,
                        name: user.fullName || user.id,
                        image: user.imageUrl,
                    },
                    tokenProvider,
                });

                setChatClient(chat);
                setVideoClient(video);
            } catch (error: any) {
                console.error("Failed to connect Stream clients", error);
                setError(error.message || "Failed to connect to Stream services");
            }
        };

        init();

        return () => {
            // Cleanup if needed, but usually handled by SDKs or we want to keep connection alive
            // videoClient?.disconnectUser();
            // chatClient?.disconnectUser();
        };
    }, [user, isLoaded]);

    if (!isLoaded || !user) {
        return <>{children}</>;
    }

    if (error) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-100 gap-4">
                <div className="text-red-500 font-semibold text-lg">Connection Error</div>
                <p className="text-slate-600 max-w-md text-center">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!videoClient || !chatClient) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-100">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <StreamVideo client={videoClient}>
            <Chat client={chatClient}>
                {children}
            </Chat>
        </StreamVideo>
    );
}
