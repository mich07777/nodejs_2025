import express, { response } from "express";
import cors from "cors";
import http, { request } from "http";


const app = express();
const server = http.createServer(app);

app.use(cors({
    credentials:true,
    orgin:"*",
}));

app.use(express.json());

//API WRITE CODE HERE:

// API URL -> http://localhost:5000/api/welcome

// get mthod

app.get("/api/welcome",(request,response) => {
    response.status(200).send("hey your API");
});



// post method
// API URL -> http://localhost:5000/api/create/user

app.post("/api/create/user",(request,response) => {
    console.log(request.body);
    response.status(200).send("Suceess");
})



// CRUD - create,Read,Update,Delete
let studentList = [
    {
        name:"Michael",
        age:26,
        salary:600000,
        id:1
    },
    {
        name:"queen",
        age:16,
        salary:600000,
        id:2
    },
    {
        name:"Mi",
        age:6,
        salary:600000,
        id:3
    },
    {
        name:"racael",
        age:26,
        salary:600000,
        id:4
    }
]
//Method: Get
// url - http://localhost:5000/api/list/students

app.get("/api/list/students",(request,response) => {


    response.status(200).send(studentList);
})

//Method:post
// url- http://localhost:5000/api/list/details
// payload

// {
//     name:"",
//     age:0,
//     location:""
// }

app.post("/api/list/details",(request,response) => {

    let incomingValue = request.body;
    incomingValue.id = studentList.length + 1;
    studentList.push(incomingValue);

    response.status(200).send("Students Record has been Created");

})

// method:delete
// url-http://localhost:5000/api/delete/details/2

app.delete("/api/delete/details/:id",(request,response) => {
    const id = request.params.id;
    const index = studentList.findIndex((value)=> {
        return value.id == id;
    });
    studentList.splice(index,1);

    response.status(200).send("Studnets Record Deleted")
})

const portNumber = 5000;

server.listen(portNumber,() => {
    console.log("Server is runing on port 5000")
});