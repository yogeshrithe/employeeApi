const express = require("express");
const app = express();
const cors = require('cors');
const EmployeeApi=require('./api/employee.api')

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

app.use("/employees",EmployeeApi)

app.listen(3000, function () {
    console.log("Server started on port 3000");
  });