import express, { response } from "express";
import cors from "cors";
import http, { request } from "http";
import mysql from "mysql";


const app = express();
const server = http.createServer(app);

app.use(cors({
    credentials:true,
    orgin:"*",
}));

app.use(express.json());

const connection = mysql.createConnection({
    host: "www.db4free.net",
    user:"vcentry",
    password:"test@123",
    database:"travelix",
    port:3306
})

connection.connect((error) => {
    if(error){
        throw error;
    }
    else{
        console.log("Mysql Server Connected");
    }
})

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

//car collection app:

 const carsList = [
    {
        name:"Audi",
        price:26325554,
        model:"x-3",
        color:"red",
        id:1
    },
    {
        name:"Benz",
        price:757525554,
        model:"x-3",
        color:"green",
        id:2
    },
    {
        name:"Bugtti",
        price:45525554,
        model:"x-3",
        color:"blue",
        id:3
    }
];


let employeeList = [
    {
        "employeeName": "Micahel",
        "designation":"SoftwaredeDeveloper",
        "inTime":"10:00 AM",
        "outTime":"20:00 PM",
        "Salary":"650000",
        id:1
    },
    {
        "employeeName": "vivin",
        "designation":"SoftwaredeDeveloper",
        "inTime":"10:00 AM",
        "outTime":"20:00 PM",
        "Salary":"550000",
        id:2
    },
    {
        "employeeName": "gijo",
        "designation":"SoftwaredeDeveloper",
        "inTime":"10:00 AM",
        "outTime":"20:00 PM",
        "Salary":"450000",
        id:3
    },
]

// url -http://localhost:5000/api/car/GetDetails(Get)
app.get("/api/car/GetDetails",(request,response) => {

    response.status(200).send(carsList);
});

// url -http://localhost:5000/api/car/PostDetails(Post)
app.post("/api/car/PostDetails",(request,response) => {
   const StudentsDetails = request.body;
   //how to add the new value in object:
   StudentsDetails.id = carsList.length + 1;
   carsList.push(StudentsDetails);

   response.status(200).send("SuccessFully Data Added");
});

// url -http://localhost:5000/api/car/DeleteDetails/2(Delete)
app.delete("/api/car/DeleteDetails/:id",(request,response) => {
   const id = request.params.id;
   const index = carsList.findIndex((value) => {
      return value.id == id;
   })
   carsList.splice(index,1);

   response.status(200).send("Data Deleted Successfully");
});


//employeelist
// Method - Get
// url - http://localhost:5000/api/get/employeeDetails

app.get("/api/get/employeeDetails",(request,response) => {
   
    response.status(200).send(employeeList);
});


// Method -Post
// url - http://localhost:5000/api/post/employeeDetails

app.post("/api/post/employeeDetails",(request,response) => {
    const employeeDetails = request.body;

   //how to add the new value in object:
    employeeDetails.id = employeeList.length + 1;
    employeeList.push(employeeDetails);

    response.status(200).send("SuccessFully Added the Data");
})


// Method -Delete
// url - http://localhost:5000/api/delete/employeeDetails/2


app.delete("/api/delete/employeeDetails/:id",(request,response) => {
  const incomingValue = request.params.id;
  //Normal Array Indexof and object of Array findeIndex
  const index = employeeList.findIndex((value) => {
    return value.id == incomingValue;
  })
  employeeList.splice(index,1);

  response.status(200).send("Employee Record has been Deleted")
})


//Method -Put
// url - http://localhost:5000/api/updtae/employeeDetails/2

app.put("/api/updtae/employeeDetails/:id",(request,response) => {
    const id = request.params.id;
    const incomingValueUpdate = request.body;

    if(incomingValueUpdate.name == "") {
        response.status(401).send("UserName is Invalid");
    }
    if(incomingValueUpdate.age == "") {
        response.status(401).send("Age is Invalid");
    }
    if(incomingValueUpdate.salary == "") {
        response.status(401).send("location is Invalid");
    }


    const index = employeeList.findIndex((value) => {
        return value.id == id;
      });

      employeeList[index] = incomingValueUpdate;

      response.status(200).send("Employee List has been Upadted..!")

})

const portNumber = 5000;

server.listen(portNumber,() => {
    console.log("Server is runing on port 5000")
});