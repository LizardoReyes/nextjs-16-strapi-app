import { HeroSection } from "@/components/hero-section";
import { getHomePage } from "@/lib/strapi";

export async function generateMetadata() {
  const strapiData = await getHomePage(); // 1.
  return {
    title: strapiData?.title,
    description: strapiData?.description,
  };
}

export default async function Home() {
  const strapiData = await getHomePage(); // 2.
  const [heroSection] = strapiData?.sections || [];

  return (
    <main className="container mx-auto py-6">
      <HeroSection data={heroSection} />
    </main>
  );
}
