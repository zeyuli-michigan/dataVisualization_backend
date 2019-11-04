﻿# dataVisualization_backend
 
 This backend was written using Node.js with Express.js, Mongoose
 
 To run the backend:
 1. Install a local MongoDB, set the connection address as mongodb://localhost:27017, set SSL=false, no user authentication
 2. Enter the project directory, run "npm install" to install all the dependencies
 3. run "node backend.js"
 
 The endback address is http://127.0.0.1:8081/.
 
 There are RESTful API implemented at the backend:
 1. GET "/data" get all the data records;
 2. POST "/data" {_id, x_value, y_value, type} modify the data record with _id
 3. DELETE "/data:id" delete teh record with _id=id
 4. PUT "/data" {x_value, y_value, type} add a new record of data
 5. GET "/data:id" get a single entry of data with _id=id
 
 
