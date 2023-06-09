import React, {useState} from 'react';
// import {useSelector} from 'react-redux';
import  {createSubscriber} from './store';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
const SubscriberCreate = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const create = async(ev) => {
            ev.preventDefault();
            await dispatch(createSubscriber({name}));
            setName('');
            navigate('/');
    }

    return (
        <form onSubmit = {create}>
            <input placeholder ="Add a Subscriber" value ={name} onChange = {ev => setName(ev.target.value)}/>
            <button>Create</button>
        </form>
    )
}
export default SubscriberCreate;