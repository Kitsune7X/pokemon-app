import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";
import { navItems } from "#/config/nav-items";
import { Image } from "@unpic/react";
import { Button } from "./ui/8bit/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b border-dashed bg-background/95">
      <div className="flex h-full w-full max-w-[1400px] items-center justify-start gap-2 border-r border-l border-dashed px-2 md:mx-auto md:justify-between md:gap-5 md:px-6">
        <Link to="/">
          <Image alt="logo" height={32} src="/poke-ball.png" width={32} />
          <h2 className="sr-only">Pokédex</h2>
        </Link>

        <nav className="retro hidden items-center gap-4 text-[9px] md:flex">
          {navItems.header.map((item) => (
            <Link
              className="text-foreground transition-colors hover:text-foreground/80"
              to={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
