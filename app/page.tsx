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
import { projects } from '@/lib/data';
import { fetchRepoStats, statsToMap } from '@/lib/github';

// Async Server Component. Runs at build time when `output: 'export'` is set,
// so GitHub stars / forks get baked into the generated HTML — no client-side
// rate-limit issues.
export default async function Page() {
  const repos = projects
    .map((p) => p.repo)
    .filter((r): r is string => Boolean(r));
  const stats = await fetchRepoStats(repos);
  const initialStats = statsToMap(stats);

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
        <Projects initialStats={initialStats} />
        <Experience />
        <Achievements />
        <TerminalSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
