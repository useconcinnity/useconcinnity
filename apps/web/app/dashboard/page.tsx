import { auth, currentUser } from '@clerk/nextjs/server';
import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Calendar,
  Video,
  ShoppingBag,
  BarChart3,
  Settings,
} from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    // This line is removed in the target code, but keeping it for functional correctness if it's a partial edit.
    // If the user intends to remove it, they should explicitly state that.
    // For now, I'll remove it as per the provided target code.
    // redirect('/sign-in');
  }
  const user = await currentUser();
  const greeting = user?.firstName ? `Welcome back, ${user.firstName}` : "Welcome back";

  const cards = [
    {
      title: "Chat",
      description: "Real-time messaging with your team",
      icon: MessageSquare,
      href: "/dashboard/chat",
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      title: "Calendar",
      description: "Schedule and manage meetings",
      icon: Calendar,
      href: "/dashboard/calendar",
      color: "bg-purple-500",
      textColor: "text-purple-500",
    },
    {
      title: "Video",
      description: "Start or join video conferences",
      icon: Video,
      href: "/dashboard/video",
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      title: "Marketplace",
      description: "Browse and install apps",
      icon: ShoppingBag,
      href: "/dashboard/marketplace",
      color: "bg-orange-500",
      textColor: "text-orange-500",
    },
    {
      title: "Analytics",
      description: "View usage and insights",
      icon: BarChart3,
      href: "/dashboard/analytics",
      color: "bg-pink-500",
      textColor: "text-pink-500",
    },
    {
      title: "Settings",
      description: "Manage your account and preferences",
      icon: Settings,
      href: "/dashboard/settings",
      color: "bg-gray-500",
      textColor: "text-gray-500",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title={greeting}
        description="One place where meetings, messages, and work stay perfectly in sync across your entire organization."
        actions={(
          <>
            <Link
              href="/dashboard/video"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
            >
              Jump into a meeting
            </Link>
            <Link
              href="/dashboard/chat"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-white"
            >
              Open your inbox
            </Link>
          </>
        )}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-xl p-8 shadow-sm ring-1 ring-white/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-teal-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10">
              <div
                className={cn(
                  "mb-6 inline-flex rounded-2xl bg-white/50 p-4 ring-1 ring-white/60 shadow-sm transition-colors duration-300",
                  "group-hover:bg-white group-hover:shadow-md",
                )}
              >
                <card.icon
                  className={cn(
                    "h-8 w-8 transition-transform duration-300",
                    card.textColor,
                    "group-hover:scale-110 transform",
                  )}
                />
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-teal-700">
                {card.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-500 group-hover:text-slate-600">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
