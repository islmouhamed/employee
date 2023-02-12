import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { linkWithPopup, GoogleAuthProvider,FacebookAuthProvider,signInWithPopup , getAdditionalUserInfo,deleteUser} from "firebase/auth";
import { signOut } from "firebase/auth";
import auth from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

const googleprovider = new GoogleAuthProvider();
//const facebookProvider = new FacebookAuthProvider();


/*
  function createEmployee(email, password) {
    return createUserWithEmailAndPassword(auth,email, password);
  }
  */

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }


  function loginGmail() {
    
    const gmail= signInWithPopup(auth,googleprovider).then((result) => {
              const details = getAdditionalUserInfo(result)
              console.log(details.isNewUser)
       if(details.isNewUser)
      {
        console.log(details.isNewUser)
        
        deleteUser(auth.currentUser).then(() => {
          // User deleted.
          console.log(details.isNewUser)
        }).catch((error) => {
          // An error ocurred
          // ...
        });
      }

    })
    .catch((error) => {
      console.log(error);
    });
    return gmail
  }

/*
  function loginFb() {
    return signInWithPopup(auth,facebookProvider);
  }
*/


  function logout() {
    return signOut(auth);
}


function linkEmailToGoogle(currentUser) {
 
  return linkWithPopup(currentUser, googleprovider).then((result)=>{

  // Accounts successfully linked.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    // ...
  });
}


 /* 
function linkEmailToFacebook(currentUser) {
 
  const link =  linkWithPopup(currentUser, facebookProvider).then((result) => {
    // Accounts successfully linked.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    // ...
  });
  return link
}
*/




  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        user.getIdToken().then(function(idToken) {  
           console.log(user.email);
           localStorage.setItem("token",idToken) 

          });
    }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
   // createEmployee,
   loginGmail,
  // loginFb,
   linkEmailToGoogle,
   //linkEmailToFacebook,
    logout
  };



  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}