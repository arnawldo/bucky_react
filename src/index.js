import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import registerServiceWorker from './registerServiceWorker';
import storeFactory from "./store/index";
import App from "./App";


registerServiceWorker();

const initialData = {
    bucketlists: [],
    user: {},
    searchedBucketLists: [],
    notifications: []
};

const store = storeFactory(initialData);

window.React = React;
window.store = store;


render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();