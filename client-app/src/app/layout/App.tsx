import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'; // In React (or JavaScript in general), UUID (Universally Unique Identifier) is used to generate unique IDs


// "axios" is a JS library used to make HTTP requests to APIs. 
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  // "useEffect" is a hook that is used to handle the side effects in function components. Side effects can include things like fetching data, updated the DOM, subscribing the events. useEffect runs after the component render.
  useEffect(() => {
    // This is side effect fetch data from the API.
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => { // ".then" is JS with promises to handle asynchronous operations.It specifies what to do when a promise resolve successfully like fetching data or making HTTP request.This make it easier to work with tasks that take time to complete.
      setActivities(response.data);
    })
  }, []) // Empty array means this effect runs only once.


  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, {...activity, id: uuid()}]);
      setEditMode(false);
      setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}  
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;









