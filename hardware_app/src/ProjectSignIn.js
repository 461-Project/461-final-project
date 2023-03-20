import React, { useState } from "react";
import "./Styles/stylesheet.css"; // import stylesheet
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function ProjectSignIn() {
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

  const [projId, setProjId] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate(); // Add useHistory hook to handle routing

  const handleSubmit = (event) => {
  event.preventDefault();

  fetch('http://localhost:5000/api/project-login-attempt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({projId})
  })
  .then(response => response.json())
  .then(data => {
    if(data.result === 'Project ID does not exist'){
        setResult(data.result);
    }else{
        console.log(data.id);
        navigate(`/Dashboard/${data.id}`);
    }
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    setResult('An error occurred');
    console.error(error);
  });
};

  return (
  <ThemeProvider theme = {theme}>
    <div className="form-container">
      <Typography variant="h1" align = "center" style={{ color: '#1C2331' }}>Project Login Page</Typography>
      <form onSubmit={handleSubmit}>

        <TextField
            id= "username"
            label = "Project ID"
            value = {projId}
            onChange = {(event) => setProjId(event.target.value)}
            required
            fullwidth
            margin="normal"
            InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button type="button" id="create_project" onClick={() => navigate('/CreateProject')}>
          Create Account
        </Button>
      </form>
      <div id="result">{result}</div>
      {result && <Typography variant="body1" color="error">{result}</Typography>}
    </div>
   </ThemeProvider>
  );
}

export default ProjectSignIn;