"use client";

import { useState } from "react";
import { Search, Bell, MessageSquare, ChevronDown } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./CommandPalette";

export default function AppHeader() {
    const { user } = useUser();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isCommandOpen, setIsCommandOpen] = useState(false);

    const toggleDropdown = (id: string) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    // Close dropdown when clicking outside (simple implementation for now)
    // In a real app, use a click-outside hook

    // Mock notifications
    const notifications = [
        { id: 1, title: "New project assigned", time: "2m ago", unread: true },
        { id: 2, title: "Meeting in 30 mins", time: "1h ago", unread: false },
        { id: 3, title: "Design review requested", time: "2h ago", unread: true },
    ];

    return (
        <>
            <CommandPalette open={isCommandOpen} onOpenChange={setIsCommandOpen} />

            <header className="fixed top-0 left-0 right-0 h-20 z-50 bg-white/70 backdrop-blur-lg border-b border-white/60 flex items-center justify-between px-8 transition-all duration-300">
                {/* Left: Logo Area (Transparent/Placeholder to align with Sidebar) */}
                <div className="w-64 flex items-center gap-2 lg:w-20 transition-all duration-300">
                    {/* We can put a small logo here if needed, or leave it empty to let Sidebar show through if transparent */}
                </div>

                {/* Center: Universal Search */}
                <div className="flex-1 max-w-2xl mx-auto relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                    </div>
                    <button
                        onClick={() => setIsCommandOpen(true)}
                        className="block w-full pl-11 pr-12 py-3 border border-white/80 rounded-full leading-5 bg-white/50 text-left text-slate-400 hover:bg-white hover:shadow-md transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                        Search messages, calendar, settings...
                    </button>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/60 border border-white/40">
                            <span className="text-xs text-slate-400 font-medium">⌘ K</span>
                        </div>
                    </div>
                </div>

                {/* Right: Quick Actions */}
                <div className="flex items-center gap-4 ml-4">
                    {/* Chat Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('chat')}
                            className="p-3 rounded-full text-slate-500 hover:text-teal-600 hover:bg-white hover:shadow-md transition-all duration-200 relative group border border-transparent hover:border-white/60"
                        >
                            <MessageSquare className="h-5 w-5" />
                            <span className="absolute top-2.5 right-2.5 block h-2 w-2 rounded-full bg-teal-500 ring-2 ring-white transform scale-100 transition-transform group-hover:scale-110" />
                        </button>

                        {/* Chat Dropdown Content */}
                        {activeDropdown === 'chat' && (
                            <div className="absolute right-0 mt-4 w-80 bg-white/90 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-white/60 ring-1 ring-black/5 py-2 animate-in fade-in slide-in-from-top-2 z-50">
                                <div className="px-4 py-3 border-b border-slate-100/50 flex justify-between items-center">
                                    <h3 className="font-semibold text-slate-900">Messages</h3>
                                    <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full">2 New</span>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="px-4 py-3 hover:bg-white/50 cursor-pointer transition-colors flex gap-3 items-start">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">Sarah Design</p>
                                                <p className="text-xs text-slate-500 line-clamp-1">Hey, can you check the latest mockups?</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 border-t border-slate-100/50">
                                    <button className="w-full py-2 text-sm text-center text-teal-600 font-medium hover:bg-teal-50 rounded-xl transition-colors">
                                        View All Messages
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Notifications Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('notifications')}
                            className="p-3 rounded-full text-slate-500 hover:text-teal-600 hover:bg-white hover:shadow-md transition-all duration-200 relative border border-transparent hover:border-white/60"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2.5 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        </button>

                        {/* Notification Dropdown Content */}
                        {activeDropdown === 'notifications' && (
                            <div className="absolute right-0 mt-4 w-80 bg-white/90 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-white/60 ring-1 ring-black/5 py-2 animate-in fade-in slide-in-from-top-2 z-50">
                                <div className="px-4 py-3 border-b border-slate-100/50 flex justify-between items-center">
                                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                                    <button className="text-xs text-slate-400 hover:text-teal-600">Mark all read</button>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="px-4 py-3 hover:bg-white/50 cursor-pointer transition-colors flex gap-3">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-teal-500 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-slate-600">New project assigned to you: <span className="font-medium text-slate-900">Website Redesign</span></p>
                                                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="pl-4 border-l border-slate-200">
                        <div className="flex items-center gap-3 p-1 pr-4 rounded-full hover:bg-white hover:shadow-sm border border-transparent hover:border-white/60 transition-all cursor-pointer">
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "w-9 h-9 ring-2 ring-white shadow-sm"
                                    }
                                }}
                            />
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-slate-900 leading-none">Zach</p>
                                <p className="text-xs text-slate-500 mt-0.5">dev@useconcinnity.com</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
