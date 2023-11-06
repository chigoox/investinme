'use client'
import { useEffect, useState } from "react";
import AUTHListener from "../../StateManager/AUTHListener";
import { fetchDocument, fetchInOrder } from "../Support/myCodes/Database";
import UserAvatar from "../Support/Componets/General/User/Avatar";
import { formatNumber } from "../Support/myCodes/Util";
import { Edit } from "lucide-react";
import EditProfile from "../Support/Componets/General/User/EditProfile";






const getUID = (user) => {
    return user?.uid ? user?.uid : user?.gid
}


export default function ProtectedRoute() {
    const [user, setUser] = useState({})
    const [userData, setUserData] = useState()
    const UID = getUID(user)




    useEffect(() => {
        fetchDocument('Users', UID, setUserData)


    }, [UID])

    const followers = 2345
    const donations = 523456
    const following = 765523456


    return (
        <div className="w- min-h-screen bg-black text-white">
            <AUTHListener protectedPage={true} set={setUser} />
            <EditProfile />
            <div className="p-4 center gap-2">
                <UserAvatar user={user} size={'lg'} noLable />
                <div className=" center-col h-full text-white font-bold">
                    <h1>{formatNumber(followers)}</h1>
                    <h1>Followers</h1>
                </div>
                <div className=" center-col h-full text-white font-bold">
                    <h1>{formatNumber(following)}</h1>
                    <h1>Following</h1>
                </div>
                <div className=" center-col h-full text-white font-bold">
                    <h1>${formatNumber(donations)}</h1>
                    <h1>Donations</h1>
                </div>

            </div>
            <div>
                <h1 className="text-white">{user?.displayName}</h1>
            </div>
            <div className="bg-black-800 h-auto relative">


                <button className="absolute -bottom-5 right-2">
                    <Edit color="white" />
                </button>

            </div>




        </div>
    )
}
