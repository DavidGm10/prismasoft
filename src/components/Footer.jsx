// ============================================================
// Footer.jsx — Footer moderno
// ============================================================
import { Link } from "react-router-dom";
import { IconEmail, IconWhatsApp } from "./Icons";

const links = [
  { label: "Inicio", path: "/" },
  { label: "Nosotros", path: "/nosotros" },
  { label: "Servicios", path: "/servicios" },
  { label: "Proyectos", path: "/proyectos" },
  { label: "Equipo", path: "/equipo" },
  { label: "Proceso", path: "/proceso" },
  { label: "Contacto", path: "/contacto" },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid rgba(0,245,255,0.08)",
        background: "rgba(3,7,18,0.9)",
        backdropFilter: "blur(12px)",
        padding: "3rem 2rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        {/* Brand */}
        <div>
          <span className="prisma-logo-text" style={{ fontSize: "1.4rem", display: "block", marginBottom: "0.75rem" }}>
            PrismaSoft
          </span>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: "1.7", maxWidth: "220px" }}>
            Ingeniería de software de precisión para el futuro digital.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <div className="section-tag" style={{ marginBottom: "1rem", fontSize: "0.6rem" }}>
            Navegación
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {links.slice(0, 4).map((l) => (
              <Link
                key={l.path}
                to={l.path}
                style={{
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--cyan)")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.5)")}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="section-tag" style={{ marginBottom: "1rem", fontSize: "0.6rem" }}>
            Empresa
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {links.slice(4).map((l) => (
              <Link
                key={l.path}
                to={l.path}
                style={{
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--cyan)")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.5)")}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/trabaja-con-nosotros"
              style={{
                color: "var(--cyan)",
                textDecoration: "none",
                fontSize: "0.85rem",
                transition: "color 0.2s",
              }}
            >
              Trabaja con nosotros ↗
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="section-tag" style={{ marginBottom: "1rem", fontSize: "0.6rem" }}>
            Contacto
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <a
              href="mailto:prismasoftt@gmail.com"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.85rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              <IconEmail size={16} color="currentColor" /> prismasoftt@gmail.com
            </a>
            <a
              href="https://wa.me/573053764625"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.85rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--green)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              <IconWhatsApp size={16} color="currentColor" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
          © 2026 PrismaSoft. Engineered for Excellence.
        </p>
        <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
          &gt;_ Built with React + Vite ✦
        </p>
      </div>
    </footer>
  );
}
