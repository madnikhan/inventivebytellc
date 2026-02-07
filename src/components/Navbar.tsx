"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "./ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";

const serviceSubmenu = [
  { href: "/services", label: "All services" },
  { href: "/services/google-business-profiles", label: "Google Business Profile" },
  { href: "/services/seo", label: "SEO" },
  { href: "/services/google-local-services-ads", label: "Google Local Services Ads" },
  { href: "/services/web-design", label: "Web Design" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full glass-effect border-b border-white/10 shadow-lg font-sans">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 py-5">
        {/* Logo - your PNG, full brightness so it's visible on dark nav */}
        <Link href="/" className="flex items-center flex-shrink-0 mr-4 group" aria-label="InventiveByte Home">
          <span className="relative flex items-center justify-center rounded-lg overflow-hidden border border-white/15 bg-white/5 px-2 py-1.5 transition-all group-hover:border-[#00D9FF]/40 group-hover:shadow-[0_0_20px_rgba(0,217,255,0.15)]">
            <Image
              src="/inventivebyte-logo.png"
              alt="InventiveByte LLC"
              width={160}
              height={44}
              className="h-11 w-auto object-contain drop-shadow-sm"
              priority
            />
          </span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu className="[&_[data-slot=navigation-menu-viewport]]:!bg-transparent [&_[data-slot=navigation-menu-viewport]]:!border-0 [&_[data-slot=navigation-menu-viewport]]:!shadow-none">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="relative px-5 py-2.5 rounded-xl border border-transparent text-lg font-semibold tracking-wide transition-all duration-200 text-gray-300 hover:!bg-white/10 hover:backdrop-blur-sm hover:border-white/20 hover:!text-white focus:!bg-white/10 focus:backdrop-blur-sm focus:border-white/20 focus:!text-white">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="min-w-0 px-5 py-2.5 h-auto text-lg font-semibold tracking-wide text-gray-300 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm transition-all duration-200 hover:!bg-white/10 hover:!text-white hover:border-white/20 focus:!bg-white/10 focus:!text-white focus:border-white/20 data-[state=open]:!bg-white/10 data-[state=open]:!text-white data-[state=open]:border-white/20 data-[state=open]:hover:!bg-white/10 [&>svg]:size-4">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-0 right-0 mx-auto min-w-[240px] rounded-2xl glass-effect py-2 shadow-xl mt-2">
                  <ul className="grid gap-0.5 px-2 py-1">
                    {serviceSubmenu.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:!bg-white/10 hover:!text-white border-l-2 border-l-transparent hover:border-l-white/30 focus:!bg-white/10 focus:!text-white focus:border-l-white/30"
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {navLinks.slice(1).map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className="relative px-5 py-2.5 rounded-xl border border-transparent text-lg font-semibold tracking-wide transition-all duration-200 text-gray-300 hover:!bg-white/10 hover:backdrop-blur-sm hover:border-white/20 hover:!text-white focus:!bg-white/10 focus:backdrop-blur-sm focus:border-white/20 focus:!text-white">
                      {link.label}
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
            <SheetContent className="flex flex-col p-0 glass-effect border border-white/20 w-[90vw] max-w-xs h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed rounded-2xl shadow-2xl [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:hover:text-white [&>button]:focus:ring-[#00D9FF] [&>button]:right-4 [&>button]:top-4">
              <SheetTitle className="sr-only">Main Navigation</SheetTitle>
              <div className="flex-1 min-h-0 overflow-y-auto">
                <nav className="flex flex-col items-center gap-6 w-full px-8 py-12 pb-8">
                  <Link
                    href="/"
                    className="text-2xl font-bold py-2 px-4 rounded-xl transition-colors text-white hover:text-[#00D9FF] hover:bg-white/10 focus:bg-white/20 w-full text-center"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>
                  <div className="w-full">
                    <button
                      type="button"
                      onClick={() => setServicesOpen((o) => !o)}
                      className="flex items-center justify-center gap-2 w-full text-2xl font-bold py-2 px-4 rounded-xl transition-colors text-white hover:text-[#00D9FF] hover:bg-white/10 focus:bg-white/20"
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services-menu"
                      id="mobile-services-trigger"
                    >
                      Services
                      <ChevronDown
                        className={`size-6 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                    <div
                      id="mobile-services-menu"
                      role="region"
                      aria-labelledby="mobile-services-trigger"
                      className={`grid transition-[grid-template-rows] duration-200 ease-out ${servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-1 pt-2 pb-1">
                          {serviceSubmenu.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="text-lg font-medium py-2 px-4 rounded-xl transition-colors text-gray-300 hover:text-[#00D9FF] hover:bg-white/10 w-full text-center"
                              onClick={() => setOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {navLinks.slice(1).map((link) => (
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
} 