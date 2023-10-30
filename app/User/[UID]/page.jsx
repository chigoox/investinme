'use client'
import { useState } from "react";
import AUTHListener from "../../../StateManager/AUTHListener";






const getUID = (user) => {
    return user?.uid ? user?.uid : user?.gid
}


export default function ProtectedRoute({ params }) {
    const [user, setUser] = useState({})
    const [userData, setUserData] = useState()


    const menu = ['Orders', 'Reservations', 'Update Shipping Info']



    return (
        <div className="w- min-h-screen bg-black">
            <AUTHListener protectedPage={true} set={setUser} />




        </div>
    )
}
