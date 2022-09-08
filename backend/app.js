import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";

const app = express();

//midleware
// app.use('/', (req, res, next) => {
//     res.send('Hello World')
// })

//to show the type of file the database is receiving
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.txptka6.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(8000))
  .then(() =>
    console.log("connected TO Database and listening to localhost port 5000")
  )
  .catch((err) => console.log(err));
// app.listen(5000)
