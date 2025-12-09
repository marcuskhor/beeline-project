import { Link } from "react-router-dom";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { getAssetPath } from "@/lib/assets";
import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";

// Floating icons data
const floatingIcons = [
  { src: "Images/Hero_Buzz01.webp", alt: "Buzz 1" },
  { src: "Images/Hero_Buzz02.webp", alt: "Buzz 2" },
  { src: "Images/Hero_Facebook.webp", alt: "Facebook" },
  { src: "Images/Hero_Instagram.webp", alt: "Instagram" },
  { src: "Images/Hero_Google.webp", alt: "Google" },
  { src: "Images/Hero_XHS.webp", alt: "XHS" },
  { src: "Images/Hero_Website.webp", alt: "Website" },
  { src: "Images/Hero_Tiktok.webp", alt: "TikTok" },
  { src: "Images/Hero_Messenger.webp", alt: "Messenger" },
  { src: "Images/Hero_Whatsapp.webp", alt: "WhatsApp" },
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const positionElements = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();

    // Calculate image center relative to container
    const imageCenterX = imageRect.left - containerRect.left + imageRect.width / 2;
    const imageCenterY = imageRect.top - containerRect.top + imageRect.height / 2;

    // Calculate scale factors based on screen width
    const windowWidth = window.innerWidth;
    let distScale = 1.0;
    let sizeScale = 1.0;

    if (windowWidth <= 480) {
      distScale = 0.35;
      sizeScale = 0.35;
    } else if (windowWidth <= 767) {
      distScale = 0.5;
      sizeScale = 0.5;
    } else if (windowWidth <= 991) {
      distScale = 0.7;
      sizeScale = 0.7;
    }

    // Icon positions relative to image center [x offset, y offset, base width]
    const iconPositions = [
      { x: -280, y: -120, width: 170 },  // Buzz 1 - top left
      { x: 220, y: -80, width: 150 },    // Buzz 2 - top right
      { x: -200, y: 80, width: 100 },    // Facebook - bottom left
      { x: 280, y: 20, width: 100 },     // Instagram - right
      { x: -100, y: -180, width: 50 },   // Google - top
      { x: 80, y: -140, width: 65 },     // XHS - top right
      { x: -260, y: -20, width: 70 },    // Website - left
      { x: 240, y: 100, width: 75 },     // TikTok - bottom right
      { x: 100, y: 40, width: 60 },      // Messenger - center right
      { x: 180, y: -160, width: 80 },    // WhatsApp - top right
    ];

    // Position each icon
    iconRefs.current.forEach((iconRef, index) => {
      if (!iconRef) return;

      const pos = iconPositions[index];
      const x = imageCenterX + (pos.x * distScale);
      const y = imageCenterY + (pos.y * distScale);
      const width = pos.width * sizeScale;

      gsap.set(iconRef, {
        left: x - width / 2,
        top: y - width / 2,
        width: width,
        opacity: 1,
        force3D: true,
      });
    });
  }, []);

  // Initial positioning and resize handling
  useEffect(() => {
    const handleResize = () => {
      positionElements();
    };

    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        positionElements();
      } else {
        img.addEventListener('load', positionElements);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (img) {
        img.removeEventListener('load', positionElements);
      }
    };
  }, [positionElements]);

  // Floating animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      iconRefs.current.forEach((iconRef, index) => {
        if (!iconRef) return;

        gsap.to(iconRef, {
          y: "+=10",
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 2 + Math.random() * 1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.15,
          force3D: true,
        });
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
      iconRefs.current.forEach((iconRef) => {
        if (iconRef) {
          gsap.killTweensOf(iconRef);
        }
      });
    };
  }, []);

  return (
    <section className="min-h-[500px] lg:min-h-[700px] flex items-center pt-32 lg:pt-24 pb-10 lg:pb-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-5">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-10 items-center">
          {/* Hero Image with Floating Elements - comes first on mobile */}
          <div className="lg:w-[70%] relative order-1 lg:order-2 animate-scale-in">
            <div ref={containerRef} className="relative w-full max-w-[600px] lg:max-w-[800px] mx-auto">
              {/* Main Image */}
              <img
                ref={imageRef}
                src={getAssetPath("Images/Hero_MainPic.webp")}
                alt="Beeline Hero"
                className="w-full h-auto object-contain relative z-10 block mx-auto"
              />
              
              {/* Floating Icons - positioned by GSAP */}
              {floatingIcons.map((icon, index) => (
                <div
                  key={index}
                  ref={(el) => (iconRefs.current[index] = el)}
                  className="absolute z-[15]"
                  style={{ opacity: 0 }}
                >
                  <img
                    src={getAssetPath(icon.src)}
                    alt={icon.alt}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text Content - comes second on mobile (below image) */}
          <div className="lg:w-[30%] order-2 lg:order-1 animate-fade-in text-center lg:text-left mt-0 lg:mt-0">
            <h1 className="text-xl md:text-2xl lg:text-[2.5rem] font-extrabold leading-[1.2] mb-3 lg:mb-5">
              Real stories, simply told.
            </h1>
            <p className="text-sm md:text-base lg:text-lg font-semibold italic text-text-brown mb-6 lg:mb-8 px-4 lg:px-0">
              Creating unique brand identities and smart marketing strategies to help your business stand out and boost profits.
            </p>
            <Link to="/contact">
              <AnimatedButton>Free Consultation</AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
