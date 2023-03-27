import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSubscriptions} from "./store";
import { useParams, useNavigate} from 'react-router-dom';

const Subscriptions = () => {
    const { subscriptions } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchSubscriptions());
    }, []);
    const { id } = useParams();
    return (
        // <hr />
        <ul>
            {
                subscriptions.filter(subscription => id === subscription.subscriberId).map(subscription => {
                    return (
                        <li key={subscription.id}>
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
