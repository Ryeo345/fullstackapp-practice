import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSubscribers} from './store';
import {Routes, Route, Link} from 'react-router-dom';
import Subscribers from './Subscribers';
import SubscriberCreate from './SubscriberCreate';
import SubscriberUpdate from "./SubscriberUpdate";
import Subscriptions from "./Subscriptions";
import SubscriptionCreate from "./SubscriptionCreate";
const App = () => {
    const { subscribers } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchSubscribers());
    }, []);
    return (
        <div>
            <h1><Link to ='/'>Subscribers ({ subscribers.length })</Link></h1>
            <Routes>
                <Route path = '/' element = {
                    <div>
                        <SubscriberCreate />
                        <Subscribers />
                    </div>
                    } />
                <Route path = '/subscriber/:id' element = {
                    <div>
                        < SubscriberUpdate />
                        < hr />
                        < Subscriptions />
                        < hr />
                        < SubscriptionCreate />
                    </div>
                } />
            </Routes>
        </div>
    );
};

export default App;