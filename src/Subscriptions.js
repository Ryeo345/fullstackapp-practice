import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSubscribers, fetchSubscriptions} from "./store";
import { useParams, useNavigate} from 'react-router-dom';

const Subscriptions = () => {
    const { subscriptions } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchSubscriptions());
    }, []);
    const { id } = useParams();
    return (
        <ul>
            {
                subscriptions.filter(subscription => id === subscriptions.subscriberId)subscriptions.map(subscription => {
                    return (
                        <li key={subscription.subscriberId}>
                            {subscription.name} <br />
                            {subscription.price} <br />
                        </li>

                    )
                })
            }
        </ul>
    )
}

export default Subscriptions;
