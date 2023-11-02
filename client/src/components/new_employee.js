import { useEffect, useState } from "react";
import logo from '../images/logo.png'

const Newemployee = () => {

    const [newemployee, setnewemployee] = useState(false)
    const [inputmessage, setinputmessage] = useState(false)

    const [lastname, setlastname] = useState('');

    const handleLastname = event => {
        setlastname(event.target.value);
    }

    const [firstname, setfirstname] = useState('');

    const handleFirstname = event => {
        setfirstname(event.target.value);
    }

    const [department, setdepartment] = useState('Department A');

    const handleDepartment = event => {
        setdepartment(event.target.value);
    }

    const newEmployee = async() =>{  
        try{
            if(lastname != '' && firstname != '' && department != ''){
                fetch(`http://localhost:8000/newemployee/${lastname}/${firstname}/${department}`, {
                    method: "POST"
                })
                setinputmessage(false)
                setnewemployee(true)
            }
            else{
                setinputmessage(true)
            }
        }catch (err) {
            console.error(err)
        }
    }
   
    return(
        <div className="list_div">
            <div className="school_information">
                <img src={logo} alt="logo" className="school_information_logo"/>
                <h3 className="school_information_title">ABC school</h3>
                <p className="school_information_text">Test de recrutement pour le poste de full stack developer chez Yassir</p>
            </div>
            <div className="signin_div">
                <h3 className="signin_title">Create new employee account</h3>
                <input type="text" className="input" name="lastname" placeholder="last name" onChange={handleLastname} required/>
                <input type="text" className="input" name="firstname" placeholder="first name" onChange={handleFirstname} required/>
                <select onChange={handleDepartment} className="input">
                    <option value="Department A">Department A</option>
                    <option value="Department B">Department B</option>
                    <option value="Department C">Department C</option>
                </select>
                <button className="input_submit" onClick={newEmployee}>Create account</button>
                <div style={{display: newemployee ? 'initial' : 'none'}} className="orange_text">
                    <p>Employee account created!</p>
                </div>
                <div style={{display: inputmessage ? 'initial' : 'none'}} className="orange_text">
                    <p>Veuillez remplir tous les champs</p>
                </div>
            </div>
        </div>
    )
}

export default Newemployee