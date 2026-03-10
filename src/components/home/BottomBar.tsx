"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BottomBarProps {
    data: {
        slide_bar_title: string;
        slide_bar_sub_title: string;
        book_shipment_button_link: string;
    };
}

const BottomBar: React.FC<BottomBarProps> = ({ data }) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    // Stagger word by word for the title
    const wordVariants: Variants = {
        hidden: { opacity: 0, y: 50, rotateX: -20 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
    };

    return (
        <section
            ref={containerRef}
            className="w-full bg-gradient-to-r from-[#FF5100] to-[#FF8800] py-6 md:py-8 lg:py-10 relative overflow-hidden shadow-[inset_0_20px_40px_-20px_rgba(0,0,0,0.15)] flex items-center justify-center min-h-[120px]"
        >
            {/* Background design elements for dynamic effect */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? {
                    opacity: [0, 0.5, 0.4, 0.5],
                    scale: [0.8, 1.2, 1, 1.1],
                    y: [0, -30, 20, 0],
                    x: [0, 20, -20, 0]
                } : { opacity: 0, scale: 0.8 }}
                transition={{
                    duration: 15,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "mirror"
                }}
                className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-300 rounded-full mix-blend-screen filter blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/4 pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? {
                    opacity: [0, 0.4, 0.6, 0.4],
                    scale: [0.8, 1.1, 1.3, 1],
                    y: [0, 40, -10, 0],
                    x: [0, -30, 10, 0]
                } : { opacity: 0, scale: 0.8 }}
                transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: 2
                }}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-400 rounded-full mix-blend-screen filter blur-[120px] opacity-30 translate-y-1/3 -translate-x-1/4 pointer-events-none"
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10 w-full flex items-center justify-center max-w-7xl">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 xl:gap-16 w-full"
                >
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left flex flex-col justify-center">
                        <motion.h2
                            variants={fadeUpVariants}
                            className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-wide drop-shadow-sm leading-snug mb-2 flex flex-wrap justify-center lg:justify-start"
                            style={{ perspective: 1000 }}
                        >
                            {/* Process the title word by word for the reveal effect */}
                            {data.slide_bar_title.split(' ').map((word, i) => (
                                <motion.span key={i} variants={wordVariants} className="mr-2 mb-1 inline-block">
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h2>
                        {data.slide_bar_sub_title && (
                            <motion.p
                                variants={fadeUpVariants}
                                className="text-white/95 text-base lg:text-[17px] font-medium max-w-2xl mx-auto lg:mx-0 tracking-wide"
                            >
                                {data.slide_bar_sub_title}
                            </motion.p>
                        )}
                    </div>

                    {/* Right Button */}
                    <motion.div variants={fadeUpVariants} className="flex-shrink-0 mt-6 lg:mt-0">
                        <Link href={data.book_shipment_button_link || "#"}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative flex items-center justify-center overflow-hidden px-8 py-3 rounded-full border border-white backdrop-blur-sm bg-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                {/* Fill effect coming from the center */}
                                <span className="absolute inset-0 w-full h-full bg-white scale-0 rounded-full group-hover:scale-100 transition-transform duration-300 ease-out origin-center z-0"></span>

                                <span className="relative z-10 font-bold text-[16px] tracking-wider text-white group-hover:text-[#FF5100] transition-colors duration-300">
                                    Book Shipment
                                </span>
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default BottomBar;
