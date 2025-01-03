import express from "express";
import cors from "cors";
import http from "http";


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
    console.log(response);
    response.status(200).send("Suceess");
})

const portNumber = 5000;

server.listen(portNumber,() => {
    console.log("Server is runing on port 5000")
});