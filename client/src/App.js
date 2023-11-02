import React from "react"
import { BrowserRouter as Router,  Routes, Route} from 'react-router-dom'
import list from "./components/list"
import Newemployee from "./components/new_employee"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path ="/list" Component={list}/>
        <Route exact path ="/Newemployee" Component={Newemployee}/>
      </Routes>
    </Router>
  );
}

export default App;
