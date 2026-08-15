import TopNav from "@/components/trail/TopNav";
import MountainHero from "@/components/trail/MountainHero";
import GrassExperience from "@/components/trail/GrassExperience";
import PostcardDeck from "@/components/trail/PostcardDeck";
import MuseumEvents from "@/components/trail/MuseumEvents";
import SkillsSection from "@/components/trail/SkillsSection";
import ContactSection from "@/components/trail/ContactSection";
import BackToTop from "@/components/BackToTop";
import SkipLink from "@/components/SkipLink";

export default function Index() {
  return (
    <div className="min-h-screen bg-cream">
      <SkipLink />
      <TopNav />
      <main id="main-content">
        <MountainHero />
        <PostcardDeck />
        <GrassExperience />
        <MuseumEvents />
        <SkillsSection />
        <ContactSection />
      </main>
      <BackToTop />
    </div>
  );
}
