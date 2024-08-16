import express from "express"
import {PORT, mongoURL} from "./config.js"
import mongoose from 'mongoose';
import {Movie} from './models/movieModel.js';

const app = express();

//Middleware for request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome Page');
});

//Route to Save a new Movie
app.post("/movies", async (request, response) => {
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
app.get('/movies', async (request, response) => {
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

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log('Connected to Database')    
        //Express server if database is ran successfully
        app.listen(PORT, () =>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    }); 