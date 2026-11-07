const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── SMTP Transporter ───────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: 'mail.vtuberdesign.com',
  port: 465,
  secure: true,
  auth: {
    user: 'test@vtuberdesign.co.uk',
    pass: 'Shoaib12$',
  },
  tls: {
    rejectUnauthorized: false, // allow shared-hosting self-signed certs
  },
});

// ─── Contact Form API ────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message, service, budget, website } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  }

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#05143a;padding:20px;text-align:center;">
        <h2 style="color:#a855f7;margin:0;">New Contact Form Submission</h2>
        <p style="color:#fff;margin:5px 0 0;">VTuber Design UK</p>
      </div>
      <div style="padding:30px;background:#f9f9f9;border:1px solid #ddd;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px;font-weight:bold;color:#05143a;width:140px;">Name:</td><td style="padding:10px;">${esc(name)}</td></tr>
          <tr style="background:#fff;"><td style="padding:10px;font-weight:bold;color:#05143a;">Email:</td><td style="padding:10px;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          <tr><td style="padding:10px;font-weight:bold;color:#05143a;">Phone:</td><td style="padding:10px;">${esc(phone || 'Not provided')}</td></tr>
          ${service ? `<tr style="background:#fff;"><td style="padding:10px;font-weight:bold;color:#05143a;">Service:</td><td style="padding:10px;">${esc(service)}</td></tr>` : ''}
          ${budget  ? `<tr><td style="padding:10px;font-weight:bold;color:#05143a;">Budget:</td><td style="padding:10px;">${esc(budget)}</td></tr>` : ''}
          ${website ? `<tr style="background:#fff;"><td style="padding:10px;font-weight:bold;color:#05143a;">Website:</td><td style="padding:10px;">${esc(website)}</td></tr>` : ''}
          <tr style="background:#fff;"><td style="padding:10px;font-weight:bold;color:#05143a;vertical-align:top;">Message:</td><td style="padding:10px;white-space:pre-wrap;">${esc(message)}</td></tr>
        </table>
      </div>
      <div style="padding:15px;background:#05143a;text-align:center;">
        <p style="color:#aaa;font-size:12px;margin:0;">Sent from the contact form at vtuberdesign.co.uk</p>
      </div>
    </div>`;

  try {
    await transporter.sendMail({
      from: '"VTuber Design UK Website" <test@vtuberdesign.co.uk>',
      to: 'support@vtuberdesign.co.uk',
      replyTo: email,
      subject: `New Enquiry from ${name} — VTuber Design UK`,
      html: htmlBody,
    });
    return res.json({ success: true, message: "Your message has been sent! We'll be in touch shortly." });
  } catch (err) {
    console.error('Mail error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please email us at support@vtuberdesign.co.uk' });
  }
});

// ─── Serve Static Files ──────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname), {
  extensions: ['html'], // serves /about-us → about-us.html automatically
}));

// ─── Clean URL Routes (match vercel.json rewrites) ───────────────────────────
const cleanRoutes = [
  'about-us', 'contact-us', 'portfolio', 'testimonials', 'packages',
  'combo-package', 'logo-design', 'web-development', 'motion-graphics',
  'app-design-and-development', 'creative-copywriting', 'digital-marketing',
  'illustration-design', 'social-media-marketing', 'seo-services',
  'logo-packages', 'web-packages', 'video-packages', 'copywriting-packages',
  'illustration-packages', 'marketingcollateral-packages', 'seo-packages',
  'ecommerce-packages', 'ecommerce-solutions', 'privacy-policy',
  'terms-and-conditions',
];

cleanRoutes.forEach(route => {
  app.get(`/${route}`, (req, res) => {
    res.sendFile(path.join(__dirname, `${route}.html`));
  });
});

// ─── 404 Fallback ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'), err => {
    if (err) res.status(404).send('Page not found');
  });
});

app.listen(PORT, () => {
  console.log(`VTuber Design UK running on port ${PORT}`);
});

// ─── Helper ──────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
