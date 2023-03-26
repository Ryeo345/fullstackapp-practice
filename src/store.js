import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';


const subscribers = (state = [], action) => {
    if(action.type === 'SET_SUBSCRIBERS') {
        return action.subscribers;
    }
    if(action.type === 'CREATE_SUBSCRIBER') {
        return [...state, action.subscriber];
    }
    if(action.type === 'REMOVE_SUBSCRIBER') {
        return state.filter(subscriber => subscriber.id !== action.subscriber.id);
    }
    if(action.type === 'UPDATE_SUBSCRIBER') {
        return state.map(subscriber => {
            if (subscriber.id === action.subscriber.id) {
                return action.subscriber;
            }
            return subscriber;
        });
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
export const createSubscriber = (subscriber) => {
    return async(dispatch) => {
        const response = await axios.post('/api/subscribers', subscriber);
        dispatch({type: 'CREATE_SUBSCRIBER', subscriber: response.data})
    }
}

export const removeSubscriber = (subscriber) => {
    return async(dispatch) => {
        await axios.delete(`/api/subscribers/${subscriber.id}`);
        dispatch({type: 'REMOVE_SUBSCRIBER', subscriber});
    }
}

export const updateSubscriber = (subscriber) => {
    return async(dispatch) => {
        const response = await axios.put(`api/subscribers/${subscriber.id}`, subscriber);
        dispatch({ type: 'UPDATE_SUBSCRIBER',subscriber: response.data})
    }
}
const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;