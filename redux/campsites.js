import * as ActionTypes from './ActionTypes';       // imports all action types

export const campsites = (state = { isLoading: true,                 //takes campsite section of state and initializes the defaults
                                    errMess: null,
                                    campsites: []}, action) => {        //action taken and new state created based on action, if no action matched, goes to previous state
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};

        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}

        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};