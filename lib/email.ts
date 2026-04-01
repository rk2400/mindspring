import nodemailer from 'nodemailer';
import { emailConfig, authConfig, appConfig } from './config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    // Initialize transporter if SMTP config is available
    if (emailConfig.isConfigured()) {
      this.transporter = nodemailer.createTransport({
        host: emailConfig.host,
        port: emailConfig.port,
        secure: emailConfig.secure || emailConfig.port === 465,
        auth: {
          user: emailConfig.user,
          pass: emailConfig.pass,
        },
      });

      // Optional connection verification for clearer diagnostics
      this.transporter.verify().then(() => {
        console.log('Email transporter verified and ready');
      }).catch((err) => {
        console.error('Email transporter verification failed:', err?.message || err);
      });
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // If no SMTP configured, log email (mock mode)
      if (!this.transporter) {
        console.log('📧 [MOCK EMAIL]');
        console.log('To:', options.to);
        console.log('Subject:', options.subject);
        console.log('Body:', options.html);
        return true;
      }

      await this.transporter.sendMail({
        from: emailConfig.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        replyTo: options.replyTo,
      });

      return true;
    } catch (error) {
      console.error('Email send error:', error);
      return false;
    }
  }

  async sendOTP(
    email: string,
    code: string,
    options?: { purpose?: 'login' | 'signup'; userName?: string }
  ): Promise<boolean> {
    const purpose = options?.purpose === 'signup' ? 'signup' : 'login';
    const userName = options?.userName?.trim();
    const greeting = userName ? `Hi ${userName},` : 'Hi there,';
    const title = purpose === 'signup'
      ? `Welcome to ${appConfig.name}!`
      : `${appConfig.name} OTP Code`;
    const subtitle = purpose === 'signup'
      ? 'Please verify your email to complete account setup.'
      : 'Use this OTP to sign in securely.';
    const subject = purpose === 'signup'
      ? `Welcome to ${appConfig.name}! Verify your email`
      : `Your ${appConfig.name} Login OTP`;
    const expiryMinutes = authConfig.otpExpiryMinutes;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f7f5f1;">
        <div style="background: #ffedd5; border: 1px solid #fcd9b6; border-radius: 14px; padding: 28px; text-align: center;">
          <h2 style="color: #c2410c; margin: 0 0 12px;">${title}</h2>
          <p style="color: #92400e; margin: 0 0 24px;">${subtitle}</p>
          <div style="background: #ffffff; border: 1px solid #f3e7dc; border-radius: 16px; padding: 28px; display: inline-block; min-width: 220px;">
            <p style="margin: 0 0 8px; color: #7c2d12; font-size: 14px; letter-spacing: 0.05em; text-transform: uppercase;">Your OTP code</p>
            <h1 style="margin: 0; color: #b45309; font-size: 40px; letter-spacing: 4px;">${code}</h1>
          </div>
        </div>

        <div style="margin-top: 24px; background: #ffffff; border: 1px solid #f3e7dc; border-radius: 14px; padding: 24px;">
          <p style="margin: 0 0 12px; color: #333333; font-size: 16px;">${greeting}</p>
          <p style="margin: 0 0 16px; color: #555555; font-size: 15px; line-height: 1.7;">
            ${purpose === 'signup'
              ? 'Thanks for joining Mindspring! Use the PIN above to verify your email and finish setting up your account.'
              : 'Use the PIN above to sign in to your Mindspring account. This helps keep your account secure.'}
          </p>
          <p style="margin: 0 0 8px; color: #555555; font-size: 14px;">
            This code expires in <strong>${expiryMinutes} minutes</strong>.
          </p>
          <p style="margin: 0; color: #777777; font-size: 13px;">
            If you did not request this code, you can safely ignore this email.
          </p>
        </div>

        <p style="margin: 20px 0 0; color: #8a4b08; font-size: 13px; text-align: center;">
          Need help? Reply to this email or visit our support page.
        </p>
      </div>
    `;

    return this.sendEmail({
      to: email,
      subject,
      html,
    });
  }

  async sendOrderEmail(
    email: string,
    template: { subject: string; body: string },
    variables: {
      orderId: string;
      userName: string;
      status: string;
      products: Array<{ name: string; quantity: number; price: number }>;
      totalAmount: number;
    }
  ): Promise<boolean> {
    const upperOrderId = variables.orderId.toUpperCase();
    // Replace variables in template
    let html = template.body
      .replace(/\{\{orderId\}\}/g, upperOrderId)
      .replace(/\{\{userName\}\}/g, variables.userName)
      .replace(/\{\{status\}\}/g, variables.status)
      .replace(/\{\{totalAmount\}\}/g, `₹${variables.totalAmount.toFixed(2)}`);

    // Replace products list
    const productsHtml = variables.products
      .map(
        (p) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${p.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${p.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${p.price.toFixed(2)}</td>
      </tr>
    `
      )
      .join('');

    html = html.replace(
      /\{\{products\}\}/g,
      `
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #fff7ed;">
            <th style="padding: 10px; text-align: left;">Product</th>
            <th style="padding: 10px; text-align: center;">Quantity</th>
            <th style="padding: 10px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${productsHtml}
        </tbody>
      </table>
    `
    );

    // Wrap in styled container
    const styledHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">${appConfig.name}</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 10px 10px;">
          ${html}
        </div>
        <p style="color: #666; font-size: 12px; text-align: center; margin-top: 20px;">
          Thank you for shopping with ${appConfig.name}! 🕯️
        </p>
      </div>
    `;

    const subjectToSend = template.subject.replace(new RegExp(variables.orderId, 'g'), upperOrderId);

    return this.sendEmail({
      to: email,
      subject: subjectToSend,
      html: styledHtml,
    });
  }

  async sendPaymentNotification(
    email: string,
    status: 'submitted' | 'approved' | 'rejected',
    variables: {
      orderId: string;
      userName: string;
      totalAmount: number;
      rejectionReason?: string;
    }
  ): Promise<boolean> {
    let subject = '';
    let html = '';
    const upperOrderId = variables.orderId.toUpperCase();

    if (status === 'submitted') {
      subject = `Payment Received - Order #${upperOrderId}`;
      html = `
        <p>Hi ${variables.userName},</p>
        <p>We have received your payment for order <strong>#${upperOrderId}</strong></p>
        <p><strong>Amount: ₹${variables.totalAmount.toFixed(2)}</strong></p>
        <p>Your payment is under verification. We'll confirm the payment within 24 hours and send you an update.</p>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">Thank you for your patience!</p>
      `;
    } else if (status === 'approved') {
      subject = `Payment Confirmed! - Order #${upperOrderId}`;
      html = `
        <p>Hi ${variables.userName},</p>
        <p>Great news! We have confirmed your payment for order <strong>#${upperOrderId}</strong></p>
        <p><strong>Amount: ₹${variables.totalAmount.toFixed(2)}</strong></p>
        <p>Your order is now confirmed and will be shipped soon. You'll receive tracking details shortly.</p>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">Thank you for shopping with ${appConfig.name}! 🕯️</p>
      `;
    } else {
      // rejected
      subject = `Payment Could Not Be Verified - Order #${upperOrderId}`;
      html = `
        <p>Hi ${variables.userName},</p>
        <p>We could not verify the payment for order <strong>#${upperOrderId}</strong></p>
        ${variables.rejectionReason ? `<p><strong>Reason:</strong> ${variables.rejectionReason}</p>` : ''}
        <p>The amount <strong>₹${variables.totalAmount.toFixed(2)}</strong> is available for you to pay again.</p>
        <p>Please contact our support team if you have any questions.</p>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">Thank you for your understanding.</p>
      `;
    }

    const styledHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">${appConfig.name}</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 10px 10px;">
          ${html}
        </div>
      </div>
    `;

    return this.sendEmail({
      to: email,
      subject,
      html: styledHtml,
    });
  }
}

export const emailService = new EmailService();
