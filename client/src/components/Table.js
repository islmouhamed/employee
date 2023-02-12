import React, { useState, useEffect } from "react";
import {DataGrid,GridToolbarFilterButton,GridToolbarContainer,GridToolbarColumnsButton} from "@mui/x-data-grid";
import EmployeeDataService from '../services/employee.service'
import { Link} from "react-router-dom";

//import { useDemoData } from "@mui/x-data-grid-generator";

const columns = [
  { field: 'firstName', headerName: 'First Name', },
  { field: 'lastName', headerName: 'Last Name',  },
  { field: 'phone', headerName: 'Phone', },
  { field: 'adress', headerName: 'Adress'},
  { field: 'birthDate', headerName: 'Birth Date',maxWith:300},
  { field: 'gender', headerName: 'Gender'},
  { field: 'job', headerName: 'Job Title',maxWith:300},
  { field: 'salary', headerName: 'Salary'},
  { field: 'email', headerName: 'Email',maxWith:300},
  { field: 'role', headerName: 'Role',maxWith:300},
  {  headerName: 'Action',renderCell:(params)=>{return(
   
     <div>
      <Link to={`/employees/${params?.row.id}`} style={{marginLeft:"15px",fontSize:"15px",color: "#1976d2"}} ><i class="fa fa-eye" aria-hidden="true"/>
      </Link>
     </div>
      
      
  )}},
   
]

export default function Table(){
  const [data,setData] = useState({});
 

  const retrieveEmployees = () => {
    EmployeeDataService.getAll()
      .then(response => {
        setData(response.data);
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveEmployees();
  }, []);

 

    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
          </GridToolbarContainer>
        );
      }
     
    
    return (
    
    <div style={{ height: 400, width: "100%", marginTop:"50px", paddingLeft:"20px",paddingRight:"20px" }}>
      <h2 style={{textAlign:"center", marginBottom:"20px"}}> Employees List </h2>
      <DataGrid 
      key={data.id}
       disableSelectionOnClick={true}
        pageSize={5}
        rows={data}
        columns={columns}
        components={{ Toolbar: CustomToolbar, scrolToIndex: false }}
      />
  
    </div>
   
    )
}