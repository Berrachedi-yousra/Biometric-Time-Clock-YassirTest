//Import packages
const http = require('http');
const express = require("express");
const app = express()
require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const pool = require('./pg');
const cors = require('cors')

app.use(cors())
app.use(express.json())

//Server port is 8000
const port = process.env.PORT || 8000; 
const server = http.createServer(app);

//Create a new employee
app.post('/newemployee/:lastname/:firstname/:department', async(req, res) => {
    //Read parameters passed from the input fields
    const lastname = req.params.lastname
    const firstname = req.params.firstname
    const department = req.params.department
    const creationdate = new Date()
    //Generate a new id for the new employee data row
    const id = uuidv4()
    try{
        await pool.query("insert into employee (id, lastname, firstname, datecreated, department) values ($1, $2, $3, $4, $5)", [id, lastname, firstname, creationdate, department])
        //console.log("new employee's account is created! ", lastname, firstname, department)
    }catch (err) {
        console.error(err)
    } 
})

//Get a list of all employees with their information
app.get('/getlist', async(req, res) => {
    try{
        const employees = await pool.query('select * from employee')
        //console.log(employees.rows)
        res.json(employees.rows) 
    }catch (err) {
        console.error(err)
    } 
})

//Filter by date of creation
app.get('/filterbydate/:creationdate', async(req, res) => {
    let creationdate = req.params.creationdate
    //console.log(creationdate)
    try{
        const filtered_employees = await pool.query('select * from employee where cast(datecreated as text) = $1', [creationdate])
        //console.log(filtered_employees.rows)
        res.json(filtered_employees.rows) 
    }catch (err) {
        console.error(err)
    } 
})

//Checkin: create a new activity line when the employee checks in
app.post('/check-in/:employeeId/:comment', async(req, res) => {
    const id = uuidv4()
    const employeeId = req.params.employeeId
    const comment = req.params.comment
    const date_checkin = new Date()
    try{
        await pool.query("insert into activity (id, employee_identifier, checkin, comment) values ($1, $2, $3, $4)", [id, employeeId, date_checkin, comment])
        res.json(filtered_employees.rows) 
    }catch (err) {
        console.error(err)
    } 
})

//Check-out: here the checkin activity will be modified for it to be in the same day for check-in
//so first get the checkin data row respectively, then update it and replace the comment since only one comment can be saved in the database according to the project description (the excel file that the school uses)
//Finaly, calculate the time difference between the checkin and checkout, then save it in the database
app.post('/check-out/:employeeId/:comment', async(req, res) => {
    const employeeId = req.params.employeeId
    const comment = req.params.comment
    try{
        await pool.query("update activity set checkout = now(), comment = $1 where employee_identifier = $2 and EXTRACT('MONTH' FROM checkin) = EXTRACT('MONTH' FROM now()) and EXTRACT('DAY' FROM checkin) = EXTRACT('DAY' FROM now()) and EXTRACT('YEAR' FROM checkin) = EXTRACT('YEAR' FROM now())", [comment, employeeId])
        await pool.query("update activity set time_difference = (now() - (select checkin from activity where employee_identifier = $1 and EXTRACT('MONTH' FROM checkin) = EXTRACT('MONTH' FROM now()) and EXTRACT('DAY' FROM checkin) = EXTRACT('DAY' FROM now()) and EXTRACT('YEAR' FROM checkin) = EXTRACT('YEAR' FROM now())))", [employeeId])
    }catch (err) {
        console.error(err)
    } 
})

server.listen(port);