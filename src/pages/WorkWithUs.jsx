// ============================================================
// WorkWithUs.jsx — Formulario "Trabaja con nosotros"
// Los datos del formulario se envían a tu correo via EmailJS
// o puedes conectar con cualquier backend
// ============================================================
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import PrismaticCard from "../components/PrismaticCard";

// ─── CONFIGURACIÓN DE EMAILJS ─────────────────────────────
// Para que el formulario funcione y lleguen los datos a tu correo:
// 1. Crea cuenta gratis en https://emailjs.com
// 2. Crea un "Email Service" (Gmail, Outlook, etc.)
// 3. Crea un "Email Template" con las variables: {{from_name}}, {{company}}, {{email}}, {{phone}}, {{project_type}}, {{message}}
// 4. Instala: npm install @emailjs/browser
// 5. Descomenta el código de EmailJS abajo y reemplaza los IDs

// import emailjs from "@emailjs/browser";
// const SERVICE_ID = "service_XXXXXXX";   // Tu Service ID de EmailJS
// const TEMPLATE_ID = "template_XXXXXXX"; // Tu Template ID de EmailJS
// const PUBLIC_KEY = "XXXXXXXXXXXXXXXX";   // Tu Public Key de EmailJS

const projectTypes = [
  "Aplicación Web",
  "Sistema Empresarial (ERP/CRM)",
  "API / Backend",
  "Automatización",
  "Diseño UI/UX",
  "Base de Datos",
  "Software a Medida",
  "Consultoría Técnica",
  "Otro",
];

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
};

