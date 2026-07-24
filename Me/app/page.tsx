import dynamic from "next/dynamic";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { CursorGlow } from "@/components/effects/CursorGlow";
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
  { loading: () => <div className="section-padding" aria-hidden /> }
);

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <SmoothScroll />
      <ScrollProgress />
      <AuroraBackground />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <SocialFab />
      <BackToTop />
    </>
  );
}
