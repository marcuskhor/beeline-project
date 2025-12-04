import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { FeedbackSection } from "@/components/home/FeedbackSection";
import { IntroModal } from "@/components/home/IntroModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ResultsSection />
        <FeedbackSection />
      </main>
      <Footer />
      <IntroModal />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
