'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FetchThisDocs } from '../Support/myCodes/Database'
import { useAUTHListener } from '../../StateManager/AUTHListener'
import ProfilePage from '../Support/Componets/Profile/ProfilePage'

function UserPage() {
    const [otherUserData, setOtherUserData] = useState([{ followers: [], following: [], donations: [], UserInfo: { displayName: 'No User Found', bio: 'No user found!' } }])
    const pageOwner = usePathname().replace('/', '').replace(/\s+/g, '')
    const getData = async () => {
        const Onwer = await FetchThisDocs('Users', 'displayName', '==', pageOwner)
        if (Onwer[0]) setOtherUserData(Onwer)

    }

    const user = useAUTHListener()


    useEffect(() => {
        getData()



    }, [])



    return (user.uid == otherUserData[0].uid) ?
        <ProfilePage forthis={'profilePage'} />
        :
        <ProfilePage forthis={'userPage'} otherUserData={otherUserData[0]} getOtherUserData={getData} />
}

export default UserPage