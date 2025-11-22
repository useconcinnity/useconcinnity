import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export async function Navbar() {
    const { userId } = await auth();

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 transition-all duration-300">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-gradient-brand tracking-tight hover:opacity-80 transition-opacity">
                    Concinnity
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        Pricing
                    </Link>
                    <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        About
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {userId ? (
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/sign-in"
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/sign-up"
                                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
