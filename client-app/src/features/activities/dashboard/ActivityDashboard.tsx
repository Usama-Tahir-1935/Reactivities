import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";


export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    // "useEffect" is a hook that is used to handle the side effects in function components. Side effects can include things like fetching data, updated the DOM, subscribing the events. useEffect runs after the component render.
    useEffect(() => {
      // This is side effect fetch data from the API. The data is coming into the mobx file."activityStore" 
      if (activityRegistry.size <= 1) loadActivities();    
    }, [activityRegistry.size, loadActivities]) // Empty array means this effect runs only once.
  
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
        
    )
})


















