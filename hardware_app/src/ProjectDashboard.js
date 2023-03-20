import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Styles/projectDashboard.css';

function Resource(props){
    const {availability, projectId, name, checkedOut } = (props);
    const [availableQuantity, setAvailableQuantity] = useState(availability);
    const [checkedOutQuantity, setCheckedOutQuantity] = useState(checkedOut);
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setValue(event.target.value);
    }

    const handleCheckOut = () => {
        fetch('http://localhost:5000/api/handleCheckout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                quantity: value,
                projectId: projectId
            })
        })
        .then(response => response.json())
        .then(data => {
            setMessage('');
            if (data.result === 'Not enough of this resource available!') {
                setValue('');
                setMessage(data.result);
            } else if (data.result === 'Resources checked out!') {
                setValue('');
                // update state with checked out quantity and available quantity
                setCheckedOutQuantity(parseInt(checkedOutQuantity) + parseInt(value));
                setAvailableQuantity(parseInt(availableQuantity) - parseInt(value));
                // set appropriate message or alert
            } else if (data.result === 'Invalid input') {
                setValue('');
                setMessage(data.result);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handleCheckIn = () => {
        fetch('http://localhost:5000/api/handleCheckIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                quantity: value,
                projectId: projectId
            })
        })
        .then(response => response.json())
        .then(data => {
            setMessage('');
            if (data.result === 'You do not have that many!') {
                setValue('');
                setMessage(data.result);
            } else if (data.result === 'Resources checked in!') {
                setValue('');
                setMessage('');
                setCheckedOutQuantity(parseInt(checkedOutQuantity) - parseInt(value));
                setAvailableQuantity(parseInt(availableQuantity) + parseInt(value));
            } else if (data.result === 'Invalid input') {
                setValue('');
                setMessage(data.result);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
    <div className="resource">
      <h3>{name}</h3>
      <p>Availability: {availableQuantity}</p>
      <p>Currently Checked Out: {checkedOutQuantity}</p>
      <div>
        <input type="number" placeholder="Enter quantity" value={value} onChange={handleInputChange} />
        <button onClick={handleCheckOut}>Check Out</button>
        <button onClick={handleCheckIn}>Check In</button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const { projectId } = useParams();
  const [projId, setProjId] = useState('')
  const [resources, setResources] = useState([]);
  const [checkedOut, setCheckedOut] = useState([]);
  const [available, setAvailable] = useState([]);
  const [proj_name, setName] = useState('');

  useEffect(() => {
  async function fetchData() {
    try {
      const nameResponse = await fetch('http://localhost:5000/api/get-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId
        })
      });
      const nameData = await nameResponse.json();
      setName(nameData.name);

      // Move the setProjId line here
      setProjId(projectId);

      const checkedOutResponse = await fetch('http://localhost:5000/api/get_project_resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectId })
      });
      const checkedOutData = await checkedOutResponse.json();
      setCheckedOut(JSON.parse(checkedOutData));
      const availableResponse = await fetch('http://localhost:5000/api/get_resource_availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Include any necessary request data here
        })
      });
      const availableData = await availableResponse.json();
      setAvailable(JSON.parse(availableData));

      const resourcesResponse = await fetch('http://localhost:5000/api/getResources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Include any necessary request data here
        })
      });
      const resourcesData = await resourcesResponse.json();
      setResources(JSON.parse(resourcesData));
    } catch (error) {
      console.error(error);
    }

  }


  fetchData();
}, [projectId]);

  const resourceComponents = resources.map((resource, index) => {
    const name = resources[index].charAt(0).toUpperCase() + resources[index].slice(1);
    const checkedOutCount = checkedOut[index];
    const availability = available[index];
    const proId = projId;

    return (
      <Resource
        key={index}
        availability={availability}
        checkedOut={checkedOutCount}
        name={name}
        projectId={proId}
      />
    );
  });

  return (
    <div className="dashboard">
      <h2>{proj_name}</h2>
      {resourceComponents}
    </div>
  );
}

 export default Dashboard;