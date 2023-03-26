import React from 'react';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeSubscriber } from './store';

const Subscribers = () => {
    const {subscribers} = useSelector(state => state);
    const dispatch = useDispatch();
    return (
        <ul>
            {
                subscribers.map(subscriber => {
                    return (
                        <li key={subscriber.id}>
                            <Link to = {`/subscribers/${subscriber.id}`}>{subscriber.name}</Link>
                            <button onClick={() => {
                                dispatch(removeSubscriber(subscriber))
                            }}>Remove</button>
                            <hr />
                        </li>
                    )
                })
            }
        </ul>
    );
}
export default Subscribers;