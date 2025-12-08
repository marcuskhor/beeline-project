import { Link } from "react-router-dom";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { getAssetPath } from "@/lib/assets";

const results = [
  {
    id: 1,
    title: "Branding",
    icon: "Images/Services_Buzz01.gif",
    link: "/portfolio?category=branding",
  },
  {
    id: 2,
    title: "Website Design",
    icon: "Images/Services_Buzz03.gif",
    link: "/portfolio?category=website",
  },
  {
    id: 3,
    title: "Social Media Management",
    icon: "Images/Services_Buzz04.gif",
    link: "/portfolio?category=social-media",
  },
  {
    id: 4,
    title: "Influencer Collaboration",
    icon: "Images/Services_Buzz02.gif",
    link: "/portfolio?category=influencer",
  },
];

export const ResultsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Results</span> that speak
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience our outstanding achievements firsthand!
          </p>
        </div>

        {/* Results Cards - Marquee */}
        <div className="overflow-hidden mb-12">
          <div className="flex gap-6 marquee-scroll">
            {[...results, ...results].map((result, index) => (
              <Link
                key={`${result.id}-${index}`}
                to={result.link}
                className="flex-shrink-0 w-64 bg-card rounded-3xl p-8 shadow-card hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-24 h-24 mx-auto mb-4">
                  <img
                    src={getAssetPath(result.icon)}
                    alt={result.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-center font-bold text-lg group-hover:text-primary transition-colors">
                  {result.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/portfolio">
            <AnimatedButton>See More Projects</AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
};
