"use client";

import { useState } from "react";
import { Loader } from "@/components/ui/Loader";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ZiaAssistant } from "@/components/ui/ZiaAssistant";
import { TopBar } from "@/components/layout/TopBar";
import { SideNav } from "@/components/layout/SideNav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Leadership } from "@/components/sections/Leadership";
import { Education } from "@/components/sections/Education";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Loader onComplete={() => setReady(true)} />
      <AmbientBackground />
      <CustomCursor />
      <TopBar />
      <SideNav />

      <main className="relative">
        <Hero ready={ready} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Leadership />
        <Education />
        <Achievements />
        <Contact />
      </main>

      <Footer />
      <ZiaAssistant />

      <span className="sr-only" role="status">
        {ready ? "Experience loaded" : "Loading experience"}
      </span>
    </>
  );
}
