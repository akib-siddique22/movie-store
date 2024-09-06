import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';

const Login = () => {
  const [username, setUser] = useState('')
  const [password, setPass] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const Submission = (e) => {
    e.preventDefault()
    const data = {
      username,
      password,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/users/login', data)
      .then(result => {
        //console.log(result)
        if(result.data == "Successfully Logged In"){
          setLoading(false);
          enqueueSnackbar('Logged In Successfully', {variant: 'success'});
          navigate('/');
        }else if(result.data == "Incorrect Details"){
          setLoading(false);
          enqueueSnackbar("Incorrect Details", {variant: 'error'});
          navigate('/signup');
        }
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error has occured');
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      });
    };
  return (
    <div className="flex justify-center items-center h-screen">
    {loading ? <Spinner />: ''}
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      <form>
        <div className="mb-4">
          <label form="username" className="block text-sm font-medium text-gray-700">USERNAME</label>
          <input type="text" className="form-input mt-1 block w-full h-10 rounded-md shadow-sm border border-black px-3" onChange={(e) => setUser(e.target.value)}/>
        </div>

        <div className="mb-4">
          <label form="password" className="block text-sm font-medium text-gray-700">PASSWORD</label>
          <input type="password" className="form-input mt-1 block w-full h-10 rounded-md shadow-sm border border-black px-3" onChange={(e) => setPass(e.target.value)}/>
        </div>

        <div className="mb-6">
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={Submission}>Login</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login