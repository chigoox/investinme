'use client'
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import AUTHListener from "@/StateManager/AUTHListener";
import { fetchDocument } from "@/app/Support/myCodes/Database";
import { logOut } from "@/app/Support/myCodes/Auth";
import ShippinInfo from "@/app/Support/Componets/User/ShippinInfo";
import Image from "next/image";






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
