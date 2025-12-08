import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getAssetPath } from "@/lib/assets";

const socialLinks = [
  { icon: "Images/GetinTouch_Icon01.webp", url: "https://www.xiaohongshu.com/user/profile/64969c58000000002a037eef", alt: "Xiaohongshu" },
  { icon: "Images/GetinTouch_Icon02.webp", url: "http://tiktok.com/@beeline.my", alt: "TikTok" },
  { icon: "Images/GetinTouch_Icon03.webp", url: "https://www.instagram.com/beeline_my_/", alt: "Instagram" },
  { icon: "Images/GetinTouch_Icon04.webp", url: "https://www.facebook.com/profile.php?id=61564906472455", alt: "Facebook" },
  { icon: "Images/GetinTouch_Icon05.webp", url: "mailto:Beeline123@gmail.com", alt: "Email" },
];

const subjects = ["General Inquiry", "Project Proposal", "Partnership", "Other"];
const industries = ["IT / Tech", "F&B", "Retail", "Education"];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
    industry: "",
  });
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [industryOpen, setIndustryOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", phone: "", message: "", subject: "", industry: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-cream to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">We'd Love to Hear from You!</h1>
              <p className="text-lg text-muted-foreground">Whether you...</p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
              <div className="relative">
                <img 
                  src={getAssetPath("Images/GetinTouch_Buzz01.png")} 
                  alt="Buzz Bee" 
                  className="w-48 h-48 object-contain animate-float"
                />
              </div>
              
              <div className="text-lg text-foreground space-y-2">
                <p>• have a question</p>
                <p>• want to discuss a potential project</p>
                <p>• or just want to connect</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Icons */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg hover:scale-110 transition-transform"
                >
                  <img src={getAssetPath(social.icon)} alt={social.alt} className="w-full h-full object-cover" />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground">Connect with us on social media!</p>
          </div>
        </section>

        {/* Scroll Arrow */}
        <div className="flex flex-col items-center py-8">
          <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
          <ChevronDown className="w-8 h-8 text-primary animate-bounce -mt-4" style={{ animationDelay: '0.1s' }} />
        </div>

        {/* Contact Form Section */}
        <section className="py-16 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold mb-4">We're here for you!</h2>
                <p className="text-muted mb-8">Reach out to us through any of the options below, and we'll get back to you as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/60 focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/60 focus:outline-none focus:border-primary"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/60 focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/60 focus:outline-none focus:border-primary"
                    />
                    
                    {/* Subject Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setSubjectOpen(!subjectOpen); setIndustryOpen(false); }}
                        className="w-full px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-left flex items-center justify-between"
                      >
                        <span className={formData.subject ? "text-background" : "text-background/60"}>
                          {formData.subject || "Subject"}
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${subjectOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {subjectOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-lg z-10 overflow-hidden">
                          {subjects.map((subject) => (
                            <button
                              key={subject}
                              type="button"
                              onClick={() => { setFormData({ ...formData, subject }); setSubjectOpen(false); }}
                              className="w-full px-4 py-3 text-left text-foreground hover:bg-muted transition-colors"
                            >
                              {subject}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Industry Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setIndustryOpen(!industryOpen); setSubjectOpen(false); }}
                        className="w-full px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-left flex items-center justify-between"
                      >
                        <span className={formData.industry ? "text-background" : "text-background/60"}>
                          {formData.industry || "Field / Industry"}
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${industryOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {industryOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-lg z-10 overflow-hidden">
                          {industries.map((industry) => (
                            <button
                              key={industry}
                              type="button"
                              onClick={() => { setFormData({ ...formData, industry }); setIndustryOpen(false); }}
                              className="w-full px-4 py-3 text-left text-foreground hover:bg-muted transition-colors"
                            >
                              {industry}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-animated mt-6"
                  >
                    <span className="btn-bg"></span>
                    <span className="relative z-10 font-bold">Send Message</span>
                  </button>
                </form>
              </div>

              {/* Visual */}
              <div className="text-center">
                <div className="mb-6">
                  <p className="text-2xl font-script">Looking for a</p>
                  <p className="text-3xl font-bold">quick response?</p>
                </div>
                <img 
                  src={getAssetPath("Images/GetinTouch_Buzz02.png")} 
                  alt="Bee with Phone" 
                  className="w-64 h-64 mx-auto object-contain animate-float"
                />
                <p className="text-muted mt-4">
                  You can also send us a direct message to Whatsapp and we'll get back to you promptly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
