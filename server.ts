import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Email API Route
  app.post('/api/email', async (req, res) => {
    try {
      const { to, subject, text, html } = req.body;
      
      // Setup Nodemailer transporter
      // In production, use real SMTP credentials from process.env
      // Here we mock it by logging, or use a test account if configured
      let transporter;
      
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
      } else {
        // Fallback: Just log it for development preview
        console.log('\n--- MOCK EMAIL AUTOMATION ---');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body:\n${text}`);
        console.log('-----------------------------\n');
        return res.json({ success: true, message: 'Mock email sent (check server logs)' });
      }

      await transporter.sendMail({
        from: '"Brew Haven" <hello@brewhaven.example>',
        to,
        subject,
        text,
        html: html || text,
      });

      res.json({ success: true, message: 'Email sent successfully' });
    } catch (error: any) {
      console.error('Email error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
