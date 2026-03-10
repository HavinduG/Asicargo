"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface KeyFeature {
    feature_icon: {
        url: string;
        alt?: string;
    };
    feature_title: string;
    feature_description: string;
}

interface KeyFeaturesProps {
    features: KeyFeature[];
}

export default function KeyFeatures({ features }: KeyFeaturesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    if (!features || features.length === 0) return null;

    return (
        <section ref={containerRef} className="py-12 md:py-16 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center xl:items-start xl:flex-row gap-12 lg:gap-24">

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.6 }}
                    className="w-full xl:w-1/3 flex-shrink-0"
                >
                    <h2 className="text-4xl md:text-[46px] font-medium text-[#1A1A1A] tracking-tight leading-tight">
                        Key Features
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 w-full xl:w-[70%]">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex gap-6 items-start"
                        >
                            {/* Icon Box */}
                            <div className="w-[72px] h-[72px] shrink-0 bg-[#0F0F0F] rounded-[20px] flex items-center justify-center transform transition-transform duration-300 hover:-translate-y-1 shadow-sm border border-gray-200">
                                <Image
                                    src={feature.feature_icon?.url || "https://placehold.co/24x24"}
                                    alt={feature.feature_title}
                                    width={28}
                                    height={28}
                                    className="object-contain filter invert opacity-90"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col gap-2.5 pt-1">
                                <h3 className="text-xl md:text-[22px] font-medium text-[#1A1A1A]">
                                    {feature.feature_title}
                                </h3>
                                <p className="text-[#737373] leading-relaxed text-[15px]">
                                    {feature.feature_description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
