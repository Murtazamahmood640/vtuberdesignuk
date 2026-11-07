const nodemailer = require('nodemailer');

// SMTP configuration for vtuberdesign.co.uk webmail
const transporter = nodemailer.createTransport({
  host: 'mail.vtuberdesign.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: 'test@vtuberdesign.co.uk',
    pass: 'Shoaib12$',
  },
  tls: {
    rejectUnauthorized: false, // allow self-signed certs on shared hosting
  },
});

module.exports = async function handler(req, res) {
  // CORS headers so fetch() from the same domain works
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, phone, message, service, budget, website } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  }

  // Build a clean HTML email body
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #05143a; padding: 20px; text-align: center;">
        <h2 style="color: #a855f7; margin: 0;">New Contact Form Submission</h2>
        <p style="color: #ffffff; margin: 5px 0 0;">VTuber Design UK</p>
      </div>
      <div style="padding: 30px; background: #f9f9f9; border: 1px solid #ddd;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #05143a; width: 140px;">Name:</td>
            <td style="padding: 10px; color: #333;">${escapeHtml(name)}</td>
          </tr>
          <tr style="background:#fff;">
            <td style="padding: 10px; font-weight: bold; color: #05143a;">Email:</td>
            <td style="padding: 10px; color: #333;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #05143a;">Phone:</td>
            <td style="padding: 10px; color: #333;">${escapeHtml(phone || 'Not provided')}</td>
          </tr>
          ${service ? `<tr style="background:#fff;"><td style="padding:10px;font-weight:bold;color:#05143a;">Service:</td><td style="padding:10px;color:#333;">${escapeHtml(service)}</td></tr>` : ''}
          ${budget ? `<tr><td style="padding:10px;font-weight:bold;color:#05143a;">Budget:</td><td style="padding:10px;color:#333;">${escapeHtml(budget)}</td></tr>` : ''}
          ${website ? `<tr style="background:#fff;"><td style="padding:10px;font-weight:bold;color:#05143a;">Website:</td><td style="padding:10px;color:#333;">${escapeHtml(website)}</td></tr>` : ''}
          <tr style="background:#fff;">
            <td style="padding: 10px; font-weight: bold; color: #05143a; vertical-align: top;">Message:</td>
            <td style="padding: 10px; color: #333; white-space: pre-wrap;">${escapeHtml(message)}</td>
          </tr>
        </table>
      </div>
      <div style="padding: 15px; background: #05143a; text-align: center;">
        <p style="color: #aaa; font-size: 12px; margin: 0;">This email was sent from the contact form at vtuberdesign.co.uk</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: '"VTuber Design UK Website" <test@vtuberdesign.co.uk>',
      to: 'support@vtuberdesign.co.uk',
      replyTo: email,
      subject: `New Enquiry from ${name} — VTuber Design UK`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true, message: 'Your message has been sent! We\'ll be in touch shortly.' });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please email us directly at support@vtuberdesign.co.uk' });
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
