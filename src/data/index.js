// ============================================================
// PrismaSoft — Data Layer
// Edita este archivo para actualizar contenido de la web
// ============================================================

// ─── SERVICIOS ────────────────────────────────────────────
export const services = [
  {
    id: 1,
    icon: "💻",
    title: "Desarrollo Web",
    description: "Aplicaciones web modernas, SPAs, SSR y arquitecturas escalables con React, Next.js y tecnologías de vanguardia.",
    tags: ["React", "Next.js", "TypeScript"],
    color: "#00f5ff",
  },
  {
    id: 2,
    icon: "⚙️",
    title: "Desarrollo Backend",
    description: "APIs RESTful, GraphQL, microservicios y arquitecturas robustas con Node.js, NestJS y bases de datos escalables.",
    tags: ["Node.js", "NestJS", "PostgreSQL"],
    color: "#a855f7",
  },
  {
    id: 3,
    icon: "🏢",
    title: "Sistemas Empresariales",
    description: "Soluciones ERP, CRM y software de gestión a medida para optimizar los procesos de tu empresa.",
    tags: ["ERP", "CRM", "Business Logic"],
    color: "#ff006e",
  },
  {
    id: 4,
    icon: "🤖",
    title: "Automatización",
    description: "Pipelines CI/CD, automatización de procesos de negocio, bots y herramientas de productividad.",
    tags: ["CI/CD", "Docker", "Bots"],
    color: "#39ff14",
  },
  {
    id: 5,
    icon: "🔌",
    title: "Integración de APIs",
    description: "Conectamos tus sistemas con las mejores herramientas del mercado. Integraciones seguras y escalables.",
    tags: ["REST", "GraphQL", "WebSockets"],
    color: "#ffd700",
  },
  {
    id: 6,
    icon: "🎨",
    title: "Diseño UI/UX",
    description: "Interfaces intuitivas centradas en la conversión y retención. Diseño en Figma con sistemas de diseño a medida.",
    tags: ["Figma", "Design System", "UX"],
    color: "#0066ff",
  },
  {
    id: 7,
    icon: "🗄️",
    title: "Bases de Datos",
    description: "Modelado, optimización y administración de bases de datos relacionales y no relacionales de alto rendimiento.",
    tags: ["PostgreSQL", "MongoDB", "Prisma"],
    color: "#ff4500",
  },
  {
    id: 8,
    icon: "📱",
    title: "Software a Medida",
    description: "Desarrollamos exactamente lo que tu negocio necesita. Soluciones únicas construidas desde cero para ti.",
    tags: ["Custom", "Escalable", "Moderno"],
    color: "#00f5ff",
  },
];

// ─── TECNOLOGÍAS ─────────────────────────────────────────
export const technologies = [
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "Node.js", icon: "🟩", color: "#339933" },
  { name: "NestJS", icon: "🔴", color: "#E0234E" },
  { name: "TypeScript", icon: "🔷", color: "#3178C6" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "Prisma ORM", icon: "▲", color: "#2D3748" },
  { name: "Docker", icon: "🐳", color: "#2496ED" },
  { name: "GitHub", icon: "🐙", color: "#ffffff" },
  { name: "TailwindCSS", icon: "🌊", color: "#38B2AC" },
  { name: "Next.js", icon: "▲", color: "#ffffff" },
  { name: "Firebase", icon: "🔥", color: "#FFCA28" },
  { name: "MongoDB", icon: "🍃", color: "#47A248" },
];

