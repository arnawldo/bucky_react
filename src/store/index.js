import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import {bucketlists, user, searchedBucketLists, notifications, bucketPaginator} from "./reducers";

// Middle-ware for logging actions that are dispatched
const logger = store => next => action => {
    if (action.type) {
        let result;
        console.groupCollapsed("dispatching", action.type);
        console.log('prev state', store.getState());
        console.log('action', action);
        result = next(action);
        console.log('next state', store.getState());
        console.groupEnd();
        return result
    } else {
        return next(action)
    }
};

// Middle-ware for saving current state in browser storage
const saver = store => next => action => {
    let result = next(action);
    localStorage['redux-store'] = JSON.stringify(store.getState());
    return result
};



const storeFactory = (initialState = {}) =>
    applyMiddleware(logger, saver, thunk)(createStore)(
        combineReducers({ bucketlists, user, searchedBucketLists, notifications, bucketPaginator}),
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) :
            initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()|| compose
    );

export default storeFactory
