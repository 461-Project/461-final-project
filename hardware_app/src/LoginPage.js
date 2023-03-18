import React, { useState } from "react";
import "./Styles/stylesheet.css"; // import stylesheet
import { useNavigate } from "react-router-dom";

function LoginPage() {
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
    <div className="form-container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button type="button" id="create_account" onClick = {handleCreateAccount}>
          Create Account
        </button>
      </form>
      <div id="result">{result}</div>
    </div>
  );
}

export default LoginPage;