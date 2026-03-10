"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TrackingHeroProps {
    data: any;
}

export default function TrackingHero({ data }: TrackingHeroProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Parallax effects
    const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    return (
        <section ref={ref} className="relative w-full h-[60vh] md:h-[70vh] min-h-[500px] flex flex-col justify-center items-center overflow-hidden bg-[#0A1629]">

            {/* Background Image with Parallax */}
            <motion.div
                style={{ scale: scaleImage }}
                className="absolute inset-0 z-0 w-full h-full"
            >
                {data.tracking_hero_background?.url && (
                    <Image
                        src={data.tracking_hero_background.url}
                        alt={data.tracking_hero_background.alt || "Tracking background"}
                        fill
                        className="object-cover object-center"
                        priority
                    />
                )}
            </motion.div>

            {/* Gradient Overlays for Readability and Aesthetic */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A1629]/80 via-[#0A1629]/50 to-[#0A1629] pointer-events-none"></div>

            <motion.div
                style={{ y: yHeroText, opacity: opacityHero }}
                className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
            >
                {/* Decorative Pill */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-block px-4 py-1.5 mb-6 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm text-orange-400 text-sm font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                >
                    Live Cargo Tracking
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="overflow-hidden"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-[72px] font-bold text-white mb-6 tracking-tight leading-[1.1]">
                        {data.tracking_page}
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                    <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-medium">
                        {data.tracking_sub_title}
                    </p>
                </motion.div>
            </motion.div>

            {/* Bottom fading edge to blend into the next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent z-20 pointer-events-none"></div>
        </section>
    );
}
