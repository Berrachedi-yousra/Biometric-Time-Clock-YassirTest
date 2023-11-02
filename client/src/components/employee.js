const Employee = ({lastname, firstname, department, creationdate}) => {
   
    return(
        <div className="employee_div">
            <div className="table_div_text_header">
                <p className="table_text">{lastname}</p>
            </div>
            <div className="table_div_text_header" style={{marginLeft: '22.5%'}}>
                <p className="table_text">{firstname}</p>
            </div>
            <div className="table_div_text_header" style={{marginLeft: '45.5%'}}>
                <p className="table_text">{department}</p>
            </div>
            <div className="table_div_text_header" style={{marginLeft: '68%'}}>
                <p className="table_text">{creationdate}</p>
            </div>
        </div>
    )
}

export default Employee