import React, { useState , useEffect} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateSubscriber } from './store';


const SubscriberUpdate = () => {
    const { id } = useParams();
    const { subscribers } = useSelector(state => state);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        const subscriber = subscribers.find(subscriber => subscriber.id === id);
        if(subscriber) {
            setName(subscriber.name);
        }
    }, [subscribers])

    const update = async(ev) => {
        ev.preventDefault();
        await dispatch(updateSubscriber({name, id}))
        navigate('/');
    }

    return (
        <form onSubmit = { update }>
            <input value={ name } onChange = {ev => setName(ev.target.value)}/>
            <button>Update Subscriber</button>
        </form>
    )
}

export default SubscriberUpdate;