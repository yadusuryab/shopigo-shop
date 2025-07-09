// components/ScrollHide.tsx
"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    let lastScroll = 0;
    const sidebar = document.getElementById('sidebar');
    const cartButton = document.getElementById('cart-button');

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        sidebar?.classList.add('opacity-0', 'translate-x-[-20px]');
        cartButton?.classList.add('opacity-0', 'translate-x-[20px]');
      } else {
        // Scrolling up or at top
        sidebar?.classList.remove('opacity-0', 'translate-x-[-20px]');
        cartButton?.classList.remove('opacity-0', 'translate-x-[20px]');
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}