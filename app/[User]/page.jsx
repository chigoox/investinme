'use client'
import React, { useEffect, useState } from 'react'
import ProfilePage from '../Support/Componets/User/ProfilePage'
import { usePathname } from 'next/navigation'
import { FetchThisDocs } from '../Support/myCodes/Database'

function UserPage() {
    const [otherUserData, setOtherUserData] = useState([{ followers: [], following: [], donations: [], UserInfo: { displayName: 'No User Found', bio: 'No user found!' } }])

    const pageOwner = usePathname().replace('/', '').replace(/\s+/g, '')
    const getData = async () => {
        const Onwer = await FetchThisDocs('Users', 'displayName', '==', pageOwner)
        if (Onwer[0]) setOtherUserData(Onwer)

    }



    useEffect(() => {
        getData()


    }, [])



    return (
        <ProfilePage forthis={'userPage'} otherUserData={otherUserData[0]} />
    )
}

export default UserPage