// Welcome Email Template for NANA Portal - Modern Pink Gradient Design
// This template includes the NANA logo as an embedded image with fallback text
// Logo path: C:\Users\princ\Documents\TOBUN\NANA Project\nana-registration-app\src\assets\logo.jpg
// The logo is embedded using CID (Content-ID) attachment in the email service

const getWelcomeEmail = ({ user, password }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to NANA Portal</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                min-height: 100vh;
                padding: 2rem 1rem;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 20px;
                box-shadow: 
                    0 10px 30px rgba(0, 0, 0, 0.1),
                    0 4px 12px rgba(0, 0, 0, 0.05);
                overflow: hidden;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.5);
                animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .email-header {
                background: linear-gradient(135deg, rgba(255, 182, 193, 0.9), rgba(255, 105, 180, 0.8));
                backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                padding: 3rem 2rem;
                text-align: center;
                position: relative;
                overflow: hidden;
            }

            .email-header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(249, 178, 51, 0.6), transparent);
            }
            
            .logo-container {
                width: 85px;
                height: 85px;
                background: white;
                border-radius: 50%;
                margin: 0 auto 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 
                    0 8px 32px rgba(0, 0, 0, 0.12),
                    0 0 0 3px rgba(255, 255, 255, 0.9),
                    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
                border: 2px solid rgba(249, 178, 51, 0.3);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }

            .logo-container::before {
                content: '';
                position: absolute;
                top: -3px;
                left: -3px;
                right: -3px;
                bottom: -3px;
                border-radius: 50%;
                background: linear-gradient(45deg, #f9b233, #14532d, #f9b233);
                z-index: -1;
                opacity: 0.6;
            }

            .logo-image {
                width: 75px;
                height: 75px;
                border-radius: 50%;
                object-fit: cover;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .logo-fallback {
                font-size: 2.2rem;
                font-weight: 800;
                background: linear-gradient(135deg, #14532d 0%, #22c55e 60%, #f9b233 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                display: none;
            }

            /* Show fallback text if image fails to load */
            .logo-image[style*="display: none"] + .logo-fallback {
                display: block !important;
            }

            .header-title {
                background: linear-gradient(135deg, #14532d 0%, #22c55e 60%, #f9b233 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-size: 2.2rem;
                font-weight: 800;
                margin-bottom: 0.5rem;
                letter-spacing: -0.02em;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .header-subtitle {
                color: rgba(255, 255, 255, 0.9);
                font-size: 1.1rem;
                font-weight: 400;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                letter-spacing: 0.01em;
            }
            
            .email-body {
                padding: 2.5rem 2rem;
            }
            
            .welcome-message {
                background: linear-gradient(135deg, rgba(255, 182, 193, 0.1), rgba(255, 105, 180, 0.05));
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 182, 193, 0.2);
                padding: 2rem;
                border-radius: 16px;
                margin: 2rem 0;
                position: relative;
                overflow: hidden;
            }

            .welcome-message::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #f9b233, #22c55e, #f9b233);
                border-radius: 2px 2px 0 0;
            }
            
            .credentials-box {
                background: linear-gradient(135deg, #f8f9fa 0%, rgba(255, 182, 193, 0.05) 100%);
                border: 2px solid rgba(255, 182, 193, 0.2);
                border-radius: 16px;
                padding: 2rem;
                margin: 2rem 0;
                backdrop-filter: blur(5px);
                position: relative;
                overflow: hidden;
            }

            .credentials-box::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent, rgba(249, 178, 51, 0.6), transparent);
            }
            
            .credentials-title {
                background: linear-gradient(135deg, #14532d 0%, #22c55e 60%, #f9b233 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-size: 1.3rem;
                font-weight: 700;
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                letter-spacing: -0.01em;
            }
            
            .credential-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 0;
                border-bottom: 1px solid rgba(255, 182, 193, 0.15);
                transition: all 0.3s ease;
            }

            .credential-item:hover {
                background: rgba(255, 182, 193, 0.05);
                border-radius: 8px;
                padding: 1rem;
                margin: 0 -1rem;
            }
            
            .credential-item:last-child {
                border-bottom: none;
            }
            
            .credential-label {
                font-weight: 600;
                color: #6b7280;
                font-size: 0.95rem;
            }
            
            .credential-value {
                font-family: 'Courier New', monospace;
                background: white;
                padding: 0.75rem 1.25rem;
                border-radius: 8px;
                border: 1px solid rgba(255, 182, 193, 0.2);
                background: linear-gradient(135deg, white 0%, rgba(255, 182, 193, 0.05) 100%);
                color: #14532d;
                font-weight: 600;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease;
            }

            .credential-value:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .btn {
                display: inline-block;
                background: linear-gradient(135deg, rgba(255, 182, 193, 0.9), rgba(255, 105, 180, 0.8));
                color: white;
                padding: 1.25rem 2.5rem;
                text-decoration: none;
                border-radius: 12px;
                font-weight: 600;
                text-align: center;
                margin: 1.5rem 0;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
                font-size: 1.1rem;
                letter-spacing: 0.5px;
            }
            
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(255, 105, 180, 0.4);
                background: linear-gradient(135deg, rgba(255, 105, 180, 0.9), rgba(255, 20, 147, 0.8));
            }
            
            .important-note {
                background: linear-gradient(135deg, #fef3cd 0%, rgba(249, 178, 51, 0.1) 100%);
                border: 1px solid rgba(249, 178, 51, 0.3);
                color: #92400e;
                padding: 1.5rem;
                border-radius: 12px;
                margin: 2rem 0;
                backdrop-filter: blur(5px);
                position: relative;
                overflow: hidden;
            }

            .important-note::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, #f9b233, transparent);
                border-radius: 2px 2px 0 0;
            }
            
            .email-footer {
                background: linear-gradient(135deg, #f8f9fa 0%, rgba(255, 182, 193, 0.05) 100%);
                padding: 2rem;
                text-align: center;
                color: #6b7280;
                font-size: 0.9rem;
                border-top: 1px solid rgba(255, 182, 193, 0.1);
            }

            .section-title {
                background: linear-gradient(135deg, #14532d 0%, #22c55e 60%, #f9b233 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-size: 1.3rem;
                font-weight: 700;
                margin: 2rem 0 1rem 0;
                letter-spacing: -0.01em;
            }

            .feature-box {
                background: linear-gradient(135deg, #f8f9fa 0%, rgba(255, 182, 193, 0.03) 100%);
                border: 1px solid rgba(255, 182, 193, 0.1);
                border-radius: 12px;
                padding: 1.5rem;
                margin: 1.5rem 0;
                backdrop-filter: blur(5px);
            }
            
            .social-links {
                margin: 1.5rem 0;
            }
            
            .social-links a {
                color: #14532d;
                text-decoration: none;
                margin: 0 0.75rem;
                font-weight: 500;
                transition: all 0.3s ease;
            }

            .social-links a:hover {
                background: linear-gradient(135deg, #14532d 0%, #22c55e 60%, #f9b233 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            @media (max-width: 600px) {
                .email-container {
                    margin: 0;
                    border-radius: 0;
                }
                
                .email-header, .email-body, .email-footer {
                    padding: 1.5rem 1rem;
                }
                
                .credential-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }
                
                .credential-value {
                    width: 100%;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="email-header">
                <div class="logo-container">
                    <img src="cid:nana-logo" alt="NANA Caring Logo" class="logo-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                    <div class="logo-fallback">NANA</div>
                </div>
                <h1 class="header-title">Welcome to NANA Portal!</h1>
                <p class="header-subtitle">Your account has been successfully created</p>
            </div>
            
            <!-- Body -->
            <div class="email-body">
                <h2>Hello ${user.firstName} ${user.middleName ? user.middleName + ' ' : ''}${user.surname}!</h2>
                
                <div class="welcome-message">
                    <p><strong>🎉 Congratulations!</strong> Your NANA Portal account has been successfully created. We're excited to have you join our community of caring individuals dedicated to making a difference.</p>
                </div>
                
                <p>You can now access all the features and services available on the NANA Portal. Below are your login credentials:</p>
                
                <!-- Login Credentials -->
                <div class="credentials-box">
                    <div class="credentials-title">
                        🔐 Your Login Credentials
                    </div>
                    
                    <div class="credential-item">
                        <span class="credential-label">Email Address:</span>
                        <span class="credential-value">${user.email}</span>
                    </div>
                    
                    <div class="credential-item">
                        <span class="credential-label">Password:</span>
                        <span class="credential-value">${password}</span>
                    </div>
                    
                    <div class="credential-item">
                        <span class="credential-label">Account Type:</span>
                        <span class="credential-value">${user.accountType || user.role}</span>
                    </div>
                </div>
                
                <!-- Important Security Note -->
                <div class="important-note">
                    <strong>⚠️ Important Security Notice:</strong><br>
                    For your security, please change your password after your first login. Keep your login credentials secure and do not share them with anyone.
                </div>
                
                <!-- Login Button -->
                <div style="text-align: center; margin: 2rem 0;">
                    <a href="https://your-nana-portal-login-url.com" class="btn">
                        🚀 Login to NANA Portal
                    </a>
                </div>
                
                <!-- Account Details -->
                <h3 class="section-title">Account Information:</h3>
                <div class="feature-box">
                    <ul style="margin: 0; padding-left: 1.5rem; color: #4b5563;">
                        <li style="margin-bottom: 0.5rem;"><strong>User ID:</strong> ${user.id}</li>
                        <li style="margin-bottom: 0.5rem;"><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</li>
                        <li style="margin-bottom: 0.5rem;"><strong>Account Status:</strong> <span style="color: #22c55e; font-weight: 600;">Active</span></li>
                        ${user.phoneNumber ? `<li style="margin-bottom: 0.5rem;"><strong>Phone:</strong> ${user.phoneNumber}</li>` : ''}
                        ${user.Idnumber ? `<li style="margin-bottom: 0.5rem;"><strong>ID Number:</strong> ${user.Idnumber}</li>` : ''}
                    </ul>
                </div>
                
                <!-- Next Steps -->
                <h3 class="section-title">What's Next?</h3>
                <div class="feature-box">
                    <ol style="margin: 0; padding-left: 1.5rem; color: #4b5563;">
                        <li style="margin-bottom: 0.5rem;">Click the login button above to access your account</li>
                        <li style="margin-bottom: 0.5rem;">Complete your profile setup</li>
                        <li style="margin-bottom: 0.5rem;">Explore the available services and features</li>
                        <li style="margin-bottom: 0.5rem;">Change your password for enhanced security</li>
                    </ol>
                </div>
                
                <!-- Support Information -->
                <div class="feature-box">
                    <h4 class="section-title" style="margin-top: 0; font-size: 1.1rem;">Need Help?</h4>
                    <p style="color: #4b5563; margin-bottom: 1rem;">If you have any questions or need assistance, our support team is here to help:</p>
                    <ul style="margin: 0; padding-left: 1.5rem; color: #4b5563;">
                        <li style="margin-bottom: 0.5rem;">Email: support@nanacaring.com</li>
                        <li style="margin-bottom: 0.5rem;">Phone: +1 (555) 123-NANA</li>
                        <li style="margin-bottom: 0.5rem;">Help Center: https://help.nanacaring.com</li>
                    </ul>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="email-footer">
                <p><strong>NANA Portal</strong> - Caring for our community</p>
                
                <div class="social-links">
                    <a href="#">Facebook</a> |
                    <a href="#">Twitter</a> |
                    <a href="#">LinkedIn</a> |
                    <a href="#">Instagram</a>
                </div>
                
                <p style="font-size: 0.8rem; margin-top: 1rem;">
                    This email was sent to ${user.email} because you registered for a NANA Portal account.<br>
                    If you didn't create this account, please contact our support team immediately.
                </p>
                
                <p style="font-size: 0.8rem; color: #9ca3af; margin-top: 1rem;">
                    © ${new Date().getFullYear()} NANA Caring. All rights reserved.<br>
                    123 Caring Street, Community City, CC 12345
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

module.exports = { getWelcomeEmail };
