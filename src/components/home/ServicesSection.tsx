import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";
import { getAssetPath } from "@/lib/assets";
import gsap from "gsap";

const typingText = "Buzzies are here to brighten your day with joy and energy, one happy buzz at a time!";

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
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const beesRef = useRef<(HTMLImageElement | null)[]>([]);
  const heartsRef = useRef<(HTMLImageElement | null)[]>([]);

  const toggleService = (id: string) => {
    setActiveService(activeService === id ? null : id);
  };

  // Dynamic positioning based on screen size - matching original site
  const positionElements = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return;

    const w = window.innerWidth;
    const container = containerRef.current;
    const image = imageRef.current;
    
    const containerRect = container.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();
    
    // Calculate image center relative to container
    const imageCenterX = imageRect.left - containerRect.left + imageRect.width / 2;
    const imageCenterY = imageRect.top - containerRect.top + imageRect.height / 2;

    // Scale factors based on screen width (matching original JS logic)
    let distScale = 1.0;
    let sizeScale = 1.0;
    let moveX = 0;
    let moveY = 0;

    if (w <= 480) {
      distScale = 0.45;
      sizeScale = 0.5;
      moveX = 10;
      moveY = -10;
    } else if (w <= 767) {
      distScale = 0.7;
      sizeScale = 0.7;
      moveX = 0;
      moveY = 0;
    } else if (w <= 991) {
      distScale = 0.9;
      sizeScale = 0.9;
      moveX = 0;
      moveY = 0;
    } else if (w <= 1199) {
      distScale = 0.75;
      sizeScale = 0.8;
      moveX = -20;
      moveY = -20;
    }

    // Bee positions centered around the main image
    const beePositions = [
      { x: imageCenterX, y: imageCenterY - (280 * distScale) + moveY, scale: 1.0 * sizeScale, rotation: 10 },    // Top center
      { x: imageCenterX + (140 * distScale) + moveX, y: imageCenterY - (80 * distScale) + moveY, scale: 1.1 * sizeScale, rotation: 0 },  // Right
      { x: imageCenterX - (180 * distScale) + moveX, y: imageCenterY - (80 * distScale) + moveY, scale: 1.0 * sizeScale, rotation: -20 }, // Left
      { x: imageCenterX, y: imageCenterY + (100 * distScale) + moveY, scale: 1.0 * sizeScale, rotation: 0 },     // Bottom center
    ];

    // Heart positions
    const heartAdjustX = w <= 480 ? -50 : w <= 767 ? -80 : w <= 991 ? -100 : 0;
    const heartAdjustY = w <= 480 ? 60 : w <= 767 ? 20 : w <= 991 ? 0 : 30;
    
    const heartPositions = [
      { x: imageCenterX + heartAdjustX - (200 * distScale) + moveX, y: imageCenterY + heartAdjustY + (80 * distScale) + moveY, scale: 0.9 * sizeScale },
      { x: imageCenterX + heartAdjustX + (320 * distScale) + moveX, y: imageCenterY + heartAdjustY + (80 * distScale) + moveY, scale: 0.9 * sizeScale },
      { x: imageCenterX + heartAdjustX - (160 * distScale) + moveX, y: imageCenterY + heartAdjustY + (130 * distScale) + moveY, scale: 1.3 * sizeScale },
      { x: imageCenterX + heartAdjustX + (280 * distScale) + moveX, y: imageCenterY + heartAdjustY + (150 * distScale) + moveY, scale: 1.7 * sizeScale },
      { x: imageCenterX + heartAdjustX + (250 * distScale) + moveX, y: imageCenterY + heartAdjustY + (50 * distScale) + moveY, scale: 1.2 * sizeScale },
    ];

    // Animate bees to position
    beesRef.current.forEach((bee, i) => {
      if (!bee) return;
      const pos = beePositions[i];
      if (!pos) return;
      
      // Base size in pixels
      const baseSize = [220, 200, 210, 230][i] || 220;
      
      gsap.set(bee, {
        left: pos.x - (baseSize * pos.scale) / 2,
        top: pos.y - (baseSize * pos.scale) / 2,
        width: baseSize * pos.scale,
        rotation: pos.rotation,
        opacity: 1,
      });
    });

    // Animate hearts to position
    heartsRef.current.forEach((heart, i) => {
      if (!heart) return;
      const pos = heartPositions[i];
      if (!pos) return;
      
      const baseSize = [45, 45, 55, 65, 50][i] || 50;
      
      gsap.set(heart, {
        left: pos.x - (baseSize * pos.scale) / 2,
        top: pos.y - (baseSize * pos.scale) / 2,
        width: baseSize * pos.scale,
        opacity: 1,
      });
    });
  }, []);

  // Position elements on mount and resize
  useEffect(() => {
    // Wait for image to load before positioning
    const image = imageRef.current;
    if (!image) return;

    const handleLoad = () => {
      positionElements();
    };

    if (image.complete) {
      positionElements();
    } else {
      image.addEventListener('load', handleLoad);
    }

    window.addEventListener('resize', positionElements);

    return () => {
      image.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', positionElements);
    };
  }, [positionElements]);

  // GSAP floating animation
  useEffect(() => {
    if (!containerRef.current) return;

    const startFloating = (element: Element) => {
      const randomY = gsap.utils.random(5, 15);
      const randomRot = gsap.utils.random(3, 8);
      const randomDelay = gsap.utils.random(0, 1.5);
      const randomDuration = gsap.utils.random(2.5, 4.0);

      gsap.to(element, {
        y: `+=${randomY}`,
        rotation: `+=${randomRot}`,
        duration: randomDuration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: randomDelay,
      });
    };

    // Start floating animations after a short delay
    const timer = setTimeout(() => {
      beesRef.current.forEach((bee) => {
        if (bee) startFloating(bee);
      });
      heartsRef.current.forEach((heart) => {
        if (heart) startFloating(heart);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      beesRef.current.forEach((bee) => {
        if (bee) gsap.killTweensOf(bee);
      });
      heartsRef.current.forEach((heart) => {
        if (heart) gsap.killTweensOf(heart);
      });
    };
  }, []);

  // Typing animation effect
  useEffect(() => {
    let charIndex = 0;
    let timeout: NodeJS.Timeout;
    
    const type = () => {
      if (charIndex < typingText.length) {
        setDisplayedText(typingText.slice(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(type, 30);
      } else {
        timeout = setTimeout(() => {
          charIndex = 0;
          setDisplayedText("");
          type();
        }, 2000);
      }
    };
    
    type();
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section 
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${getAssetPath("Images/Background01.png")}')` }}
    >
      <div className="max-w-[1200px] mx-auto px-5 py-[100px] md:py-[200px] pb-20 flex flex-col lg:flex-row items-start gap-10 min-h-[600px]">
        {/* Media Content - on mobile appears first */}
        <div ref={containerRef} className="w-full lg:w-[65%] relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center order-1 lg:order-2">
          {/* Center wrapper for main image and button */}
          <div className="relative flex flex-col items-center z-10">
            <div className="relative">
              <img
                ref={imageRef}
                src={getAssetPath("Images/ExploreOurServices_MainPic.webp")}
                alt="Social Media Post"
                className="w-[200px] md:w-[340px] lg:w-[400px] h-auto object-cover rounded-[20px]"
                style={{ boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.15)" }}
              />
              
              {/* Typing Text Area - positioned below 4891 likes */}
              <div className="absolute bottom-[4%] md:bottom-[3%] lg:bottom-[3%] left-[8%] w-[84%] text-[0.45rem] md:text-[0.55rem] lg:text-[0.7rem] font-semibold text-foreground leading-[1.4] z-[12]">
                {displayedText}
                <span className="inline-block w-[2px] h-[0.9em] bg-foreground ml-[2px] relative top-[2px] animate-[blink_1s_infinite]" />
              </div>
            </div>
            
            <div className="mt-10 z-20">
              <Link to="/services/branding">
                <AnimatedButton>Explore Our Services</AnimatedButton>
              </Link>
            </div>
          </div>

          {/* Floating Bees - positioned dynamically via GSAP */}
          <img
            ref={(el) => { beesRef.current[0] = el; }}
            src={getAssetPath("Images/Services_Buzz01.gif")}
            alt="Buzz Bee 1"
            className="absolute z-[15]"
            style={{ opacity: 0 }}
          />
          <img
            ref={(el) => { beesRef.current[1] = el; }}
            src={getAssetPath("Images/Services_Buzz04.gif")}
            alt="Buzz Bee 2"
            className="absolute z-[15]"
            style={{ opacity: 0 }}
          />
          <img
            ref={(el) => { beesRef.current[2] = el; }}
            src={getAssetPath("Images/Services_Buzz03.gif")}
            alt="Buzz Bee 3"
            className="absolute z-[15]"
            style={{ opacity: 0 }}
          />
          <img
            ref={(el) => { beesRef.current[3] = el; }}
            src={getAssetPath("Images/Services_Buzz02.gif")}
            alt="Buzz Bee 4"
            className="absolute z-[15]"
            style={{ opacity: 0 }}
          />

          {/* Floating Hearts - positioned dynamically via GSAP (z-20 to be in front) */}
          <img
            ref={(el) => { heartsRef.current[0] = el; }}
            src={getAssetPath("Images/ExploreOurServices_LikeIcon01.webp")}
            alt="Heart Icon 1"
            className="absolute z-[20]"
            style={{ opacity: 0 }}
          />
          <img
            ref={(el) => { heartsRef.current[1] = el; }}
            src={getAssetPath("Images/ExploreOurServices_LikeIcon01.webp")}
            alt="Heart Icon 2"
            className="absolute z-[20]"
            style={{ opacity: 0 }}
          />
          <img
            ref={(el) => { heartsRef.current[2] = el; }}
            src={getAssetPath("Images/ExploreOurServices_LikeIcon02.webp")}
            alt="Heart Icon 3"
            className="absolute z-[20]"
            style={{ opacity: 0 }}
          />
          <img
            ref={(el) => { heartsRef.current[3] = el; }}
            src={getAssetPath("Images/ExploreOurServices_LikeIcon03.webp")}
            alt="Heart Icon 4"
            className="absolute z-[20]"
            style={{ opacity: 0 }}
          />
          <img
            ref={(el) => { heartsRef.current[4] = el; }}
            src={getAssetPath("Images/ExploreOurServices_LikeIcon04.webp")}
            alt="Heart Icon 5"
            className="absolute z-[20]"
            style={{ opacity: 0 }}
          />
        </div>

        {/* Service List - 35% width, appears second on mobile */}
        <div className="w-full lg:w-[35%] flex flex-col gap-4 md:gap-[30px] order-2 lg:order-1 max-w-[500px] lg:max-w-none mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className={cn(
                "border-2 border-accent rounded-[40px] px-5 md:px-10 py-4 md:py-9 overflow-hidden",
                activeService === service.id
                  ? "bg-card border-transparent shadow-card"
                  : "bg-transparent"
              )}
            >
              <button
                onClick={() => toggleService(service.id)}
                className="w-full flex items-center justify-between"
              >
                <h3 className="text-sm md:text-lg font-extrabold text-foreground">{service.title}</h3>
                <div className={cn(
                  "w-[26px] md:w-[30px] h-[26px] md:h-[30px] rounded-full flex items-center justify-center text-primary-foreground transition-colors flex-shrink-0",
                  activeService === service.id ? "bg-accent" : "bg-primary"
                )}>
                  {activeService === service.id ? (
                    <Minus className="w-3 md:w-4 h-3 md:h-4" />
                  ) : (
                    <Plus className="w-3 md:w-4 h-3 md:h-4" />
                  )}
                </div>
              </button>
              
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  activeService === service.id ? "max-h-40 pt-3 md:pt-5" : "max-h-0"
                )}
              >
                <p className="text-xs md:text-[0.95rem] text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
