import express from 'express';
import { Movie } from '../models/movieModel.js';

const router = express.Router();

//Route to Save a new Movie
router.post("/", async (request, response) => {
    try{
        if(
         !request.body.title ||
         !request.body.director ||
         !request.body.publishYear
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
        };

        const movie = await Movie.create(newMovie);
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Get All Movies from Database
router.get('/', async (request, response) => {
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

// Route to Update a Movie
router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.director ||
            !request.body.publishYear
           ) {
               return response.status(400).send({
                   message: 'Send all required fields: title, director, pusblishYear'
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