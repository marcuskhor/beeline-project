import { getAssetPath } from "@/lib/assets";

export const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/60123456789"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <img
          src={getAssetPath("Images/Hero_Whatsapp.webp")}
          alt="WhatsApp"
          className="w-14 h-14 drop-shadow-lg"
        />
        {/* Curved text around button */}
        <svg
          className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] animate-spin-slow"
          viewBox="0 0 100 100"
          style={{ animationDuration: "20s" }}
        >
          <defs>
            <path
              id="circle"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text className="text-[8px] fill-foreground font-bold uppercase tracking-[0.3em]">
            <textPath xlinkHref="#circle">
              • Chat with us • Chat with us 
            </textPath>
          </text>
        </svg>
      </div>
    </a>
  );
};
