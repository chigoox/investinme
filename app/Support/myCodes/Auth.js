'use client'
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {  updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app, { AUTH } from "../../../Firebase";

const auth = getAuth(app)



const getUID = (user) => {
    return user.uid ? user.uid : user.gid
}


const signUp = async (email, password) => {
const user = await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    return userCredential
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorMessage
  });
  return user.user
}

  const loginWith = async (provider) => {

        const returnProvider = (Provider) => {
          
          switch (Provider) {
            case 'google': {
              return new GoogleAuthProvider()
              break;
            }
            case 'facebook': {
              return new FacebookAuthProvider()
              break;
            }
            
            
          
            default:
              break;
          }

          
        }
        

        return signInWithPopup(auth,  returnProvider(provider))
        .then((result) => {
          const thisProvider = (provider == 'google') ? GoogleAuthProvider :
                                (provider == 'facebook') ? FacebookAuthProvider : null

                // This gives you a  Access Token. You can use it to access the Google API.
                const credential = thisProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                return user
                
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ...

            });
    }

export const UpdateUser = (displayName, photoURL, phone) =>{
const createData = {
  displayName: displayName? displayName : null,
  photoURL: photoURL? photoURL : null,
  phoneNumber: phone? phone : null
}

  updateProfile(auth.currentUser, createData).catch((error) => {
  // An error occurred
  // ...
});
}

const logIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log('first')
    // Signed in 
    const user = userCredential.user;
    console.log(userCredential)
    return userCredential
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

const logOut = async () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

}

const checkLoggedinUser = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
    //return user
  } else {
    // User is signed out
  }
});

const user = AUTH.currentUser

return user

}

const sendVerification = async () => {
  sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
  });
}

const sendPasswordReset = async () => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}



export { checkLoggedinUser, getUID, logIn, logOut, loginWith, sendPasswordReset, sendVerification, signUp };
