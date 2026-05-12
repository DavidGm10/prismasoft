// ============================================================
// Team.jsx — Página del Equipo de Desarrollo
// ============================================================
import { IconUser } from "../components/Icons";
import { useScrollReveal, fadeUpStyle } from "../hooks/useScrollReveal";
import MainLayout from "../layouts/MainLayout";
import PrismaticCard from "../components/PrismaticCard";
import { team } from "../data/index";

const socialLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "Twitter/X",
};

const socialIcons = {
  github: "🐙",
  linkedin: "💼",
  twitter: "🐦",
};

function getSocialUrl(url) {
  if (!url || url === "#") return null;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function Team() {
  return (
    <MainLayout>
      <section style={{ padding: "9rem 2rem 6rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Quiénes somos</div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "800", fontFamily: "'Exo 2', sans-serif", marginTop: "0.75rem", marginBottom: "1rem" }}>
              Nuestro <span className="gradient-text">Equipo</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "560px", margin: "0 auto" }}>
              Desarrolladores apasionados por crear software que importa. Cada uno aporta
              habilidades únicas para entregar soluciones de clase mundial.
            </p>
          </div>

          {/* Team grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {team.map((member) => (
              <PrismaticCard
                key={member.id}
                className="glass-card"
                style={{ overflow: "hidden" }}
              >
                {/* Top color band */}
                <div
                  style={{
                    height: "6px",
                    background: `linear-gradient(90deg, ${member.color}, ${member.color}60, transparent)`,
                  }}
                />

                <div style={{ padding: "1.75rem" }}>
                  {/* Avatar */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                    <div
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        border: `2px solid ${member.color}50`,
                        overflow: "hidden",
                        flexShrink: 0,
                        background: `linear-gradient(135deg, ${member.color}30, rgba(3,7,18,0.8))`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 0 20px ${member.color}30`,
                      }}
                    >
                      {member.photo ? (
                        /* 
                          INSTRUCCIONES PARA LA FOTO:
                          1. Coloca tu foto en src/assets/team/ (ej: src/assets/team/alex.jpg)
                          2. En src/data/index.js, actualiza el campo photo:
                             photo: "/src/assets/team/alex.jpg"
                          3. La foto se mostrará automáticamente aquí
                        */
                        <img
                          src={member.photo}
                          alt={member.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <IconUser color={member.color} size={32} />
                        </div>
                      )}
                    </div>

                    <div>
                      <h3
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: "700",
                          color: "white",
                          fontFamily: "'Exo 2', sans-serif",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {member.name}
                      </h3>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: member.color,
                          fontFamily: "monospace",
                          letterSpacing: "0.05em",
                          marginBottom: "0.25rem",
                        }}
                      >
                        &gt;_ {member.role}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "rgba(255,255,255,0.4)",
                          padding: "0.15rem 0.5rem",
                          background: `${member.color}10`,
                          borderRadius: "4px",
                          display: "inline-block",
                        }}
                      >
                        {member.experience}
                      </div>
                    </div>
                  </div>

                  {/* Specialty */}
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "0.75rem",
                      fontStyle: "italic",
                    }}
                  >
                    {member.specialty}
                  </div>

                  {/* Bio */}
                  <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.55)", lineHeight: "1.65", marginBottom: "1.25rem" }}>
                    {member.bio}
                  </p>

                  {/* Tech stack */}
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                    {member.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "0.2rem 0.6rem",
                          background: `${member.color}10`,
                          border: `1px solid ${member.color}25`,
                          borderRadius: "100px",
                          fontSize: "0.62rem",
                          color: member.color,
                          fontFamily: "monospace",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Social links */}
                  <div style={{ display: "flex", gap: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
                    {Object.entries(member.social).map(([platform, url]) => {
                      const socialUrl = getSocialUrl(url);
                      const label = socialLabels[platform] || platform;
                      const content = `${socialIcons[platform] || "🔗"} ${label}`;

                      if (!socialUrl) return null;

                      return (
                        <a
                          key={platform}
                          href={socialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir ${label} de ${member.name}`}
                          style={{
                            fontSize: "0.72rem",
                            color: "rgba(255,255,255,0.4)",
                            textDecoration: "none",
                            textTransform: "capitalize",
                            transition: "color 0.2s ease",
                            fontFamily: "monospace",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = member.color)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                        >
                          {content}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </PrismaticCard>
            ))}
          </div>

          {/* Join the team CTA */}
          <div
            style={{
              marginTop: "4rem",
              textAlign: "center",
              padding: "3rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,245,255,0.08)",
              borderRadius: "20px",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>✨</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.75rem", fontFamily: "'Exo 2', sans-serif" }}>
              ¿Tienes una idea de software?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "1.75rem", fontSize: "0.9rem" }}>
              En PrismaSoft transformamos proyectos en soluciones digitales. Contáctanos y hagamos realidad tu visión.
            </p>
            <a href="/trabaja-con-nosotros" style={{ textDecoration: "none" }}>
              <button className="btn-neon">Contáctanos ahora →</button>
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
