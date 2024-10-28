import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import MoviesCard from '../components/home/MoviesCard';
import MoviesTable from '../components/home/MoviesTable';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const navigate = useNavigate();
    useEffect(() => {
        axios.defaults.withCredentials = true;
        setLoading(true);
        axios.get()

        axios
            .get('http://localhost:5555/movies')
            .then((response) => {
                if(response.data === "No token available"){
                    navigate('/signup')
                }
                setMovies(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    const SignOut = () => {
        document.cookie = 'token=; Max-Age=-1; path=/';
        navigate('/signup');
    };
    return (
        <div className='p-4'>
            <div className = 'flex justify-center items-center gap-x-4'>
                <button
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-1g'
                    onClick={() => setShowType('table')}
                >
                    Table
                </button>
                <button
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-1g'
                    onClick={() => setShowType('card')}
                >
                    Card
                </button>
            </div>
            
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Movies List</h1>
                <Link to='/movies/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ?  <Spinner /> : showType === 'table' ? (<MoviesTable movies={movies} />): (<MoviesCard movies={movies}/>)}

            <button
                className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded absolute top-4 right-4'
                onClick={SignOut}
            >
                Sign Out
            </button>
        </div>
    )
}

export default Home