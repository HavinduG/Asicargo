"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface TrackingSearchProps {
    data: any;
}

export default function TrackingSearch({ data }: TrackingSearchProps) {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleTrack = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (trackingNumber.trim()) {
            router.push(`/system/track?id=${encodeURIComponent(trackingNumber)}`);
        }
    };

    // A simple grid pattern generator to mimic a highly stylized dotted map
    const generateDottedPattern = () => {
        const dots = [];
        for (let x = 0; x < 25; x++) {
            for (let y = 0; y < 15; y++) {
                // Creates a somewhat clustered map shape organically using math
                const noise = Math.sin(x * 0.3) * Math.cos(y * 0.4) + Math.sin(x * y * 0.1);
                if (noise > 0.1) {
                    dots.push(<circle key={`${x}-${y}`} cx={x * 12} cy={y * 12} r="1.5" className="fill-white/20" />);
                }
            }
        }
        return dots;
    };

    return (
        <section className="relative w-full min-h-[70vh] lg:h-[80vh] flex flex-col lg:flex-row bg-[#0D0D0D]">

            {/* Left Column: Image Area */}
            <div className="w-full lg:w-1/2 relative h-[400px] lg:h-full bg-zinc-900 overflow-hidden">
                {data.search_image?.url && (
                    <Image
                        src={data.search_image.url}
                        alt="Global Logistics Background"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                )}
                {/* Subtle gradient to blend the edge into the dark section on desktop */}
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0D0D0D] to-transparent hidden lg:block opacity-60"></div>
            </div>

            {/* Right Column: Tracking Form & Map Area */}
            <div className="w-full lg:w-1/2 relative flex flex-col justify-center px-8 py-16 lg:px-20 xl:px-32 bg-[url('/noise.png')]">

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-20 w-full max-w-lg mt-8 lg:mt-0"
                >
                    <h4 className="text-zinc-300 text-sm font-semibold tracking-wide mb-3 font-sans">
                        Track Your Package
                    </h4>

                    <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight mb-16">
                        Quick Tracking
                    </h2>

                    <form onSubmit={handleTrack} className="relative w-full group">
                        <div className="relative border-b border-zinc-700/60 pb-3 flex items-center focus-within:border-white transition-colors duration-300">
                            <input
                                type="text"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                placeholder="enter your order number here..."
                                className="w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-zinc-600 pr-32 font-light"
                                required
                            />

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="absolute right-0 bottom-2 bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-zinc-100 transition-colors"
                            >
                                Track It
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

                {/* Bottom Right: Decorative Dotted Map + Dubai to Sri Lanka Animated Route */}
                {mounted && (
                    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] md:w-[600px] md:h-[400px] opacity-40 pointer-events-none z-10 overflow-hidden lg:overflow-visible">
                        <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMaxYMax meet">

                            {/* Dotted Abstract Map Background */}
                            <g transform="translate(200, 100)">
                                {generateDottedPattern()}
                            </g>

                            {/* --- THE ROUTE ANIMATION --- */}
                            <g transform="translate(-50, 0)">
                                {/* The Dashed Path */}
                                <motion.path
                                    d="M 300,150 C 400,120 500,200 550,260"
                                    fill="none"
                                    stroke="url(#route-glow)"
                                    strokeWidth="2"
                                    className="opacity-40"
                                    strokeDasharray="4 4"
                                />

                                {/* The Flying Glow Component */}
                                <motion.path
                                    d="M 300,150 C 400,120 500,200 550,260"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        duration: 3,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        repeatDelay: 1
                                    }}
                                />

                                {/* Glowing Gradients */}
                                <defs>
                                    <linearGradient id="route-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                                    </linearGradient>
                                </defs>

                                {/* Points */}
                                <motion.circle cx="300" cy="150" r="4" className="fill-white" />
                                <text x="260" y="145" fill="currentColor" className="text-xs font-semibold text-zinc-300">Dubai</text>

                                <motion.circle cx="550" cy="260" r="4" className="fill-white" />
                                <text x="560" y="275" fill="currentColor" className="text-xs font-semibold text-zinc-300">Sri Lanka</text>
                            </g>
                        </svg>
                    </div>
                )}
            </div>
        </section>
    );
}
