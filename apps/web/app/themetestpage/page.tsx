"use client";

import { cn } from "@/lib/utils";
import {
    MessageSquare,
    Calendar,
    Video,
    ShoppingBag,
    BarChart3,
    Settings,
    ArrowRight,
    Check,
    MoreHorizontal,
    Search,
    Bell,
    User,
    ChevronDown,
    Plus,
    Command,
} from "lucide-react";
import { useState } from "react";

const themes = [
    {
        id: "frost",
        name: "1. Frost (Cool & Crisp)",
        description: "High blur, icy white tints, and sharp definition. Feels like frosted glass in winter.",
        specs: {
            bg: "bg-gradient-to-br from-slate-50 to-white",
            card: "bg-white/70 backdrop-blur-2xl border border-white/50 shadow-sm",
            header: "bg-white/60 backdrop-blur-xl border-b border-white/20",
            text: "text-slate-800",
            muted: "text-slate-400",
            accent: "text-teal-600",
            button: {
                primary: "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/20 border border-white/10",
                secondary: "bg-white/50 border border-white/60 text-slate-700 hover:bg-white/80",
                ghost: "text-slate-600 hover:bg-slate-100/50",
            },
            input: "bg-white/40 border border-white/60 focus:ring-2 focus:ring-teal-500/20 placeholder:text-slate-400",
            dropdown: "bg-white/80 backdrop-blur-2xl border border-white/60 shadow-xl rounded-2xl",
        },
    },
    {
        id: "vapor",
        name: "2. Vapor (Soft & Ethereal)",
        description: "Milky transparency, soft shadows, and very subtle gradients. Dreamy and calming.",
        specs: {
            bg: "bg-gradient-to-br from-gray-50 via-white to-teal-50/30",
            card: "bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.05)]",
            header: "bg-white/30 backdrop-blur-md border-b border-white/10",
            text: "text-gray-700",
            muted: "text-gray-400",
            accent: "text-teal-500",
            button: {
                primary: "bg-teal-500/90 text-white shadow-[0_4px_14px_0_rgba(20,184,166,0.39)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.23)] hover:bg-teal-500 transition-all ease-out",
                secondary: "bg-white/60 text-gray-600 hover:bg-white/80 shadow-sm",
                ghost: "text-gray-500 hover:text-teal-600 hover:bg-teal-50/50",
            },
            input: "bg-white/30 border-none shadow-inner focus:ring-0 focus:bg-white/50 placeholder:text-gray-400",
            dropdown: "bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl",
        },
    },
    {
        id: "crystal",
        name: "3. Crystal (Sharp & Reflective)",
        description: "High gloss, distinct white borders, and geometric precision. Feels premium and expensive.",
        specs: {
            bg: "bg-slate-100",
            card: "bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-xl border border-white/80 shadow-sm ring-1 ring-white/50",
            header: "bg-white/70 backdrop-blur-lg border-b border-white/60",
            text: "text-slate-900",
            muted: "text-slate-500",
            accent: "text-cyan-600",
            button: {
                primary: "bg-gradient-to-b from-teal-400 to-teal-500 text-white border-t border-white/20 shadow-md active:scale-95 transition-transform",
                secondary: "bg-white border border-slate-200 text-slate-700 shadow-sm hover:border-slate-300",
                ghost: "text-slate-600 hover:bg-white/50",
            },
            input: "bg-white/50 border border-white/80 shadow-sm focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10",
            dropdown: "bg-white/90 backdrop-blur-xl border border-white shadow-2xl ring-1 ring-black/5 rounded-xl",
        },
    },
    {
        id: "depth",
        name: "4. Depth (Layered & Immersive)",
        description: "Stronger contrast, stacked layers, and parallax-like depth. Professional and grounded.",
        specs: {
            bg: "bg-gray-200",
            card: "bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-transparent", // Solid card for contrast
            header: "bg-white/90 backdrop-blur-md shadow-sm z-10",
            text: "text-gray-900",
            muted: "text-gray-500",
            accent: "text-teal-700",
            button: {
                primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20",
                secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
                ghost: "text-gray-600 hover:bg-gray-100",
            },
            input: "bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all",
            dropdown: "bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 rounded-xl",
        },
    },
    {
        id: "ceramic",
        name: "5. Ceramic (Opaque & Tactile)",
        description: "Matte finish, opaque surfaces, and tactile interactions. Warm and substantial.",
        specs: {
            bg: "bg-[#F5F5F7]", // Apple's light gray
            card: "bg-white rounded-[24px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.02)]",
            header: "bg-[#F5F5F7]/80 backdrop-blur-xl border-b border-black/5",
            text: "text-[#1D1D1F]",
            muted: "text-[#86868B]",
            accent: "text-[#0071e3]", // Apple blue/teal variant
            button: {
                primary: "bg-[#0071e3] text-white rounded-full hover:bg-[#0077ED] transition-colors font-medium",
                secondary: "bg-[#E8E8ED] text-[#1D1D1F] rounded-full hover:bg-[#D2D2D7] transition-colors font-medium",
                ghost: "text-[#0071e3] hover:underline",
            },
            input: "bg-[#E8E8ED] rounded-xl border-none focus:ring-2 focus:ring-[#0071e3]/30 text-[#1D1D1F]",
            dropdown: "bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl border border-black/5",
        },
    },
];

