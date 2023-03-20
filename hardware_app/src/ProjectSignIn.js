import React, { useState } from "react";
import "./Styles/stylesheet.css"; // import stylesheet
import { useNavigate } from "react-router-dom";

function ProjectSignIn() {
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
    <div className="form-container">
      <h1>Project Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="projId">Project ID:</label>
        <input
          type="number"
          id="projId"
          name="projId"
          value={projId}
          onChange={(event) => setProjId(event.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button type="button" id="create_project" onClick={() => navigate('/CreateProject')}>
          Create Project
        </button>
      </form>
      <div id="result">{result}</div>
    </div>
  );
}

export default ProjectSignIn;