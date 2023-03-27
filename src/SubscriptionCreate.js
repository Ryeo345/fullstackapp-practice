import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from  'react-router-dom';
import {createSubscription} from "./store";

const SubscriptionCreate = () => {
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const names = [ "NETFLIX","HULU", "DISNEY+"];
    const prices =[15.99, 14.99, 11.99];

    const create = async(ev) => {
        ev.preventDefault();
        const subscriberId = id;
        const newSub = {name, price, subscriberId}
        console.log(newSub);
        await dispatch(createSubscription(newSub));
    }

    return (
        <form onSubmit = {create}>
            <select value={name} onChange = {(ev) => setName(ev.target.value)}>
                <option value ="">Add a Subscription</option>
                {
                    names.map(l => {
                        return (
                            <option value ={l} key={l}>{l}</option>
                        )
                    })
                }
            </select>
            <select value={price} onChange = {(ev) => setPrice(ev.target.value)}>
                <option value ="">Price</option>
                {
                    prices.map(p => {
                        return (
                            <option value ={p} key={p}>{p}</option>
                        )
                    })
                }
            </select>
            <button>Subscribe</button>
        </form>
    )
}

export default SubscriptionCreate;