export default function ThemeTestPage() {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>("frost"); // Default open for demo

    return (
        <div className="min-h-screen bg-white p-8 space-y-24 pb-40">
            <div className="max-w-4xl mx-auto text-center space-y-6">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900">Premium Variations</h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    5 high-fidelity interpretations of the "Apple/iOS" aesthetic.
                    Focusing on glassmorphism, light, and tactile interactions.
                </p>
            </div>

            {themes.map((theme) => (
                <section key={theme.id} className="max-w-7xl mx-auto border-t border-gray-100 pt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Specs Panel */}
                        <div className="lg:col-span-3 space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">{theme.name}</h2>
                                <p className="text-gray-500 leading-relaxed">{theme.description}</p>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Component Library</h3>

                                {/* Buttons Preview */}
                                <div className="space-y-3">
                                    <button className={cn("w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all", theme.specs.button.primary)}>
                                        Primary Action
                                    </button>
                                    <button className={cn("w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all", theme.specs.button.secondary)}>
                                        Secondary Action
                                    </button>
                                    <button className={cn("w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all", theme.specs.button.ghost)}>
                                        Ghost Action
                                    </button>
                                </div>

                                {/* Input Preview */}
                                <div>
                                    <div className={cn("flex items-center px-3 py-2.5 rounded-xl w-full transition-all", theme.specs.input)}>
                                        <Search className={cn("w-4 h-4 mr-2", theme.specs.muted)} />
                                        <span className={cn("text-sm", theme.specs.muted)}>Search...</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* UI Preview */}
                        <div className={cn("lg:col-span-9 rounded-[2.5rem] overflow-hidden min-h-[600px] relative shadow-2xl ring-1 ring-black/5", theme.specs.bg)}>

                            {/* Mock Header */}
                            <div className={cn("absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-8 z-20", theme.specs.header)}>
                                <div className="flex items-center gap-12">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/20">
                                        C
                                    </div>

                                    {/* Navigation with Dropdown Demo */}
                                    <nav className="flex items-center gap-1">
                                        <div className="relative">
                                            <button
                                                onClick={() => setOpenDropdownId(openDropdownId === theme.id ? null : theme.id)}
                                                className={cn("px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-colors", openDropdownId === theme.id ? "bg-black/5 text-gray-900" : theme.specs.muted)}
                                            >
                                                Dashboard <ChevronDown className="w-3 h-3" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {openDropdownId === theme.id && (
                                                <div className={cn("absolute top-full left-0 mt-2 w-64 p-2 animate-in fade-in slide-in-from-top-2 duration-200", theme.specs.dropdown)}>
                                                    <div className="space-y-1">
                                                        {['Overview', 'Analytics', 'Reports', 'Settings'].map((item, i) => (
                                                            <button key={item} className="w-full text-left px-3 py-2 rounded-xl hover:bg-black/5 text-sm font-medium text-gray-700 transition-colors flex items-center justify-between group">
                                                                {item}
                                                                {i === 0 && <Check className="w-4 h-4 text-teal-500" />}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="mt-2 pt-2 border-t border-black/5 px-3 pb-1">
                                                        <span className="text-xs text-gray-400 font-medium">Workspace</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <button className={cn("px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-black/5", theme.specs.muted)}>Team</button>
                                        <button className={cn("px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-black/5", theme.specs.muted)}>Projects</button>
                                    </nav>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className={cn("flex items-center px-3 py-2 rounded-full w-64 transition-all", theme.specs.input)}>
                                        <Search className={cn("w-4 h-4 mr-2", theme.specs.muted)} />
                                        <input type="text" placeholder="Search..." className="bg-transparent border-none focus:ring-0 p-0 text-sm w-full placeholder:text-inherit" />
                                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-black/10 bg-black/5">
                                            <Command className="w-3 h-3 opacity-50" />
                                            <span className="text-[10px] font-medium opacity-50">K</span>
                                        </div>
                                    </div>
                                    <button className={cn("p-2.5 rounded-full hover:bg-black/5 transition-colors relative", theme.specs.muted)}>
                                        <Bell className="w-5 h-5" />
                                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                                    </button>
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 ring-2 ring-white shadow-sm" />
                                </div>
                            </div>

                            {/* Mock Content */}
                            <div className="p-8 pt-28 grid grid-cols-12 gap-6 h-full">
                                {/* Sidebar */}
                                <div className="col-span-3 space-y-2">
                                    {['Home', 'Recent', 'Starred', 'Trash'].map((item, i) => (
                                        <button key={item} className={cn("w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3", i === 0 ? theme.specs.card + " " + theme.specs.accent : "hover:bg-black/5 " + theme.specs.muted)}>
                                            <div className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-teal-500" : "bg-transparent")} />
                                            {item}
                                        </button>
                                    ))}
                                </div>

                                {/* Main Area */}
                                <div className="col-span-9 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className={cn("text-2xl font-bold", theme.specs.text)}>Dashboard Overview</h2>
                                        <button className={cn("px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all", theme.specs.button.primary)}>
                                            <Plus className="w-4 h-4" /> New Project
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-6">
                                        {[
                                            { title: "Total Revenue", value: "$45,231.89", trend: "+20.1%", icon: BarChart3, color: "text-teal-500" },
                                            { title: "Active Users", value: "+2350", trend: "+180.1%", icon: User, color: "text-blue-500" },
                                            { title: "Sales", value: "+12,234", trend: "+19%", icon: ShoppingBag, color: "text-orange-500" },
                                        ].map((stat, i) => (
                                            <div key={i} className={cn("p-6 transition-all duration-300 group", theme.specs.card)}>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className={cn("text-sm font-medium", theme.specs.muted)}>{stat.title}</span>
                                                    <stat.icon className={cn("w-4 h-4 opacity-70", stat.color)} />
                                                </div>
                                                <div className={cn("text-2xl font-bold mb-1", theme.specs.text)}>{stat.value}</div>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <span className="text-emerald-600 font-medium">{stat.trend}</span> from last month
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={cn("p-6 h-64 flex items-center justify-center", theme.specs.card)}>
                                        <div className="text-center space-y-2">
                                            <div className={cn("w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-black/5", theme.specs.muted)}>
                                                <BarChart3 className="w-6 h-6" />
                                            </div>
                                            <h3 className={cn("text-lg font-medium", theme.specs.text)}>No recent activity</h3>
                                            <p className={cn("text-sm max-w-xs mx-auto", theme.specs.muted)}>Your recent projects and tasks will appear here once you start working.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
