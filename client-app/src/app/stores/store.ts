import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
    activityStore: ActivityStore
    commonStore: CommonStore
}

// Creates an instance of the store.
export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore()
}

// The context will provide the store to any components in the React component tree that need access to it.
export const StoreContext = createContext(store);

export function useStore() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContext(StoreContext);
}