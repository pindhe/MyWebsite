import dynamic from "next/dynamic";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { HireFlight } from "@/components/effects/HireFlight";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageLoader } from "@/components/layout/PageLoader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { SocialFab } from "@/components/layout/SocialFab";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";

const Gallery = dynamic(
  () => import("@/components/sections/Gallery").then((m) => ({ default: m.Gallery })),
  { loading: () => <div className="section-padding" aria-hidden /> }
);
const Experience = dynamic(
  () => import("@/components/sections/Experience").then((m) => ({ default: m.Experience })),
  { loading: () => <div className="section-padding" aria-hidden /> }
);
const Blog = dynamic(
  () => import("@/components/sections/Blog").then((m) => ({ default: m.Blog })),
  { loading: () => <div className="section-padding" aria-hidden /> }
);
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => ({ default: m.Contact })),
  { loading: () => <div id="contact" className="section-padding" aria-hidden /> }
);

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <SmoothScroll />
      <ScrollProgress />
      <AuroraBackground />
      <CursorGlow />
      <HireFlight />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Gallery />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <SocialFab />
      <BackToTop />
    </>
  );
}
