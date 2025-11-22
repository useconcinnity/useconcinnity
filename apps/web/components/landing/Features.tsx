import { MessageSquare, Calendar, Video, Zap, Shield, Globe } from "lucide-react";

const features = [
    {
        icon: MessageSquare,
        title: "Real-time Chat",
        description: "Seamless communication with your team through organized channels and direct messages.",
        color: "text-blue-500",
    },
    {
        icon: Calendar,
        title: "Smart Calendar",
        description: "Schedule and manage meetings effortlessly with intelligent conflict resolution.",
        color: "text-purple-500",
    },
    {
        icon: Video,
        title: "Video Conferencing",
        description: "High-quality video calls built right into your workflow, no external apps needed.",
        color: "text-pink-500",
    },
    {
        icon: Zap,
        title: "Instant Sync",
        description: "Changes reflect instantly across all devices so everyone stays on the same page.",
        color: "text-yellow-500",
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-grade encryption and role-based access control to keep your data safe.",
        color: "text-green-500",
    },
    {
        icon: Globe,
        title: "Global Access",
        description: "Access your workspace from anywhere in the world, on any device.",
        color: "text-cyan-500",
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Everything you need to <br />
                        <span className="text-gradient-brand">scale your business</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Powerful tools integrated into one seamless platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card p-8 rounded-3xl group hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100" />

                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300 shadow-inner border border-white/10`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 tracking-tight">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
