import express from 'express';
import { User } from '../models/userModel.js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const router = express.Router();

//Sign up
router.post("/signup", async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Send all required fields: username, password'
            });
        }
        const newUser = {
            username: request.body.username,
            password: request.body.password,
        };

        const user = await User.create(newUser);

        return response.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Login
router.post('/login', async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Need to enter both your username and password'
            });
        }
        const usern = request.body.username
        const pass = request.body.password
        const user = await User.findOne({ username: usern })
        if (user) {
            if (user.password === pass) {
                const token = jwt.sign({_id: user._id}, process.env.SECRETjwt, { expiresIn: '1d'})
                response.cookie("token", token);
                response.json("Successfully Logged In")
            } else {
                response.json("Incorrect Details")
            }
        } else {
            response.json("Incorrect Details")
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router