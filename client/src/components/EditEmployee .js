import React,{useState,useEffect} from "react";
import { MDBInput,MDBRadio } from 'mdb-react-ui-kit';
import EmployeeDataService from '../services/employee.service'
import Alert from '@mui/material/Alert';
import { useParams,useNavigate,Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function EditEmployee(){
 
  const {id} = useParams()
  const navigate=useNavigate()
  
const[formData,setFormData] = useState({})
const[formErrors,setFormErrors] = useState({})
const[isSubmit,setisSubmit] = useState(false)
let[message,setMessage]=useState("")
const [role,setRole]=useState({})
const { currentUser, linkEmailToGoogle} = useAuth();

const getEmployee = id => {
  EmployeeDataService.get(id)
    .then(response => {
      setFormData(response.data);
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

useEffect(() => {
  
  getCurrnetUser()

 },[]);
function handelChange (event) {
  const {name,value} = event.target
  setFormData(prevFormData => {
      return {
          ...prevFormData,
          [name]: value 
          
      }
      
      
  } )
  
 

}


function handelSubmit (event){
  event.preventDefault()
  //seting the form errors 
  const error=validate(formData)

  if(Object.keys(error).length!==0) {return setFormErrors(error)}
  
     EmployeeDataService.update(formData.id, formData)
      .then(response => {
          console.log(response.data);
          setisSubmit(true)
        navigate(`/employees/${formData.id}`)
        
      })
      .catch(e => {
        setMessage(e.response.data.message);
      });
   
  }
  
      



 // checkin if the formerros is 0 and the submit is true to submit the form
 useEffect(()=>{
  if (id)
  getEmployee(id);
 
  if(Object.keys(formErrors).length===0 && isSubmit){
     setFormErrors()
  }
},[formErrors,id])

function validate (values){
  const errors ={}
  const regexPhone = /^(00213|\+213|0)(5|6|7)[0-9]{8}$/
  if(!values.firstName){
    errors.firstName= "First Name is required"
 }
  
  if(!values.lastName){
   
    errors.lastName= "Last Name is required"
  } 

  if(!values.phone){
    errors.phone= "Phone is required"
  }else if(!regexPhone.test(values.phone)) {
    errors.phone= "phone is invalide format  needed +(123) - 456-78-90"
  }

  if(!values.adress){
    errors.adress= "Adress is required"
  }

  if(!values.gender){
    errors.gender= "Gender is required"
  }

  if(!values.job){
    errors.job= "Job Title is required"
  }

  if(!values.salary){
    errors.salary= "Salary is required"
  }
  
  if(!values.email){
     errors.email= "Email is required"
  } 
 

  if(!values.password){
     errors.password= "password is required"
  }else if (values.password.length < 8){
     errors.password= "password to short min 8 characters "
  }

  if(!values.role){
    errors.role= "role is required"
  }
 return errors

}


return(

 <div className="container">
  <div className="container--form">

  {isSubmit?<Alert onClose={() => {(setisSubmit(false))}} severity="success">Employee Updated successufly</Alert>:
     message &&<Alert  severity="error">{message}</Alert>
    }

   <div className="title">Edit Employee</div>
   <form >
    <div className="user-details">
      <div className="input-box">
        <MDBInput  className="input" label="first Name" id='FirstName' type='text' onChange={handelChange} name="firstName" value={formData.firstName}/>
        {formErrors.firstName ?<p style={{marginTop:"-13px",marginLeft:"6px",fontSize:"11px",color:"red"}}>{formErrors.firstName}</p> :<></>}
      </div>
      <div className="input-box">
      <MDBInput className="input" label='Last Name ' id='lastName' type='text' onChange={handelChange} name="lastName" value={formData.lastName}/>
      {formErrors.lastName ?<p style={{marginTop:"-13px",marginLeft:"6px",fontSize:"11px",color:"red"}}>{formErrors.lastName}</p> :<></>}
      </div>
      <div className="input-box">
      <MDBInput className="input" label='Phone ' id='phone' type='text' onChange={handelChange} name="phone" value={formData.phone} />
      {formErrors.phone ?<p style={{marginTop:"-13px",marginLeft:"6px",fontSize:"11px",color:"red"}}>{formErrors.phone}</p> :<></>}
      </div>
      <div className="input-box">
      <MDBInput className="input" label='Adress ' id='adress' type='text' onChange={handelChange} name="adress" value={formData.adress}/>
      {formErrors.adress ?<p style={{marginTop:"-13px",marginLeft:"6px",fontSize:"11px",color:"red"}}>{formErrors.adress}</p> :<></>}
      </div>
      <div className="input-box">
      <MDBInput className="input" label='Birth date' id='birth-date' type='date' onChange={handelChange}  name="birthDate" value={formData.birthDate}/>
      </div>
      <div className="input-box" style={{marginTop: "9px"}}>
      <span style={{padding:"20px"}}>Gender</span> 
     <MDBRadio label='male' id='male'  type= "radio" name="gender" value="male" onChange={handelChange} checked={formData.gender==="male"} inline />
      <MDBRadio label='female' id='female' type= "radio" name="gender" value="female" onChange={handelChange}  checked={formData.gender==="female"}  inline />  
      {formErrors.gender ?<p style={{marginTop:"-5px",marginLeft:"10px",fontSize:"11px",color:"red"}}>{formErrors.gender}</p> :<></>}
      </div> 
      {role.role==="manager"&&<>
      <div className="input-box">
      <MDBInput className="input" label='Salary ' id='salary' type='text' onChange={handelChange} name="salary" value={formData.salary}/>
      {formErrors.salary ?<p style={{marginTop:"-13px",marginLeft:"6px",fontSize:"11px",color:"red"}}>{formErrors.salary}</p> :<></>}
      </div>
      <div className="input-box">
      <MDBInput className="input" label='Job Title ' id='job' type='text' onChange={handelChange} name="job" value={formData.job}/>
      {formErrors.job ?<p style={{marginTop:"-13px",marginLeft:"6px",fontSize:"11px",color:"red"}}>{formErrors.job}</p> :<></>}
      </div>
   
      <div className="input-box">
      <MDBInput className="input" label='Email ' id='email' type='email' onChange={handelChange} name="email" value={formData.email}/>
      {formErrors.email ?<p style={{marginTop:"-13px",marginLeft:"6px",fontSize:"11px",color:"red"}}>{formErrors.email}</p> :<></>}
      </div>
      <div className="input-box">
      <MDBInput className="input" label='Password ' id='password' onChange={handelChange} type='password' name="password" value={formData.password}/>
      {formErrors.password ?<p style={{marginTop:"-13px",marginLeft:"6px",fontSize:"11px",color:"red"}}>{formErrors.password}</p> :<></>}
      </div>
      <div className="input-box" style={{marginBottom: "20px"}}>
        <span style={{padding:"20px"}}>Role</span>
    <MDBRadio label='manager' id='manger'  type= "radio" name="role" value="manager"  onChange={handelChange} checked={formData.role==="manager"} inline />
    <MDBRadio label='employee' id='employee' type= "radio" name="role" value="employee"  onChange={handelChange} checked={formData.role==="employee"} inline />
     
      {formErrors.role ?<p style={{marginTop:"-5px",marginLeft:"10px",fontSize:"11px",color:"red"}}>{formErrors.role}</p> :<></>}
      </div>
      </>}
       <button className="button" type="submit" onClick={handelSubmit}>Submit</button>
    </div>  
   </form>
 </div>
 
 </div>
)
}