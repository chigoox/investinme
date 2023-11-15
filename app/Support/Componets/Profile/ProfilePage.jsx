'use client'
import { Button, Image, Skeleton } from "@nextui-org/react";
import { FileEditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAUTHListener } from "../../../../StateManager/AUTHListener";
import { useGlobalContext } from "../../../../StateManager/GlobalContext";
import { FetchThisDocs, fetchDocument, updateArrayDatabaseItem } from "../../myCodes/Database";
import { initFollowing } from "../../myCodes/DatabaseUtils";
import { formatNumber } from "../../myCodes/Util";
import PostView from "../General/Post/PostView";
import UserAvatar from "../General/User/Avatar";
import EditProfile from "../General/User/EditProfile";
import UserList from "../General/User/UserList";






const getUID = (user) => {
    return user?.uid ? user?.uid : user?.gid
}


export default function ProfilePage({ forthis, otherUserData, getOtherUserData }) {
    const [followed, setFollowed] = useState(false)
    const [userData, setUserData] = useState()
    const [postData, setPostData] = useState([])
    const [editProfile, setEditProfile] = useState(false)
    const _userData = userData?.UserInfo
    const _otherUserData = otherUserData?.UserInfo
    const { state, dispatch } = useGlobalContext()
    const [showPostView, setSetShowPostView] = useState(false)
    const [currentPost, setCurrentPost] = useState(0)
    const [showUserList, setShowUserList] = useState(false)



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


    const updateFollowing = async () => {
        if (!followed) {
            await updateArrayDatabaseItem('Users', otherUserData?.uid, 'followers', {
                [UID]: {
                    user: UID,

                }
            })
            await updateArrayDatabaseItem('Users', UID, 'following', {
                [otherUserData?.uid]: {
                    user: otherUserData?.uid,

                }

            })
            //setFollowed(true)
            dispatch({ type: "NEW_POST", value: {} })
        } else {
            await updateArrayDatabaseItem('Users', otherUserData?.uid, 'followers', {
                [UID]: {
                    user: UID,

                }
            }, true)
            await updateArrayDatabaseItem('Users', UID, 'following', {
                [otherUserData?.uid]: {
                    user: otherUserData?.uid,

                }
            }, true)
            //setFollowed(false)
            dispatch({ type: "NEW_POST", value: {} })

        }
    }
    const follow = async () => {
        setFollowed(!followed)
        updateFollowing()
    }






    const followers = (otherUserData || userData)?.followers?.length
    const donations = (otherUserData || userData)?.donations?.length
    const following = (otherUserData || userData)?.following?.length
    if (followers == undefined) getData()

    useEffect(() => {
        const run = async () => {
            await getData()
            await getPostData()
            if (userData) await initFollowing(user, true)
        }


        run()


    }, [UID, state, otherUserData])

    useEffect(() => {
        if (getOtherUserData) getOtherUserData()

    }, [state])


    useEffect(() => {
        otherUserData?.followers.forEach(follower => {

            if (followed == false && follower[userData?.uid]) {
                setFollowed(true)
            }
        })

    }, [userData, otherUserData])








    return (
        <div className="w- min-h-screen bg-black text-white">
            {editProfile && <EditProfile toggleEdit={toggleEdit} userData={userData} />}
            {showUserList && <UserList forThis={showUserList} list={(otherUserData || userData)} setShowUserList={setShowUserList} />}
            <div className="p-4  relative ">
                <div className="flex-wrap center gap-2">
                    <UserAvatar user={(_otherUserData || _userData)} size={'lg'} noLable />
                    <div className="center-col gap-2">
                        <div className="center gap-1">
                            <Skeleton className="h-12 mb-1 rounded" isLoaded={followers >= 0}>
                                <Button onPress={() => { setShowUserList('followers') }} className="bg-none bg-opacity-0 min-w-0 min-h-0 px-1 overflow-visible center-col h-full text-white font-bold">
                                    <h1>{formatNumber(followers)}</h1>
                                    <h1>Followers</h1>
                                </Button>
                            </Skeleton>
                            <Skeleton className="h-12 mb-1 rounded" isLoaded={following >= 0}>
                                <Button onPress={() => { setShowUserList('following') }} className="bg-none bg-opacity-0 min-w-0 min-h-0 px-1 overflow-visible center-col h-full text-white font-bold">
                                    <h1>{formatNumber(following)}</h1>
                                    <h1>Following</h1>
                                </Button>
                            </Skeleton>
                            <Skeleton className="h-12 mb-1 rounded" isLoaded={followers >= 0}>
                                <Button onPress={() => { setShowUserList('donations') }} className="bg-none bg-opacity-0 min-w-0 min-h-0 px-1 overflow-visible center-col h-full text-white font-bold">
                                    <h1>${formatNumber(donations)}</h1>
                                    <h1>Donations</h1>
                                </Button>
                            </Skeleton>
                        </div>
                        <div className=" h-12 w-72 center-col gap-1  flex-shrink-0">
                            <Button onPress={otherUserData ? follow : null} className={`${followed ? 'bg-green-600 text-white font-extrabold text-lg' : 'text-base'}  w-full trans flex-shrink-0 h-8`}>{otherUserData ? (followed ? 'Following' : 'Follow') : 'Account'}</Button>
                            <div className="flex w-full h-8 gap-2 flex-shrink-0">
                                <Button className="w-full h-full">Send</Button>
                                {otherUserData && <Button className="w-full h-full">Request</Button>}

                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="px-4 w-full md:w-96   m-auto center gap-4">
                <h1 className="text-white text-2xl font-extabold">{(_otherUserData || _userData)?.displayName?.toUpperCase()}</h1>
                {!otherUserData && <button onClick={toggleEdit}>
                    <FileEditIcon />
                </button>}
            </div>
            <div className="bg-black-800 px-2 w-full md:w-[30rem] p-2 rounded shadow-md shadow-[#0b230b] lg:w-[26rem] m-auto  h-auto relative">
                {(_otherUserData || _userData)?.bio}

            </div>
            <PostView forThis={'My Posts'} showPostView={showPostView} setShowPostView={setSetShowPostView} allPosts={postData} currentPost={postData[currentPost]?.id} />
            <div className="grid mt-4 grid-cols-3  w-fit m-auto h-auto max-h-[26rem] md:max-h-[34rem]  lg:max-h-[37rem] overflow-y-scroll hidescroll gap-2 p-1 ">
                {postData?.map((post, index) => {
                    return (
                        <Skeleton key={post.id} isLoaded={post?.link} className="lg:h-[12rem] lg:w-[12rem] md:w-[10rem] md:h-[10rem] w-[7.3rem] h-[7.3rem] border border-[#1f1f1f] overflow-hidden rounded-lg relative m-auto ">
                            <button onClick={() => { setCurrentPost(index); setSetShowPostView(true) }} className="h-full w-full ">

                                {post?.type == 'img' && <Image width={1920} height={1080} className="rounded-none object-cover h-full w-full" src={post.link} alt="" />}
                                {post?.type == 'vid' &&
                                    <video loop muted playsInline control={'true'} className="object-cover h-full w-full" >
                                        <source src={post?.link} type="video/mp4" />
                                    </video>}
                                {post?.type == 'txt' && <div className="center bg-black-800   text-white h-[12rem] p-2  w-full">
                                    <h1>{post.link}</h1>
                                </div>}
                            </button>
                        </Skeleton>
                    )
                })}

            </div>




        </div >
    )
}
