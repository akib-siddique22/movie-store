import express from "express"
import {PORT, mongoURL} from "./config.js"
import mongoose from 'mongoose';
import {Movie} from './models/movieModel.js';
import moviesRoute from './routes/moviesRoute.js';
import usersRoute from './routes/usersRoute.js'
import cors from 'cors';

const app = express();

//Middleware for request body
app.use(express.json());

//Middleware for CORS Policy
//Option 1: Allow All Origins
app.use(cors());
//Options 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', "DELETE"],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome Page');
});

app.use('/movies', moviesRoute);
app.use('/users', usersRoute);

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