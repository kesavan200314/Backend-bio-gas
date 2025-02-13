import  Express  from "express";
import express from "express";
import cors from "cors";
import router from "./router/userRouter";

const app = express();


// app.use(cors({
//     origin: "*",  
//     credentials: true, 
//   }));
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from frontend
  methods: "GET,POST,PUT,DELETE",  // Allowed methods
  credentials: true                // Allow cookies/auth headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use Api
app.use('/api/users',router)

// Middleware to parse JSON
app.use(express.json());





// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});