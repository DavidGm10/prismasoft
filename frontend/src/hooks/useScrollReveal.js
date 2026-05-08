// ============================================================
// useScrollReveal.js — Hook para animaciones bidireccionales en scroll
// Aparece al bajar, desaparece al subir (threshold configurable)
// ============================================================
import { useEffect, useRef, useState } from "react";

export function useScrollReveal(options = {}) {
  const {
    threshold = 0.15,   // % del elemento visible para activar
    rootMargin = "0px", // margen extra alrededor del viewport
  } = options;

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // true cuando entra en viewport, false cuando sale
        setVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}

// ─── Estilos de animación predefinidos ───────────────────
// Pasa `visible` y `delay` para obtener los estilos de transición

export function fadeUpStyle(visible, delay = 0, distance = 30) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : `translateY(${distance}px)`,
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  };
}

export function fadeLeftStyle(visible, delay = 0, distance = 30) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0px)" : `translateX(-${distance}px)`,
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  };
}

export function fadeRightStyle(visible, delay = 0, distance = 30) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0px)" : `translateX(${distance}px)`,
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  };
}

export function scaleStyle(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1)" : "scale(0.92)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  };
}
