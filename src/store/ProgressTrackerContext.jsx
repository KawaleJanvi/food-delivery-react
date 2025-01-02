import { createContext, useReducer } from "react";

export const ProgressTrackerContext = createContext({
    progress: 'checkout',
    hideCheckout: () => { },
    showCheckout: () => { },
    hideUserDetails: () => { },
    showUserDetails: () => { }
});

function progressTrackerReducer(progressState, progressAction) {
    switch (progressAction.type) {
        case 'HIDE_CHECK': progressState.progress='user';break;
        case 'HIDE_USER': progressState.progress='checkout';break;
        case 'SHOW_CHECK': progressState.progress='checkout';break;
        case 'SHOW_USER': progressState.progress='user';break;
    }
}

export function ProgressTrackerContextProvider({ children }) {
    const [progressState, progressActionDispatch] = useReducer(progressTrackerReducer, { progress: 'checkout' })

    function hideCheckout(){
        progressActionDispatch({type: 'HIDE_CHECK'});
    }

    function showCheckout(){
        progressActionDispatch({type: 'SHOW_CHECK'});
    }

    function hideUserDetails(){
        progressActionDispatch({type: 'HIDE_USER'});
    }

    function showUserDetails(){
        progressActionDispatch({type: 'SHOW_USER'});
    }

    const progressCtx = {
        progress: progressState,
        hideCheckout,
        showCheckout,
        hideUserDetails,
        showUserDetails
    }
    return (
        <ProgressTrackerContext.Provider value = {progressCtx}>
            {children}
        </ProgressTrackerContext.Provider>
    )
}