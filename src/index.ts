import routes from './router'
const express = require('express');
const cors = require('cors');
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser())

const allowedOrigins = ['http://localhost:5173'];

// app.use(cors({
//     origin: allowedOrigins,
//     credentials: true,
// }));

app.use(cors({
    origin: 'http://localhost:5174', // Allow your frontend origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // If using cookies or authentication
  }));


app.use(express.json());

app.use("/api", routes)//user

app.listen(3000, () => {
    console.log('Server running on port 3000');
});