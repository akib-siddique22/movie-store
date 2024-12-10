import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [cartList, setCartList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const navigate = useNavigate();
    const [Token, setToken] = useState('');

    useEffect(() => {
        const token = document.cookie.split('; ')
        .find(row => row.startsWith('token='))
        .split('=')[1];
        if (token) {
        setToken(token)
        }
    
        axios.defaults.withCredentials = true;
        setLoading(true);

        axios
            .get('http://localhost:5555/users/getcart', { params: { Token: token } })
            .then((response) => {
                if (response) {
                    const itemsArray = Object.values(response.data);
                    setCartList(itemsArray);
                }   
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <h1>Cart Items</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartList.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.count}</td>
                                    <td>${item.price}</td>
                                    <td>${item.count * item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Checkout;