import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import logo from '../images/logo.png'
import calendar from '../images/calendar.png'
import Employee from "./employee"

const List = () => {
    const navigate = useNavigate()

    const [listemployee, setlistemployee] = useState([{}])

    const [selecteddate, setselecteddate] = useState(new Date())
    const [opendate, setopendate] = useState(false)

    const getEmployees = async() =>{  
        try{
            fetch(`http://localhost:8000/getlist`).then(
            response => response.json()
            ).then(
                data => {
                setlistemployee(data)
            }
            )
        }catch (err) {
            console.error(err)
        }
    }

    useEffect(() => getEmployees, [])
    //console.log(listemployee)

    //Filter by creation date
    const filter = async() =>{   
        //because the month is a string in the datepicker component
        const month_number = selecteddate.getMonth()+1
        let formatted_date = selecteddate.getFullYear() + '-' + month_number + '-' + '0' + selecteddate.getDate()
        if(formatted_date.length != 10){
            formatted_date = formatted_date.toString().substring(0, 7) + '-' + formatted_date.toString().substring(9, 11)
        }
        //console.log(formatted_date)
        try{
            fetch(`http://localhost:8000/filterbydate/${formatted_date}`).then(
                response => response.json()
                ).then(
                    data => {
                    setlistemployee(data)
                }
                )
        }
        catch (err) {
            console.error(err)
        }
    }

    return(
        <div className="list_div">
            <div className="header_div">
                <p className="logo_name">ABC school</p>
                <img src={logo} alt="" className="logo_image"/>
            </div>
            <h2 className="title_list">List of employees</h2>
            <button className="filter" onClick={() => {setopendate(true)}}>
                <img src={calendar} alt="calendar" className="filter_image"/>
            </button>
            <button onClick={filter} className="filter_button">Filter</button>
            <div style={{display : opendate ? 'initial': 'none'}} className="filter_div_opendate">
                <DatePicker selected={selecteddate} onChange={(date) => {setselecteddate(date); setopendate(false)}} />
            </div>
            <button className="new_employee_button" onClick={()=>{navigate('/Newemployee')}}>new employee</button>
            <div className="table_header">
                <div className="table_div_text_header">
                    <p className="table_text_header">Last name</p>
                </div>
                <div className="table_div_text_header" style={{marginLeft: '22.5%'}}>
                    <p className="table_text_header">First name</p>
                </div>
                <div className="table_div_text_header" style={{marginLeft: '45.5%'}}>
                    <p className="table_text_header">Department</p>
                </div>
                <div className="table_div_text_header" style={{marginLeft: '68%'}}>
                    <p className="table_text_header">Creation date</p>
                </div>
            </div>
            <div className="table_div">
                {listemployee.map((employee) => (
                    <Employee key={employee.id} lastname={employee.lastname} firstname={employee.firstname} creationdate={employee.datecreated} department={employee.department}/>
                ))}
            </div>
        </div>
    )
}

export default List