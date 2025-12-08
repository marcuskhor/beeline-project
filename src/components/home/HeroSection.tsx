import { Link } from "react-router-dom";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { getAssetPath } from "@/lib/assets";

const floatingIcons = [
  { src: "Images/Hero_Buzz01.webp", alt: "Decorative icon 1", className: "top-0 left-0" },
  { src: "Images/Hero_Buzz02.webp", alt: "Decorative icon 2", className: "top-10 right-10" },
  { src: "Images/Hero_Facebook.webp", alt: "Facebook", className: "top-1/4 -left-8" },
  { src: "Images/Hero_Instagram.webp", alt: "Instagram", className: "top-1/3 -right-4" },
  { src: "Images/Hero_Google.webp", alt: "Google", className: "bottom-1/3 -left-12" },
  { src: "Images/Hero_XHS.webp", alt: "XHS", className: "bottom-1/4 right-0" },
  { src: "Images/Hero_Website.webp", alt: "Website", className: "bottom-10 left-10" },
  { src: "Images/Hero_Tiktok.webp", alt: "Tiktok", className: "top-1/2 -right-8" },
  { src: "Images/Hero_Messenger.webp", alt: "Messenger", className: "bottom-0 right-1/4" },
  { src: "Images/Hero_Whatsapp.webp", alt: "Whatsapp", className: "bottom-1/4 -left-4" },
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
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Creating unique brand identities and smart marketing strategies to help your business stand out and boost profits.
            </p>
            <Link to="/contact">
              <AnimatedButton>Free Consultation</AnimatedButton>
            </Link>
          </div>

          {/* Hero Image with Floating Elements */}
          <div className="relative animate-scale-in">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Image */}
              <img
                src={getAssetPath("Images/Hero_MainPic.webp")}
                alt="Beeline Hero"
                className="w-full h-full object-contain relative z-10"
              />
              
              {/* Floating Icons */}
              {floatingIcons.map((icon, index) => (
                <div
                  key={index}
                  className={`float-element absolute w-12 md:w-16 ${icon.className}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <img
                    src={getAssetPath(icon.src)}
                    alt={icon.alt}
                    className="w-full h-full object-contain"
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
