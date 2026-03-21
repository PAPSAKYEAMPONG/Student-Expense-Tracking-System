import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="auth-layout-container">
      <div className="auth-form-wrapper">
        <div className="auth-form-card">
          <button className="back-button" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={28} strokeWidth={2.5} />
          </button>

          <div className="mt-16">
            <h1 className="title">Create Account</h1>
            <p className="subtitle">Start Your financial Journey today</p>

            <form onSubmit={(e) => { e.preventDefault(); /* Handle logic */}}>
              <Input 
                id="name" 
                label="Name:" 
                type="text" 
              />
              <Input 
                id="email" 
                label="Email:" 
                type="email" 
              />
              <Input 
                id="password" 
                label="Password:" 
                type="password" 
              />
              <Input 
                id="confirmPassword" 
                label="Confirm Password:" 
                type="password" 
              />

              <div className="mt-40">
                <Button variant="primary" type="submit">
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
