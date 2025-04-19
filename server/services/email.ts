import nodemailer from 'nodemailer';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'adityavishwakarma11234@gmail.com',
    // You need to generate an "App Password" from your Google Account
    // Go to Google Account > Security > 2-Step Verification > App Passwords
    pass: process.env.EMAIL_PASSWORD
  }
});

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: EmailData) {
  const { name, email, message } = data;
  
  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER || 'adityavishwakarma11234@gmail.com'}>`,
    to: 'adityavishwakarma11234@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact form email sent successfully');
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error;
  }
} 