// ─── PROYECTOS ───────────────────────────────────────────
export const projects = [
  {
    id: 1,
    name: "RestaurantOS",
    description: "Sistema completo de gestión para restaurantes: pedidos en tiempo real, mesas, inventario, facturación y reportes analíticos.",
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    status: "Producción",
    statusColor: "#39ff14",
    demo: "#",
    github: "#",
    image: null, // Reemplaza con URL de imagen real
    color: "#00f5ff",
  },
  {
    id: 2,
    name: "AdminPro Dashboard",
    description: "Plataforma administrativa empresarial con control de usuarios, roles, reportes en tiempo real y analytics avanzados.",
    technologies: ["Next.js", "NestJS", "Prisma", "Charts.js"],
    status: "Producción",
    statusColor: "#39ff14",
    demo: "#",
    github: "#",
    image: null,
    color: "#a855f7",
  },
  {
    id: 3,
    name: "FinanceHub",
    description: "Dashboard financiero con visualización de métricas, seguimiento de inversiones, alertas y reportes exportables.",
    technologies: ["React", "TypeScript", "D3.js", "Firebase"],
    status: "Beta",
    statusColor: "#ffd700",
    demo: "#",
    github: "#",
    image: null,
    color: "#ff006e",
  },
  {
    id: 4,
    name: "StockMaster",
    description: "Sistema de inventario y gestión de stock con control de entradas/salidas, proveedores, alertas y código de barras.",
    technologies: ["Vue.js", "Node.js", "MongoDB", "Express"],
    status: "Producción",
    statusColor: "#39ff14",
    demo: "#",
    github: "#",
    image: null,
    color: "#39ff14",
  },
  {
    id: 5,
    name: "BizFlow ERP",
    description: "Sistema ERP modular para PYMES: facturación, RRHH, CRM, contabilidad y logística integrados en una sola plataforma.",
    technologies: ["React", "NestJS", "PostgreSQL", "Docker"],
    status: "Desarrollo",
    statusColor: "#0066ff",
    demo: "#",
    github: "#",
    image: null,
    color: "#ffd700",
  },
  {
    id: 6,
    name: "DataSync API",
    description: "Plataforma de integración y sincronización de APIs empresariales con monitoreo, logs y webhooks en tiempo real.",
    technologies: ["Node.js", "GraphQL", "Redis", "AWS"],
    status: "Producción",
    statusColor: "#39ff14",
    demo: "#",
    github: "#",
    image: null,
    color: "#0066ff",
  },
];

// ─── EQUIPO ──────────────────────────────────────────────
// INSTRUCCIONES: Reemplaza los datos de cada integrante.
// Para la foto: coloca la imagen en src/assets/team/ y actualiza el campo photo.
// Ejemplo: photo: "/src/assets/team/tu-nombre.jpg"
export const team = [
  {
    id: 1,
    name: "Dylan Antonio Yampuezan",           // ← Cambia tu nombre
    role: "Full Stack Developer",
    specialty: "Arquitectura de software y sistemas escalables",
    bio: "Apasionado por construir soluciones robustas que impactan negocios reales. Especialista en arquitecturas modernas y experiencias de usuario fluidas.", // ← Tu descripción
    photo: null,                     // ← "/src/assets/team/alex.jpg"
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
    experience: "3+ años",
    social: {
      github: "#",                   // ← Tu GitHub
      linkedin: "#",                 // ← Tu LinkedIn
      twitter: "#",                  // ← Tu Twitter/X
    },
    color: "#00f5ff",
  },
  {
    id: 2,
    name: "Jose David Vanegas Martinez",
    role: "Backend Developer",
    specialty: "APIs, microservicios y bases de datos",
    bio: "Arquitecta de sistemas de alto rendimiento. Convierte requerimientos complejos en soluciones elegantes y eficientes.",
    photo: null,
    technologies: ["NestJS", "TypeScript", "Prisma", "Redis"],
    experience: "4+ años",
    social: { github: "#", linkedin: "#", twitter: "#" },
    color: "#a855f7",
  },
  {
    id: 3,
    name: "Wilson David Gomez Gomez",
    role: "Frontend Developer",
    specialty: "UI/UX e interfaces interactivas",
    bio: "Diseñador y desarrollador frontend enfocado en crear experiencias visualmente impactantes que convierten visitantes en clientes.",
    photo: null,
    technologies: ["React", "Next.js", "TailwindCSS", "Framer"],
    experience: "3+ años",
    social: { github: "#", linkedin: "#", twitter: "#" },
    color: "#ff006e",
  },
  {
    id: 4,
    name: "Valentina Cruz",
    role: "UI/UX Designer",
    specialty: "Diseño centrado en el usuario y sistemas de diseño",
    bio: "Creo interfaces que los usuarios aman usar. Fusiono estética y funcionalidad para entregar productos digitales que destacan.",
    photo: null,
    technologies: ["Figma", "Adobe XD", "Prototyping", "Framer"],
    experience: "5+ años",
    social: { github: "#", linkedin: "#", twitter: "#" },
    color: "#39ff14",
  },
  {
    id: 5,
    name: "Andrés López",
    role: "Database Architect",
    specialty: "Modelado de datos y optimización de queries",
    bio: "Experto en el diseño e implementación de bases de datos de alto rendimiento. Garantizo que tus datos estén seguros y sean accesibles.",
    photo: null,
    technologies: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
    experience: "4+ años",
    social: { github: "#", linkedin: "#", twitter: "#" },
    color: "#ffd700",
  },
];

