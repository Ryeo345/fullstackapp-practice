import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSubscribers} from './store';
const App = () => {
    const { subscribers } = useSelector(state => state);
    const dispatch = useDispatch();
    // const [Subscribers, setSubscribers] = useState([]);
    useEffect(()=> {
        dispatch(fetchSubscribers());
    }, []);
    return (
        <h1>Subscribers ({ subscribers.length })</h1>
    );
};

export default App;