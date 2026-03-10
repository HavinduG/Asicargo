import { getHomePageData, getServicesPageData } from "@/lib/api";
import ServiceDetails from "@/components/services/ServiceDetails";
import KeyFeatures from "@/components/services/KeyFeatures";
import Footer from "@/components/home/Footer";
import Header from "@/components/layout/Header";
import ServiceHero from "@/components/services/ServiceHero";
import { Suspense } from "react";

export const metadata = {
    title: "Our Services | Asicargo",
    description: "Comprehensive logistics solutions designed for individuals and businesses moving goods between UAE and Sri Lanka.",
};

export default async function ServicesPage() {
    // Fetch global bottom data and the specific services page data concurrently
    const [acf, pageData] = await Promise.all([
        getHomePageData(),
        getServicesPageData()
    ]);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header header_logo={acf.header_logo} menu={acf.menu} />

            {/* Dynamic Immersive Background Hero Section */}
            <ServiceHero
                title={pageData?.service_main_title || acf.service_main_topic || "Our Services"}
                subtitle={pageData?.service_sub_topic || acf.service_sub_topic}
                backgroundImageUrl={pageData?.backgound_image?.url}
            />

            {/* Detailed Services Sidebar Component with Suspense for useSearchParams */}
            <Suspense fallback={<div className="min-h-[600px] flex items-center justify-center">Loading services...</div>}>
                <ServiceDetails services={acf.services} />
            </Suspense>

            {/* Split Screen Features */}
            <KeyFeatures features={pageData?.key_features} />

            {/* Global Footer */}
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
