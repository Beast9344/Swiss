'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Logo } from './logo';
import { Menu, X, Twitter, Github, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home page' },
  { href: '/buy', label: 'Buy a Ticket' },
  { href: '/sell', label: 'Sell a Ticket' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isNavLinkActive = (href: string) => {
    return pathname === href;
  };

  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname.startsWith('/login');

  if (isAdminPage || isLoginPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center ml-auto space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isNavLinkActive(link.href) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button>
        </nav>
        <button
          className="md:hidden ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isNavLinkActive(link.href) ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="outline" size="sm" onClick={() => setIsMenuOpen(false)}>
              <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
