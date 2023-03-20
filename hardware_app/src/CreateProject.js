import React, { useState } from "react";
import "./Styles/stylesheet.css"; // import stylesheet
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [project_id, setProjectId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

  fetch('http://localhost:5000/api/create-project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, project_id, description})
  })
  .then(response => response.json())
  .then(data => {
    if(data.result === 'Project ID Exists'){
        setResult(data.result);
    }else if(data.result === 'Invalid Project ID'){
        setResult(data.result);
    }else if(data.result === 'Project Created'){
        console.log('project created');
        setResult(data.result)
        navigate('/ProjectSignIn');
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
        <label>Project Name:</label>
        <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
         />
        <label>Project ID:</label>
        <input
          type="text"
          id="project_id"
          name="project_id"
          value={project_id}
          onChange={(event) => setProjectId(event.target.value)}
          required
        />
        <label>Project Description:</label>
        <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
         />

        <button type="submit">Create Project</button>
      </form>
      <div id="result">{result}</div>
    </div>
  );
}

export default CreateAccount;