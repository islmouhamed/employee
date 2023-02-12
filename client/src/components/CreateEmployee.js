import React,{useState,useEffect} from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MDBInput,MDBRadio } from 'mdb-react-ui-kit';
import EmployeeDataService from '../services/employee.service'
import Alert from '@mui/material/Alert';
export default function CreateEmployee(){
  const initialEmployeeState = {
    id:null,
    firstName:"",
    lastName:"",
    phone:"",
    adress:"",
    birthDate:"",
    gender:"",
    salary:"",
    job:"",
    email:"",
    password:"",
    role:"",
  }

const navigate = useNavigate();
const { currentUser, createEmployee } = useAuth();

  
const[formData,setFormData] = useState(initialEmployeeState)
const[formErrors,setFormErrors] = useState({})
    
const[isSubmit,setisSubmit] = useState(false)
let[message,setMessage]=useState("")

function handelChange (event) {
  const {name,value} = event.target
  setFormData(prevFormData => {
      return {
          ...prevFormData,
          [name]: value 
      }
  } )
}

async function handelSubmit (event){
  event.preventDefault()
  //seting the form errors 
  setFormErrors(validate(formData))
  //setisSubmit(true)
 /*try {
    
    await createEmployee(formData.email, formData.password);
   
  } catch (e) {
    alert("Failed to create employee");
  }*/

//send the data to the service 
  EmployeeDataService.create(formData)
  .then(res => {
    if (res.status === 200){
    setisSubmit(true)
    setFormData(initialEmployeeState)

   }
		else
		Promise.reject()
  
   
  })
  .catch(e => { 
  setMessage(e.response.data.message)
  //console.log(message)
  });
  
  
} 
console.log(currentUser)

 // checkin if the formerros is 0 and the submit is true to submit the form
 useEffect(()=>{
  if (currentUser) {
    //navigate("/employees");
  }
  console.log(formErrors)
  if(Object.keys(formErrors).length===0 && isSubmit){
     setFormErrors()
    console.log(formData)  

  }
},[formErrors,currentUser, navigate])

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
   

    {isSubmit?<Alert onClose={() => {(setisSubmit(false))}} severity="success">Employee Created successufly</Alert>:
     message &&<Alert  severity="error">{message}</Alert>
    }
      
      
    
   <div className="title">Create Employee</div>
   <form >
    <div className="user-details">
      <div className="input-box">
        <MDBInput  className="input" label='First Name ' id='FirstName' type='text' onChange={handelChange} name="firstName" value={formData.firstName}/>
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
      <MDBRadio label='male' id='male'  type= "radio" name="gender" value="male"  onChange={handelChange}  inline />
      <MDBRadio label='female' id='female' type= "radio" name="gender" value="female"  onChange={handelChange} inline />
      {formErrors.gender ?<p style={{marginTop:"-5px",marginLeft:"10px",fontSize:"11px",color:"red"}}>{formErrors.gender}</p> :<></>}
      </div>
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
      <MDBRadio label='manager' id='manger'  type= "radio" name="role" value="manager"  onChange={handelChange}  inline />
      <MDBRadio label='employee' id='employee' type= "radio" name="role" value="employee"  onChange={handelChange} inline />
      {formErrors.role ?<p style={{marginTop:"-5px",marginLeft:"10px",fontSize:"11px",color:"red"}}>{formErrors.role}</p> :<></>}
      </div>
       <button className="button" type="submit" onClick={handelSubmit}>Submit</button>
    </div>  
   </form>
 </div>
 
 </div>
)
}