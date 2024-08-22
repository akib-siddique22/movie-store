import express from "express"
import {PORT, mongoURL} from "./config.js"
import mongoose from 'mongoose';
import {Movie} from './models/movieModel.js';
import moviesRoute from './routes/moviesRoute.js';

const app = express();

//Middleware for request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome Page');
});

app.use('/movies', moviesRoute);

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