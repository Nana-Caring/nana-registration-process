import React from 'react';
import { useDispatch } from 'react-redux';
import { clearRegistrationSuccess } from '../store/authSlice';
import './RegistrationSuccess.css';
import { FaCheckCircle, FaEnvelope, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const RegistrationSuccess = () => {
  const dispatch = useDispatch();

  const handleRegisterAnother = () => {
    // Clear the registration success state to show the form again
    dispatch(clearRegistrationSuccess());
  };

  const handleLoginRedirect = () => {
    // For now, just show an alert
    // In a real app, you'd navigate to login page
    alert('Login functionality would redirect to login page');
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
            <FaEnvelope className="detail-icon" />
            <div className="detail-text">
              <h3>Check Your Email</h3>
              <p>We've sent a verification email to your registered email address. Please verify your account to get started.</p>
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
        
        </div>
        
        <div className="success-footer">
          <p>Need help? <a href="/contact">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
