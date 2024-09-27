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
    loadingInitial = false;

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
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
            this.setActivity(activity);
            this.setLoadingInitial(false);
        })
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => this.selectedActivity = activity);
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);                                                                                                                   
    }

    // If We do not use this action we need to apply the runInAction function in the try catch block.
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
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









