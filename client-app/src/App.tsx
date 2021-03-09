import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ducks } from './demo';
import DuckItem from './DuckItem'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, []);

  return (
    <div className="App">
      <Header as='h2' icon='users' content='React' />

      <ul>
        {activities.map((activity:any) => {
          <li key={activity.id}>
            {activity.title}
          </li>
        })}
      </ul>
      <List>
          {activities.map((activity: any) => {
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          })}
      </List>
      <List>
          <p>1</p>
          <p>2</p>
          <p>3</p>
      </List>
    </div>
  );
}

export default App;
