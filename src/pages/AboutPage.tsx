import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const teamMembers = [
  { name: "Manson", role: "Founder & Visionary", image: "/Images/AboutUs_Manson.png" },
  { name: "Lyn", role: "Creative Director", image: "/Images/AboutUs_Lyn.png" },
  { name: "Yuki", role: "Talent Marketing Manager", image: "/Images/AboutUs_Yuki.png" },
  { name: "Kiki", role: "Content Strategist", image: "/Images/AboutUs_Kiki.png" },
  { name: "Yuanqi", role: "Content Strategist", image: "/Images/AboutUs_Yuanqi.png" },
];

const coreValues = [
  { title: "Customer-Centricity", content: "We put our clients at the heart of everything we do, ensuring their needs drive our strategies and solutions." },
  { title: "Innovation", content: "We constantly explore new ideas and technologies to deliver cutting-edge solutions that keep our clients ahead." },
  { title: "Collaboration", content: "We believe in the power of teamwork, working closely with clients and within our team to create impactful and comprehensive solutions." },
  { title: "Results-Driven", content: "We focus on measurable outcomes and tangible results that drive real business growth for our clients." },
];

const buzzPoses = [
  "/Images/AboutUs_Page3_Buzz02.png",
  "/Images/AboutUs_Page3_Buzz03.png",
  "/Images/AboutUs_Page3_Buzz04.png",
  "/Images/AboutUs_Page3_Buzz05.png",
  "/Images/AboutUs_Page3_Buzz06.png",
  "/Images/AboutUs_Page3_Buzz07.png",
  "/Images/AboutUs_Page3_Buzz08.png",
  "/Images/AboutUs_Page3_Buzz09.png",
  "/Images/AboutUs_Page3_Buzz10.png",
  "/Images/AboutUs_Page3_Buzz11.png",
  "/Images/AboutUs_Page3_Buzz12.png",
  "/Images/AboutUs_Page3_Buzz13.png",
];

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedValue, setExpandedValue] = useState<number | null>(null);
  const totalSlides = 3;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Carousel Section */}
        <section className="min-h-screen relative overflow-hidden bg-cream">
          <div className="container mx-auto px-4 py-12">
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-primary/20 hover:bg-primary/40 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-primary/20 hover:bg-primary/40 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>

            {/* Slides */}
            <div className="relative">
              {/* Slide 1: Why a Bee */}
              <div className={`transition-opacity duration-500 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">Why a Bee?</h1>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                  <div className="space-y-8">
                    <div className="flex items-start gap-4 animate-fade-in">
                      <div className="w-1 h-20 bg-primary rounded-full"></div>
                      <p className="text-lg text-foreground">
                        A bee represents <strong>hard work and teamwork</strong>; its bright and distinctive appearance makes for a memorable and eye-catching logo.
                      </p>
                    </div>

                    <div className="bg-card rounded-2xl p-6 shadow-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
                      <h3 className="font-bold text-xl mb-2 text-foreground">Hexagonal Shape</h3>
                      <p className="text-muted-foreground">Rounded hexagonal shape representing a beehive, symbolizes unity, adaptability and efficiency.</p>
                    </div>

                    <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      <span className="text-sm text-muted-foreground mb-2 block">Theme Colours</span>
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary"></div>
                        <div className="w-10 h-10 rounded-full bg-foreground"></div>
                        <div className="w-10 h-10 rounded-full bg-cream border border-border"></div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <img 
                      src="/Images/AboutUs_Page1.webp" 
                      alt="Bee Blueprint" 
                      className="w-full max-w-md mx-auto animate-float"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                  <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <h3 className="font-bold text-lg text-foreground">Arrow</h3>
                    <p className="text-sm text-muted-foreground">The upward arrow represents growth, progress, and excellence.</p>
                  </div>
                  <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <h3 className="font-bold text-lg text-foreground">Wings</h3>
                    <p className="text-sm text-muted-foreground">Soaring upwards, freedom, and limitless potential.</p>
                  </div>
                  <div className="text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <h3 className="font-bold text-lg text-foreground">Stinger</h3>
                    <p className="text-sm text-muted-foreground">The bee's stinger symbolizes strength and protection.</p>
                  </div>
                </div>
              </div>

              {/* Slide 2: Logo Evolution */}
              <div className={`transition-opacity duration-500 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">Logo Evolution</h1>
                
                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                  {[1, 2, 3, 4].map((num, idx) => (
                    <div key={num} className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-card rounded-2xl shadow-lg flex items-center justify-center p-2">
                        <img src={`/Images/AboutUs_Page2_Logo0${num}.png`} alt={`Logo Step ${num}`} className="w-full h-full object-contain" />
                      </div>
                      {idx < 3 && <ChevronRight className="w-6 h-6 text-primary" />}
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-foreground">Colour Scheme</h3>
                    <div className="flex gap-8 mb-8">
                      <div>
                        <span className="text-sm text-muted-foreground block mb-2">Main Colour</span>
                        <div className="flex gap-2">
                          <div className="text-center">
                            <div className="w-12 h-12 rounded-lg bg-foreground mb-1"></div>
                            <span className="text-xs">#505050</span>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 rounded-lg bg-primary mb-1"></div>
                            <span className="text-xs">#FFB542</span>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 rounded-lg bg-cream border mb-1"></div>
                            <span className="text-xs">#F8EFE0</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground block mb-2">Highlight</span>
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-lg bg-highlight mb-1"></div>
                          <span className="text-xs">#003CC1</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Primary typeface</h2>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-1 h-16 bg-primary rounded-full"></div>
                      <p className="text-muted-foreground">
                        We use san serif font for our display typeface. Its modern yet classic style and versatile weights are perfect for <strong>headlines and making key points stand out</strong>.
                      </p>
                    </div>
                    <div className="space-y-2 font-sans">
                      <div className="flex justify-between"><span className="font-bold">open sans bold</span><span className="font-bold">abc123</span></div>
                      <div className="flex justify-between"><span className="font-semibold">open sans semibold</span><span className="font-semibold">abc123</span></div>
                      <div className="flex justify-between"><span>open sans regular</span><span>abc123</span></div>
                      <div className="flex justify-between"><span className="font-bold italic">open sans bold italic</span><span className="font-bold italic">abc123</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 3: Buzz Character */}
              <div className={`transition-opacity duration-500 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <h1 className="text-5xl md:text-6xl font-bold text-foreground">BUZZ</h1>
                      <img src="/Images/AboutUs_Page3_Buzz01.png" alt="Buzz Mascot" className="w-24 h-24 object-contain" />
                    </div>
                    <div className="space-y-4 mb-8">
                      <p className="text-muted-foreground">Beeline's IP character, Buzz, is an adorable little bee: hardworking, capable, and always united with the hive.</p>
                      <p className="text-muted-foreground">Beneath its fluffy and lovable appearance lies a spirit of resilience and unwavering determination.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-4 text-foreground">THREE VIEWS</h4>
                      <img src="/Images/AboutUs_Page3_View.png" alt="Buzz Views" className="w-full max-w-sm" />
                      <div className="flex justify-around max-w-sm text-sm text-muted-foreground mt-2">
                        <span>FRONT</span>
                        <span>BACK</span>
                        <span>LEFT</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {buzzPoses.map((pose, idx) => (
                      <div 
                        key={idx} 
                        className="bg-card rounded-xl p-2 shadow-md hover:scale-105 transition-transform"
                        style={{ animationDelay: `${idx * 0.05}s` }}
                      >
                        <img src={pose} alt={`Buzz Pose ${idx + 1}`} className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentSlide === idx ? 'bg-primary' : 'bg-muted'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  To become the <strong>TOP 3</strong> Malaysia leader in <span className="text-text-brown">brand building and media operations</span>, driving businesses to achieve exceptional market performance through innovation and strategic communication.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <img src="/Images/AboutUs_ Buzz01.png" alt="Mission Bee" className="w-64 h-64 object-contain animate-float" />
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">Core Values</h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {coreValues.map((value, idx) => (
                  <div key={idx} className="bg-card rounded-2xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedValue(expandedValue === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6"
                    >
                      <h3 className="font-bold text-lg text-foreground">{value.title}</h3>
                      {expandedValue === idx ? (
                        <Minus className="w-5 h-5 text-primary" />
                      ) : (
                        <Plus className="w-5 h-5 text-primary" />
                      )}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${expandedValue === idx ? 'max-h-40 pb-6 px-6' : 'max-h-0'}`}>
                      <p className="text-muted-foreground">{value.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Section */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Meet Buzzies Team</h2>
              <p className="text-muted-foreground mb-12">Great minds think alike!</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="text-center group">
                    <div className="relative mb-4 overflow-hidden rounded-2xl">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                ))}
              </div>

              <Link to="/contact">
                <AnimatedButton variant="secondary">Get In Touch</AnimatedButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
