import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Pricing, HowItWorks, FAQ } from "@/components/sections";
import RevealWrapper from "@/components/RevealWrapper";
import { getReviewsForDisplay } from "@/lib/ownReviews";

// Reviews are fetched here (server-side) rather than by Testimonials on
// mount, so the review text is present in the initial HTML for crawlers
// instead of only appearing after client-side hydration.
export const revalidate = 1800;

export default async function HomePage() {
  const data = await getReviewsForDisplay().catch(() => null);
  const initialReviews = data?.reviews?.length
    ? data.reviews.map((r) => ({ name: r.author || r.name, time: r.time, text: r.text, rating: r.rating || 5 }))
    : [];
  const initialRating = data?.rating || 5.0;

  return (
    <RevealWrapper>
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Pricing />
      <HowItWorks />
      <Testimonials initialReviews={initialReviews} initialRating={initialRating} />
      <FAQ />
      <Contact />
      <WhatsAppButton />
    </RevealWrapper>
  );
}
