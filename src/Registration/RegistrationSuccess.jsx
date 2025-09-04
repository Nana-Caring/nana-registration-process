import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegistrationSuccess } from '../store/authSlice';
import './RegistrationSuccess.css';
import { FaCheckCircle, FaEnvelope, FaSignInAlt, FaUserPlus, FaPaperPlane, FaExclamationTriangle } from 'react-icons/fa';

const RegistrationSuccess = () => {
  const dispatch = useDispatch();
  const { lastRegisteredUser } = useSelector(state => state.auth);
  
  // Email resend state
  const [emailSent, setEmailSent] = useState(true); // Assume email was sent initially
  const [emailError, setEmailError] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resending, setResending] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleRegisterAnother = () => {
    // Clear the registration success state to show the form again
    dispatch(clearRegistrationSuccess());
  };

  const handleLoginRedirect = () => {
    // For now, just show an alert
    // In a real app, you'd navigate to login page
    alert('Login functionality would redirect to login page');
  };

  const handleResendEmail = async () => {
    if (resendCountdown > 0 || resending) return;
    
    setResending(true);
    setEmailError(false);
    
    try {
      // Call your actual email service
      const response = await fetch('/api/resend-welcome-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData: lastRegisteredUser,
          // Note: In production, you shouldn't send the password from frontend
          // The backend should retrieve it or generate a new temporary one
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setEmailSent(true);
        setEmailError(false);
        setResendCountdown(60); // 60 second cooldown
        alert('Email resent successfully! Please check your inbox.');
      } else {
        throw new Error(result.message || 'Failed to send email');
      }
      
    } catch (error) {
      console.error('Failed to resend email:', error);
      setEmailError(true);
      setEmailSent(false);
      alert('Failed to resend email. Please try again later or contact support.');
    } finally {
      setResending(false);
    }
  };

  const toggleEmailStatus = () => {
    // For testing purposes - simulate email failure
    setEmailSent(!emailSent);
    setEmailError(!emailError);
  };

  return (
    <div className="success-container">
      <div className="success-content">
       
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        
        <h1>Registration Successful!</h1>
        <p className="success-message">
          Welcome to Nana Caring! Your account has been created successfully.
        </p>
        
        <div className="success-details">
          <div className="detail-item">
            {emailSent && !emailError ? (
              <FaEnvelope className="detail-icon success" />
            ) : (
              <FaExclamationTriangle className="detail-icon error" />
            )}
            <div className="detail-text">
              <h3>{emailSent && !emailError ? 'Welcome Email Sent' : 'Email Sending Failed'}</h3>
              <p>
                {emailSent && !emailError 
                  ? "We've sent your login credentials and welcome information to your registered email address. Please check your inbox (and spam folder) for your account details."
                  : "There was an issue sending your welcome email. You can resend it using the button below."
                }
              </p>
              {(!emailSent || emailError) && (
                <div className="resend-section">
                  <button 
                    className={`btn btn-resend ${resendCountdown > 0 || resending ? 'disabled' : ''}`}
                    onClick={handleResendEmail}
                    disabled={resendCountdown > 0 || resending}
                  >
                    <FaPaperPlane />
                    {resending 
                      ? 'Sending...' 
                      : resendCountdown > 0 
                        ? `Resend Email (${resendCountdown}s)`
                        : 'Resend Welcome Email'
                    }
                  </button>
                  <small className="resend-note">
                    {resendCountdown > 0 && 'Please wait before requesting another email.'}
                  </small>
                </div>
              )}
            </div>
          </div>
          
          <div className="detail-item">
            <FaUserPlus className="detail-icon" />
            <div className="detail-text">
              <h3>Account Created</h3>
              <p>Your NANA Portal account is now active. Use the credentials sent to your email to log in and start exploring our services.</p>
            </div>
          </div>
        </div>
        
        <div className="success-actions">
          <button 
            className="btn btn-primary"
            onClick={handleRegisterAnother}
          >
            <FaUserPlus />
            Register Another User
          </button>
          
          {/* Test button for demo purposes - remove in production */}
          <button 
            className="btn btn-secondary"
            onClick={toggleEmailStatus}
            style={{ marginLeft: '1rem' }}
          >
            Toggle Email Status (Test)
          </button>
        </div>
        
        <div className="success-footer">
          <p>Need help? <a href="/contact">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
