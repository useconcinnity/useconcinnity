"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search, LayoutDashboard, MessageSquare, Calendar, Video, Settings, User, LogOut, ArrowRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";


interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
    const router = useRouter();


    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, onOpenChange]);

    const runCommand = React.useCallback((command: () => void) => {
        onOpenChange(false);
        command();
    }, [onOpenChange]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
                onClick={() => onOpenChange(false)}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-2xl mx-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
                <Command
                    className="w-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[2rem] overflow-hidden ring-1 ring-black/5"
                    loop
                >
                    <div className="flex items-center border-b border-white/40 px-4" cmdk-input-wrapper="">
                        <Search className="mr-2 h-5 w-5 shrink-0 text-slate-400" />
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="flex h-14 w-full rounded-md bg-transparent py-3 text-lg outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scrollbar-hide">
                        <Command.Empty className="py-6 text-center text-sm text-slate-500">
                            No results found.
                        </Command.Empty>



                        <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-slate-400 uppercase tracking-wider">
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/dashboard"))}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 aria-selected:bg-teal-50 aria-selected:text-teal-700 cursor-pointer transition-colors group"
                            >
                                <LayoutDashboard className="h-5 w-5 text-slate-400 group-aria-selected:text-teal-500" />
                                <span className="flex-1 text-base font-medium">Dashboard</span>
                                <ArrowRight className="h-4 w-4 opacity-0 group-aria-selected:opacity-100 transition-opacity text-teal-500" />
                            </Command.Item>

                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/dashboard/chat"))}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 aria-selected:bg-teal-50 aria-selected:text-teal-700 cursor-pointer transition-colors group"
                            >
                                <MessageSquare className="h-5 w-5 text-slate-400 group-aria-selected:text-teal-500" />
                                <span className="flex-1 text-base font-medium">Chat</span>
                                <ArrowRight className="h-4 w-4 opacity-0 group-aria-selected:opacity-100 transition-opacity text-teal-500" />
                            </Command.Item>

                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/dashboard/calendar"))}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 aria-selected:bg-teal-50 aria-selected:text-teal-700 cursor-pointer transition-colors group"
                            >
                                <Calendar className="h-5 w-5 text-slate-400 group-aria-selected:text-teal-500" />
                                <span className="flex-1 text-base font-medium">Calendar</span>
                                <ArrowRight className="h-4 w-4 opacity-0 group-aria-selected:opacity-100 transition-opacity text-teal-500" />
                            </Command.Item>

                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/dashboard/video"))}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 aria-selected:bg-teal-50 aria-selected:text-teal-700 cursor-pointer transition-colors group"
                            >
                                <Video className="h-5 w-5 text-slate-400 group-aria-selected:text-teal-500" />
                                <span className="flex-1 text-base font-medium">Video Calls</span>
                                <ArrowRight className="h-4 w-4 opacity-0 group-aria-selected:opacity-100 transition-opacity text-teal-500" />
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Settings" className="px-2 py-1.5 mt-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/dashboard/settings"))}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 aria-selected:bg-teal-50 aria-selected:text-teal-700 cursor-pointer transition-colors group"
                            >
                                <User className="h-5 w-5 text-slate-400 group-aria-selected:text-teal-500" />
                                <span className="flex-1 text-base font-medium">Profile</span>
                            </Command.Item>

                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/dashboard/settings"))}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 aria-selected:bg-teal-50 aria-selected:text-teal-700 cursor-pointer transition-colors group"
                            >
                                <Settings className="h-5 w-5 text-slate-400 group-aria-selected:text-teal-500" />
                                <span className="flex-1 text-base font-medium">Preferences</span>
                            </Command.Item>
                        </Command.Group>

                        <div className="px-2 py-2 mt-2 border-t border-white/40">
                            <div className="flex items-center justify-between px-3 text-xs text-slate-400">
                                <span>Use arrow keys to navigate</span>
                                <div className="flex gap-2">
                                    <span className="bg-white/50 px-1.5 py-0.5 rounded border border-white/40">↵ Select</span>
                                    <span className="bg-white/50 px-1.5 py-0.5 rounded border border-white/40">Esc Close</span>
                                </div>
                            </div>
                        </div>
                    </Command.List>
                </Command>
            </div>
        </div>
    );
}
