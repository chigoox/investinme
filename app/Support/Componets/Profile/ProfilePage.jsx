'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Skeleton } from "@nextui-org/react";
import { FileEditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAUTHListener } from "../../../../StateManager/AUTHListener";
import { useGlobalContext } from "../../../../StateManager/GlobalContext";
import { FetchThisDocs, fetchDocument, updateArrayDatabaseItem } from "../../myCodes/Database";
import { initFollowing } from "../../myCodes/DatabaseUtils";
import { createArray, formatNumber } from "../../myCodes/Util";
import PostView from "../General/Post/PostView";
import UserAvatar from "../General/User/Avatar";
import EditProfile from "../General/User/EditProfile";
import UserList from "../General/User/UserList";
import CashMenu from "../Money/CashMenu";
import { useRouter } from "next/navigation";
import { createAuthTokens, createUnAuthTokens, verifiToken } from "../../myCodes/UnitUtils";
import PictureWall from "./PictureWall";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Transactions from "../Money/Transactions";
import { changeEmail } from "../../myCodes/Auth";
import ProductView from "../Shop/ProductView";






const getUID = (user) => {
    return user?.uid ? user?.uid : user?.gid
}


export default function ProfilePage({ forthis, otherUserData, getOtherUserData }) {
    const [followed, setFollowed] = useState(false)
    const [userData, setUserData] = useState()
    const [postData, setPostData] = useState([])
    const [shopData, setShopData] = useState([])
    const [shopCategoriesData, setShopCategoriesData] = useState([])
    const [selectedShopCategory, setSelectedShopCategory] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const _userData = userData?.UserInfo
    const _otherUserData = otherUserData?.UserInfo
    const { state, dispatch } = useGlobalContext()
    const [showPostView, setSetShowPostView] = useState(false)
    const [currentPost, setCurrentPost] = useState(0)
    const [showUserList, setShowUserList] = useState(false)
    const [showShopView, setShowShopView] = useState(false)


    const getData = async () => {
        if (UID) await fetchDocument('Users', UID, setUserData)
    }
    const getPostData = async () => {
        if (otherUserData?.uid || UID) setPostData(await FetchThisDocs('Posts', 'creator', '==', (otherUserData?.uid || (otherUserData ? null : UID)), 'id'))
        if (otherUserData?.uid || UID) setShopData(await FetchThisDocs('Products', 'creator', '==', (otherUserData?.uid || (otherUserData ? null : UID)), 'id'))
        if (otherUserData?.uid || UID) {
            const { shopCategories } = await fetchDocument('Users', (otherUserData?.uid || UID))
            setShopCategoriesData(shopCategories)
        }

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


    const [verificationToken, setVerificationToken] = useState()
    const genToken = async () => {

        const now = new Date().getTime()
        const { customerID } = await fetchDocument('Users', UID)
        const uToken = await createUnAuthTokens(customerID)
        localStorage?.setItem('TokenTimeStamp', now);
        localStorage.setItem("uToken", `${uToken}`)
        const tokenVerification = await verifiToken(customerID)
        setVerificationToken(tokenVerification)
        return tokenVerification
    }

    const authAndSend = async (vCode, vToken) => {
        const { customerID } = await fetchDocument('Users', UID)

        if (typeof vCode == 'string' && vCode.length == 6) {
            const aToken = await createAuthTokens(vToken, vCode, customerID)
            localStorage.setItem("aToken", `${aToken}`)

            if (localStorage.getItem("aToken").includes('v2')) return push('/Money')


        }

    }




    const { push } = useRouter()
    const openAccount = async () => {
        const { bankID } = await fetchDocument('Users', UID)
        if (localStorage.getItem("aToken")?.includes('v2') || (localStorage.getItem("uToken") && localStorage.getItem("TokenTimeStamp2"))) return push('/Money')
        if (bankID) return genToken()
        if (!bankID) return push('/Application')

    }


    const [verificationCode, setVerificationCode] = useState([])
    const TFAuthWindow = ({ setVerificationToken }) => {

        const handleKeyPress = (event) => {
            const { target, keyCode } = event
            const { value, name } = target
            const index = Number(name)
            setVerificationCode(o => {
                o[index] = value
                return o
            })
            if (keyCode == 8) {

                target.previousElementSibling?.focus()
            } else {
                // setVerificationCode(o => `${o}${value}`)
                target.nextElementSibling?.focus()
            }
            if (verificationCode.length == 6) authAndSend(verificationCode.join(""), verificationToken)

        }
        useEffect(() => { document.getElementById('start').focus() }, [])


        return (
            <div className="h-auto w-full top-[40%] fixed center-col z-[99999] ">
                <Card className="h-72 w-96 bottom-32 grid grid-cols-6 items-center p-2 text-7xl bg-gradient-to-br  from-gray-900 to-black border-purple-950 border ">
                    <h1 className="text-xl w-full absolute top-10 p-2 text-center font-bold text-white">Verification Code sent via TEXT</h1>
                    <input id="start" value={verificationCode[0]} onKeyUp={handleKeyPress} name="0" type="number" inputmode="numeric" max={'9'} min={'0'} className="border-2 bg-gradient-to-br from-slate-700 to-black  text-white rounded-xl h-24 m-auto w-14 text-center border-purple-900 " />
                    <input value={verificationCode[1]} onKeyUp={handleKeyPress} name="1" type="number" inputmode="numeric" max={'9'} min={'0'} className="border-2 bg-gradient-to-br from-slate-700 to-black  text-white rounded-xl h-24 m-auto w-14 text-center border-purple-900 " />
                    <input value={verificationCode[2]} onKeyUp={handleKeyPress} name="2" type="number" inputmode="numeric" max={'9'} min={'0'} className="border-2 bg-gradient-to-br from-slate-700 to-black  text-white rounded-xl h-24 m-auto w-14 text-center border-purple-900 " />
                    <input value={verificationCode[3]} onKeyUp={handleKeyPress} name="3" type="number" inputmode="numeric" max={'9'} min={'0'} className="border-2 bg-gradient-to-br from-slate-700 to-black  text-white rounded-xl h-24 m-auto w-14 text-center border-purple-900 " />
                    <input value={verificationCode[4]} onKeyUp={handleKeyPress} name="4" type="number" inputmode="numeric" max={'9'} min={'0'} className="border-2 bg-gradient-to-br from-slate-700 to-black  text-white rounded-xl h-24 m-auto w-14 text-center border-purple-900 " />
                    <input value={verificationCode[5]} onKeyUp={handleKeyPress} name="5" type="number" inputmode="numeric" max={'9'} min={'0'} className="border-2 bg-gradient-to-br from-slate-700 to-black  text-white rounded-xl h-24 m-auto w-14 text-center border-purple-900 " />

                    <div className="absolute bottom-4 center gap-2 p-4 w-full">
                        <Button onClick={() => { setVerificationCode([]) }} className="bg-black-800 w-1/2 text-lg text-white drop-shadow hover:text-lime-400 font-bold">Clear</Button>
                        <Button onClick={() => { setVerificationToken(false) }} className="bg-black-800 text-lg w-1/2 text-white drop-shadow hover:text-rose-400 font-bold">Close</Button>

                    </div>
                </Card>
            </div>
        )
    }



    const [showCashMenu, setShowCashMenu] = useState(false)
    return (
        <div className="w- min-h-screen h-auto relative bg-black text-white">

            {verificationToken && <TFAuthWindow setVerificationToken={setVerificationToken} />}
            {editProfile && <EditProfile toggleEdit={toggleEdit} userData={userData} />}
            {showUserList && <UserList forThis={showUserList} list={(otherUserData || userData)} setShowUserList={setShowUserList} />}
            <CashMenu autofill={_otherUserData?.displayName || _userData?.displayName} show={showCashMenu} forThis={showCashMenu} setShow={setShowCashMenu} UID={UID} />

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
                            <Button onPress={otherUserData ? follow : openAccount} className={`${followed ? 'bg-green-600 text-white font-extrabold text-lg' : 'text-base'}  w-full trans flex-shrink-0 h-8`}>{otherUserData ? (followed ? 'Following' : 'Follow') : 'Account'}</Button>
                            <div className="flex w-full h-8 gap-2 flex-shrink-0">
                                <Button onPress={() => { setShowCashMenu('send') }} className="w-full h-full">Send</Button>
                                {otherUserData && <Button onPress={() => { setShowCashMenu('request') }} className="w-full h-full">Request</Button>}

                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="px-4 w-full md:w-96   m-auto center gap-4">
                <h1 className="text-white text-3xl font-extabold">{(_otherUserData || _userData)?.displayName?.toUpperCase()}</h1>
                {!otherUserData && <button onClick={toggleEdit}>
                    <FileEditIcon />
                </button>}
            </div>
            <div className=" px-2 w-[98%] md:w-[30rem] p-2 rounded-2xl text-xl  bg-black-800 bg-opacity-5 lg:w-[26rem] m-auto  h-auto relative">
                {(_otherUserData || _userData)?.bio}

            </div>
            <PostView forThis={'My Posts'} showPostView={showPostView} setShowPostView={setSetShowPostView} allPosts={postData} currentPost={postData[currentPost]?.id} />
            {(otherUserData ? (otherUserData.pageSections.pins) : userData?.pageSections?.pins) && <PictureWall UID={otherUserData ? otherUserData?.uid : UID} />}

            {(otherUserData ? (otherUserData.pageSections.posts) : (userData?.pageSections?.posts)) &&
                <Card className="bg-black-800 text-white w-full md:w-[40rem] m-auto h-auto rounded-3xl ">
                    <CardHeader><h1 className="w-full text-3xl font-extrabold p-4">Posts</h1></CardHeader>
                    <CardBody className="p-0">
                        <div className="grid grid-cols-3 mb-4 w-fit m-auto h-auto max-h-[26rem] md:max-h-[34rem]  lg:max-h-[37rem] overflow-y-scroll hidescroll gap-2 p-1 ">
                            {postData?.map((post, index) => {
                                return (
                                    <Skeleton key={post.id} isLoaded={post?.link} className="lg:h-[12rem] lg:w-[12rem] md:w-[10rem] md:h-[10rem] w-[7.3rem] h-[7.3rem] border border-[#1f1f1f] overflow-hidden rounded-lg relative m-auto ">
                                        <button onClick={() => { setCurrentPost(index); setSetShowPostView(true) }} className="h-full w-full ">

                                            {post?.type == 'img' && <Image width={1920} height={1080} className="rounded-lg object-cover h-full w-full" src={post.link} alt="" />}
                                            {post?.type == 'vid' &&
                                                <video loop muted playsInline control={'true'} className="object-cover h-[12rem] w-full" >
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
                    </CardBody>
                </Card>}



            {(otherUserData ? (otherUserData.pageSections.store) : userData?.pageSections?.store) &&
                <Card className="w-full md:w-[40rem] m-auto bg-black-800 h-auto rounded-3xl mt-8">
                    <CardHeader className="  text-center text-white font-extrabold text-3xl ">
                        <h1 className="text-center">Store</h1>
                    </CardHeader>
                    <CardBody className="p-1">
                        <div className="evenly gap-4  overflow-y-scroll hidescroll h-12 w-full p-2">
                            {shopCategoriesData?.map((item) => {
                                return (
                                    <Button onPress={() => { setSelectedShopCategory(selectedShopCategory == item ? false : item) }} className={`${selectedShopCategory == item ? 'bg-rose-700' : 'bg-obacity-0'} text-lg font-semibold text-white w-32`}>
                                        {item}
                                    </Button>
                                )
                            })}
                        </div>
                        <div className="grid mt-4 md:grid-cols-4 grid-cols-3 w-full m-auto h-auto mb-4  overflow-clip max-h-[26rem] md:max-h-[34rem]  lg:max-h-[37rem] overflow-y-scroll hidescroll gap-2 p-1 ">
                            {shopData.map((product, index) => {
                                if (selectedShopCategory == product.category || !selectedShopCategory) return (
                                    <Card shadow="sm" key={index} isPressable onPress={() => setShowShopView(product.id)}>
                                        <CardBody className="overflow-visible p-0">
                                            <ProductView product={product} setShowShopView={setShowShopView} showShopView={showShopView} />
                                            <Image
                                                shadow="sm"
                                                radius="lg"
                                                width="100%"
                                                alt={product?.name}
                                                className="w-full object-cover h-[140px]"
                                                src={product?.media[0]?.url}
                                            />
                                        </CardBody>
                                        <CardFooter className="text-small justify-between">
                                            <b>{product?.name}</b>
                                            <p className="text-default-500">${product?.price}</p>
                                        </CardFooter>
                                    </Card>

                                )
                            })}
                        </div>
                    </CardBody>

                </Card>}

            {(otherUserData ? (otherUserData.pageSections.blogs) : userData?.pageSections?.blogs) &&
                <Card className="w-full md:w-[40rem] m-auto bg-black-800 h-auto rounded-3xl mt-8">
                    <CardHeader className="  text-center text-white font-extrabold text-3xl ">
                        <h1 className="text-center">Blog</h1>
                    </CardHeader>
                    <CardBody className="p-1">

                    </CardBody>

                </Card>}

            {(otherUserData ? (otherUserData.pageSections.bookings) : userData?.pageSections?.bookings) &&
                <Card className="w-full md:w-[40rem] m-auto bg-black-800 h-auto rounded-3xl mt-8">
                    <CardHeader className="  text-center text-white font-extrabold text-3xl ">
                        <h1 className="text-center">Booking</h1>
                    </CardHeader>
                    <CardBody className="p-1">

                    </CardBody>

                </Card>}

            {false &&
                <Card className="w-full md:w-[40rem] m-auto bg-black-800 h-auto rounded-3xl mt-8">
                    <CardHeader className="  text-center text-white font-extrabold text-3xl ">
                        <h1 className="text-center">Public Transactions</h1>
                    </CardHeader>
                    <CardBody className="p-1">
                        <Transactions />
                    </CardBody>

                </Card>}



            <div className="h-32">

            </div>




        </div >
    )
}
