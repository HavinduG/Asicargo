"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

interface ServiceItem {
    acf_fc_layout: string;
    service_icon: {
        url: string;
        alt?: string;
    };
    service_name: string;
    service_card_description: string;
    service_more_details: string;
}

interface ServiceDetailsProps {
    services: ServiceItem[];
}

// Helper to convert string like "Road Freight" into "road-freight"
const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
        .replace(/\-\-+/g, '-');    // Replace multiple - with single -
};

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ services }) => {
    const searchParams = useSearchParams();
    const serviceParam = searchParams.get("service");

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // If there's a ?service URL parameter, try to find the matching service
        if (serviceParam && services && services.length > 0) {
            const matchingIndex = services.findIndex((s) => slugify(s.service_name) === serviceParam);
            if (matchingIndex !== -1) {
                setActiveIndex(matchingIndex);

                // Optional: Scroll to the details section slightly smoothly
                window.scrollTo({
                    top: document.getElementById('service-details-section')?.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }, [serviceParam, services]);

    // Reset image index when service tab changes
    useEffect(() => {
        setActiveImageIndex(0);
    }, [activeIndex]);

    if (!services || services.length === 0) return null;

    const activeService = services[activeIndex];

    // Extract ALL images from the WordPress HTML gallery dynamically
    const extractAllImages = (html: string) => {
        const matches = Array.from(html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi));
        const images = matches.map(match => {
            if (match[1]) {
                // Strip off the 150x150 thumbnail size suffix to get full HD image
                return match[1].replace(/-\d+x\d+(?=\.[a-zA-Z]+$)/, '');
            }
            return "";
        }).filter(Boolean);

        return images.length > 0 ? images : ["https://placehold.co/800x600"];
    };

    const galleryImages = extractAllImages(activeService.service_more_details);

    return (
        <section id="service-details-section" className="py-20 md:py-32 bg-white relative scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left Sidebar Navigation Pills */}
                    <div className="w-full lg:w-1/4 flex flex-col gap-3 flex-shrink-0">
                        {services.map((service, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`text-left px-8 py-4 rounded-xl transition-all duration-300 outline-none text-[15px] ${isActive
                                        ? "bg-[#FF5100] text-white font-semibold"
                                        : "bg-zinc-50 text-zinc-900 font-medium hover:bg-zinc-100"
                                        }`}
                                >
                                    {service.service_name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Dynamic Content Area */}
                    <div className="w-full lg:w-3/4">
                        {mounted && (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-12 xl:gap-16 items-start"
                                >
                                    {/* Text Content */}
                                    <div className="flex flex-col">
                                        <h2 className="text-4xl lg:text-[46px] font-medium text-[#1A1A1A] mb-8 leading-[1.2] tracking-tight">
                                            Reliable {activeService.service_name} Services for Global Trade
                                        </h2>

                                        {/* Render HTML text dynamically, hide the actual <div class="gallery"> using scoped CSS */}
                                        <style>{`
                                            .service-content-html .gallery { display: none !important; }
                                            .service-content-html p:empty { display: none !important; }
                                        `}</style>
                                        <div
                                            className="service-content-html text-zinc-500 leading-relaxed text-base flex flex-col gap-5"
                                            dangerouslySetInnerHTML={{ __html: activeService.service_more_details }}
                                        />
                                    </div>

                                    {/* Image with Overlapping Orange Caption Box */}
                                    <div className="relative w-full h-[400px] sm:h-[500px] xl:h-[600px] rounded-[2rem] overflow-hidden group">
                                        <AnimatePresence mode="popLayout">
                                            <motion.img
                                                key={`${activeIndex}-${activeImageIndex}`}
                                                src={galleryImages[activeImageIndex]}
                                                alt={activeService.service_name}
                                                initial={{ opacity: 0, scale: 1.05 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </AnimatePresence>

                                        {/* Pagination Bullets (Only if more than 1 image) */}
                                        {galleryImages.length > 1 && (
                                            <div className="absolute top-6 right-6 flex gap-2 z-20 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-full">
                                                {galleryImages.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setActiveImageIndex(i)}
                                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeImageIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                                                            }`}
                                                        aria-label={`View image ${i + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* Slight gradient over the bottom so text pops out more nicely */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                                        {/* The Orange Details Box */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                            className="absolute bottom-6 left-6 max-w-[85%] md:max-w-md bg-[#FF5100] p-6 md:p-8 rounded-2xl shadow-xl z-20"
                                        >
                                            <p className="text-white text-base md:text-lg font-medium leading-snug">
                                                {activeService.service_card_description}
                                            </p>
                                        </motion.div>
                                    </div>

                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ServiceDetails;
