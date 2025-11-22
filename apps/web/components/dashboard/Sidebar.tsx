"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    MessageSquare,
    Calendar,
    Video,
    ShoppingBag,
    BarChart3,
    Settings,
    LogOut,
    ChevronRight
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: MessageSquare, label: "Chat", href: "/dashboard/chat" },
    { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
    { icon: Video, label: "Video", href: "/dashboard/video" },
    { icon: ShoppingBag, label: "Marketplace", href: "/dashboard/marketplace" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user } = useUser();

    return (
        <aside className="fixed left-0 top-0 h-screen z-40 group w-20 hover:w-72 transition-all duration-300 ease-in-out pt-20">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-lg border-r border-white/60" />

            <div className="relative h-full flex flex-col p-4">
                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-3 py-3 rounded-full transition-all duration-200 group/item relative overflow-hidden",
                                    isActive
                                        ? "bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 shadow-sm ring-1 ring-teal-100"
                                        : "text-slate-500 hover:bg-white/50 hover:text-slate-900 hover:shadow-sm"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-6 h-6 transition-colors",
                                    isActive ? "text-teal-600" : "text-slate-400 group-hover/item:text-slate-600"
                                )} />
                                <span className={cn(
                                    "font-medium whitespace-nowrap transition-all duration-300 origin-left",
                                    "opacity-0 group-hover:opacity-100 w-0 group-hover:w-auto"
                                )}>
                                    {item.label}
                                </span>

                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-500 rounded-r-full shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="mt-auto pt-4 border-t border-white/40 space-y-2">
                    <div className="flex items-center gap-4 px-3 py-3 rounded-full text-slate-500 hover:bg-white/50 hover:text-slate-900 transition-all group/item">
                        <UserButton afterSignOutUrl="/" appearance={{
                            elements: {
                                avatarBox: "w-9 h-9"
                            }
                        }} />
                        <div className="opacity-0 group-hover:opacity-100 w-0 group-hover:w-auto transition-all duration-300 flex flex-col">
                            <span className="text-sm font-medium text-foreground truncate max-w-[140px]">
                                {user?.fullName || "User"}
                            </span>
                            <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                                {user?.primaryEmailAddress?.emailAddress}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
