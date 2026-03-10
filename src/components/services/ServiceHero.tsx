"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ServiceHeroProps {
    title: string;
    subtitle?: string;
    backgroundImageUrl?: string;
}

export default function ServiceHero({ title, subtitle, backgroundImageUrl }: ServiceHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Subtle floating particles for modern effect
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        setParticles([...Array(15)].map((_, i) => ({
            id: i,
            size: Math.random() * 4 + 2,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        })));
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative pt-40 pb-28 md:pt-56 md:pb-40 bg-[#0F172A] flex items-center justify-center min-h-[400px] md:min-h-[600px] overflow-hidden"
        >
            {/* Parallax Background Image */}
            <motion.div
                className="absolute inset-0 z-0 w-full h-full"
                style={{ y: yBackground }}
            >
                {backgroundImageUrl ? (
                    <motion.div
                        initial={{ scale: 1.1, filter: "blur(10px)", opacity: 0 }}
                        animate={{ scale: 1, filter: "blur(0px)", opacity: 0.8 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src={backgroundImageUrl}
                            alt={title || "Services Hero"}
                            fill
                            className="object-cover pointer-events-none"
                            priority
                        />
                    </motion.div>
                ) : (
                    <div className="w-full h-full bg-[#0F172A]" />
                )}
            </motion.div>

            {/* Glowing Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/40 to-[#0F172A] pointer-events-none" />

            {/* Subtle Spotlight Effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

            {/* Floating Particles */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-white/20"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0.1, 0.5, 0.1],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: particle.delay,
                        }}
                    />
                ))}
            </div>

            {/* Content Container */}
            <motion.div
                style={{ opacity: opacityText, y: yText }}
                className="container mx-auto px-4 md:px-8 relative z-20 text-center flex flex-col items-center justify-center"
            >
                {/* Badge or Tag */}
                <motion.div
                    custom={0}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">Our Offerings</span>
                </motion.div>

                <h1 className="text-4xl md:text-6xl lg:text-[72px] font-medium text-white mb-6 tracking-tight leading-[1.1] relative">
                    {title.split(' ').map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 40, rotateX: -20 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3 + i * 0.1,
                                ease: [0.2, 0.65, 0.3, 0.9]
                            }}
                            className="inline-block mr-3 lg:mr-4 last:mr-0"
                            style={{ transformPerspective: 1000 }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                        className="text-zinc-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-white/40 tracking-widest uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
