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
    try {
            const fetch = await fetchDocument('Users', user?.uid)
            if (fetch.uid == undefined) addToDatabase('Users', user.uid, 'uid', user.uid)
            if (fetch.uid == '' || undefined) addToDatabase('Users', user.uid, 'displayName', user.displayName)
            if (fetch.followers == undefined) addToDatabase('Users', user.uid, 'followers', [])
            if (fetch.following == undefined) addToDatabase('Users', user.uid, 'following', [])
            if (fetch.donations == undefined) addToDatabase('Users', user.uid, 'donations', [])
          } catch (error) {
            console.log(error.message)
          } 
}