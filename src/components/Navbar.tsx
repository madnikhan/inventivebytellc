"use client";

import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/brands", label: "Brands" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-md border-b border-[#b0b6be]/40 shadow-md font-sans">
      <div className="flex items-center justify-between w-full max-w-5xl mx-auto px-4 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 mr-4 group" aria-label="InventiveByte Home">
          <img src="/inventivebyte-logo.png" alt="InventiveByte LLC Logo" className="h-12 w-auto drop-shadow-md transition-transform duration-200 group-hover:scale-105" />
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className="relative px-5 py-2 text-lg font-semibold tracking-wide transition-colors duration-200 hover:text-black/90 focus:text-black/90 group">
                      <span className="transition-colors duration-200">{link.label}</span>
                      <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-[#b0b6be] rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8 group-focus:w-3/4 group-focus:left-1/8"></span>
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
                className="border-[#b0b6be] shadow-sm transition-all duration-200 hover:border-black hover:bg-[#b0b6be]/20 focus:ring-2 focus:ring-[#b0b6be] focus:ring-offset-2 hover:scale-105">
                <Menu className="size-7" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex items-center justify-center p-0 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#b0b6be]/40 w-[90vw] max-w-xs h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed">
              <SheetTitle className="sr-only">Main Navigation</SheetTitle>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#b0b6be]/20 focus:outline-none focus:ring-2 focus:ring-[#b0b6be]">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <nav className="flex flex-col items-center gap-6 w-full px-8 py-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-2xl font-bold py-2 px-4 rounded-xl transition-colors hover:bg-[#b0b6be]/10 hover:underline underline-offset-4 focus:bg-[#b0b6be]/20 w-full text-center"
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