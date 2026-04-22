import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Pipeline } from '@/components/Pipeline';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Achievements } from '@/components/Achievements';
import { TerminalSection } from '@/components/TerminalSection';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { GridBackground } from '@/components/GridBackground';
import { CursorGlow } from '@/components/CursorGlow';

export default function Page() {
  return (
    <>
      <GridBackground />
      <CursorGlow />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Pipeline />
        <Projects />
        <Experience />
        <Achievements />
        <TerminalSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
