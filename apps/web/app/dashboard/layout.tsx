import { Sidebar } from "../../components/dashboard/Sidebar";
import AppHeader from "../../components/dashboard/AppHeader";
import StreamClientProvider from "../../components/stream/StreamClientProvider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StreamClientProvider>
            <div className="relative min-h-screen bg-slate-100 selection:bg-primary/10 selection:text-primary-foreground">
                <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                    <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
                </div>

                <AppHeader />
                <Sidebar />
                <div className="pl-20 pt-20 transition-all duration-300 ease-in-out">
                    <main className="mx-auto max-w-6xl px-6 pb-12 pt-4">
                        {children}
                    </main>
                </div>
            </div>
        </StreamClientProvider>
    );
}
