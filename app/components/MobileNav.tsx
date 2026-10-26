"use client";

import { useRef } from "react";

export default function MobileNav() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  return (
    <details className="mobile-nav" ref={menuRef}>
      <summary aria-label="Toggle navigation menu">
        <span />
        <span />
      </summary>
      <nav aria-label="Mobile navigation">
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#journey" onClick={closeMenu}>Journey</a>
        <a href="#work" onClick={closeMenu}>Selected work</a>
        <a href="#portfolio" onClick={closeMenu}>Portfolio</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>
    </details>
  );
}
