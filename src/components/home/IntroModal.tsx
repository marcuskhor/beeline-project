import { useState, useEffect } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export const IntroModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the intro before
    const hasSeenIntro = sessionStorage.getItem("beeline-intro-seen");
    if (!hasSeenIntro) {
      // Small delay before showing modal
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("beeline-intro-seen", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="intro-modal">
      <div className="modal-overlay" onClick={handleClose} />
      <div className="modal-card">
        <div className="w-24 h-24 mx-auto mb-6">
          <img
            src="/Images/Intro_Buzz.gif"
            alt="Welcome Bee"
            className="w-full h-full object-contain"
          />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <p className="text-muted-foreground mb-6">
          Buzz on over and check out the sweet services we've carefully crafted just for you!
        </p>
        
        <AnimatedButton onClick={handleClose}>
          Let's go!
        </AnimatedButton>
      </div>
    </div>
  );
};
