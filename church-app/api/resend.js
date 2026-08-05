import { Resend } from 'resend';
import { getClientAddress, isAllowedOrigin, isRateLimited } from './_security.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Invalid request origin' });
  }

  const { name, email, message, fax } = req.body || {};
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  const cleanMessage = typeof message === 'string' ? message.trim() : '';
  if (fax) {
    return res.status(400).json({ error: 'Unable to send message' });
  }

  if (
    !cleanName ||
    !cleanEmail ||
    !cleanMessage ||
    cleanName.length > 100 ||
    cleanEmail.length > 254 ||
    cleanMessage.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
  ) {
    return res.status(400).json({ error: 'Please provide a valid name, email, and message' });
  }

  if (isRateLimited(getClientAddress(req))) {
    return res.status(429).json({ error: 'Please wait before sending another message' });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'stmarysbergenfieldweb@gmail.com',
      subject: `Inquiry from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
