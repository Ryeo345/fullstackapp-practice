import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSubscribers} from './store';
import {Routes, Route, Link} from 'react-router-dom';
import Subscribers from './Subscribers';
import SubscriberCreate from './SubscriberCreate';
import SubscriberUpdate from "./SubscriberUpdate";
import Subscriptions from "./Subscriptions";
const App = () => {
    const { subscribers } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchSubscribers());
    }, []);
    return (
        <div>
            <h1><Link to ='/'>Subscribers ({ subscribers.length })</Link></h1>
            <SubscriberCreate />
            <Routes>
                <Route path = '/' element = { <Subscribers />} />
                <Route path = '/subscriber/:id' element = {
                    <div>
                        < SubscriberUpdate />
                        < Subscriptions />
                    </div>
                } />
            </Routes>
        </div>
    );
};

export default App;