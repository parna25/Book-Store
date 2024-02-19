import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';
const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: Allow all origins with default of cors(*)
app.use(cors());
//Option 2: Allow custom origin
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ['GET','POST','PUT','DELETE'],
//     allowHeaders: ['Content-Type'],
// }))

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to mern");
});

//middleware for the routes
app.use('/books',booksRoute);


// app.listen(PORT,()=>{
//     console.log(`app is listening: ${PORT}`);
// });
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to the database");
    app.listen(PORT, () => {
      console.log(`app is listening: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
