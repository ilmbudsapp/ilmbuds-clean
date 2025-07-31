import { MailService } from '@sendgrid/mail';
import type { MailDataRequired } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable is not set. Email functionality will not work.");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY || '');

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key is not set');
      return false;
    }

    // Ensure text is always a string to avoid type error
    const text = params.text || '';
    
    const msg: MailDataRequired = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: text,
      html: params.html || text
    };

    await mailService.send(msg);
    
    console.log(`Email sent successfully to: ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    
    // Pokušavamo da izvučemo detalje greške
    if (typeof error === 'object' && error !== null) {
      const errorWithResponse = error as { response?: { body?: unknown } };
      
      if (errorWithResponse.response?.body) {
        console.error('SendGrid error details:', JSON.stringify(errorWithResponse.response.body));
      }
    }
    
    return false;
  }
}