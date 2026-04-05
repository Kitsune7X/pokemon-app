import { navItems } from "#/config/nav-items";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import "./ui/8bit/styles/retro.css";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      {/* Hamburger button */}
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost">
          ☰
        </Button>
      </DrawerTrigger>

      {/* Mobile Nav items */}
      <DrawerContent className="retro h-3/4">
        <DrawerHeader className="overflow-y-auto">
          <div className="flex flex-col gap-2 items-start">
            {navItems.header.map((item) => (
              <Link
                className="font-extralight text-sm"
                to={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
