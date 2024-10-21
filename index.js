import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import colors from 'colors'
import homeRouter from './routes/home.route.js'
import noteRouter from './routes/note.route.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import AuthRouter from './routes/AuthRouter.js'


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const PORT = 5002;

app.use('/', homeRouter);
app.use('/auth',AuthRouter);
app.use('/note',noteRouter);

app.listen(PORT, (req, res) => {
    console.log(`Server is listening at ${PORT}`.yellow.underline);
})