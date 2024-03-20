const express = require('express');
const studentRoutes = require('./src/routes/routes');

const app = express();
const port = 3000;

//Middleware used to parse json data
app.use(express.json());

//Everything runs at localhost:3000/students
app.use('/students', studentRoutes);

//Serve static resources from the public directory
app.use(express.static("public"));

app.listen(port, () => console.log(`Server running at localhost:${port}/students`));