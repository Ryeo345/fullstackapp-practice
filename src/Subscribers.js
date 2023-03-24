import React from 'react';
import { useSelector} from 'react-redux';
const Subscribers = () => {
    const {subscribers} = useSelector(state => state);
    return (
        <ul>
            {
                subscribers.map(subscriber => {
                    return (
                        <li key={subscriber.id}>
                            {subscriber.name}
                        </li>
                    )
                })
            }
        </ul>
    );
}
export default Subscribers;