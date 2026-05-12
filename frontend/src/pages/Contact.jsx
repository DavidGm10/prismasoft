// ============================================================
// Contact.jsx — Página de Contacto
// ============================================================
import MainLayout from "../layouts/MainLayout";
import PrismaticCard from "../components/PrismaticCard";
import { IconEmail, IconLinkedIn, IconWhatsApp } from "../components/Icons";

const contactInfo = [
  {
    icon: IconEmail,
    label: "Email",
    value: "prismasoftt@gmail.com",
    link: "mailto:prismasoftt@gmail.com",
    color: "#00f5ff",
    hint: "Respuesta en menos de 24h",
  },
  {
    icon: IconWhatsApp,
    label: "WhatsApp",
    value: "+57 3053764625",
    link: "https://wa.me/573053764625",
    color: "#39ff14",
    hint: "Disponible L-V, 9am-6pm",
  },
  //{
    //icon: IconLinkedIn,
    //label: "LinkedIn",
    //value: "/company/prismasoft",
    //link: "https://linkedin.com/company/prismasoft",
    //color: "#0066ff",
    //hint: "Síguenos para novedades",
  //},
];

export default function Contact() {
  return (
    <MainLayout>
      <section style={{ padding: "9rem 2rem 6rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Escríbenos</div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "800", fontFamily: "'Exo 2', sans-serif", marginTop: "0.75rem", marginBottom: "1rem" }}>
              Hablemos de tu <span className="gradient-text">proyecto</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>
              Cuéntanos tu idea y te respondemos con una propuesta personalizada en menos de 48 horas.
            </p>
          </div>

          {/* Contact cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 280px))",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            {contactInfo.map((info) => (
              <PrismaticCard key={info.label} className="glass-card">
                <a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block", padding: "1.5rem" }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem", color: info.color, lineHeight: 1 }}>
                    <info.icon size={30} color={info.color} />
                  </div>
                  <div style={{ fontSize: "0.72rem", color: info.color, fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: "0.35rem", textTransform: "uppercase" }}>
                    {info.label}
                  </div>
                  <div style={{ fontSize: "0.88rem", color: "white", fontWeight: "600", marginBottom: "0.35rem" }}>
                    {info.value}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>
                    {info.hint}
                  </div>
                </a>
              </PrismaticCard>
            ))}
          </div>

          {/* CTA to form */}
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,245,255,0.1)",
              borderRadius: "20px",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📋</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.75rem", fontFamily: "'Exo 2', sans-serif" }}>
              Formulario de proyecto
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "1.75rem", fontSize: "0.9rem", maxWidth: "420px", margin: "0 auto 1.75rem" }}>
              ¿Tienes un proyecto en mente? Completa nuestro formulario detallado y nos pondremos
              en contacto con una propuesta.
            </p>
            <a href="/trabaja-con-nosotros" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ padding: "0.85rem 2.5rem" }}>
                Llenar formulario →
              </button>
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
