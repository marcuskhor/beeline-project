import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    description: "Build a strong brand identity that resonates with your target audience and sets you apart from competitors.",
  },
  {
    id: "web-design",
    title: "Web Design",
    description: "Create stunning, user-friendly websites that convert visitors into customers.",
  },
  {
    id: "social-media",
    title: "Social Media Management",
    description: "Grow your online presence with strategic content and community engagement.",
  },
  {
    id: "influencer",
    title: "Influencer Collaboration",
    description: "Helps brands work with influencers (KOLs) to promote products through content like posts or reviews, boosting awareness and sales.",
  },
];

export const ServicesSection = () => {
  const [activeService, setActiveService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setActiveService(activeService === id ? null : id);
  };

  return (
    <section 
      className="py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Images/Background01.png')" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Service List */}
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={cn(
                  "border-2 rounded-2xl transition-all duration-300",
                  activeService === service.id
                    ? "bg-card border-transparent shadow-card"
                    : "border-accent bg-transparent"
                )}
              >
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full flex items-center justify-between p-6"
                >
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    {activeService === service.id ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>
                
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    activeService === service.id ? "max-h-40 pb-6" : "max-h-0"
                  )}
                >
                  <p className="px-6 text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Media Content */}
          <div className="relative">
            <div className="relative bg-card rounded-3xl p-8 shadow-card">
              <img
                src="/Images/ExploreOurServices_MainPic.webp"
                alt="Our Services"
                className="w-full rounded-2xl mb-6"
              />
              
              <div className="text-center">
                <Link to="/services/branding">
                  <AnimatedButton>Explore Our Services</AnimatedButton>
                </Link>
              </div>
            </div>

            {/* Floating Bees */}
            <img
              src="/Images/Services_Buzz01.gif"
              alt="Bee"
              className="absolute -top-8 -left-8 w-20 float-element"
            />
            <img
              src="/Images/Services_Buzz02.gif"
              alt="Bee"
              className="absolute -bottom-8 -right-8 w-16 float-element"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
