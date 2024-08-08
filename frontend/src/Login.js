import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Importing CSS for styling

import loginimage from './images/login.jpg'


import './Auth.css';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrors({});
    setMessage('');

    let validationErrors = {};
    if (!username) validationErrors.username = "Username is required";
    if (!password) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      const response = await axios.post('https://deploying-14hj.onrender.com/login', { username, password });
      console.log(response.data);
      localStorage.setItem('accessToken', response.data.access_token);
      setMessage('Login successful');
      navigate('/protected');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg || 'An error occurred');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };



  return (

    
    <div className="login-page">
      <Grid container justifyContent="center" alignItems="center" className="login-container">
        <Grid item xs={12} md={6} className="login-form">
          <Box className="login-box" sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" className="login-title">
              Login
            </Typography>
            <br/>
            <Typography variant="body2" className="login-subtitle">
              Don't have an account yet? <a href="/signup">Sign Up</a>
            </Typography>
            <br/>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Typography variant="body2" align="right" className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </Typography>
            <br/>
            <Button
              variant="contained"
              className="login-button"
              fullWidth
              onClick={handleLogin}
              
            >
              Login
            </Button>
            </form>



            <Typography variant="body2" color="textSecondary" align="center" className="login-message">
              {message}
            </Typography>
            <br/>
            <Typography variant="body2" align="center" className="login-footer">
              or login with
            </Typography>
            <div className="login-icons">
            
                  <Button
                    variant="outlined"
                   
                    style={{ marginRight: '10px' }}
                   
                  >
                    Google
                  </Button>

              <Button variant="outlined" >
                Facebook
              </Button>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="login-image">
          <img src={loginimage} alt="Login illustration" />
        </Grid>
      </Grid>

    
    </div>
 
  );
}

export default Login;
