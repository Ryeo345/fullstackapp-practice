import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSubscribers} from './store';
import {Routes, Route} from 'react-router-dom';
import Subscribers from './Subscribers';
const App = () => {
    const { subscribers } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchSubscribers());
    }, []);
    return (
        <div>
            <h1>Subscribers ({ subscribers.length })</h1>
            <Routes>
                <Route path = '/' element = { <Subscribers />} />
            </Routes>
        </div>
    );
};

export default App;