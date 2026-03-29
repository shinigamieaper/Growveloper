"use client";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { createContext, useContext, useRef, useState } from "react";

/* ─── Context for scroll visibility ─── */
const NavbarVisibleContext = createContext(false);
export const useNavbarVisible = () => useContext(NavbarVisibleContext);

/* ─── Types ─── */
interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

interface DropdownItem {
  label: string;
  url: string;
  highlighted?: boolean;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  className?: string;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface NavbarLogoProps {
  darkSrc: string;
  lightSrc: string;
  className?: string;
}

/* ─── Navbar Root ─── */
export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <NavbarVisibleContext.Provider value={visible}>
      <motion.div
        ref={ref}
        className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
      >
        {children}
      </motion.div>
    </NavbarVisibleContext.Provider>
  );
};

/* ─── Desktop NavBody ─── */
export const NavBody = ({ children, className }: NavBodyProps) => {
  const visible = useNavbarVisible();

  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "none",
        y: visible ? 12 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{
        WebkitBackdropFilter: visible ? "blur(16px)" : "none",
      }}
      className={cn(
        "relative z-60 mx-auto hidden max-w-fit flex-row items-center self-center rounded-full px-4 py-2 lg:flex",
        visible
          ? "border border-glass-border bg-glass-bg shadow-[0_0_24px_rgba(43,117,117,0.08),0_1px_0_rgba(255,255,255,0.06)_inset]"
          : "border border-transparent bg-glass-bg/50",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

/* ─── Logo (slides in from left on scroll) ─── */
export const NavbarLogo = ({
  darkSrc,
  lightSrc,
  className,
}: NavbarLogoProps) => {
  const visible = useNavbarVisible();
  const [theme, setTheme] = useState("dark");

  React.useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") ?? "dark";
    setTheme(current);
    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.getAttribute("data-theme") ?? "dark",
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const src = theme === "dark" ? darkSrc : lightSrc;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="/"
          initial={{ opacity: 0, x: 40, width: 0 }}
          animate={{ opacity: 1, x: 0, width: "auto" }}
          exit={{ opacity: 0, x: 40, width: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className={cn(
            "relative z-20 mr-4 flex shrink-0 items-center overflow-hidden",
            className,
          )}
          aria-label="Growveloper home"
        >
          <img
            src={src}
            alt="GRWVLP"
            className="h-8 w-auto min-h-[24px]"
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

/* ─── Static Nav Items with hover pill ─── */
export const NavItems = ({
  items,
  className,
  onItemClick,
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center gap-1 text-sm font-medium lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-text-primary transition-colors hover:text-brand-mid"
          key={`nav-link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="nav-hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-glass-bg backdrop-blur-sm"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

/* ─── Dropdown for Services / Industries ─── */
export const NavDropdown = ({
  label,
  items,
  className,
}: NavDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:text-brand-mid"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full z-70 mt-5 min-w-[220px] overflow-hidden rounded-xl border border-glass-border bg-glass-bg p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          >
            {items.map((item, idx) => {
              const prevHighlighted =
                idx > 0 && !items[idx - 1].highlighted && item.highlighted;
              return (
                <React.Fragment key={item.url}>
                  {prevHighlighted && (
                    <div className="my-1 border-t border-glass-border" />
                  )}
                  <a
                    href={item.url}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3.5 py-2.5 text-sm transition-colors",
                      item.highlighted
                        ? "font-semibold text-brand-mid hover:bg-brand-mid/10"
                        : "text-text-primary hover:bg-glass-bg hover:text-brand-mid",
                    )}
                  >
                    {item.label}
                  </a>
                </React.Fragment>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Mobile Nav Container ─── */
export const MobileNav = ({
  children,
  className,
}: MobileNavProps) => {
  const visible = useNavbarVisible();

  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "none",
        width: visible ? "92%" : "100%",
        borderRadius: visible ? "16px" : "0px",
        y: visible ? 8 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{
        WebkitBackdropFilter: visible ? "blur(16px)" : "none",
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1.5rem)] flex-col items-center justify-between px-4 py-2 lg:hidden",
        visible
          ? "border border-glass-border bg-glass-bg shadow-[0_0_24px_rgba(43,117,117,0.08)]"
          : "bg-transparent",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

/* ─── Mobile Header Row ─── */
export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

/* ─── Mobile Drawer (slides from right) ─── */
export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-80 bg-base-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className={cn(
              "fixed right-0 top-0 z-90 flex h-dvh w-[85vw] max-w-[380px] flex-col border-l border-glass-border bg-bg-secondary p-6 shadow-[-8px_0_32px_rgba(0,0,0,0.2)]",
              className,
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ─── Mobile Hamburger Toggle ─── */
export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-primary"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );
};

/* ─── Mobile Accordion Section ─── */
export const MobileAccordion = ({
  label,
  items,
  onItemClick,
}: {
  label: string;
  items: DropdownItem[];
  onItemClick?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  if (!items || items.length === 0) return null;

  return (
    <div className="border-b border-glass-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex min-h-[44px] w-full items-center justify-between py-3 text-base font-medium text-text-primary"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-text-tertiary transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 pb-3 pl-3">
              {items.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  onClick={onItemClick}
                  className={cn(
                    "min-h-[44px] flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
                    item.highlighted
                      ? "font-semibold text-brand-mid"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Nav CTA Button (placeholder until MovingBorder is built) ─── */
export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
} & React.ComponentPropsWithoutRef<"a">) => {
  const variants = {
    primary:
      "bg-brand-dark text-base-white shadow-[0_0_20px_rgba(90,177,177,0.15)] hover:bg-brand-mid hover:shadow-[0_0_28px_rgba(90,177,177,0.25)] hover:-translate-y-0.5",
    secondary:
      "bg-transparent text-text-secondary hover:text-text-primary",
  };

  return (
    <a
      href={href}
      className={cn(
        "relative inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
};
