import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";
import { getAssetPath } from "@/lib/assets";

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
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${getAssetPath("Images/Background01.png")}')` }}
    >
      <div className="max-w-[1200px] mx-auto px-5 py-[200px] pb-20 flex flex-col lg:flex-row items-start gap-10 min-h-[600px]">
        {/* Service List - 35% width */}
        <div className="w-full lg:w-[35%] flex flex-col gap-[30px]">
          {services.map((service) => (
            <div
              key={service.id}
              className={cn(
                "border-2 border-accent rounded-[40px] px-10 py-9 overflow-hidden",
                activeService === service.id
                  ? "bg-card border-transparent shadow-card"
                  : "bg-transparent"
              )}
            >
              <button
                onClick={() => toggleService(service.id)}
                className="w-full flex items-center justify-between"
              >
                <h3 className="text-lg font-extrabold text-foreground">{service.title}</h3>
                <div className={cn(
                  "w-[30px] h-[30px] rounded-full flex items-center justify-center text-primary-foreground transition-colors",
                  activeService === service.id ? "bg-accent" : "bg-primary"
                )}>
                  {activeService === service.id ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  activeService === service.id ? "max-h-40 pt-5" : "max-h-0"
                )}
              >
                <p className="text-[0.95rem] text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Media Content - 65% width */}
        <div className="w-full lg:w-[65%] relative min-h-[600px] flex items-center justify-center">
          {/* Center wrapper for main image and button */}
          <div className="relative flex flex-col items-center z-10">
            <img
              src={getAssetPath("Images/ExploreOurServices_MainPic.webp")}
              alt="Social Media Post"
              className="w-[400px] h-auto object-cover rounded-[20px]"
              style={{ boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.15)" }}
            />
            
            <div className="mt-10 z-20">
              <Link to="/services/branding">
                <AnimatedButton>Explore Our Services</AnimatedButton>
              </Link>
            </div>
          </div>

          {/* Floating Bees - 250px width like reference, clustered around main image */}
          {/* Bee 1 - laptop bee, left side of image */}
          <img
            src={getAssetPath("Images/Services_Buzz01.gif")}
            alt="Buzz Bee 1"
            className="absolute z-[15] float-element"
            style={{ width: "250px", top: "22%", left: "-18%" }}
          />
          {/* Bee 2 - palette bee, top right area */}
          <img
            src={getAssetPath("Images/Services_Buzz04.gif")}
            alt="Buzz Bee 2"
            className="absolute z-[15] float-element"
            style={{ width: "225px", top: "-12%", right: "8%", animationDelay: "0.1s" }}
          />
          {/* Bee 3 - phone bee, right side */}
          <img
            src={getAssetPath("Images/Services_Buzz03.gif")}
            alt="Buzz Bee 3"
            className="absolute z-[15] float-element"
            style={{ width: "250px", top: "5%", right: "-20%", animationDelay: "0.2s" }}
          />
          {/* Bee 4 - camera bee, bottom center overlapping image */}
          <img
            src={getAssetPath("Images/Services_Buzz02.gif")}
            alt="Buzz Bee 4"
            className="absolute z-[15] float-element"
            style={{ width: "250px", bottom: "12%", left: "50%", transform: "translateX(-50%)", animationDelay: "0.3s" }}
          />

          {/* Floating Hearts - 50px width like reference, around bottom sides */}
          <img
            src={getAssetPath("Images/ExploreOurServices_LikeIcon01.webp")}
            alt="Heart Icon 1"
            className="absolute z-[15] float-element"
            style={{ width: "50px", top: "45%", left: "-5%", animationDelay: "0.2s" }}
          />
          <img
            src={getAssetPath("Images/ExploreOurServices_LikeIcon01.webp")}
            alt="Heart Icon 2"
            className="absolute z-[15] float-element"
            style={{ width: "50px", top: "50%", right: "-3%", animationDelay: "0.3s" }}
          />
          <img
            src={getAssetPath("Images/ExploreOurServices_LikeIcon02.webp")}
            alt="Heart Icon 3"
            className="absolute z-[15] float-element"
            style={{ width: "65px", bottom: "22%", left: "0%", animationDelay: "0.4s" }}
          />
          <img
            src={getAssetPath("Images/ExploreOurServices_LikeIcon03.webp")}
            alt="Heart Icon 4"
            className="absolute z-[15] float-element"
            style={{ width: "85px", bottom: "18%", right: "-2%", animationDelay: "0.5s" }}
          />
          <img
            src={getAssetPath("Images/ExploreOurServices_LikeIcon04.webp")}
            alt="Heart Icon 5"
            className="absolute z-[15] float-element"
            style={{ width: "60px", bottom: "28%", right: "12%", animationDelay: "0.6s" }}
          />
        </div>
      </div>
    </section>
  );
};
