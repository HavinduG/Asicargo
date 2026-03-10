import { getTrackingPageData, getHomePageData } from "@/lib/api";
import TrackingHero from "./TrackingHero";
import ShipmentProgress from "./ShipmentProgress";
import TrackingSearch from "./TrackingSearch";
import ActivityLog from "./ActivityLog";
import Footer from "@/components/home/Footer";

export async function generateMetadata() {
    return {
        title: "Tracking | Asicargo",
        description: "Track your shipment real-time",
    };
}

export default async function TrackingPage() {
    const data = await getTrackingPageData();
    const acf = await getHomePageData();

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
            {/* 1. Dynamic Parallax Hero */}
            <TrackingHero data={data} />

            {/* 2. Shipment Progress Stepper */}
            <div className="-mt-16 lg:-mt-20">
                <ShipmentProgress />
            </div>

            {/* 3. Map Animation & Search Input */}
            <TrackingSearch data={data} />

            {/* 4. Activity Log Display */}
            <div className="-mt-10 lg:-mt-16 mb-12">
                <ActivityLog />
            </div>

            {/* 5. Global Footer */}
            <Footer data={{
                footer_logo: acf.footer_logo,
                footer_description: acf.footer_description,
                explore_links: acf.explore_links,
                support_links: acf.support_links,
                social_media: acf.social_media,
                contact_details_sri_lanka: acf.contact_details_sri_lanka,
                contact_details_dubai: acf.contact_details_dubai
            }} />
        </div>
    );
}
