// Email Service fo/**
 * Send email using nodemailer
 * @param {Object} emailData - Email data object
 * @param {string} emailData.to - Recipient email address
 * @param {string} emailData.subject - Email subject
 * @param {string} emailData.html - HTML content
 * @param {string} emailData.text - Plain text content (optional)
 * @param {Array} emailData.attachments - Email attachments (optional)
 * @returns {Promise} - Email sending promise
 */
const sendMail = async ({ to, subject, html, text, attachments = [] }) => {tal
// This would be used in your backend server

const nodemailer = require('nodemailer');

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
};

// Create transporter
const transporter = nodemailer.createTransporter(emailConfig);

/**
 * Send email using nodemailer
 * @param {Object} emailData - Email data object
 * @param {string} emailData.to - Recipient email address
 * @param {string} emailData.subject - Email subject
 * @param {string} emailData.html - HTML content
 * @param {string} emailData.text - Plain text content (optional)
 * @param {Array} emailData.attachments - Email attachments (optional)
 * @returns {Promise} - Email sending promise
 */
const sendMail = async ({ to, subject, html, text, attachments = [] }) => {
  try {
    // Verify transporter configuration
    await transporter.verify();
    
    const mailOptions = {
      from: {
        name: 'NANA Portal',
        address: process.env.EMAIL_FROM || 'noreply@nanacaring.com'
      },
      to: to,
      subject: subject,
      html: html,
      text: text || '', // Fallback to empty string if no text provided
      attachments: attachments, // Include attachments
      // Add some security headers
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'X-Mailer': 'NANA Portal Mailer',
        'X-MimeOLE': 'Produced By NANA Portal'
      }
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      to: to,
      subject: subject,
      accepted: info.accepted,
      rejected: info.rejected
    });
    
    return {
      success: true,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    };
    
  } catch (error) {
    console.error('Email sending failed:', {
      error: error.message,
      to: to,
      subject: subject,
      code: error.code,
      command: error.command
    });
    
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

/**
 * Send welcome email with retry logic
 * @param {Object} userData - User data object
 * @param {string} password - User's password
 * @param {number} retries - Number of retry attempts
 * @returns {Promise} - Email sending promise with retry
 */
const sendWelcomeEmailWithRetry = async (userData, password, retries = 3) => {
  const { getWelcomeEmail } = require('./welcomeEmail');
  const path = require('path');
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const emailHtml = getWelcomeEmail({ 
        user: userData, 
        password: password 
      });
      
      // Prepare logo attachment
      const logoPath = path.join(__dirname, '..', 'src', 'assets', 'logo.jpg');
      
      const result = await sendMail({
        to: userData.email,
        subject: 'Welcome to NANA Portal - Your Login Credentials',
        html: emailHtml,
        attachments: [
          {
            filename: 'nana-logo.jpg',
            path: logoPath,
            cid: 'nana-logo' // Content ID for embedding in HTML
          }
        ]
      });
      
      console.log(`Welcome email sent successfully to ${userData.email} on attempt ${attempt}`);
      return result;
      
    } catch (error) {
      console.error(`Email attempt ${attempt} failed for ${userData.email}:`, error.message);
      
      if (attempt === retries) {
        // Last attempt failed, throw the error
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s...
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Send test email to verify configuration
 * @returns {Promise} - Test email result
 */
const sendTestEmail = async () => {
  try {
    const testResult = await sendMail({
      to: process.env.TEST_EMAIL || 'test@example.com',
      subject: 'NANA Portal Email Configuration Test',
      html: `
        <h2>Email Configuration Test</h2>
        <p>This is a test email to verify the NANA Portal email configuration.</p>
        <p>Sent at: ${new Date().toISOString()}</p>
        <p>If you receive this email, the configuration is working correctly!</p>
      `
    });
    
    console.log('Test email sent successfully:', testResult);
    return testResult;
    
  } catch (error) {
    console.error('Test email failed:', error.message);
    throw error;
  }
};

module.exports = {
  sendMail,
  sendWelcomeEmailWithRetry,
  sendTestEmail,
  isValidEmail,
  transporter
};
