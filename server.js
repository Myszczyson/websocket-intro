const express = require('express');
const app = express()
const path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.listen(8000);