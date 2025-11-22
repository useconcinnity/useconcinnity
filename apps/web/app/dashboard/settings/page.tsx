"use client";

import { UserProfile } from "@clerk/nextjs";
import { Bell, Moon, Sun, Shield, User, Globe } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    return (
        <div className="mx-auto max-w-5xl space-y-8">
            <PageHeader
                title="Settings"
                description="Manage your account preferences and workspace settings for your Concinnity org."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Settings Navigation */}
                <div className="lg:col-span-3 space-y-2">
                    <nav className="flex flex-col space-y-1">
                        {[
                            { icon: User, label: "Profile", active: true },
                            { icon: Bell, label: "Notifications", active: false },
                            { icon: Shield, label: "Security", active: false },
                            { icon: Globe, label: "Language", active: false },
                            { icon: Moon, label: "Appearance", active: false },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                    item.active
                                        ? "bg-gradient-to-r from-teal-500/10 to-cyan-500/10 text-teal-500 border border-teal-500/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-9 space-y-6">
                    {/* Profile Section */}
                    <div className="glass rounded-3xl p-8 border border-white/20">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-1">Profile Information</h2>
                                <p className="text-sm text-muted-foreground">Update your personal details and public profile.</p>
                            </div>
                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
                                Edit Profile
                            </button>
                        </div>

                        {/* Clerk User Profile Component - We can embed it or build custom UI */}
                        {/* For this demo, we'll build a custom UI that matches our design system */}

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">First Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Zach"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Schultz"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="zach@concinnity.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Bio</label>
                                <textarea
                                    rows={4}
                                    defaultValue="Product Designer & Developer based in SF."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Preferences Section */}
                    <div className="glass rounded-3xl p-8 border border-white/20">
                        <h2 className="text-xl font-semibold mb-6">Preferences</h2>

                        <div className="space-y-4">
                            {[
                                { title: "Email Notifications", desc: "Receive emails about your account activity.", checked: true },
                                { title: "Desktop Notifications", desc: "Get notified on your desktop.", checked: false },
                                { title: "Dark Mode", desc: "Use dark theme for the interface.", checked: true },
                            ].map((pref, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div>
                                        <h3 className="font-medium">{pref.title}</h3>
                                        <p className="text-sm text-muted-foreground">{pref.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked={pref.checked} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
