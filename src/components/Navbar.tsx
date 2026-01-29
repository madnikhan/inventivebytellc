"use client";

import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full glass-effect border-b border-white/10 shadow-lg font-sans">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 mr-4 group" aria-label="InventiveByte Home">
          <div className="logo-container relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/inventivebyte-logo.png" 
              alt="InventiveByte LLC Logo" 
              className="h-12 w-auto drop-shadow-md transition-transform duration-200 group-hover:scale-105 relative z-10" 
            />
            <div className="logo-gradient-overlay absolute inset-0 bg-gradient-to-r from-[#00D9FF] via-[#B026FF] to-[#FF0066] mix-blend-screen opacity-90 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-gradient-shift" />
          </div>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className="relative px-5 py-2 text-lg font-semibold tracking-wide transition-colors duration-200 text-gray-300 hover:text-[#00D9FF] focus:text-[#00D9FF] group">
                      <span className="transition-colors duration-200">{link.label}</span>
                      <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#00D9FF] to-[#B026FF] rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8 group-focus:w-3/4 group-focus:left-1/8"></span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex flex-1 justify-end">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                aria-label="Open menu" 
                className="border-white/20 shadow-sm transition-all duration-200 hover:border-[#00D9FF] hover:bg-white/10 focus:ring-2 focus:ring-[#00D9FF] text-white">
                <Menu className="size-7" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex items-center justify-center p-0 glass-effect rounded-2xl shadow-2xl border border-white/20 w-[90vw] max-w-xs h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed">
              <SheetTitle className="sr-only">Main Navigation</SheetTitle>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00D9FF] text-white">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <nav className="flex flex-col items-center gap-6 w-full px-8 py-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-2xl font-bold py-2 px-4 rounded-xl transition-colors text-white hover:text-[#00D9FF] hover:bg-white/10 focus:bg-white/20 w-full text-center"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
} 