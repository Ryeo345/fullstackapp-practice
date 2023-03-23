import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';


const subscribers = (state = [], action) => {
    if(action === 'SET_SUBSCRIBERS') {
        return action.subscribers;
    }
    return state;
}

const reducer = combineReducers({
    subscribers: subscribers
})

export const fetchSubscribers = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/subscribers');
        dispatch({type: 'SET_SUBSCRIBERS', subscribers: response.data})
    }
}
const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;