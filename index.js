// console.log('I am learning Node');
const express = require('express');
const app = express();
const port = 3000;

let data = require('./data.json');

app.listen(port, () => {
    console.log('app started on port: ' + port);
});

app.get('/', (req, res) => {
    let response = {
        todos: data
    };
    res.send(response);
});