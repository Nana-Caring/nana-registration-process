import React from 'react';
import { useSelector } from 'react-redux';
import './LandingPage.css';
import RegistrationForm from './Registration/RegistrationForm';
import RegistrationSuccess from './Registration/RegistrationSuccess';
import Header from './components/Header';

const LandingPage = () => {
  const { registrationSuccess } = useSelector((state) => state.auth);

  return (
    <div className="landing-page">
      <Header />
      <div className="registration-container">
        {registrationSuccess ? (
          <RegistrationSuccess />
        ) : (
          <RegistrationForm />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
