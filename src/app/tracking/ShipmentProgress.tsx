"use client";

import { motion } from "framer-motion";
import {
    Package,
    Warehouse,
    Ship,
    RefreshCcw,
    Anchor,
    Truck,
    Check,
    Activity
} from "lucide-react";

const steps = [
    { id: 1, label: "Picked Up", icon: Package },
    { id: 2, label: "Processed", icon: Warehouse },
    { id: 3, label: "Departed", icon: Ship },
    { id: 4, label: "In Transit", icon: RefreshCcw },
    { id: 5, label: "Arrived", icon: Anchor },
    { id: 6, label: "Out for Delivery", icon: Truck },
    { id: 7, label: "Delivered", icon: Check },
];

export default function ShipmentProgress() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-40">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 p-8 md:p-10"
            >
                <div className="flex items-center gap-3 mb-10">
                    <Activity className="w-6 h-6 text-[#0A5499] dark:text-blue-500" />
                    <h3 className="text-xl md:text-2xl font-bold text-[#112444] dark:text-white">Shipment Progress</h3>
                </div>

                <div className="w-full overflow-x-auto pb-6 custom-scrollbar">
                    <div className="min-w-[800px] flex justify-between items-start relative px-4">

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            // Line connects from the right edge/center of previous node to the current. All lines green.
                            const lineClass = "bg-[#22C55E]";

                            return (
                                <div key={step.id} className="relative flex-1 flex flex-col items-center group">

                                    {/* Connecting line from previous node */}
                                    {index !== 0 && (
                                        <div className={`absolute top-6 left-[-50%] w-full h-[3px] -z-10 transition-colors duration-500 ${lineClass}`} />
                                    )}

                                    {/* Map Node Bubble - All Green */}
                                    <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-500 bg-[#22C55E] text-white shadow-md shadow-[#22C55E]/20">
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    {/* Node Text Description */}
                                    <div className="text-center mt-2 flex flex-col items-center">
                                        <h4 className="text-sm tracking-tight font-semibold mb-1 transition-colors duration-500 text-zinc-900 dark:text-zinc-100">
                                            {step.label}
                                        </h4>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>

            </motion.div>
        </section>
    );
}
