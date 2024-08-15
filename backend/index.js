import express from "express"
import {PORT, mongoURL} from "./config.js"
import mongoose from 'mongoose';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome Page');
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