import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const Footer = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 h-full max-h-12 w-full">
      <div className="flex w-full items-center justify-between px-4">
        <AvatarSectionDeveloper />
        <div>HII</div>
        <div>HII</div>
      </div>
    </div>
  );
};

export default Footer;

const AvatarSectionDeveloper = () => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span>
        <h6>Shivam Anand</h6>
        <p>SaaS Developer</p>
      </span>
    </div>
  );
};
