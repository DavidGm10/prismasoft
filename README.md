# PrismaSoft — Landing Page

Landing page futurista para PrismaSoft con React + Vite.

## Instalacion rapida

npm install
npm run dev
# Abre http://localhost:5173

## Build produccion

npm run build
# Archivos en dist/

## Estructura

src/
├── components/         — Navbar, Footer, Particles, PrismaticCard, Cursor, Loading
├── data/index.js       — ⭐ EDITA AQUI todo el contenido (equipo, proyectos, servicios)
├── layouts/            — MainLayout (compartido por todas las paginas)
├── pages/              — Home, About, Services, Projects, Team, Process, Contact, WorkWithUs
└── index.css           — Variables CSS de colores y estilos globales

## Personalizar contenido

Abre src/data/index.js y edita:
- team[]       → Nombres, roles, bio, foto, redes sociales
- projects[]   → Proyectos del portafolio
- services[]   → Servicios ofrecidos
- testimonials[] → Opiniones de clientes

## Agregar fotos del equipo

1. Coloca la foto en src/assets/team/nombre.jpg
2. En src/data/index.js busca el integrante
3. Actualiza: photo: "/src/assets/team/nombre.jpg"

## Activar formulario de contacto (EmailJS)

1. Crea cuenta gratis en emailjs.com
2. Instala: npm install @emailjs/browser
3. Abre src/pages/WorkWithUs.jsx
4. Descomenta el codigo de EmailJS y pon tus IDs

## Deploy en Vercel (recomendado)

npm install -g vercel
vercel

## Deploy en Netlify

npm run build
# Arrastra la carpeta dist/ a netlify.com/drop

## Variables de colores (src/index.css)

--cyan: #00f5ff
--purple: #a855f7
--pink: #ff006e
--green: #39ff14
--blue: #0066ff
