import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSubscriptions, removeSubscription} from "./store";
import { useParams} from 'react-router-dom';

const Subscriptions = () => {
    const { subscriptions } = useSelector(state => state);
    const dispatch = useDispatch();
    // const [total, setTotal] = useState(0);
    useEffect(()=> {
        dispatch(fetchSubscriptions());
    }, []);
    const { id } = useParams();


    return (
        // <hr />
        <div>
            <ul id="details">
                {
                    subscriptions.filter(subscription => id === subscription.subscriberId).map(subscription => {
                        return (
                            <li key={subscription.id}>
                                {subscription.name} <br /> <br />
                                {`$`}{subscription.price} <br /> <br />
                                <button onClick = {() => dispatch(removeSubscription(subscription))}>
                                    x
                                </button>
                            </li>

                        )
                    })
                }
            </ul>

        </div>
    )
}

export default Subscriptions;
