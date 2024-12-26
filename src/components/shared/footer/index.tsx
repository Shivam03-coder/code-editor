import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Linkedin } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="absolute bg-primary inset-x-0 bottom-0 h-12 mt-5 w-full text-secondary">
      <div className="flex w-full items-center justify-between px-4">
        <AvatarSectionDeveloper />
        <div className="text-center text-secondary">
          <p>
            © {new Date().getFullYear()} Shivam Anand. All rights reserved.
          </p>
        </div>

        <nav
          className="flex items-center gap-3"
          aria-label="Social media links"
        >
          <a href="https://www.instagram.com" aria-label="Instagram">
            <Instagram size={32} color="pink" />
          </a>
          <a href="https://www.linkedin.com" aria-label="LinkedIn">
            <Linkedin size={32} color="blue" />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

const AvatarSectionDeveloper = () => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/dev.jpeg" alt="Shivam Anand's Avatar" />
        <AvatarFallback>SA</AvatarFallback>
      </Avatar>
      <div>
        <h6 className="text-lg font-medium">Shivam Anand</h6>
        <p className="text-sm text-slate-300">SaaS Developer</p>
      </div>
    </div>
  );
};
