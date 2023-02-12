import React, { useState,useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import EmployeeDataService from "../services/employee.service";


export default function Navbar(){
    const [showNavText, setShowNavText] = useState(false);
    const navigate = useNavigate();
    const { logout, setError } = useAuth();
    const { currentUser} = useAuth();
    const [role,setRole]=useState({})
    
    function getCurrnetUser(){
      EmployeeDataService.get(currentUser.uid)
        .then(response => {
          setRole(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    
  
  useEffect(() => {
    if(currentUser){
    getCurrnetUser()
    }
   },[]);
   
    async function handleLogout() {
      try {
    
        await logout();
        navigate('/login')
       
      } catch (e) {
        alert("Failed to logout");
      }
    
    }
  

    return(
        <MDBNavbar expand='lg' dark bgColor='dark'>
        <MDBContainer fluid>
        <MDBNavbarBrand tag={Link} to='/employees' >Employees Mangement</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavText(!showNavText)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

         {currentUser&&<MDBCollapse show={showNavText} navbar id='navbarColor02'>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
              <MDBNavbarLink aria-current='page' tag={Link} to='/employees'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
             
              <MDBNavbarItem>
              <MDBNavbarLink tag={Link} to={`/employees/${currentUser.uid}`}>Profile </MDBNavbarLink>
              </MDBNavbarItem>
             
             {role.role==="manager" && <MDBNavbarItem>
              <MDBNavbarLink tag={Link} to='/employees/createEmployee'>Create Employee</MDBNavbarLink>
              </MDBNavbarItem> }  
              
                    
            </MDBNavbarNav>
            <i className='fa fa-sign-out'  onClick={handleLogout} style={{fontSize:"23px", color:"white", marginRight:"13px"}} aria-hidden="true"/>

          </MDBCollapse>
            } 
        </MDBContainer>
        
      </MDBNavbar>
        

    )
}