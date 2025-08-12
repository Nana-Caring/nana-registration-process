import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError, clearRegistrationSuccess } from '../store/authSlice';
import './Registration.css';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaIdCard, FaLock } from 'react-icons/fa';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { loading, error, registrationSuccess } = useSelector((state) => state.auth);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    middleName: '',
    surname: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
    
    // Account Type & Password
    accountType: '',
    password: '',
    confirmPassword: '',
    
    // Terms and Conditions
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle registration success
  useEffect(() => {
    if (registrationSuccess) {
      alert('Registration successful! Welcome to Nana Caring!');
      // Optionally redirect or reset form
      dispatch(clearRegistrationSuccess());
    }
  }, [registrationSuccess, dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      setErrors({ 
        submit: typeof error === 'string' ? error : error.message || 'Registration failed. Please try again.' 
      });
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.surname.trim()) newErrors.surname = 'Surname is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    } else if (!/^\d{13}$/.test(formData.idNumber)) {
      newErrors.idNumber = 'ID number must be 13 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.accountType) newErrors.accountType = 'Please select an account type';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      default:
        isValid = true;
    }
    
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3()) return;
    
    // Clear any previous errors
    dispatch(clearError());
    setErrors({});
    
    // Prepare registration data
    const registrationData = {
      firstName: formData.firstName.trim(),
      middleName: formData.middleName.trim(),
      surname: formData.surname.trim(),
      email: formData.email.trim().toLowerCase(),
      phoneNumber: formData.phoneNumber.trim(),
      idNumber: formData.idNumber.trim(),
      accountType: formData.accountType,
      password: formData.password,
      role: formData.accountType // Set role based on account type
    };
    
    try {
      // Dispatch the register user action
      await dispatch(registerUser(registrationData)).unwrap();
    } catch (error) {
      console.error('Registration failed:', error);
      // Error handling is done in useEffect
    }
  };

  const renderStep1 = () => (
    <div className="registration-step">
      <h3>Personal Information</h3>
      <p className="step-description">Please provide your personal details</p>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">
            <FaUser className="input-icon" />
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? 'error' : ''}
            placeholder="Enter your first name"
          />
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="middleName">
            <FaUser className="input-icon" />
            Middle Name
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
            placeholder="Enter your middle name (optional)"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="surname">
          <FaUser className="input-icon" />
          Surname *
        </label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          className={errors.surname ? 'error' : ''}
          placeholder="Enter your surname"
        />
        {errors.surname && <span className="error-text">{errors.surname}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">
          <FaEnvelope className="input-icon" />
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'error' : ''}
          placeholder="Enter your email address"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="phoneNumber">
          <FaPhone className="input-icon" />
          Phone Number *
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className={errors.phoneNumber ? 'error' : ''}
          placeholder="Enter your phone number"
        />
        {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="idNumber">
          <FaIdCard className="input-icon" />
          ID Number *
        </label>
        <input
          type="text"
          id="idNumber"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleInputChange}
          className={errors.idNumber ? 'error' : ''}
          placeholder="Enter your 13-digit ID number"
          maxLength="13"
        />
        {errors.idNumber && <span className="error-text">{errors.idNumber}</span>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="registration-step">
      <h3>Account Setup</h3>
      <p className="step-description">Choose your account type and create a secure password</p>
      
      <div className="form-group">
        <label>Account Type *</label>
        <div className="account-type-selection">
          <label className={`account-type-option ${formData.accountType === 'caregiver' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="accountType"
              value="caregiver"
              checked={formData.accountType === 'caregiver'}
              onChange={handleInputChange}
            />
            <div className="option-content">
              <div className="option-icon">👨‍👩‍👧‍👦</div>
              <div className="option-text">
                <h4>Caregiver</h4>
                <p>Manage and care for dependents</p>
              </div>
            </div>
          </label>
          
          <label className={`account-type-option ${formData.accountType === 'funder' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="accountType"
              value="funder"
              checked={formData.accountType === 'funder'}
              onChange={handleInputChange}
            />
            <div className="option-content">
              <div className="option-icon">💰</div>
              <div className="option-text">
                <h4>Funder</h4>
                <p>Provide financial support</p>
              </div>
            </div>
          </label>
        </div>
        {errors.accountType && <span className="error-text">{errors.accountType}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">
          <FaLock className="input-icon" />
          Password *
        </label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'error' : ''}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <span className="error-text">{errors.password}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">
          <FaLock className="input-icon" />
          Confirm Password *
        </label>
        <div className="password-input">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="registration-step">
      <h3>Terms & Conditions</h3>
      <p className="step-description">Please review and accept our terms to complete registration</p>
      
      <div className="terms-section">
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className={errors.agreeToTerms ? 'error' : ''}
            />
            <span className="checkmark"></span>
            I agree to the <a href="/terms" target="_blank">Terms and Conditions</a>
          </label>
          {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
        </div>
        
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreeToPrivacy"
              checked={formData.agreeToPrivacy}
              onChange={handleInputChange}
              className={errors.agreeToPrivacy ? 'error' : ''}
            />
            <span className="checkmark"></span>
            I agree to the <a href="/privacy" target="_blank">Privacy Policy</a>
          </label>
          {errors.agreeToPrivacy && <span className="error-text">{errors.agreeToPrivacy}</span>}
        </div>
      </div>
      
      <div className="registration-summary">
        <h4>Registration Summary</h4>
        <div className="summary-item">
          <span>Name:</span>
          <span>{formData.firstName} {formData.middleName} {formData.surname}</span>
        </div>
        <div className="summary-item">
          <span>Email:</span>
          <span>{formData.email}</span>
        </div>
        <div className="summary-item">
          <span>Account Type:</span>
          <span className="account-type-badge">{formData.accountType}</span>
        </div>
      </div>
      
      {errors.submit && <div className="error-message">{errors.submit}</div>}
    </div>
  );

  return (
    <div className="registration-container">

      <div className="registration-content">
        <div className="progress-indicator">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Personal Info</div>
          </div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Account Setup</div>
          </div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Confirmation</div>
          </div>
        </div>
        
        <form className="registration-form" onSubmit={handleSubmit}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          
          <div className="form-navigation">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            )}
          </div>
        </form>
  
      </div>
    </div>
  );
};

export default RegistrationForm;