export default function WorkWithUs() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "El nombre es requerido";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido";
    if (!form.projectType) e.projectType = "Selecciona un tipo de proyecto";
    if (!form.message.trim() || form.message.length < 20) e.message = "Describe tu proyecto (mínimo 20 caracteres)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    // ─── OPCIÓN 1: EmailJS (recomendado) ────────────────
    // try {
    //   await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    //     from_name: form.name,
    //     company: form.company,
    //     email: form.email,
    //     phone: form.phone,
    //     project_type: form.projectType,
    //     budget: form.budget,
    //     message: form.message,
    //   }, PUBLIC_KEY);
    //   setStatus("success");
    //   setForm(initialForm);
    // } catch (err) {
    //   console.error(err);
    //   setStatus("error");
    // }

    // ─── OPCIÓN 2: Tu propio backend ────────────────────
    // try {
    //   const res = await fetch("https://tu-api.com/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });
    //   if (!res.ok) throw new Error("Error");
    //   setStatus("success");
    //   setForm(initialForm);
    // } catch {
    //   setStatus("error");
    // }

    // ─── DEMO: Simular envío ─────────────────────────────
    setTimeout(() => {
      console.log("Formulario enviado:", form);
      setStatus("success");
      setForm(initialForm);
    }, 1500);
  };

  const inputStyle = (name) => ({
    width: "100%",
    padding: "0.8rem 1rem",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${errors[name] ? "#ff006e" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "8px",
    color: "white",
    fontSize: "0.9rem",
    fontFamily: "'Rajdhani', sans-serif",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  });

  return (
    <MainLayout>
      <section style={{ padding: "9rem 2rem 6rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Colaboremos</div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: "800", fontFamily: "'Exo 2', sans-serif", marginTop: "0.75rem", marginBottom: "1rem" }}>
              Trabajemos <span className="gradient-text">juntos</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto" }}>
              Cuéntanos tu proyecto y nos ponemos en contacto en menos de 48 horas con
              una propuesta personalizada.
            </p>
          </div>

          {/* Success state */}
          {status === "success" ? (
            <PrismaticCard className="glass-card" style={{ padding: "4rem 2rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "var(--green)", marginBottom: "0.75rem", fontFamily: "'Exo 2', sans-serif" }}>
                ¡Mensaje enviado!
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
                Gracias por contactarnos. Te responderemos en menos de 48 horas.
              </p>
              <button className="btn-neon" onClick={() => setStatus("idle")}>
                Enviar otro mensaje
              </button>
            </PrismaticCard>
          ) : (
            <PrismaticCard className="glass-card" style={{ padding: "2.5rem" }}>
              <form onSubmit={handleSubmit} noValidate>
                {/* Row: Name + Company */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                      NOMBRE *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      style={inputStyle("name")}
                      onFocus={(e) => { e.target.style.borderColor = "var(--cyan)"; e.target.style.boxShadow = "0 0 0 2px rgba(0,245,255,0.1)"; }}
                      onBlur={(e) => { if (!errors.name) { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; } }}
                    />
                    {errors.name && <div style={{ fontSize: "0.72rem", color: "var(--pink)", marginTop: "0.3rem" }}>{errors.name}</div>}
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                      EMPRESA
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Nombre de la empresa"
                      style={inputStyle("company")}
                      onFocus={(e) => { e.target.style.borderColor = "var(--cyan)"; e.target.style.boxShadow = "0 0 0 2px rgba(0,245,255,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                {/* Row: Email + Phone */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                      CORREO ELECTRÓNICO *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@empresa.com"
                      style={inputStyle("email")}
                      onFocus={(e) => { e.target.style.borderColor = "var(--cyan)"; e.target.style.boxShadow = "0 0 0 2px rgba(0,245,255,0.1)"; }}
                      onBlur={(e) => { if (!errors.email) { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; } }}
                    />
                    {errors.email && <div style={{ fontSize: "0.72rem", color: "var(--pink)", marginTop: "0.3rem" }}>{errors.email}</div>}
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                      TELÉFONO
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 555 123 4567"
                      style={inputStyle("phone")}
                      onFocus={(e) => { e.target.style.borderColor = "var(--cyan)"; e.target.style.boxShadow = "0 0 0 2px rgba(0,245,255,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                {/* Row: Project type + Budget */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                      TIPO DE PROYECTO *
                    </label>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      style={{
                        ...inputStyle("projectType"),
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2300f5ff' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        paddingRight: "2.5rem",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "var(--cyan)"; e.target.style.boxShadow = "0 0 0 2px rgba(0,245,255,0.1)"; }}
                      onBlur={(e) => { if (!errors.projectType) { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; } }}
                    >
                      <option value="" style={{ background: "#030712" }}>Selecciona uno...</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} style={{ background: "#030712" }}>{t}</option>
                      ))}
                    </select>
                    {errors.projectType && <div style={{ fontSize: "0.72rem", color: "var(--pink)", marginTop: "0.3rem" }}>{errors.projectType}</div>}
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                      PRESUPUESTO APROXIMADO
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      style={{
                        ...inputStyle("budget"),
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2300f5ff' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="" style={{ background: "#030712" }}>Selecciona...</option>
                      <option value="< $1,000" style={{ background: "#030712" }}>Menos de $1,000</option>
                      <option value="$1,000 - $5,000" style={{ background: "#030712" }}>$1,000 - $5,000</option>
                      <option value="$5,000 - $15,000" style={{ background: "#030712" }}>$5,000 - $15,000</option>
                      <option value="$15,000 - $50,000" style={{ background: "#030712" }}>$15,000 - $50,000</option>
                      <option value="> $50,000" style={{ background: "#030712" }}>Más de $50,000</option>
                      <option value="A definir" style={{ background: "#030712" }}>A definir</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                    DESCRIPCIÓN DEL PROYECTO *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre tu proyecto: ¿qué necesitas construir? ¿qué problema resuelve? ¿tienes un plazo o requerimientos específicos?"
                    rows={5}
                    style={{
                      ...inputStyle("message"),
                      resize: "vertical",
                      minHeight: "120px",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--cyan)"; e.target.style.boxShadow = "0 0 0 2px rgba(0,245,255,0.1)"; }}
                    onBlur={(e) => { if (!errors.message) { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; } }}
                  />
                  {errors.message && <div style={{ fontSize: "0.72rem", color: "var(--pink)", marginTop: "0.3rem" }}>{errors.message}</div>}
                </div>

                {/* Error state */}
                {status === "error" && (
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      background: "rgba(255,0,110,0.1)",
                      border: "1px solid rgba(255,0,110,0.3)",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      color: "var(--pink)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    ⚠️ Error al enviar. Por favor intenta de nuevo o escríbenos directamente a hola@prismasoft.dev
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "0.9rem",
                    fontSize: "0.8rem",
                    opacity: status === "loading" ? 0.7 : 1,
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <span style={{ animation: "blink 1s step-end infinite" }}>▋</span>
                      Enviando...
                    </>
                  ) : (
                    "Enviar solicitud →"
                  )}
                </button>

                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: "1rem" }}>
                  📩 Te responderemos en menos de 48 horas hábiles
                </p>
              </form>
            </PrismaticCard>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          form > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </MainLayout>
  );
}
