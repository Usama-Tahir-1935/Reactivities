// This code sets up a simple state management system using MobX

import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid'; // In React (or JavaScript in general), UUID (Universally Unique Identifier) is used to generate unique IDs

export default class ActivityStore { // The ActivityStore class is used to manage the state of activities.
    activityRegistry = new Map<string, Activity>(); // Stores a list of activities.
    selectedActivity: Activity | undefined = undefined; // Keeps track of the currently selected activity.
    editMode = false;
    loading = false; // Used to show loading status (e.g., when data is being fetched).
    loadingInitial = true;

    // Allows MobX to automatically track changes in the class and update the UI when needed.
    constructor() {
        makeAutoObservable(this)
    }

    // This is a computer property that return the list of activity sorting by dates.
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }

    // Fetches the activities from the backend, processes the date for each, and stores them in the activities list.
    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
            activity.date = activity.date.split('T')[0];
            this.activityRegistry.set(activity.id, activity);
            this.setLoadingInitial(false);
        })
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    // If We do not use this action we need to apply the runInAction function in the try catch block.
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;

            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })

        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }




}









