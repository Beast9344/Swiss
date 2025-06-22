'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from "./logo";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from './ui/separator';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/buy', label: 'Buy a Ticket' },
  { href: '/sell', label: 'Sell a Ticket' },
  { href: '/contact', label: 'Contact Us' },
];

export function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname.startsWith('/login');

  if (isAdminPage || isLoginPage) {
    return null;
  }
  
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              The premier platform for fans to securely buy and sell sports tickets. Your seat is waiting.
            </p>
          </div>
          <div className="col-span-1">
            <h4 className="font-headline font-semibold mb-4 uppercase">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-headline font-semibold mb-4 uppercase">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary"/>
                    <a href="mailto:support@swiss.com" className="hover:text-primary transition-colors">support@swiss.com</a>
                </li>
                <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary"/>
                    <span>(123) 456-7890</span>
                </li>
                <li className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary"/>
                    <span>123 Stadium Way, London, UK</span>
                </li>
            </ul>
          </div>
           <div className="col-span-1">
             <h4 className="font-headline font-semibold mb-4 uppercase">Follow Us</h4>
             <div className="flex items-center space-x-2">
                <a href="#" className="text-muted-foreground hover:text-primary p-2 bg-secondary rounded-full transition-colors"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="text-muted-foreground hover:text-primary p-2 bg-secondary rounded-full transition-colors"><Github className="h-5 w-5" /></a>
                <a href="#" className="text-muted-foreground hover:text-primary p-2 bg-secondary rounded-full transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-border/50" />
        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Swiss. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
