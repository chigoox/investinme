import { addToDatabase, fetchDocument, updateArrayDatabaseItem } from "./Database"

export const addEmailToList = (email) =>{
//addToDatabase('Admin', 'Emails', 'emails', {email})
updateArrayDatabaseItem('Admin', 'Emails', 'allEmails', email)
} 

export const addUIDToList = (UID) =>{
//addToDatabase('Admin', 'Emails', 'emails', {email})
updateArrayDatabaseItem('Admin', 'Users', 'allUIDs', UID)
} 


export const initFollowing = async (user) => {
  console.log(user)
    try {
        const data = await fetchDocument('Users', user?.uid)
        if(data?.global){
            
            if (data?.uid == undefined) addToDatabase('Users', user.uid, 'uid', user.uid)
            if (data?.uid == '' || undefined) addToDatabase('Users', user.uid, 'displayName', user.displayName)
            if (data.followers == undefined) addToDatabase('Users', user.uid, 'followers', [])
            if (data?.following == undefined) addToDatabase('Users', user.uid, 'following', [])
            if (data?.donations == undefined) addToDatabase('Users', user.uid, 'donations', [])
        }
          } catch (error) {
            console.log(error.message)
          } 
}