import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="auth-layout-container">
      <div className="auth-form-wrapper">
        <div className="auth-form-card">
          <button className="back-button" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={28} strokeWidth={2.5} />
          </button>

          <div className="mt-16">
            <h1 className="title">Welcome Back!</h1>
            <p className="subtitle">Sign in to continue tracking your expenses</p>

            <form onSubmit={(e) => { e.preventDefault(); /* Handle logic */}}>
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

              <div className="mt-40">
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
