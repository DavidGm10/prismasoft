// ============================================================
// App.jsx — Router principal de PrismaSoft
// ============================================================
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Process from "./pages/Process";
import Contact from "./pages/Contact";
import WorkWithUs from "./pages/WorkWithUs";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && (
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/equipo" element={<Team />} />
            <Route path="/proceso" element={<Process />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/trabaja-con-nosotros" element={<WorkWithUs />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
