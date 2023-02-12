import React,{useEffect,useState} from "react";
import { useParams,useNavigate,Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon,MDBBtn } from 'mdb-react-ui-kit';
import EmployeeDataService from "../services/employee.service";

export default function Profile(){

  const[employee,setEmployee]=useState({})
  const {id} = useParams()
  const navigate=useNavigate()
  const { currentUser, linkEmailToGoogle} = useAuth();
  const [role,setRole]=useState({})
  const getEmployee = id => {
    EmployeeDataService.get(id)
      .then(response => {
        setEmployee(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  function getCurrnetUser(){
    EmployeeDataService.get(currentUser.uid)
      .then(response => {
        setRole(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  const deleteEmployee = () =>{
    EmployeeDataService.remove(id)
    .then(response => {
      console.log(response.id);
      navigate('/employees')

      
    })
    .catch(e => {
      console.log(e);
    });

  }
  
 async function gmail(){
  
  try {
    
    await linkEmailToGoogle(currentUser);
    alert("succed to link");
   
  } catch (e) {
    alert("Failed to link");
  }  
  }
  useEffect(() => {
  
   getCurrnetUser()

  },[]);

  useEffect(() => {
    if (id)
      {getEmployee(id);}
   getCurrnetUser()

  }, [id]);
  
  const element=<></>

 
    return(
    <section >
     
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100" style={{width: "100%"}}>
          <MDBCol lg="6" className="mb-4 mb-lg-0" >
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
              <MDBCol md="4" className="gradient-custom text-center text-white"
                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                <MDBTypography tag="h5"  style={{marginTop:"-28px",fontSize:"18px"}}>{employee.lastName} {employee.firstName}</MDBTypography>
                <MDBCardText style={{marginTop:"10px", marginBottom:"33px",fontSize:"16px"}}>{employee.job}</MDBCardText>
                {(role.role==="manager" || role.id===employee.id )&&<Link to={`/employees/${employee.id}/edit`}><MDBIcon far icon="edit mb-5" style={{marginRight:"9px", fontSize:"22px"}}/></Link> }
              {(role.role==="manager"&&role.id!=employee.id)&&<MDBIcon style={{fontSize:"22px"}}><i className="fa fa-trash"  
                onClick={()=>{ window.confirm('Are you sure you wish to delete this Profile?') && deleteEmployee() }} aria-hidden="true"/>
                </MDBIcon>}
              </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{employee.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">{employee.phone}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Date Of Birth </MDBTypography>
                        <MDBCardText className="text-muted"> {new Date(employee.birthDate).toLocaleDateString()}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Adress</MDBTypography>
                        <MDBCardText className="text-muted">{employee.adress}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Salary</MDBTypography>
                        <MDBCardText className="text-muted">{employee.salary} DZD</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    {role.id===employee.id&&<>
                    <MDBTypography tag="h6">Add a new connection with Gmail</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <div className="d-flex justify-content-start" style={{justifyItems:"center"}}>
                    
                    
                      <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={gmail}>
                     <MDBIcon  fab icon='google' size="sm"  style={{marginRight:"4px"}}/>
                        gmail
                    </MDBBtn>
                    </div></>}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
     
    </section>
    )
}