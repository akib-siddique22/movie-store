import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export const PORT = 5555;
export const mongoURL = process.env.BACK_URI;
