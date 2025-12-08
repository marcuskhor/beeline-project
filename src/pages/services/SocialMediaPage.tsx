import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { getAssetPath } from "@/lib/assets";

const platforms = [
  "Images/Services_Social Media Management_Platform01.png",
  "Images/Services_Social Media Management_Platform02.png",
  "Images/Services_Social Media Management_Platform03.png",
  "Images/Services_Social Media Management_Platform04.png",
];

const processSteps = [
  { icon: "Images/Services_Social Media Management_Icon01.png", title: "Strategy\nDevelopment" },
  { icon: "Images/Services_Social Media Management_Icon02.png", title: "Content\nCreation" },
  { icon: "Images/Services_Social Media Management_Icon03.png", title: "Scheduling &\nPosting" },
  { icon: "Images/Services_Social Media Management_Icon04.png", title: "Engagement" },
  { icon: "Images/Services_Social Media Management_Icon05.png", title: "Performance\nMonitoring" },
];

export default function SocialMediaPage() {
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
                  src={getAssetPath("Images/Services_Social Media Management_Buzz01.gif")} 
                  alt="Beeline Social Media Mascot" 
                  className="w-full max-w-md mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Social Media Management</h1>
                <p className="text-lg text-muted-foreground mb-4">
                  We manage your social media by creating and posting engaging content that resonates with your audience and reflects your brand. We handle everything from planning posts, creating visuals, and writing captions to engaging with followers, monitoring performance, and adjusting strategies to maximize reach and engagement.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Our goal is to build a strong online presence for your brand, boost engagement, and drive real results.
                </p>
                <Link to="/portfolio">
                  <AnimatedButton variant="primary">View Our Work</AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8">
              {platforms.map((platform, idx) => (
                <div key={idx} className="w-24 h-24 md:w-32 md:h-32">
                  <img src={getAssetPath(platform)} alt={`Platform ${idx + 1}`} className="w-full h-full object-contain" />
                </div>
              ))}
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
                      <img src={getAssetPath(step.icon)} alt={step.title} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
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
                Are you ready to manage your social media like a pro?
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
