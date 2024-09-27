import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            { path: 'activities', element: <ActivityDashboard/> },
            { path: 'activities/:id', element: <ActivityDetails/> },
            { path: 'createActivity', element: <ActivityForm key='create'/> }, // we use "key" is bcz we call two different route in same component the react DOM do not know which component is render so we provide the different key.
            { path: 'manage/:id', element: <ActivityForm key='manage'/> }
        ]
    }
]

export const router = createBrowserRouter(routes);