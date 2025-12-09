import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";
import { getAssetPath } from "@/lib/assets";
import gsap from "gsap";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleService = (id: string) => {
    setActiveService(activeService === id ? null : id);
  };

  // GSAP floating animation
  useEffect(() => {
    if (!containerRef.current) return;

    const bees = containerRef.current.querySelectorAll('.floating-bee');
    const hearts = containerRef.current.querySelectorAll('.floating-heart');

    // Animate bees with gentle floating
    bees.forEach((bee, index) => {
      gsap.to(bee, {
        y: "random(-15, 15)",
        x: "random(-5, 5)",
        rotation: "random(-3, 3)",
        duration: "random(2.5, 3.5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
      });
    });

    // Animate hearts with smaller, faster floating
    hearts.forEach((heart, index) => {
      gsap.to(heart, {
        y: "random(-10, 10)",
        x: "random(-3, 3)",
        scale: "random(0.95, 1.05)",
        duration: "random(1.8, 2.5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.15,
      });
    });

    return () => {
      // Cleanup animations
      bees.forEach((bee) => gsap.killTweensOf(bee));
      hearts.forEach((heart) => gsap.killTweensOf(heart));
    };
  }, []);

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
        <div ref={containerRef} className="w-full lg:w-[65%] relative min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
          {/* Center wrapper for main image and button */}
          <div className="relative flex flex-col items-center z-10">
            <img
              src={getAssetPath("Images/ExploreOurServices_MainPic.webp")}
              alt="Social Media Post"
              className="w-[280px] lg:w-[320px] h-auto object-cover rounded-[20px]"
              style={{ boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.15)" }}
            />
            
            <div className="mt-10 z-20">
              <Link to="/services/branding">
                <AnimatedButton>Explore Our Services</AnimatedButton>
              </Link>
            </div>
          </div>

          {/* Floating Bees - with GSAP animation - responsive sizes */}
          <img
            src={getAssetPath("Images/Services_Buzz01.gif")}
            alt="Buzz Bee 1"
            className="absolute z-[15] floating-bee w-[100px] lg:w-[220px] -top-[2%] lg:-top-[5%] left-[60%] lg:left-[38%]"
          />
          <img
            src={getAssetPath("Images/Services_Buzz04.gif")}
            alt="Buzz Bee 2"
            className="absolute z-[15] floating-bee w-[90px] lg:w-[200px] top-[5%] lg:top-[22%] -right-[5%] lg:right-[18%]"
          />
          <img
            src={getAssetPath("Images/Services_Buzz03.gif")}
            alt="Buzz Bee 3"
            className="absolute z-[15] floating-bee w-[95px] lg:w-[210px] top-[15%] lg:top-[18%] -left-[8%] lg:left-[15%]"
          />
          <img
            src={getAssetPath("Images/Services_Buzz02.gif")}
            alt="Buzz Bee 4"
            className="absolute z-[15] floating-bee w-[105px] lg:w-[230px] bottom-[5%] lg:bottom-[18%] left-[50%] -translate-x-1/2"
          />

          {/* Floating Hearts - with GSAP animation - responsive sizes */}
          <img
            src={getAssetPath("Images/ExploreOurServices_LikeIcon01.webp")}
            alt="Heart Icon 1"
            className="absolute z-[15] floating-heart w-[25px] lg:w-[45px] top-[35%] lg:top-[48%] -left-[2%] lg:left-[12%]"
          />
          <img
            src={getAssetPath("Images/ExploreOurServices_LikeIcon01.webp")}
            alt="Heart Icon 2"
            className="absolute z-[15] floating-heart w-[25px] lg:w-[45px] top-[30%] lg:top-[42%] -right-[2%] lg:right-[12%]"
          />
          <img
            src={getAssetPath("Images/ExploreOurServices_LikeIcon02.webp")}
            alt="Heart Icon 3"
            className="absolute z-[15] floating-heart w-[30px] lg:w-[55px] bottom-[18%] lg:bottom-[25%] -left-[5%] lg:left-[15%]"
          />
          <img
            src={getAssetPath("Images/ExploreOurServices_LikeIcon03.webp")}
            alt="Heart Icon 4"
            className="absolute z-[15] floating-heart w-[35px] lg:w-[65px] bottom-[15%] lg:bottom-[22%] -right-[5%] lg:right-[10%]"
          />
          <img
            src={getAssetPath("Images/ExploreOurServices_LikeIcon04.webp")}
            alt="Heart Icon 5"
            className="absolute z-[15] floating-heart w-[28px] lg:w-[50px] bottom-[25%] lg:bottom-[30%] right-[5%] lg:right-[22%]"
          />
        </div>
      </div>
    </section>
  );
};