// ─── PROCESO DE TRABAJO ──────────────────────────────────
export const processSteps = [
  {
    step: "01",
    title: "Análisis",
    description: "Entendemos a fondo tu negocio, objetivos y requerimientos técnicos para definir la mejor estrategia.",
    icon: "🔍",
    color: "#00f5ff",
  },
  {
    step: "02",
    title: "Diseño",
    description: "Prototipamos la arquitectura y el diseño UX/UI, definiendo la experiencia antes de escribir código.",
    icon: "✏️",
    color: "#a855f7",
  },
  {
    step: "03",
    title: "Desarrollo",
    description: "Construimos con código limpio, documentado y bajo metodologías ágiles con entregas iterativas.",
    icon: "💻",
    color: "#ff006e",
  },
  {
    step: "04",
    title: "Testing",
    description: "Testing exhaustivo: unitario, integración y QA manual para garantizar calidad y rendimiento.",
    icon: "🧪",
    color: "#39ff14",
  },
  {
    step: "05",
    title: "Despliegue",
    description: "Deploy en infraestructura de producción con CI/CD, monitoreo y configuración optimizada.",
    icon: "🚀",
    color: "#ffd700",
  },
  {
    step: "06",
    title: "Soporte",
    description: "Acompañamiento post-lanzamiento, mantenimiento proactivo y evolución continua del producto.",
    icon: "🛡️",
    color: "#0066ff",
  },
];

// ─── TESTIMONIOS ─────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: "Carlos Hernández",
    company: "RestaurantChain SA",
    role: "CEO",
    text: "PrismaSoft transformó completamente nuestra operación. El sistema que desarrollaron es robusto, intuitivo y redujo nuestros tiempos de proceso en un 60%.",
    stars: 5,
    avatar: "CH",
    color: "#00f5ff",
  },
  {
    id: 2,
    name: "María García",
    company: "FinTech Solutions",
    role: "CTO",
    text: "Un equipo de alto nivel técnico y excelente comunicación. Entregaron el dashboard financiero antes del plazo y superó todas nuestras expectativas.",
    stars: 5,
    avatar: "MG",
    color: "#a855f7",
  },
  {
    id: 3,
    name: "Roberto Silva",
    company: "Distribuidora Norte",
    role: "Director General",
    text: "Profesionales, comprometidos y con visión. El sistema de inventario que nos construyeron es exactamente lo que necesitábamos. Altamente recomendados.",
    stars: 5,
    avatar: "RS",
    color: "#ff006e",
  },
];

// ─── STATS ───────────────────────────────────────────────
export const stats = [
  { value: "150+", label: "Proyectos", color: "#00f5ff" },
  { value: "98%", label: "Satisfacción", color: "#a855f7" },
  { value: "5+", label: "Años de experiencia", color: "#ff006e" },
  { value: "20+", label: "Tecnologías", color: "#39ff14" },
];
