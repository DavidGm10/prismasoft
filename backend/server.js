require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// ─── CORS: permite el frontend en desarrollo y producción ─
app.use(cors({
  origin: [
    'http://localhost:5173',  // Vite dev server
    'http://localhost:4173',  // Vite preview
    'http://127.0.0.1:5173',
    // Agrega aquí tu dominio en producción:
    // 'https://prismasoft.dev',
  ],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// ─── CONFIGURAR CORREO ────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ─── HEALTH CHECK (para verificar que el server responde) ─
app.get('/ping', (req, res) => {
  res.json({ ok: true, message: 'Backend corriendo' });
});

// ─── RUTA CONTACTO ────────────────────────────────────────
app.post('/contacto', async (req, res) => {
  const { name, company, email, phone, projectType, message } = req.body;

  console.log('📩 Nuevo contacto recibido:', { name, email, projectType });

  // Validación en el servidor
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Faltan campos requeridos' });
  }

  try {
    await transporter.sendMail({
      from: `"PrismaSoft Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Nuevo contacto — ${name} (${projectType || 'Sin tipo'})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00f5ff; border-bottom: 2px solid #00f5ff; padding-bottom: 12px;">
            Nuevo contacto desde PrismaSoft
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 150px;"><strong>Nombre:</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Empresa:</strong></td><td>${company || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Correo:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Teléfono:</strong></td><td>${phone || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Tipo de proyecto:</strong></td><td>${projectType || '—'}</td></tr>
          </table>
          <h3 style="margin-top: 24px;">Mensaje:</h3>
          <div style="background:#f5f5f5; padding:16px; border-radius:8px; white-space:pre-wrap;">${message}</div>
          <p style="margin-top:24px; font-size:12px; color:#999;">
            Enviado el ${new Date().toLocaleString('es-CO')}
          </p>
        </div>
      `,
    });

    console.log('✅ Correo enviado a', process.env.EMAIL_USER);
    res.json({ ok: true, message: 'Correo enviado exitosamente' });

  } catch (error) {
    console.error('❌ Error enviando correo:', error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
  console.log('📧 Correo configurado:', process.env.EMAIL_USER);
});