import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransportHome from "./component/Transport/transportHome";
import Addtranport from "./component/Transport/addtranport";
import ComplaintForm from './complainnts/ComplaintsCreate';
import ComplaintsView from './complainnts/ComplaintsView';
import ReplyComplaint from './complainnts/ReplyComplaint';
//juthmini
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/transportHome" element={<TransportHome />} />
          <Route path="/addtranport" element={<Addtranport />} />
          <Route path='/addcomplaints' element={<ComplaintForm/>} />
          <Route path='/allcomplaints' element={<ComplaintsView/>} />
           <Route path='/reply-complaint/:id' element={<ReplyComplaint/>} />
         
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
