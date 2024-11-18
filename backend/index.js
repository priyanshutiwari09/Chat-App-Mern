const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");


const app = express();
dotenv.config();

app.use(express.json());
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

app.use('/user', userRouter);


app.get('/', (req, res) => {
  res.send('Hello!')
})

try {
    mongoose.connect(URI);
    console.log("Database Connected...")
  } catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})