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
        <div className="flex justify-center items-center h-screen">
          {loading ? (
            <Spinner />
          ) : (
            <div style={{ width: '60%' }}>
              <h1 style={{ textAlign: 'center' }}>Cart</h1>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Movie</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartList.map((item, index) => (
                    <tr key={item.id} style={{ background: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                      <td style={{ textAlign: 'center', padding: '8px' }}>
                        {item.title}
                      </td>
                      <td style={{ padding: '8px' }}>{item.count}</td>
                      <td style={{ padding: '8px' }}>${item.price}</td>
                      <td style={{ padding: '8px' }}>${item.count * item.price}</td>
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