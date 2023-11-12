import { addToDatabase, fetchDocument, updateArrayDatabaseItem } from "./Database"

export const addEmailToList = (email) =>{
//addToDatabase('Admin', 'Emails', 'emails', {email})
updateArrayDatabaseItem('Admin', 'Emails', 'allEmails', email)
} 

export const addUIDToList = (UID) =>{
//addToDatabase('Admin', 'Emails', 'emails', {email})
updateArrayDatabaseItem('Admin', 'Users', 'allUIDs', UID)
} 


export const initFollowing = async (user, set) => {
  try {
    console.log(user)
    const data = await fetchDocument('Users', user?.uid)
    set(data)
    console.log(data)

         if (data?.uid == undefined) await addToDatabase('Users', user.uid, 'uid', user.uid)
            if (data?.uid == '' || undefined) await addToDatabase('Users', user.uid, 'displayName', user.displayName)
            //if (data.followers == undefined) await addToDatabase('Users', user.uid, 'followers', [])
            //if (data?.following == undefined) await  addToDatabase('Users', user.uid, 'following', [])
            //if (data?.donations == undefined) await addToDatabase('Users', user.uid, 'donations', [])
        if(data?.global){
            
           
        }
          } catch (error) {
            console.log(error.message)
          } 
}