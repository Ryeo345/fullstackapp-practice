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
            navigate('/');
    }

    return (
        <form onSubmit = {create}>
            <input placeholder ="enter name" value ={name} onChange = {ev => setName(ev.target.value)}/>
            <button>Create</button>
            {name}
        </form>
    )
}
export default SubscriberCreate;