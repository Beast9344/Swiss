'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Logo } from './logo';
import { Menu, X, UserCog, Home, ShoppingCart, DollarSign, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/buy', label: 'Buy Ticket', icon: ShoppingCart },
  { href: '/sell', label: 'Sell Ticket', icon: DollarSign },
  { href: '/contact', label: 'Contact', icon: MessageCircle },
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
    <header className="sticky top-0 z-50 w-full bg-slate-900 shadow-lg shadow-slate-900/20 border-b border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0 hover:scale-105 transition-transform duration-200">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:bg-slate-800/50",
                    isNavLinkActive(link.href) 
                      ? "text-white bg-slate-800 shadow-md" 
                      : "text-slate-300 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                  {isNavLinkActive(link.href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-400 rounded-full"></div>
                  )}
                </Link>
              );
            })}
            
            {/* Admin Link */}
            <div className="ml-4 pl-4 border-l border-slate-700">
              <Link 
                href="/admin/login" 
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:bg-slate-800/50 border border-slate-600 hover:border-slate-500",
                  isNavLinkActive('/admin/login') 
                    ? "text-white bg-slate-800 border-slate-500" 
                    : "text-slate-300 hover:text-white"
                )}
              >
                <UserCog className="h-4 w-4" />
                Admin
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 shadow-lg">
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isNavLinkActive(link.href)
                      ? "text-white bg-slate-700 shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
            
            {/* Mobile Admin Link */}
            <div className="pt-2 mt-2 border-t border-slate-700">
              <Link
                href="/admin/login"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-600",
                  isNavLinkActive('/admin/login')
                    ? "text-white bg-slate-700 border-slate-500"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-500"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <UserCog className="h-5 w-5" />
                Admin Panel
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
