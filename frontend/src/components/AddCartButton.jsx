import React from 'react'
import { BsCartPlus } from "react-icons/bs";
import { useState , useEffect } from "react";
import axios from 'axios';
import { useSnackbar } from 'notistack';


const AddCartButton = (movieid) => {
const [movieID, setmovieID] = useState('');
  const [Token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setmovieID(movieid.value)
    const token = document.cookie.split('; ')
    .find(row => row.startsWith('token='))
    .split('=')[1];
    if (token) {
      setToken(token)
    }
  }, []);

  const handleAddCart = () => {
    console.log('Button clicked!');
    console.log(Token)
    console.log(movieID)
    const data = {
      Token,
      movieID,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/users/addcart`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Added to Cart Successfully', {variant: 'success'});
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error has occured');
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      });
  };

  return (
    <button onClick={handleAddCart}>
    <BsCartPlus className="text-2xl text-green-600 hover:text-black"/>
    </button>
  )
}

export default AddCartButton