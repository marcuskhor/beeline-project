import { Link } from "react-router-dom";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { getAssetPath } from "@/lib/assets";

const floatingIcons = [
  // Top area
  { src: "Images/Hero_Google.webp", alt: "Google", className: "top-[10%] left-[40%] w-14 md:w-20" },
  { src: "Images/Hero_Whatsapp.webp", alt: "WhatsApp", className: "top-[5%] right-[0%] w-16 md:w-24" },
  
  // Left side
  { src: "Images/Hero_Buzz01.webp", alt: "Buzz", className: "top-[25%] left-[-5%] w-24 md:w-36" },
  { src: "Images/Hero_Website.webp", alt: "Website", className: "top-[55%] left-[-10%] w-14 md:w-20" },
  
  // Right side
  { src: "Images/Hero_XHS.webp", alt: "XHS", className: "top-[20%] right-[-5%] w-20 md:w-28" },
  { src: "Images/Hero_Buzz02.webp", alt: "Buzz", className: "top-[35%] right-[-10%] w-24 md:w-32" },
  { src: "Images/Hero_Messenger.webp", alt: "Messenger", className: "top-[50%] right-[5%] w-14 md:w-20" },
  { src: "Images/Hero_Instagram.webp", alt: "Instagram", className: "top-[55%] right-[-15%] w-20 md:w-28" },
  
  // Bottom area
  { src: "Images/Hero_Facebook.webp", alt: "Facebook", className: "bottom-[10%] left-[15%] w-20 md:w-28" },
  { src: "Images/Hero_Tiktok.webp", alt: "TikTok", className: "bottom-[5%] right-[20%] w-16 md:w-24" },
];

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Real stories, simply told.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg italic">
              Creating unique brand identities and smart marketing strategies to help your business stand out and boost profits.
            </p>
            <Link to="/contact">
              <AnimatedButton>Free Consultation</AnimatedButton>
            </Link>
          </div>

          {/* Hero Image with Floating Elements */}
          <div className="relative animate-scale-in">
            <div className="relative w-full aspect-square max-w-xl mx-auto">
              {/* Main Image - pushed to back with z-0 */}
              <img
                src={getAssetPath("Images/Hero_MainPic.webp")}
                alt="Beeline Hero"
                className="w-full h-full object-contain relative z-0"
              />
              
              {/* Floating Icons - in front with z-10 */}
              {floatingIcons.map((icon, index) => (
                <div
                  key={index}
                  className={`float-element absolute z-10 ${icon.className}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <img
                    src={getAssetPath(icon.src)}
                    alt={icon.alt}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
