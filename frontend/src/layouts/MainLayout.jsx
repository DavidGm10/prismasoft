// ============================================================
// MainLayout.jsx — Layout principal compartido por todas las páginas
// Incluye: Navbar, Footer, Partículas, Cursor personalizado
// ============================================================
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticleBackground from "../components/ParticleBackground";
import CustomCursor from "../components/CustomCursor";

export default function MainLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Particle background fixed */}
      <ParticleBackground />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main style={{ position: "relative", zIndex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
