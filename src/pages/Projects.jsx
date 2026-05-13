// ============================================================
// Projects.jsx — Página de Proyectos / Portafolio
// ============================================================
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrismaticCard from "../components/PrismaticCard";
import { projects } from "../data/index";

export default function Projects() {
  return (
    <MainLayout>
      <section style={{ padding: "9rem 2rem 6rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Portafolio</div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "800", fontFamily: "'Exo 2', sans-serif", marginTop: "0.75rem", marginBottom: "1rem" }}>
              Software que <span className="gradient-text">hemos construido</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "540px", margin: "0 auto" }}>
              Proyectos reales que transformaron la operación de empresas con tecnología de primer nivel.
            </p>
          </div>

          {/* Projects grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
            {projects.map((project) => (
              <PrismaticCard
                key={project.id}
                className="glass-card"
                style={{ overflow: "hidden" }}
              >
                {/* Image placeholder */}
                <div
                  style={{
                    height: "180px",
                    background: `linear-gradient(135deg, ${project.color}20, rgba(3,7,18,0.8))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: `1px solid ${project.color}15`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ textAlign: "center", opacity: 0.5 }}>
                      <div style={{ fontSize: "2.5rem", marginBottom: "0.25rem" }}>🖥️</div>
                      <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", fontFamily: "monospace", letterSpacing: "0.1em" }}>
                        MOCKUP PREVIEW
                      </div>
                    </div>
                  )}

                  {/* Status badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      padding: "0.2rem 0.65rem",
                      background: `${project.statusColor}20`,
                      border: `1px solid ${project.statusColor}50`,
                      borderRadius: "100px",
                      fontSize: "0.62rem",
                      color: project.statusColor,
                      fontFamily: "monospace",
                      letterSpacing: "0.08em",
                    }}
                  >
                    ● {project.status}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      marginBottom: "0.6rem",
                      color: project.color,
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    {project.name}
                  </h3>

                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: "1.65", marginBottom: "1rem" }}>
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "0.15rem 0.55rem",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "4px",
                          fontSize: "0.62rem",
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "monospace",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>


                </div>
              </PrismaticCard>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
              ¿Quieres que tu proyecto sea el próximo?
            </p>
            <Link to="/trabaja-con-nosotros" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ padding: "0.85rem 2.5rem" }}>
                Hablemos de tu proyecto ✦
              </button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
