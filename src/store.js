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

const subscriptions = (state = [], action) => {
    if(action.type === 'SET_SUBSCRIPTIONS') {
        return action.subscriptions;
    }
    if( action.type ==='REMOVE_SUBSCRIPTION') {
        return state.filter(subscription => subscription.id !== action.subscription.id)
    }
    return state;
}

const reducer = combineReducers({
    subscribers: subscribers,
    subscriptions: subscriptions
})

export const fetchSubscribers = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/subscribers');
        dispatch({type: 'SET_SUBSCRIBERS', subscribers: response.data})
    }
}
export const fetchSubscriptions = (id) => {
    return async(dispatch) => {
        const response = await axios.get(`/api/subscribers/${id}`);
        console.log(response.data)
        dispatch({type: 'SET_SUBSCRIPTIONS', subscriptions: response.data.subscriptions})
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

export const removeSubscription = (subscription) => {
    return async(dispatch) => {
        await axios.delete(`api/subscriptions/${subscription.id}`);
        dispatch({type: 'REMOVE_SUBSCRIPTION', subscription});
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