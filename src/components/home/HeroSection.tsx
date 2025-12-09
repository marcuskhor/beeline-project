import { Link } from "react-router-dom";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { getAssetPath } from "@/lib/assets";

// Exact positions from the reference site
const floatingIcons = [
  { src: "Images/Hero_Buzz01.webp", alt: "Buzz 1", top: "10%", left: "10%", width: "170px" },
  { src: "Images/Hero_Buzz02.webp", alt: "Buzz 2", top: "20%", right: "10%", width: "150px" },
  { src: "Images/Hero_Facebook.webp", alt: "Facebook", top: "55%", left: "22%", width: "100px" },
  { src: "Images/Hero_Instagram.webp", alt: "Instagram", top: "45%", right: "5%", width: "100px" },
  { src: "Images/Hero_Google.webp", alt: "Google", top: "0%", left: "32%", width: "50px" },
  { src: "Images/Hero_XHS.webp", alt: "XHS", top: "22%", right: "31%", width: "65px" },
  { src: "Images/Hero_Website.webp", alt: "Website", top: "40%", left: "8%", width: "70px" },
  { src: "Images/Hero_Tiktok.webp", alt: "TikTok", top: "58%", right: "20%", width: "75px" },
  { src: "Images/Hero_Messenger.webp", alt: "Messenger", top: "40%", left: "62%", width: "60px" },
  { src: "Images/Hero_Whatsapp.webp", alt: "WhatsApp", top: "0%", right: "18%", width: "80px" },
];

export const HeroSection = () => {
  return (
    <section className="min-h-[700px] flex items-center pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Text Content - 30% width */}
          <div className="lg:w-[30%] animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-[2.5rem] font-extrabold leading-[1.2] mb-5">
              Real stories, simply told.
            </h1>
            <p className="text-lg font-semibold italic text-text-brown mb-8">
              Creating unique brand identities and smart marketing strategies to help your business stand out and boost profits.
            </p>
            <Link to="/contact">
              <AnimatedButton>Free Consultation</AnimatedButton>
            </Link>
          </div>

          {/* Hero Image with Floating Elements - 70% width */}
          <div className="lg:w-[70%] relative mt-12 animate-scale-in">
            <div className="relative w-full max-w-[800px] mx-auto">
              {/* Main Image - pushed to back with z-10 */}
              <img
                src={getAssetPath("Images/Hero_MainPic.webp")}
                alt="Beeline Hero"
                className="w-full h-auto object-contain relative z-10 block mx-auto"
              />
              
              {/* Floating Icons - in front with z-[15] */}
              {floatingIcons.map((icon, index) => (
                <div
                  key={index}
                  className="float-element absolute z-[15]"
                  style={{
                    top: icon.top,
                    left: icon.left,
                    right: icon.right,
                    width: icon.width,
                    animationDelay: `${index * 0.2}s`,
                  }}
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
        </div>
      </div>
    </section>
  );
};
