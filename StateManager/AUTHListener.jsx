'use client'
import { addEmailToList, addUIDToList } from '../app/Support/myCodes/DatabaseUtils'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import app, { AUTH } from '../Firebase'
import { useGuest } from '../app/Support/Hooks/useGuest'
import { fetchDocument } from '../app/Support/myCodes/Database'
import { clearTokens } from '../app/Support/myCodes/Util'


function AUTHListener({ add = false, set, protectedPage }) {
    const { push } = useRouter()
    clearTokens()

    useEffect(() => {
        const auth = AUTH
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (set) set(user)
                if (add) addUIDToList(user.uid)
                if (add) addEmailToList(user.email)
            } else {
                // User is signed out
                if (set) set()
                if (protectedPage) push('/login')
            }
        });
    }, [])
    return (
        <></>
    )
}

export function useAUTHListener(add = false, set, protectedPage) {
    const { push } = useRouter()
    const [user, setUser] = useState({})
    const auth = getAuth(app)

    const GID = useGuest()


    if (typeof window !== 'undefined') {
        clearTokens()

    }




    useEffect(() => {
        const auth = AUTH
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (set) set(user)
                if (add) addUIDToList(user.uid)
                if (add) addEmailToList(user.email)

                setUser(user)
            } else {
                // User is signed out
                if (set) set()
                if (protectedPage) push('/login')
                //initNoUser()
                fetchDocument('Users', GID).then((userDATA) => {
                    if (userDATA?.ShippingInfo?.email) {
                        setUser({ gid: GID, email: userDATA?.ShippingInfo?.email })
                    } else {
                        setUser({ gid: GID })
                    }


                }).catch((e) => {
                    setUser({ gid: GID })

                })


            }
        });
    }, [])
    return user

}

export default AUTHListener