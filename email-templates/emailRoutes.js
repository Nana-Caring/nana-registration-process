// Example backend API endpoint for resending welcome emails
// Add this to your backend server (Express.js example)

const express = require('express');
const { resendWelcomeEmail } = require('../email-templates/emailService');
const router = express.Router();

/**
 * POST /api/resend-welcome-email
 * Resend welcome email to a user
 */
router.post('/resend-welcome-email', async (req, res) => {
  try {
    const { userData } = req.body;
    
    // Validate required data
    if (!userData || !userData.email) {
      return res.status(400).json({
        success: false,
        message: 'User data and email are required'
      });
    }

    // In production, you should:
    // 1. Verify the user exists in your database
    // 2. Generate a new temporary password or retrieve from secure storage
    // 3. Add rate limiting to prevent spam
    // 4. Add proper authentication/authorization

    // For now, we'll use a placeholder password
    // In production, retrieve this securely from your database
    const temporaryPassword = 'TempPass123!'; // This should come from your user management system
    
    console.log(`Attempting to resend welcome email to: ${userData.email}`);
    
    // Call the email service
    const result = await resendWelcomeEmail(userData, temporaryPassword);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Welcome email resent successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message || 'Failed to send email'
      });
    }
    
  } catch (error) {
    console.error('Resend email API error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * POST /api/test-email
 * Test email configuration
 */
router.post('/test-email', async (req, res) => {
  try {
    const { sendTestEmail } = require('../email-templates/emailService');
    
    const result = await sendTestEmail();
    
    res.json({
      success: true,
      message: 'Test email sent successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * GET /api/verify-email-service
 * Verify email service connection
 */
router.get('/verify-email-service', async (req, res) => {
  try {
    const { verifyEmailService } = require('../email-templates/emailService');
    
    const result = await verifyEmailService();
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
    
  } catch (error) {
    console.error('Email service verification error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;

// To use these routes in your main server file, add:
// const emailRoutes = require('./routes/emailRoutes');
// app.use('/api', emailRoutes);
