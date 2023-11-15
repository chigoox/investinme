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
    const data = await fetchDocument('Users', user?.uid)
    if (set) set(data)
console.log(!set && user?.uid && !data?.following)
         if (data?.uid == undefined && user.uid) await addToDatabase('Users', user.uid, 'uid', user.uid)
            if (data?.uid == '' || data?.uid ==  undefined) await addToDatabase('Users', user.uid, 'displayName', user.displayName)
            if (data?.UserInfo ==  undefined) await addToDatabase('Users', user.uid, 'UserInfo', {
              displayName: user?.displayName,
              avatarURL: user?.photoURL
            })

            if (!set && user?.uid && !data?.followers) await addToDatabase('Users', user.uid, 'followers', [])
            if (!set && user?.uid && !data?.following) await  addToDatabase('Users', user.uid, 'following', [])
            if (!set && user?.uid && !data?.donations) await addToDatabase('Users', user.uid, 'donations', [])
        if(data?.global){
            
           
        }
          } catch (error) {
            console.log(error.message)
          } 
}