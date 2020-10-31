const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//Get all TODO
function getTodos(req, res){
    //Get Data
    let data = require("./data.json");
    console.log("Get TODO Request Comming In... ");
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
    let response = { todos: data};
    res.send(response);

}

//Edit TODO
function editTodo(req, res){
    //Get Data
    let data = require("./data.json");
    console.log("Edit TODO Request Comming In... ");

    //Get all TODO with modified TODO
    data = data.map(function (todo) {
        if (todo.id === req.body.id) {
            todo.name = req.body.name;
            todo.completed = req.body.completed;
        }
        return todo;
    });

    //Return new response
    let response = { todos: data};
    res.send(response);

}

//Delete TODO
function deleteTodo(req, res){
    //Get Data
    let data = require("./data.json");
    console.log("Delete TODO Request Comming In... ");
    //remove TODO using id
    data = data.filter(function (todo) {
        if (todo.id != req.body.id) {
            return todo;
        }
    });

    //Return new response
    let response = { todos: data};
    res.send(response);
}

//Samaneh Vajdi Greeting for Nathan Homework
function svGreeting(req, res)  {
    res.send('Hi, I am Samaneh Vajdi. I use Node and Express for serving this content');
}

app.get('/', svGreeting);

app.get("/todo/", getTodos);
app.post("/todo/", addTodo);
app.put("/todo/", editTodo);
app.delete("/todo/", deleteTodo);


function appStart(){
    console.log("To-Do-Api listening at "+ port);
}
app.listen(port, appStart);
