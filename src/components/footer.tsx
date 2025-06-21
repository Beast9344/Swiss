'use client';

import { usePathname } from 'next/navigation';
import { Logo } from "./logo";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname.startsWith('/login');

  if (isAdminPage || isLoginPage) {
    return null;
  }
  
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Logo />
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} SeatSwap. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary"><Twitter /></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><Github /></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
