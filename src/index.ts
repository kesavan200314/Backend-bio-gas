import bodyParser from 'body-parser';
import routes from './router/index'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { auth } from './utils/auth';

const app = express();

app.use(cookieParser())

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],  // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allow cookies if needed
}));

app.use(bodyParser.json());  

app.use(express.json());

app.use("/api",routes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});