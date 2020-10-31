const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//Get all TODO
function getTodos(req, res){
    //Get Data
    let data = require("./data.json");
    let response = { todos: data};
    res.send(response);
}

//Add new TODO
function addTodo(req, res){
    //Get Data
    let data = require("./data.json");
    console.log("Add TODO Request Comming In... ");

    //Get all TODO ID
    let allIds = data.map(function (todo) {
        return todo.id;
    });

    //Get last id + 1
    let maxId = Math.max.apply(Math, allIds) + 1;

    //Create new TODO object 
    let newTodo = {
        completed:req.body.completed,
        id: maxId,
        name:req.body.name,
    }

    //Add newTodo to data
    data.push(newTodo);

    //Return new response
    getTodos(req, res);

}

//Samaneh Vajdi Greeting for Nathan Homework
function svGreeting(req, res)  {
    res.send('Hi, I am Samaneh Vajdi. I use Node and Express for serving this content');
}

app.get('/', svGreeting);

app.get("/todo/", getTodos);
app.post("/todo/", addTodo);


function appStart(){
    console.log("To-Do-Api listening at "+ port);
}
app.listen(port, appStart);
