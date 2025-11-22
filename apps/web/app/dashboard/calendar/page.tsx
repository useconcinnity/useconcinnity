"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { cn } from "@/lib/utils";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentDate = new Date();

// Mock events
const events = [
    {
        id: 1,
        title: "Team Standup",
        time: "10:00 AM",
        duration: "30m",
        type: "meeting",
        attendees: 5,
        day: currentDate.getDate(),
        color: "bg-teal-500",
    },
    {
        id: 2,
        title: "Product Review",
        time: "2:00 PM",
        duration: "1h",
        type: "review",
        attendees: 8,
        day: currentDate.getDate() + 1,
        color: "bg-blue-500",
    },
    {
        id: 3,
        title: "Design Sync",
        time: "11:00 AM",
        duration: "45m",
        type: "sync",
        attendees: 3,
        day: currentDate.getDate() + 3,
        color: "bg-purple-500",
    },
];

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<number>(currentDate.getDate());

    // Generate days for the current month (simplified for demo)
    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="flex h-full flex-col space-y-6">
            <PageHeader
                title="Calendar"
                description="Manage your schedule and events. Soon this will sync meetings, tasks, and messages."
                actions={(
                    <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/30">
                        <Plus className="w-4 h-4" />
                        New Event
                    </button>
                )}
            />

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Calendar Grid */}
                <div className="lg:col-span-3 glass rounded-3xl p-6 border border-white/20 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">November 2025</h2>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4 mb-4">
                        {days.map((day) => (
                            <div key={day} className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-4 flex-1">
                        {daysInMonth.map((day) => {
                            const hasEvent = events.find((e) => e.day === day);
                            const isSelected = selectedDate === day;

                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(day)}
                                    className={cn(
                                        "relative aspect-square rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center group",
                                        isSelected
                                            ? "bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border-teal-500/50 shadow-inner"
                                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                    )}
                                >
                                    <span className={cn(
                                        "text-lg font-medium mb-1",
                                        isSelected ? "text-teal-500" : "text-foreground"
                                    )}>
                                        {day}
                                    </span>
                                    {hasEvent && (
                                        <div className="flex gap-1">
                                            <div className={cn("w-1.5 h-1.5 rounded-full", hasEvent.color)} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar - Upcoming Events */}
                <div className="space-y-6">
                    <div className="glass rounded-3xl p-6 border border-white/20 h-full">
                        <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
                        <div className="space-y-4">
                            {events.map((event) => (
                                <div key={event.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={cn("w-2 h-8 rounded-full", event.color)} />
                                        <div>
                                            <h4 className="font-medium leading-none mb-1">{event.title}</h4>
                                            <span className="text-xs text-muted-foreground uppercase tracking-wider">{event.type}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{event.time} ({event.duration})</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span>{event.attendees} Attendees</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full py-3 rounded-xl border border-dashed border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40 transition-all flex items-center justify-center gap-2 text-sm">
                                <Plus className="w-4 h-4" />
                                Add Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
