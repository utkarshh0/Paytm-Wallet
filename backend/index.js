const express = require('express');
const cors = require("cors");
const rootRouter = require('./routes/index')

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors());

app.use(express.json());

app.use("/api/v1", rootRouter);


app.listen(3000, () => console.log("listening"));