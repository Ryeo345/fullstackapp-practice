import React from 'react';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeSubscriber } from './store';

const Subscribers = () => {
    const {subscribers} = useSelector(state => state);
    const dispatch = useDispatch();
    return (
        <div>
            <ul id="list">
                {
                    subscribers.map(subscriber => {
                        return (
                            <li key={subscriber.id}>
                                <Link to = {`/subscriber/${subscriber.id}`}>{subscriber.name}</Link>
                                <button onClick={() => {
                                    dispatch(removeSubscriber(subscriber))
                                }}>Remove</button>
                                <hr />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}
export default Subscribers;