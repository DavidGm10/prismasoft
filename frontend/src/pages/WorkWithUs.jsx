// ============================================================
// WorkWithUs.jsx — Formulario conectado al backend
// ============================================================
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

// ─── CONFIGURACIÓN ────────────────────────────────────────
// Cambia esta URL a la de tu backend en producción
const API_URL = "http://localhost:3000/contacto";

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
  message: "",
};

export default function WorkWithUs() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  // ─── VALIDACIONES ───────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim())
      e.name = "El nombre es requerido";

    if (!form.email.trim())
      e.email = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Ingresa un correo válido";

    if (!form.phone.trim())
      e.phone = "El teléfono es requerido";
    else if (!/^\d{10}$/.test(form.phone))
      e.phone = "El teléfono debe tener exactamente 10 dígitos";

    if (!form.projectType)
      e.projectType = "Selecciona un tipo de proyecto";

    if (!form.message.trim() || form.message.length < 20)
      e.message = "Describe tu proyecto (mínimo 20 caracteres)";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ─── CAMBIOS EN CAMPOS ──────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Solo números en teléfono, máximo 10 dígitos
    const nextValue = name === "phone"
      ? value.replace(/\D/g, "").slice(0, 10)
      : value;
    setForm((f) => ({ ...f, [name]: nextValue }));
    // Limpiar error del campo al editar
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
  };

  // ─── ENVÍO AL BACKEND ───────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          projectType: form.projectType,
          message: form.message,
        }),
      });

      if (!res.ok) {
        // El backend respondió con un error HTTP (4xx, 5xx)
        throw new Error(`Error del servidor: ${res.status}`);
      }

      // Éxito
      setStatus("success");
      setForm(initialForm);

    } catch (err) {
      console.error("Error al enviar formulario:", err.message);
      setStatus("error");
    }
  };

  // ─── ESTILOS DE INPUT ───────────────────────────────────
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
    boxSizing: "border-box",
  });

  const focusProps = (name) => ({
    onFocus: (e) => {
      e.target.style.borderColor = "var(--cyan)";
      e.target.style.boxShadow = "0 0 0 2px rgba(0,245,255,0.1)";
    },
    onBlur: (e) => {
      if (!errors[name]) {
        e.target.style.borderColor = "rgba(255,255,255,0.1)";
        e.target.style.boxShadow = "none";
      }
    },
  });

  return (
    <MainLayout>
      <section style={{ padding: "9rem 2rem 6rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Colaboremos</div>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: "800",
              fontFamily: "'Exo 2', sans-serif", marginTop: "0.75rem", marginBottom: "1rem",
            }}>
              Trabajemos <span className="gradient-text">juntos</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto" }}>
              Cuéntanos tu proyecto y nos ponemos en contacto en menos de 48 horas con
              una propuesta personalizada.
            </p>
          </div>

          {/* ── ESTADO ÉXITO ── */}
          {status === "success" ? (
            <div className="glass-card" style={{ padding: "4rem 2rem", textAlign: "center" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "rgba(57,255,20,0.1)", border: "2px solid var(--green)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.25rem",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 style={{
                fontSize: "1.6rem", fontWeight: "700", color: "var(--green)",
                marginBottom: "0.75rem", fontFamily: "'Exo 2', sans-serif",
              }}>
                ¡Mensaje enviado!
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
                Gracias por contactarnos. Te responderemos en menos de 48 horas.
              </p>
              <button className="btn-neon" onClick={() => setStatus("idle")}>
                Enviar otro mensaje
              </button>
            </div>

          ) : (
            /* ── FORMULARIO ── */
            <div className="glass-card" style={{ padding: "2.5rem" }}>
              <form onSubmit={handleSubmit} noValidate>

                {/* Nombre + Empresa */}
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                      NOMBRE *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      style={inputStyle("name")}
                      {...focusProps("name")}
                    />
                    {errors.name && <p style={{ fontSize: "0.7rem", color: "var(--pink)", marginTop: "0.3rem", margin: "0.3rem 0 0" }}>{errors.name}</p>}
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                      EMPRESA
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Nombre de la empresa"
                      style={inputStyle("company")}
                      {...focusProps("company")}
                    />
                  </div>
                </div>

                {/* Email + Teléfono */}
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                      CORREO ELECTRÓNICO *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@empresa.com"
                      style={inputStyle("email")}
                      {...focusProps("email")}
                    />
                    {errors.email && <p style={{ fontSize: "0.7rem", color: "var(--pink)", margin: "0.3rem 0 0" }}>{errors.email}</p>}
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                      TELÉFONO * <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.62rem", fontWeight: 400 }}>(10 dígitos)</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      value={form.phone}
                      onChange={handleChange}
                      maxLength={10}
                      placeholder="3104602013"
                      style={inputStyle("phone")}
                      {...focusProps("phone")}
                    />
                    {errors.phone && <p style={{ fontSize: "0.7rem", color: "var(--pink)", margin: "0.3rem 0 0" }}>{errors.phone}</p>}
                  </div>
                </div>

                {/* Tipo de proyecto */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
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
                      WebkitAppearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2300f5ff' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      paddingRight: "2.5rem",
                    }}
                    {...focusProps("projectType")}
                  >
                    <option value="" style={{ background: "#030712" }}>Selecciona uno...</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} style={{ background: "#030712" }}>{t}</option>
                    ))}
                  </select>
                  {errors.projectType && <p style={{ fontSize: "0.7rem", color: "var(--pink)", margin: "0.3rem 0 0" }}>{errors.projectType}</p>}
                </div>

                {/* Descripción */}
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "block", fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
                    DESCRIPCIÓN DEL PROYECTO *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="¿Qué necesitas construir? ¿Qué problema resuelve? ¿Tienes plazo o requerimientos específicos?"
                    rows={5}
                    style={{ ...inputStyle("message"), resize: "vertical", minHeight: "120px" }}
                    {...focusProps("message")}
                  />
                  {errors.message && <p style={{ fontSize: "0.7rem", color: "var(--pink)", margin: "0.3rem 0 0" }}>{errors.message}</p>}
                </div>

                {/* Error de red */}
                {status === "error" && (
                  <div style={{
                    padding: "0.75rem 1rem",
                    background: "rgba(255,0,110,0.08)",
                    border: "1px solid rgba(255,0,110,0.28)",
                    borderRadius: "8px", fontSize: "0.84rem",
                    color: "var(--pink)", marginBottom: "1.25rem",
                    display: "flex", alignItems: "flex-start", gap: "0.5rem",
                  }}>
                    <span style={{ flexShrink: 0 }}>⚠</span>
                    <span>
                      No pudimos conectar con el servidor. Verifica que el backend esté corriendo
                      en <code style={{ fontSize: "0.78rem", color: "var(--cyan)" }}>{API_URL}</code>,
                      o escríbenos a{" "}
                      <a href="mailto:prismasoftt@gmail.com" style={{ color: "var(--cyan)" }}>prismasoftt@gmail.com</a>
                    </span>
                  </div>
                )}

                {/* Botón submit */}
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === "loading"}
                  style={{
                    width: "100%", justifyContent: "center",
                    padding: "0.9rem", fontSize: "0.8rem",
                    opacity: status === "loading" ? 0.65 : 1,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                  }}
                >
                  {status === "loading" ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
                        </path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    "Enviar solicitud →"
                  )}
                </button>

                <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.28)", textAlign: "center", marginTop: "1rem" }}>
                  Respuesta garantizada en menos de 48 horas hábiles
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </MainLayout>
  );
}