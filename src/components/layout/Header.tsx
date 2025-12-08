import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import { getAssetPath } from "@/lib/assets";

const services = [
  { name: "Branding", path: "/services/branding" },
  { name: "Website Design", path: "/services/website-design" },
  { name: "Social Media Management", path: "/services/social-media" },
  { name: "Influencer Collaboration", path: "/services/influencer" },
];

const languages = ["English", "Chinese", "Malay"];

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img 
            src={getAssetPath("Images/Beeline_Logo.svg")} 
            alt="Beeline Logo" 
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink to="/" active={isActive("/")}>HOME</NavLink>
          <NavLink to="/about" active={isActive("/about")}>ABOUT US</NavLink>
          
          {/* Services Dropdown */}
          <div className="relative group dropdown-trigger">
            <button className="flex items-center gap-1 font-bold text-foreground hover:text-primary transition-colors py-2 px-3 rounded-full">
              SERVICES
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="dropdown-menu absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-card rounded-2xl shadow-lg py-2 min-w-[240px]">
              {services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="block px-6 py-3 text-foreground hover:text-primary hover:bg-muted/50 transition-colors font-semibold"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/portfolio" active={isActive("/portfolio")}>PORTFOLIO</NavLink>
          <NavLink to="/contact" active={isActive("/contact")}>GET IN TOUCH</NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="relative group dropdown-trigger">
            <button className="flex items-center gap-1">
              <img 
                src={getAssetPath("Images/Icon_Translate.webp")} 
                alt="Language" 
                className="h-8 w-auto"
              />
              <ChevronDown className="w-4 h-4 text-foreground transition-transform group-hover:rotate-180" />
            </button>
            <div className="dropdown-menu absolute top-full right-0 mt-4 bg-card rounded-2xl shadow-lg py-2 min-w-[140px]">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className="block w-full text-left px-6 py-3 text-foreground hover:text-primary hover:bg-muted/50 transition-colors font-semibold"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box - Desktop */}
          <div className="hidden lg:flex items-center bg-card rounded-full px-4 py-2 shadow-md">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="SEARCH PROJECTS"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-32 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40">
          <div className="p-6">
            {/* Mobile Search */}
            <div className="flex items-center bg-card rounded-full px-4 py-3 shadow-md mb-6">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-transparent outline-none text-sm flex-1"
              />
            </div>

            {/* Mobile Nav Links */}
            <nav className="space-y-4">
              <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>HOME</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setMobileMenuOpen(false)}>ABOUT US</MobileNavLink>
              
              {/* Services Accordion */}
              <div className="border-b border-border pb-4">
                <div className="font-bold text-lg mb-2">SERVICES</div>
                <div className="pl-4 space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-muted-foreground hover:text-primary"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <MobileNavLink to="/portfolio" onClick={() => setMobileMenuOpen(false)}>PORTFOLIO</MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>GET IN TOUCH</MobileNavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, active, children }: { to: string; active?: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`font-bold py-2 px-3 rounded-full transition-all hover:bg-primary hover:text-primary-foreground ${
      active ? "text-text-brown" : "text-foreground"
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block font-bold text-lg py-3 border-b border-border hover:text-primary"
  >
    {children}
  </Link>
);
