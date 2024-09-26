import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const {activityStore} = useStore();

  // "useEffect" is a hook that is used to handle the side effects in function components. Side effects can include things like fetching data, updated the DOM, subscribing the events. useEffect runs after the component render.
  useEffect(() => {
    // This is side effect fetch data from the API. The data is coming into the mobx file."activityStore" 
    activityStore.loadActivities();    
  }, [activityStore]) // Empty array means this effect runs only once.

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard/>
      </Container>
    </>
  );
}

export default observer(App);









