import express from 'express';
import { Movie } from '../models/movieModel.js';
import jwt from 'jsonwebtoken'
import token from './usersRoute.js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const router = express.Router();

//Route to Save a new Movie
router.post("/", async (request, response) => {
    try{
        if(
         !request.body.title ||
         !request.body.director ||
         !request.body.publishYear ||
         !request.body.price
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, director, pusblishYear'
            });
        }
        const newMovie = {
            title: request.body.title,
            director: request.body.director,
            publishYear: request.body.publishYear,
            actors: request.body.actors,
            price: request.body.price,
        };

        const movie = await Movie.create(newMovie);

        return response.status(201).send(movie);
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

const verifyUser = (request, response, next) =>{
    const token = request.cookies.token;
    if(!token){
        return response.json("No token available")
    } else{
        jwt.verify(token, process.env.SECRETjwt, (err, decoded) => {
            if(err) return response.json("Wrong Token");
            next();
        })
    }
}

//Get All Movies from Database
router.get('/', verifyUser, async (request, response) => {
    try{
        const movies = await Movie.find({});

        return response.status(200).json({
            count: movies.length,
            data: movies
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Get One Movies from Database by id
router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const movie = await Movie.findById(id);

        return response.status(200).json(movie);
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export async function getMovieArray(movieIds) {
    try {
        const moviesStats = {};
        for (const id of movieIds) {
            const movie = await Movie.findById(id);
            if (movie) {
                if (moviesStats[id]) {
                    moviesStats[id].count++;
                } else {
                    moviesStats[id] = {
                        id: movie._id,
                        title: movie.title,
                        price: movie.price,
                        count: 1 // Initialize count to 1 for the first occurrence
                    };
                }
            }
        }

        return moviesStats;
    } catch (error) {
        console.error(error.message);
        throw new Error('Error while fetching movie stats');
    }
}

// Route to Update a Movie
router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.director ||
            !request.body.publishYear ||
            !request.body.price
           ) {
               return response.status(400).send({
                   message: 'Send all required fields: title, director, publishYear'
               });
           }

           const { id } = request.params;
           const result = await Movie.findByIdAndUpdate(id, request.body);

           if(!result){
             return response.status(404).json({message: 'Movie not found'})
           }

           return response.status(200).json({message: 'Movie successfully updated'})

    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to Update a Movie
router.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const result = await Movie.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Movie not found'})
          }

          return response.status(200).json({message: 'Movie successfully Deleted'})

    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router