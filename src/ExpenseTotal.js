import React from 'react';
import {useSelector} from 'react-redux';


const expenseTotal = () => {
    const { total } = useSelector(state => state);
    return (
        <p>
            total: $
        </p>
    )
}

export default expenseTotal;