import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getAssetPath } from "@/lib/assets";

const tabs = [
  { id: "branding", label: "Branding" },
  { id: "website", label: "Website Design" },
  { id: "social", label: "Social Media Management" },
  { id: "influencer", label: "Influencer Collaboration" },
];

const portfolioItems = {
  branding: [
    { id: 1, title: "DE CREATIVE", subtitle: "Rebranding", image: "Images/Portfolio_Branding_01.png", link: "/portfolio/branding/de-creative" },
    { id: 2, title: "Brand 02", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 3, title: "Brand 03", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 4, title: "Brand 04", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 5, title: "Brand 05", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 6, title: "Brand 06", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
  ],
  website: [
    { id: 1, title: "QUBE", subtitle: "Website Design", image: "Images/Portfolio_Website Design_01.png", link: "/portfolio/website/qube" },
    { id: 2, title: "ZIDS", subtitle: "Website Design", image: "Images/Portfolio_Website Design_02.png", link: "/portfolio/website/zids" },
    { id: 3, title: "Brand 03", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 4, title: "Brand 04", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 5, title: "Brand 05", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 6, title: "Brand 06", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
  ],
  social: [
    { id: 1, title: "LEHAO", subtitle: "Social Media Management", image: "Images/Portfolio_Social Media Management_01.png", link: "/portfolio/social/lehao" },
    { id: 2, title: "Brand 02", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 3, title: "Brand 03", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 4, title: "Brand 04", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 5, title: "Brand 05", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 6, title: "Brand 06", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
  ],
  influencer: [
    { id: 1, title: "Campaign 01", subtitle: "Influencer Collaboration", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 2, title: "Campaign 02", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 3, title: "Campaign 03", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 4, title: "Campaign 04", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 5, title: "Campaign 05", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
    { id: 6, title: "Campaign 06", subtitle: "Description", image: "Images/Portfolio_Images.jpg", link: "#" },
  ],
};

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("branding");
  const [currentSlide, setCurrentSlide] = useState(0);

  const currentItems = portfolioItems[activeTab as keyof typeof portfolioItems];
  const itemsPerPage = 6;
  const totalSlides = Math.ceil(currentItems.length / itemsPerPage);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentSlide(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-cream to-background min-h-[80vh]">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-highlight">Results</span> that speak
              </h2>
              <p className="text-lg text-muted-foreground">Experience our outstanding achievements firsthand!</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-6 py-3 rounded-full font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="relative">
              {/* Navigation Arrows */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
                    disabled={currentSlide === 0}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 flex items-center justify-center bg-card shadow-lg rounded-full disabled:opacity-50"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1))}
                    disabled={currentSlide === totalSlides - 1}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 flex items-center justify-center bg-card shadow-lg rounded-full disabled:opacity-50"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {currentItems
                  .slice(currentSlide * itemsPerPage, (currentSlide + 1) * itemsPerPage)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg"
                    >
                      <img
                        src={getAssetPath(item.image)}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="text-background">
                          <h3 className="font-bold text-xl">{item.title}</h3>
                          <p className="text-sm opacity-80">{item.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              {/* Dots */}
              {totalSlides > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentSlide === idx ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
