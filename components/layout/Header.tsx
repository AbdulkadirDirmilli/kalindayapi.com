"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  {
    name: "Hizmetler",
    href: "/hizmetler",
    children: [
      { name: "Emlak Danışmanlığı", href: "/hizmetler/emlak-danismanligi" },
      { name: "Tadilat & Dekorasyon", href: "/hizmetler/tadilat-dekorasyon" },
      { name: "Taahhüt & İnşaat", href: "/hizmetler/taahhut-insaat" },
      { name: "Plan & Proje", href: "/hizmetler/plan-proje" },
    ],
  },
  { name: "İlanlar", href: "/ilanlar" },
  { name: "Blog", href: "/blog" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-lg py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Mobile: küçük logo */}
            <div className="relative w-12 h-12 sm:hidden">
              <Image
                src="/logo.svg"
                alt="Kalinda Yapı Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Desktop: transparent logo */}
            <div className="relative w-48 h-12 hidden sm:block">
              <Image
                src="/logo-footer.svg"
                alt="Kalinda Yapı Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-1",
                    isActive(item.href)
                      ? "text-[#C9A84C]"
                      : isScrolled
                        ? "text-[#0B1F3A] hover:text-[#C9A84C]"
                        : "text-white hover:text-[#C9A84C]"
                  )}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      activeDropdown === item.name && "rotate-180"
                    )} />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              "block px-4 py-3 text-[#0B1F3A] hover:bg-[#F5F5F5] hover:text-[#C9A84C] transition-colors",
                              isActive(child.href) && "bg-[#F5F5F5] text-[#C9A84C]"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/ilanlar">
              <Button
                variant="accent"
                size="md"
                leftIcon={<Search className="w-4 h-4" />}
              >
                İlan Sorgula
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "text-[#0B1F3A]" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-[#e0e0e0] overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.name ? null : item.name
                          )
                        }
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 font-medium rounded-lg",
                          isActive(item.href)
                            ? "text-[#C9A84C] bg-[#F5F5F5]"
                            : "text-[#0B1F3A]"
                        )}
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            activeDropdown === item.name && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-2 text-sm rounded-lg",
                                  isActive(child.href)
                                    ? "text-[#C9A84C] bg-[#F5F5F5]"
                                    : "text-[#666666]"
                                )}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 font-medium rounded-lg",
                        isActive(item.href)
                          ? "text-[#C9A84C] bg-[#F5F5F5]"
                          : "text-[#0B1F3A]"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="mt-4 pt-4 border-t border-[#e0e0e0] space-y-3">
                <Link href="/ilanlar" className="block">
                  <Button variant="accent" size="md" className="w-full">
                    <Search className="w-4 h-4" />
                    İlan Sorgula
                  </Button>
                </Link>
                <a href="tel:+905370530754" className="block">
                  <Button variant="outline" size="md" className="w-full">
                    <Phone className="w-4 h-4" />
                    Hemen Arayın
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
