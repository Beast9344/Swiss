'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from "./logo";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight, Ticket, Star } from "lucide-react";
import { Separator } from './ui/separator';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/buy', label: 'Buy a Ticket' },
  { href: '/sell', label: 'Sell a Ticket' },
  { href: '/contact', label: 'Contact Us' },
];

const socialLinks = [
  { href: '#', icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400' },
  { href: '#', icon: Github, label: 'GitHub', color: 'hover:text-gray-300' },
  { href: '#', icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-500' },
];

export function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname.startsWith('/login');

  if (isAdminPage || isLoginPage) {
    return null;
  }
  
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-white/20 rounded-full"></div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-6">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Logo />
            </div>
            <p className="text-slate-300 leading-relaxed">
              The premier platform for fans to securely buy and sell sports tickets. Your perfect seat is just a click away.
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Trusted by 100K+ sports fans</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-headline font-bold mb-6 text-lg uppercase tracking-wider text-white relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="font-headline font-bold mb-6 text-lg uppercase tracking-wider text-white relative">
              Contact Us
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-blue-500"></div>
            </h4>
            <ul className="space-y-4">
              <li className="group flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <Mail className="h-4 w-4 text-blue-400"/>
                </div>
                <div>
                  <a href="mailto:support@swiss.com" className="text-slate-300 hover:text-white transition-colors block">
                    support@swiss.com
                  </a>
                  <span className="text-xs text-slate-500">24/7 Support</span>
                </div>
              </li>
              <li className="group flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg group-hover:from-green-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <Phone className="h-4 w-4 text-green-400"/>
                </div>
                <div>
                  <span className="text-slate-300 block">(123) 456-7890</span>
                  <span className="text-xs text-slate-500">Mon-Fri 9AM-6PM</span>
                </div>
              </li>
              <li className="group flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <MapPin className="h-4 w-4 text-purple-400"/>
                </div>
                <div>
                  <span className="text-slate-300 block">123 Stadium Way</span>
                  <span className="text-slate-300 block">London, UK</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="col-span-1">
            <h4 className="font-headline font-bold mb-6 text-lg uppercase tracking-wider text-white relative">
              Connect
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500"></div>
            </h4>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group relative p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-slate-500/25"
                  aria-label={social.label}
                >
                  <social.icon className={`h-5 w-5 text-slate-400 ${social.color} transition-colors duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Get the latest ticket deals</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Separator with Gradient */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>&copy; {new Date().getFullYear()} Swiss. All rights reserved.</span>
            <Separator orientation="vertical" className="h-4 bg-slate-600" />
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Separator orientation="vertical" className="h-4 bg-slate-600" />
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Ticket className="h-4 w-4 text-blue-400" />
            <span>Secure ticket marketplace</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
