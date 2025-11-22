import Link from "next/link";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-50 pointer-events-none">
                <div className="liquid-blob top-0 right-0 w-[500px] h-[500px] bg-teal-400/30 delay-0" />
                <div className="liquid-blob bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/30 delay-2000" />
                <div className="liquid-blob top-1/2 left-1/2 w-[600px] h-[600px] bg-blue-500/20 delay-4000" />
            </div>

            <div className="container mx-auto px-6 text-center">
                <div className="animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Work Together, <br />
                        <span className="text-gradient-brand">Brilliantly</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        The all-in-one business management platform that brings your team together
                        with powerful tools for communication, collaboration, and productivity.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/sign-up"
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105"
                        >
                            Start for Free
                        </Link>
                        <Link
                            href="#features"
                            className="px-8 py-4 rounded-full glass text-foreground font-semibold text-lg hover:bg-white/20 transition-all hover:scale-105"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Dashboard Preview / Abstract Visual */}
                <div className="mt-20 relative mx-auto max-w-5xl animate-slide-up opacity-0" style={{ animationDelay: "0.2s" }}>
                    <div className="aspect-video rounded-2xl glass border border-white/10 shadow-2xl overflow-hidden relative bg-gradient-to-br from-gray-900/50 to-black/50">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-muted-foreground">Dashboard Preview Placeholder</p>
                        </div>
                        {/* Decorative UI elements */}
                        <div className="absolute top-4 left-4 right-4 h-8 bg-white/5 rounded-lg flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
