"use client";

import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { X, UserPlus, MessageSquarePlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateChannelDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateChannelDialog({ open, onOpenChange }: CreateChannelDialogProps) {
    const { client } = useChatContext();
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    if (!open) return null;

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId.trim()) return;

        setIsLoading(true);
        setError("");

        try {
            // Create a direct message channel
            const channel = client.channel("messaging", {
                members: [client.userID!, userId],
            });

            await channel.watch();
            setUserId("");
            onOpenChange(false);
        } catch (err: any) {
            console.error("Failed to create channel", err);
            setError(err.message || "Failed to create channel. Check the User ID.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={() => onOpenChange(false)}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/60 p-6 animate-in zoom-in-95 duration-200">
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center mb-4 text-teal-600">
                        <UserPlus className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">New Message</h2>
                    <p className="text-slate-500 mt-1">Enter a User ID to start a conversation.</p>
                </div>

                <form onSubmit={handleCreate} className="space-y-4">
                    <div>
                        <label htmlFor="userId" className="block text-sm font-medium text-slate-700 mb-1.5">
                            User ID
                        </label>
                        <input
                            id="userId"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="e.g. user_123"
                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all placeholder:text-slate-400"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !userId.trim()}
                            className="flex-1 px-4 py-3 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Start Chat
                                    <MessageSquarePlus className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
