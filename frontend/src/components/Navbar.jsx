// ============================================================
// Navbar.jsx — Navbar sticky con blur en scroll
// ============================================================
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", path: "/" },
  { label: "Nosotros", path: "/nosotros" },
  { label: "Servicios", path: "/servicios" },
  { label: "Proyectos", path: "/proyectos" },
  { label: "Equipo", path: "/equipo" },
  { label: "Proceso", path: "/proceso" },
  { label: "Contacto", path: "/contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 1.5rem",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
          background: scrolled
            ? "rgba(3, 7, 18, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0, 245, 255, 0.08)"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="prisma-logo-text" style={{ fontSize: "1.3rem" }}>
            PrismaSoft
          </span>
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: "0.4rem 0.85rem",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: "500",
                  letterSpacing: "0.04em",
                  color: isActive ? "var(--cyan)" : "rgba(255,255,255,0.7)",
                  background: isActive ? "rgba(0,245,255,0.07)" : "transparent",
                  borderBottom: isActive ? "1px solid var(--cyan)" : "1px solid transparent",
                  transition: "all 0.2s ease",
                  fontFamily: "'Rajdhani', sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.target.style.color = "rgba(255,255,255,0.7)";
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to="/trabaja-con-nosotros" style={{ textDecoration: "none" }} className="cta-desktop">
            <button className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.72rem" }}>
              Trabajemos juntos ✦
            </button>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "var(--cyan)",
              cursor: "pointer",
              display: "none",
              padding: "0.25rem",
            }}
            className="menu-toggle"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "68px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: "rgba(3, 7, 18, 0.97)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "2rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                textDecoration: "none",
                fontSize: "1.4rem",
                fontWeight: "600",
                color: location.pathname === link.path ? "var(--cyan)" : "rgba(255,255,255,0.85)",
                padding: "0.6rem 1.5rem",
                borderRadius: "8px",
                background:
                  location.pathname === link.path
                    ? "rgba(0,245,255,0.08)"
                    : "transparent",
                width: "100%",
                textAlign: "center",
                fontFamily: "'Rajdhani', sans-serif",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/trabaja-con-nosotros" style={{ textDecoration: "none", marginTop: "1rem", width: "100%" }}>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.85rem" }}>
              Trabajemos juntos ✦
            </button>
          </Link>
        </div>
      )}

      {/* Responsive styles injected */}
      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .cta-desktop { display: none !important; }
          .menu-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
