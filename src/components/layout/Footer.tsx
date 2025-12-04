import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <img 
              src="/Images/Beeline_Logo02.svg" 
              alt="Beeline Logo" 
              className="h-8 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-primary-foreground/70 text-sm">
              Creating unique brand identities and smart marketing strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/portfolio">Portfolio</FooterLink>
              <FooterLink to="/contact">Get in Touch</FooterLink>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <nav className="space-y-2">
              <FooterLink to="/services/branding">Branding</FooterLink>
              <FooterLink to="/services/website-design">Website Design</FooterLink>
              <FooterLink to="/services/social-media">Social Media Management</FooterLink>
              <FooterLink to="/services/influencer">Influencer Collaboration</FooterLink>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <div className="space-y-2 text-primary-foreground/70 text-sm">
              <p>📞 +60 12-345-6789</p>
              <p>✉️ hello@beeline.com</p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <SocialLink href="#" icon="instagram" />
              <SocialLink href="#" icon="facebook" />
              <SocialLink href="#" icon="tiktok" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center text-primary-foreground/50 text-sm">
          © 2024 Beeline. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="block text-primary-foreground/70 hover:text-primary transition-colors text-sm"
  >
    {children}
  </Link>
);

const SocialLink = ({ href, icon }: { href: string; icon: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
  >
    <span className="sr-only">{icon}</span>
    {icon === "instagram" && "📷"}
    {icon === "facebook" && "📘"}
    {icon === "tiktok" && "🎵"}
  </a>
);
