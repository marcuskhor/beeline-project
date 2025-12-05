import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const processSteps = [
  { icon: "/Images/Services_Influencer Collaboraton_Icon01.png", title: "Identify the\nRight Influencers" },
  { icon: "/Images/Services_Influencer Collaboraton_Icon02.png", title: "Strategy\nDevelopment" },
  { icon: "/Images/Services_Influencer Collaboraton_Icon03.png", title: "Outreach &\nNegotiation" },
  { icon: "/Images/Services_Influencer Collaboraton_Icon04.png", title: "Content Creation &\nPromotion" },
  { icon: "/Images/Services_Influencer Collaboraton_Icon05.png", title: "Performance\nTracking & Reporting" },
];

export default function InfluencerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-cream to-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src="/Images/Services_Influencer Collaboraton_Buzz01.gif" 
                  alt="Beeline Influencer Mascot" 
                  className="w-full max-w-md mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Influencer Collaboration</h1>
                <p className="text-lg text-muted-foreground mb-4">
                  We handle KOL/KOC (Key Opinion Leader/Key Opinion Consumer) collaborations by identifying influencers who align with your brand, planning campaign strategies, and coordinating with them to create authentic, engaging content.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Our team manages the entire process, from negotiating partnerships to tracking performance, ensuring each collaboration effectively promotes your brand and resonates with the target audience.
                </p>
                <Link to="/portfolio">
                  <AnimatedButton variant="primary">View Our Work</AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-card rounded-2xl shadow-lg flex items-center justify-center mb-3 mx-auto">
                      <img src={step.icon} alt={step.title} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                    </div>
                    <p className="text-sm font-bold text-foreground whitespace-pre-line">{step.title}</p>
                  </div>
                  {idx < processSteps.length - 1 && (
                    <div className="hidden md:block">
                      <svg width="24" height="24" viewBox="0 0 100 100" className="text-text-brown">
                        <polygon points="0,0 100,50 0,100" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-text-brown relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full flex items-center">
            <div className="flex">
              {[0.3, 0.5, 0.7].map((opacity, idx) => (
                <svg key={idx} className="h-32 w-auto -mr-4" viewBox="0 0 140 200" style={{ opacity }}>
                  <path d="M 0 0 L 80 0 L 140 100 L 80 200 L 0 200 L 60 100 Z" fill="#964f33" />
                </svg>
              ))}
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <h2 className="text-2xl md:text-3xl font-bold text-background max-w-md">
                Ready to amplify your brand with influencer partnerships?
              </h2>
              <Link to="/contact">
                <AnimatedButton variant="secondary">Customize</AnimatedButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
