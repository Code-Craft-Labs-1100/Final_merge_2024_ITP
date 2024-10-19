import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Nav.css';
import imageName from '../Nav/valampuri.png';
import right from '../Nav/right.svg';
import telephone from '../Nav/telephone.svg';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom';
function Nav() {






  return (

    


    <div>




      <div id="header10">


       
    
        <img src={imageName} alt="valampuri" class="image1" height="75px"></img>
       
        <span id="header">Best Rate Gurantee
          <img src={right} alt="right" height="20px" width="20px"></img>
          <img src={telephone} alt="telephone" height="30px" width="30px" class="telephone"></img>
          <span className="english">ENG</span>
          <div class="btn">
            <button class="booknow" role="button">Book Now</button>
          </div>
        </span>
     
      
      </div>
      <ul class="nav nav-pills">
  
        <Link to="/mainhome" className="active home-a">
          <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
        </Link>
        <Link to="/Accomodation" className="active accomodation-a">
          <li class="nav-item"><a href="#" class="nav-link">Accomodation</a></li>
        </Link>
        <Link to="/dining" className="active dining-a">
          <li class="nav-item"><a href="#" class="nav-link">Dining</a></li>
        </Link>
        <Link to="/wedding" className="active wedding-a">
          <li class="nav-item"><a href="#" class="nav-link">Wedding</a></li>
        </Link>
        <Link to="/Offers" className="active offers-a">
          <li class="nav-item"><a href="#" class="nav-link">Offers</a></li>
        </Link>
        <Link to="/About" className="active about-a">
          <li class="nav-item"><a href="#" class="nav-link">About</a></li>
          </Link>

      </ul>

      
    
       
      
    </div>
       
  );
}

export default Nav;
