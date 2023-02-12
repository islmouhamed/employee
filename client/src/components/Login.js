import React,{useState,useEffect} from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBContainer,MDBRow, MDBCol, MDBCard, MDBCardBody,MDBInput, MDBIcon,}from 'mdb-react-ui-kit';

export default function Login(){
  
  const navigate = useNavigate();
  const { currentUser, login,loginGmail,loginFb } = useAuth();
  

    const[formData,setFormData] = useState({
        email:"",
        password:""
    })
    // creating a fromerrors satet to handel errors 
    const[formErrors,setFormErrors] = useState({})
    
    const[isSubmit,setisSubmit] = useState(false)
    

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

        setisSubmit(true)
        try {
    
          await login(formData.email, formData.password);
         
        } catch (e) {
          alert("Failed to login");
        }   
        //console.log(formData)
    } 

    async function gmaillogin(){
  
      try {
        
        await loginGmail();
       
      } catch (e) {
        alert("Failed to connect");
      }  
      }

   /* async function fblogin(){
  
        try {
          
          await loginFb();
         
        } catch (e) {
          alert("Failed to connect");
        }  
        }*/
    
    // checkin if the formerros is 0 and the submit is true to submit the form
    useEffect(()=>{
      if (currentUser) {
       navigate("/employees");
      }
        console.log(formErrors)
        if(Object.keys(formErrors).length===0 && isSubmit){
            console.log(formData)
        }
    },[formErrors,currentUser,navigate])

  function validate (values){
     const errors ={}
     const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
    
     if(!values.email){
        errors.email= "Email is required"
     } else if(!regexEmail.test(values.email)) {
        errors.email= "Email is invalide"
     }

     if(!values.password){
        errors.password= "password is required"
     }else if (values.password.length < 8){
        errors.password= "password to short min 8 characters "
     }

    return errors

  }
    
    return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
         
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
            
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
               <p className="text-white-50 ">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' 
                        id='email' type='email' size="lg" onChange={handelChange} name="email" value={formData.email} required />
                        {formErrors.email ?<p className="text-white-50 ">{formErrors.email}</p> :<></>}

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password'
                        id='password' type='password' size="lg" onChange={handelChange} name="password"  value={formData.password} required />
                        {formErrors.password ?<p className="text-white-50 mb-5">{formErrors.password}</p>:<></>} 

              <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
              
              <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handelSubmit}>
                Login
              </MDBBtn>
              
              


              <div className=' mt-2 mb-5'>
               
                <p className=" mt-4 mb-4" style={{textAlign:'center'}}>Sign in with Google? </p>
               <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={gmaillogin}>
              <MDBIcon  fab icon='google' size="sm"  style={{marginRight:"4px", color: 'white'}}/>
                gmail
              </MDBBtn>
              </div>

             
              
            </MDBCardBody>
            
          </MDBCard>
         
        </MDBCol>
      </MDBRow>

    </MDBContainer>
    )

}