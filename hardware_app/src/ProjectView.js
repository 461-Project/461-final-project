import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Styles/projectDashboard.css';

function Resource(props) {
  const { availability, checkedOut, name, projectId } = props;
  const [checkedOutQuantity, setCheckedOutQuantity] = useState(checkedOut)
  const [value, setValue] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState(availability)
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setValue(event.target.value);
    console.log('value: ' +value)
  };

  const handleCheckOut = () => {
  console.log("quantity: " + {value})
  console.log('dashboard checkout called from resource')
  fetch('http://localhost:5000/api/handleCheckout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: {value},
      quantity: {value},
      projectId: {projectId}
    })
  })
    .then(response => response.json())
    .then(data => {
        setValue('');
        if (data.result === 'Not enough of this resource available!') {
            setMessage(data.result);
        } else if (data.result === 'Resources checked out!') {
            setMessage('');
            setCheckedOutQuantity(parseInt(checkedOutQuantity) + parseInt(value));
            setAvailableQuantity(parseInt(availableQuantity) - parseInt(value));
        } else if (data.result === 'Invalid input') {
            setMessage(data.result);
        }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};




  const handleCheckIn = () => {
    props.handleCheckIn(value, (data) => { // call the callback function and pass the data as an argument
      setValue('');
      if (data.reply === 'You do not have that many!') {
        setMessage(data.reply);
      } else if (data.reply === 'Resources checked in!') {
        setMessage('');
        setCheckedOutQuantity(parseInt(checkedOutQuantity) - parseInt(value));
        setAvailableQuantity(parseInt(availableQuantity) + parseInt(value));
      } else if (data.reply === 'Invalid input') {
        setMessage(data.reply);
      }
    });
  };

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

  console.log("rendering dashboard component");
  const { projectId } = useParams();
  const [resources, setResources] = useState([]);
  const [checkedOut, setCheckedOut] = useState([]);
  const [available, setAvailable] = useState([]);
  const [proj_name, setName] = useState('');
//  const [checkedOutQuantity, setCheckedOutQuantity] = useState('');
//  const [availableQuantity, setAvailableQuantity] = useState('');


  useEffect(()=>{
    async function getName(){
        try{
            const response = await fetch('http://localhost:5000/api/get-name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectId
                })
            });
            const data = await response.json();
            setName(data.name);
        } catch (error){
            console.error(error);
        }
    }

    getName();
  },[projectId]);


  useEffect(()=>{
    async function getAvailability(){
        try{
            const response = await fetch('http://localhost:5000/api/get_resource_availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Include any necessary request data here
                })
            });
            const data = await response.json();
            setAvailable(JSON.parse(data));
        } catch (error){
            console.error(error);
        }
    }

    getAvailability();
  },[]);

  useEffect(() => {
    async function getProjectResources() {
        try {
            const response = await fetch('http://localhost:5000/api/get_project_resources', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ projectId })
            });
            const data = await response.json();
            setCheckedOut(JSON.parse(data));
        } catch (error) {
            console.error(error);
        }
    }

  getProjectResources();
  }, [projectId]);

  useEffect(()=>{
    async function getResources(){
        try{
            const response = await fetch('http://localhost:5000/api/getResources', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Include any necessary request data here
                })
            });
            const data = await response.json();
            setResources(JSON.parse(data));
        } catch (error){
            console.error(error);
        }
    }

    getResources();
  },[]);

  const handleCheckIn = (index, quantity, callback) => {
    fetch('http://localhost:5000/api/handleCheckIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: resources[index],
      quantity: quantity,
      projectId: projectId
    })
  })
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => {
      console.error('Error:', error);
    });
  };

  for (let i = 0; i < resources.length; i++) {
    resources[i] = resources[i].charAt(0).toUpperCase() + resources[i].slice(1);
  }




  const resourceComponents = resources.map((resource, index) =>{
    const name = resources[index];
    const checkedOutCount = checkedOut[index];
    const availability = available[index];

    return(
        <Resource
        key={index}
        availability={availability}
        checkedOut={checkedOutCount}
        name={name}
        handleCheckIn={(quantity) => handleCheckIn(resources[index], quantity, projectId)}
        projectId = {projectId}
      />
    )
  })

  return (
    <div className="dashboard">
      <h2>{proj_name}</h2>
      {resourceComponents}
    </div>
  );
}

export default Dashboard;

