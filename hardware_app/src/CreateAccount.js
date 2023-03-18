import React, { useState } from "react";
import "./Styles/stylesheet.css"; // import stylesheet
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  console.log('in CreateAccount')

  const handleSubmit = (event) => {
    event.preventDefault();


  fetch('http://localhost:5000/api/user-create-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, confirmPassword})
  })
  .then(response => response.json())
  .then(data => {
    if(data.result === 'Username Exists'){
        setResult('This username is taken!');
    }else if(data.result === 'Passwords do not match'){
        setResult(data.result);
    }else if(data.result === 'Account Created'){
        setResult(data.result)
        navigate('/');
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
      <h1>Create Account</h1>
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
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
      <div id="result">{result}</div>
    </div>
  );
}

export default CreateAccount;