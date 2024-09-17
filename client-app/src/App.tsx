import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
// "axios" is a JS library used to make HTTP requests to APIs. 

function App() {
  const [activities, setActivities] = useState([]);

  // "useEffect" is a hook that is used to handle the side effects in function components. Side effects can include things like fetching data, updated the DOM, subscribing the events. useEffect runs after the component render.
  useEffect(() => {
    // This is side effect fetch data from the API.
    axios.get('http://localhost:5000/api/activities').then(response => { // ".then" is JS with promises to handle asynchronous operations.It specifies what to do when a promise resolve successfully like fetching data or making HTTP request.This make it easier to work with tasks that take time to complete.
      setActivities(response.data);
    })
  }, []) // Empty array means this effect runs only once.


  return (
    <div>
        <Header as='h2' icon='users' content='Reactivities'/>
        <List>
          {activities.map((activity: any) => ( // "map" iterate over an array and return a new array result.
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;









