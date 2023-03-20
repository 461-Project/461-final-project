import React, { useState } from "react";
import "./Styles/stylesheet.css"; // import stylesheet
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function LoginPage() {
  const theme = createTheme({
    palette: {
        primary: {
            main: '#000080',
        },
        secondary: {
            main: '#CAD2C5',
        },
    },
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate(); // Add useHistory hook to handle routing

  const handleCreateAccount = () => {
    navigate('/CreateAccount');
  }

  const handleSubmit = (event) => {
  event.preventDefault();
  console.log('about to make the fetch request')

  fetch('http://localhost:5000/api/user-login-attempt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if(data.result){
        navigate('/ProjectSignIn');
    }else{
        setResult('Invalid username or password');
    }
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    setResult('An error occurred');
    console.error(error);
  });
};

  return (
  <ThemeProvider theme={theme}>
    <div className="form-container">
      <Typography variant="h1" align = "center" style={{ color: '#1C2331' }}>Login Page</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="username"
          name="username"
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button type="button" id="create_account" onClick={handleCreateAccount}>
          Create Account
        </Button>
      </form>
      {result && <Typography variant="body1" color="error">{result}</Typography>}
    </div>
   </ThemeProvider>
  );
}

export default LoginPage;