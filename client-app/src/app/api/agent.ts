// This code creates an agent object for interacting with an API, using the axios library to make HTTP requests. 
import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";

// This Axios interceptor introduces a 1-second delay before returning any response from the server.
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}


// "axios" is a JS library used to make HTTP requests to APIs.
axios.defaults.baseURL = 'http://localhost:5000/api';

// Error handling is included to log errors if something goes wrong and reject the promise with the error.
axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
    },  (error: AxiosError) => {
        const { data, status, config } = error.response as AxiosResponse;
        switch (status) {
            case 400:
                if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                    router.navigate('/not-found');
                }
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key])
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                toast.error('unauthorized')
                break;
            case 403:
                toast.error('forbidden')
                break;
            case 404:
                router.navigate('/not-found')
                break; 
            case 500:
                store.commonStore.setServerError(data);
                router.navigate('/server-error');
                break; 
            }

            return Promise.reject(error);
    } )


// <T> means that the function can handle responses with different types of data.
// TypeScript generics (<T>) to make the API request functions more flexible and type-safe. 
const responseBody = <T> (response: AxiosResponse<T>) => response.data;
 
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = { // this will directly update, del, create the activity in the database. 
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`),

}

const agent = {
    Activities
}

export default agent;
