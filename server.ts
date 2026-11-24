import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

// Server-only destination inbox — never exposed in frontend code or HTTP responses.
const PARTNER_NOTIFY_EMAIL =
  (process.env.PARTNER_NOTIFY_EMAIL || '').trim() || 'kabirhussain7700@gmail.com';

const DEFAULT_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxt7m1RwwNj7qhyI01T-hJCqtt265S7kVX4tbhEU21Zw494WvVKr8MjE2S_SVwEYu1WNw/exec';

function escapeHtml(raw: unknown): string {
  return String(raw ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cleanField(raw: unknown, maxLen = 500): string {
  return String(raw ?? '').replace(/\r/g, '').trim().slice(0, maxLen);
}

function resolveAllowedAppsScriptUrl(candidate: unknown): string {
  if (typeof candidate !== 'string' || !candidate.trim()) {
    return DEFAULT_APPS_SCRIPT_URL;
  }
  try {
    const parsed = new URL(candidate.trim());
    if (
      parsed.protocol === 'https:' &&
      (parsed.hostname === 'script.google.com' ||
        parsed.hostname === 'script.googleusercontent.com')
    ) {
      return parsed.toString();
    }
  } catch {
    // Fallback to default verified endpoint
  }
  return DEFAULT_APPS_SCRIPT_URL;
}

interface PartnerLeadPayload {
  inquiryType: string;
  inquiryNum: string;
  companyName: string;
  contactName: string;
  country: string;
  phone: string;
  email: string;
  preferredDivisions: string;
  partnershipRole: string;
  targetCity: string;
  meetingDate: string;
  meetingTime: string;
  meetingTopic: string;
  language: string;
  notes: string;
}

function buildLeadEmailText(lead: PartnerLeadPayload): string {
  const lines = [
    `ZAYNOVA GLOBAL TRADE DESK — NEW ${lead.inquiryType.toUpperCase()}`,
    `Inquiry Ref: #${lead.inquiryNum || '0001'}`,
    `Submitted At: ${new Date().toISOString()}`,
    `Portal Language: ${lead.language || 'EN'}`,
    '',
    '--- PARTNER / BUYER DETAILS ---',
    `Company Name: ${lead.companyName || 'N/A'}`,
    `Contact Person: ${lead.contactName}`,
    `Country / Market: ${lead.country}`,
    `City / Territory: ${lead.targetCity || 'N/A'}`,
    `WhatsApp / Direct Phone: ${lead.phone}`,
    `Applicant Email: ${lead.email}`,
    `Partnership Profile: ${lead.partnershipRole || 'N/A'}`,
    `Divisions / Models: ${lead.preferredDivisions || 'N/A'}`,
  ];

  if (lead.meetingDate) {
    lines.push('');
    lines.push('--- REQUESTED CONSULTATION ---');
    lines.push(`Date: ${lead.meetingDate}`);
    lines.push(`Time Slot: ${lead.meetingTime || 'N/A'}`);
    lines.push(`Topic: ${lead.meetingTopic || 'N/A'}`);
  }

  lines.push('');
  lines.push('--- MESSAGE / QUESTIONS ---');
  lines.push(lead.notes || 'No additional notes provided.');

  return lines.join('\n');
}

function buildLeadEmailHtml(lead: PartnerLeadPayload): string {
  const row = (label: string, val: string) =>
    `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e1e4e8;font-weight:600;color:#111417;width:190px;background:#f8f9fa;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e1e4e8;color:#111417;">${escapeHtml(val || 'N/A')}</td>
    </tr>`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;border:1px solid #e1e4e8;border-radius:8px;overflow:hidden;">
    <div style="background:#06080a;padding:20px 24px;border-bottom:3px solid #65c800;">
      <div style="color:#7be300;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">ZAYNOVA Industrial Corporation</div>
      <h2 style="color:#ffffff;margin:6px 0 0 0;font-size:18px;">New ${escapeHtml(lead.inquiryType)} (#${escapeHtml(lead.inquiryNum || '0001')})</h2>
    </div>
    <div style="padding:20px 24px;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        ${row('Company Name', lead.companyName || 'Independent Importer')}
        ${row('Buyer / Director Name', lead.contactName)}
        ${row('Country / Market', lead.country)}
        ${row('City / Territory', lead.targetCity || 'N/A')}
        ${row('WhatsApp / Phone', lead.phone)}
        ${row('Applicant Email', lead.email)}
        ${row('Partnership Goal', lead.partnershipRole)}
        ${row('Product Divisions', lead.preferredDivisions)}
        ${lead.meetingDate ? row('Meeting Requested', `${lead.meetingDate} (${lead.meetingTime}) — ${lead.meetingTopic}`) : ''}
        ${row('Portal Language', lead.language.toUpperCase())}
      </table>
      <div style="margin-top:16px;padding:14px;background:#f8f9fa;border:1px solid #e1e4e8;border-radius:6px;font-size:13px;color:#111417;">
        <div style="font-weight:700;margin-bottom:6px;">Buyer Questions &amp; Requirements:</div>
        <div style="white-space:pre-wrap;line-height:1.5;">${escapeHtml(lead.notes || 'Direct importer & distributor partnership request via portal.')}</div>
      </div>
    </div>
  </div>`;
}

async function sendViaSmtp(
  subject: string,
  text: string,
  html: string,
  replyToEmail: string
): Promise<boolean> {
  const smtpUser = (process.env.SMTP_USER || '').trim();
  const smtpPass = (process.env.SMTP_PASS || '').trim();
  if (!smtpUser || !smtpPass) return false;

  const smtpHost = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: `"ZAYNOVA Trade Portal" <${smtpUser}>`,
    to: PARTNER_NOTIFY_EMAIL,
    replyTo: replyToEmail || undefined,
    subject,
    text,
    html,
  });

  return true;
}

async function sendViaResend(
  subject: string,
  text: string,
  html: string,
  replyToEmail: string
): Promise<boolean> {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) return false;

  const fromAddress =
    (process.env.RESEND_FROM_EMAIL || '').trim() || 'ZAYNOVA Portal <onboarding@resend.dev>';

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [PARTNER_NOTIFY_EMAIL],
      reply_to: replyToEmail || undefined,
      subject,
      text,
      html,
    }),
  });

  return resp.ok;
}

async function relayEmailViaAppsScript(
  appsScriptUrl: string,
  lead: PartnerLeadPayload,
  subject: string,
  text: string,
  html: string
): Promise<boolean> {
  try {
    const resp = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'send_partner_email',
        sendEmailNotification: true,
        notifyRecipient: PARTNER_NOTIFY_EMAIL,
        emailSubject: subject,
        emailText: text,
        emailHtml: html,
        'Inquiry Number': `#${lead.inquiryNum || '0001'}`,
        'Client Name': lead.contactName,
        Company: lead.companyName || 'Independent Importer',
        Country: lead.country,
        'Client Phone': lead.phone,
        'Client Email': lead.email,
        'Project Type': lead.preferredDivisions,
        'Order Volume': lead.partnershipRole,
        Message: lead.notes,
      }),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.post('/api/partner-inquiry', async (req: Request, res: Response) => {
    try {
      const body = req.body && typeof req.body === 'object' ? req.body : {};

      const contactName = cleanField(body.contactName, 120);
      const country = cleanField(body.country, 120);
      const phone = cleanField(body.phone, 60);
      const email = cleanField(body.email, 160);

      if (!contactName || !country || !phone || !email) {
        res.status(400).json({ ok: false, error: 'Missing required contact fields.' });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ ok: false, error: 'Invalid applicant email format.' });
        return;
      }

      const lead: PartnerLeadPayload = {
        inquiryType: cleanField(body.inquiryType, 80) || 'Importer & Distributor Application',
        inquiryNum: cleanField(body.inquiryNum, 24) || '0001',
        companyName: cleanField(body.companyName, 160),
        contactName,
        country,
        phone,
        email,
        preferredDivisions: cleanField(body.preferredDivisions, 240),
        partnershipRole: cleanField(body.partnershipRole, 120),
        targetCity: cleanField(body.targetCity, 120),
        meetingDate: cleanField(body.meetingDate, 40),
        meetingTime: cleanField(body.meetingTime, 60),
        meetingTopic: cleanField(body.meetingTopic, 140),
        language: cleanField(body.language, 12) || 'EN',
        notes: cleanField(body.notes, 2000),
      };

      const subject = `[ZAYNOVA Lead #${lead.inquiryNum}] ${lead.inquiryType} — ${lead.country} (${lead.companyName || lead.contactName})`;
      const textBody = buildLeadEmailText(lead);
      const htmlBody = buildLeadEmailHtml(lead);
      const safeScriptUrl = resolveAllowedAppsScriptUrl(body.appsScriptUrl);

      let emailSent = false;

      try {
        emailSent = await sendViaSmtp(subject, textBody, htmlBody, lead.email);
      } catch (err) {
        console.warn('SMTP dispatch warning:', err instanceof Error ? err.message : err);
      }

      if (!emailSent) {
        try {
          emailSent = await sendViaResend(subject, textBody, htmlBody, lead.email);
        } catch (err) {
          console.warn('Resend dispatch warning:', err instanceof Error ? err.message : err);
        }
      }

      const scriptRelayed = await relayEmailViaAppsScript(
        safeScriptUrl,
        lead,
        subject,
        textBody,
        htmlBody
      );

      console.info(
        `[ZAYNOVA Lead #${lead.inquiryNum}] ${lead.country} (${lead.companyName || lead.contactName}) | directMail=${emailSent} | sheetRelay=${scriptRelayed}`
      );

      // Never expose recipient inbox address back to the client response
      res.status(200).json({
        ok: true,
        inquiryNum: lead.inquiryNum,
        dispatched: emailSent || scriptRelayed,
      });
    } catch (error) {
      console.error('Partner inquiry route error:', error);
      res.status(500).json({ ok: false, error: 'Unable to process inquiry right now.' });
    }
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ZAYNOVA server running on http://0.0.0.0:${PORT} (${IS_PROD ? 'prod' : 'dev'})`);
  });
}

startServer();
