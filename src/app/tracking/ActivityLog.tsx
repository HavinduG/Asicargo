"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";

const activityData = [
    {
        id: 1,
        activity: "Arrived at final delivery facility",
        location: "Colombo, Sri Lanka"
    },
    {
        id: 2,
        activity: "Customs clearance completed",
        location: "Colombo Port, Sri Lanka"
    },
    {
        id: 3,
        activity: "Vessel arrived at destination port",
        location: "Colombo Port, Sri Lanka"
    },
    {
        id: 4,
        activity: "Vessel departed from transshipment hub",
        location: "High Seas"
    },
    {
        id: 5,
        activity: "Departed from Jebel Ali Port",
        location: "Jebel Ali, Dubai"
    },
    {
        id: 6,
        activity: "Export customs clearance completed",
        location: "Dubai Customs"
    },
    {
        id: 7,
        activity: "Processed at origin sorting facility",
        location: "Al Quoz Hub, Dubai"
    },
    {
        id: 8,
        activity: "Shipment picked up from sender",
        location: "Deira, Dubai"
    }
];

export default function ActivityLog() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-40">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 p-6 md:p-10"
            >
                {/* Header Section */}
                <div className="flex items-center gap-3 mb-8">
                    <History className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                    <h3 className="text-xl md:text-2xl font-bold text-[#112444] dark:text-white">
                        Activity Log
                    </h3>
                </div>

                {/* Table Container */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 w-[60%] px-4">
                                    Activity
                                </th>
                                <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 w-[40%] px-4">
                                    Location
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {activityData.map((log, index) => (
                                <motion.tr
                                    key={log.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors group"
                                >
                                    <td className="py-6 px-4 font-medium text-zinc-800 dark:text-zinc-200 text-sm md:text-base">
                                        {log.activity}
                                    </td>
                                    <td className="py-6 px-4">
                                        <div className="text-sm md:text-base text-zinc-500 dark:text-zinc-400">
                                            {log.location}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </section>
    );
}
