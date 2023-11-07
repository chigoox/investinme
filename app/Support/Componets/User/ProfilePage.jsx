'use client'
import { useEffect, useState } from "react";
import AUTHListener, { useAUTHListener } from "../../../../StateManager/AUTHListener";
import { FetchThisDocs, fetchDocument, fetchInOrder } from "../../../Support/myCodes/Database";
import UserAvatar from "../../../Support/Componets/General/User/Avatar";
import { formatNumber } from "../../../Support/myCodes/Util";
import { Edit, Edit2Icon, FileEditIcon } from "lucide-react";
import EditProfile from "../../../Support/Componets/General/User/EditProfile";
import { Button, Skeleton, avatar } from "@nextui-org/react";
import { initFollowing } from "../../../Support/myCodes/DatabaseUtils";
import { useGlobalContext } from "../../../../StateManager/GlobalContext";






const getUID = (user) => {
    return user?.uid ? user?.uid : user?.gid
}


export default function ProfilePage({ forthis, otherUserData }) {
    const [userData, setUserData] = useState()
    const [postData, setPostData] = useState()
    const [editProfile, setEditProfile] = useState(false)
    const _userData = userData?.UserInfo
    const _otherUserData = otherUserData?.UserInfo
    const { state } = useGlobalContext()
    const getData = async () => {
        if (UID) await fetchDocument('Users', UID, setUserData)
    }
    const getPostData = async () => {
        if (otherUserData?.uid || UID) setPostData(await FetchThisDocs('Posts', 'creator', '==', (otherUserData?.uid || (otherUserData ? null : UID)), 'id'))
    }
    const toggleEdit = (fetch) => {
        setEditProfile(!editProfile)
        if (fetch) getData()
    }
    const user = useAUTHListener(null, null, true)
    const UID = getUID(user)
    console.log(postData)


    console.log(otherUserData?.uid || UID)



    const followers = (otherUserData || userData)?.followers?.length
    const donations = (otherUserData || userData)?.donations?.length
    const following = (otherUserData || userData)?.following?.length
    if (followers == undefined) getData()

    useEffect(() => {
        getData()
        getPostData()
        initFollowing(user)


    }, [UID, state, otherUserData])

    return (
        <div className="w- min-h-screen bg-black text-white">
            {editProfile && <EditProfile toggleEdit={toggleEdit} userData={userData} />}
            <div className="p-4 center gap-2">
                <UserAvatar user={(_otherUserData || _userData)} size={'lg'} noLable />
                <Skeleton className="h-14 rounded" isLoaded={followers >= 0}>
                    <div className=" center-col h-full text-white font-bold">
                        <h1>{formatNumber(followers)}</h1>
                        <h1>Followers</h1>
                    </div>
                </Skeleton>
                <Skeleton className="h-14 rounded" isLoaded={following >= 0}>
                    <div className=" center-col h-full text-white font-bold">
                        <h1>{formatNumber(following)}</h1>
                        <h1>Following</h1>
                    </div>
                </Skeleton>
                <Skeleton className="h-14 rounded" isLoaded={followers >= 0}>
                    <div className=" center-col h-full text-white font-bold">
                        <h1>${formatNumber(donations)}</h1>
                        <h1>Donations</h1>
                    </div>
                </Skeleton>

            </div>
            <div className="px-4 w-full md:w-96 m-auto flex gap-4">
                <h1 className="text-white text-2xl font-extabold">{(_otherUserData || _userData)?.displayName.toUpperCase()}</h1>
                <button onClick={toggleEdit}>
                    <FileEditIcon />
                </button>
            </div>
            <div className="bg-black-800 px-2 w-full md:w-[30rem] p-2 rounded shadow-md shadow-[#0b230b] lg:w-[26rem] m-auto  h-auto relative">
                {(_otherUserData || _userData)?.bio}

            </div>

            <div className="grid mt-4 grid-cols-3 w-full md:w-[30rem] lg:w-[26rem] m-auto h-auto max-h-96 overflow-y-scroll hidescroll gap-1 p-1 ">
                {postData?.map((post) => {
                    return (
                        <Skeleton key={post.id} isLoaded={post?.link} className="h-[7.8rem] overflow-hidden rounded-lg relative m-auto w-[7.8rem]">
                            <button className="h-[7.8rem] w-[7.8rem] bg-white">

                                {post?.type == 'img' && <img className="object-cover h-[7.8rem] w-[7.8em]" src={post.link} alt="" />}
                                {post?.type == 'vid' &&
                                    <video loop muted playsInline control className="object-cover h-[7.8rem] w-[7.8em]" >
                                        <source src={post?.link} type="video/mp4" />
                                    </video>}
                            </button>
                        </Skeleton>
                    )
                })}

            </div>




        </div >
    )
}
