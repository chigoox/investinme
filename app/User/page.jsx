'use client'
import { useEffect, useState } from "react";
import AUTHListener, { useAUTHListener } from "../../StateManager/AUTHListener";
import { fetchDocument, fetchInOrder } from "../Support/myCodes/Database";
import UserAvatar from "../Support/Componets/General/User/Avatar";
import { formatNumber } from "../Support/myCodes/Util";
import { Edit } from "lucide-react";
import EditProfile from "../Support/Componets/General/User/EditProfile";
import { avatar } from "@nextui-org/react";






const getUID = (user) => {
    return user?.uid ? user?.uid : user?.gid
}


export default function ProtectedRoute() {
    const [userData, setUserData] = useState()
    const [editProfile, setEditProfile] = useState(false)
    const _userData = userData?.UserInfo

    const getData = async () => {
        await fetchDocument('Users', UID, setUserData)
    }
    const toggleEdit = (fetch) => {
        setEditProfile(!editProfile)
        if (fetch) getData()
    }
    const user = useAUTHListener(null, null, true)
    const UID = getUID(user)



    useEffect(() => {
        getData()


    }, [UID])

    const followers = userData?.followers.length
    const donations = userData?.donations.length
    const following = userData?.following.length

    return (
        <div className="w- min-h-screen bg-black text-white">
            {editProfile && <EditProfile toggleEdit={toggleEdit} userData={userData} />}
            <div className="p-4 center gap-2">
                <UserAvatar user={_userData} size={'lg'} noLable />
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
            <div className="px-4">
                <h1 className="text-white text-2xl font-extabold">{user?.displayName?.toUpperCase()}</h1>
            </div>
            <div className="bg-black-800 px-2  h-auto relative">
                {userData?.UserInfo?.bio}




            </div>




        </div>
    )
}
