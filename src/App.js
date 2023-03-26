import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSubscribers} from './store';
import {Routes, Route, Link} from 'react-router-dom';
import Subscribers from './Subscribers';
import SubscriberCreate from './SubscriberCreate';
const App = () => {
    const { subscribers } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchSubscribers());
    }, []);
    return (
        <div>
            <h1><Link to ='/'>Subscribers ({ subscribers.length })</Link></h1>
            <Link to ='/subscribers/create'>Add a Subscriber</Link>
            <Routes>
                <Route path = '/' element = { <Subscribers />} />
                <Route path = '/subscribers/create' element = { <SubscriberCreate />} />
            </Routes>
        </div>
    );
};

export default App;