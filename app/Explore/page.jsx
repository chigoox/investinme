'use client'
import React, { useEffect, useState } from 'react'
import { getRand } from "../Support/myCodes/Util";
import { useGlobalContext } from '../../StateManager/GlobalContext';
import { fetchDocument, fetchInOrder } from '../Support/myCodes/Database';
import Post from '../Support/Componets/General/Post/Post';
import { Button, Skeleton } from '@nextui-org/react';
import UserAvatar from '../Support/Componets/General/User/Avatar';
import PostView from '../Support/Componets/General/Post/PostView';

function page() {

    const [data, setData] = useState([])
    const { state, dispatch } = useGlobalContext()
    const [showPostView, setShowPostView] = useState(false)
    const [currentPost, setCurrentPost] = useState(0)





    const PostInside = ({ type, link, creator }) => {
        const [creatorData, setCreatorData] = useState({})

        const getCreatorData = (userID) => {
            fetchDocument('Users', userID, setCreatorData)
        }

        useEffect(() => {
            getCreatorData(creator)
        }, [state])




        return (<div className='h-full relative center-col overflow-hidden'>
            <div className='absolute scale-75 top-0 -left-2 '>

                <UserAvatar user={creatorData.UserInfo} />
            </div>
            <div className='p-0 h-full w-full  overflow-hidden center-col bg-opacity-0'>
                {type == 'img' && <img className="h-full w-full object-cover rounded-xl" src={link} alt='' />}
                {type == 'vid' &&
                    <video autoPlay loop muted playsInline className="h-full object-cover w-full rounded-xl" >
                        <source src={link} type="video/mp4" />
                    </video>}
                {type == 'txt' && <div className="rounded-xl center break-words text-center  h-full w-full overflow-hidden font-bold  px-8">
                    <div className=" break-words text-center " >{link}</div>
                </div>}
            </div>



        </div>)
    }

    const Size1 = ({ postInfo, index, setCurrentPost }) => {
        const { type, link, creator } = postInfo

        return (
            <button onClick={() => { setCurrentPost(index); setShowPostView(true) }} className=' overflow-hidden flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow bg-black-800 mx-auto my-auto   lg:h-36 md:h-32 h-24 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside creator={creator} link={link} type={type} index={index} />
            </button>
        )
    }


    const Size2 = ({ postInfo, index, setCurrentPost }) => {
        const { type, link, creator } = postInfo
        return (
            <div className='flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow  bg-green-500 mx-auto mt-2 mb-2 lg:h-60 m-auto  md:h-48 h-32 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside creator={creator} link={link} type={type} index={index} />

            </div>
        )
    }
    const Size3 = ({ postInfo, index, setCurrentPost }) => {
        const { type, link, creator } = postInfo
        return (
            <div className='flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow bg-blue-500 mx-auto my-auto overflow-hidden m-auto lg:h-52 md:h-40 h-36  lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside creator={creator} link={link} type={type} index={index} />

            </div>
        )
    }

    const Size4 = ({ postInfo, index, setCurrentPost }) => {
        const { type, link, creator } = postInfo
        return (
            <div className='flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow bg-stone-600 mx-auto mt-2 mb-2 overflow-hidden m-auto lg:h-64 md:h-52 h-48 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside creator={creator} link={link} type={type} index={index} />

            </div>
        )
    }
    const Size5 = ({ postInfo, index, setCurrentPost }) => {
        const { type, link, creator } = postInfo
        return (
            <div className='flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow bg-purple-700 mx-auto mt-1 mb-1 lg:h-72 md:h-64 h-52 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside creator={creator} link={link} type={type} index={index} />

            </div>
        )
    }

    const Size6 = ({ postInfo, index, setCurrentPost }) => {
        const { type, link, creator } = postInfo
        return (
            <div className=' flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow bg-emerald-700 my-1 m-auto overflow-hidden lg:h-[20rem] md:h-52 h-48  lg:w-96 md:w-48 w-32 rounded-xl'>
                <PostInside creator={creator} link={link} type={type} index={index} />

            </div>
        )
    }





    const getData = async () => {
        let FEED = await fetchInOrder('Posts', 'likesCount', 100)
        FEED = Object.values(FEED || {})
        setData(FEED)
        return FEED
    }

    console.log(state)

    console.log(data)


    useEffect(() => {
        //router.refresh()

        getData()

    }, [state.newPost])




    return (
        <main className='bg-gradient-to-t via-black  from-black h-screen to-[#030012] flex min-h-screen w-screen  overflow-x-hidden flex-col items-center justify-center text-white'>
            <PostView allPosts={data} showPostView={showPostView} setShowPostView={setShowPostView} currentPost={data[currentPost]?.id} />

            <div className='flex flex-wrap  mb-12 trans md:px-20 lg:px-40 xl:px-32 py-4 w-full   h-full    lg:ml-60 overflow-y-scroll overflow-hidden  '>
                {data.map((postInfo, index) => {



                    const size = getRand(7) - 1
                    if (size == 1) return <Size1 key={postInfo.id} setCurrentPost={setCurrentPost} postInfo={postInfo} index={index} />
                    if (size == 2) return <Size2 key={postInfo.id} setCurrentPost={setCurrentPost} postInfo={postInfo} index={index} />
                    if (size == 3) return <Size3 key={postInfo.id} setCurrentPost={setCurrentPost} postInfo={postInfo} index={index} />
                    if (size == 4) return <Size4 key={postInfo.id} setCurrentPost={setCurrentPost} postInfo={postInfo} index={index} />
                    if (size == 5) return <Size5 key={postInfo.id} setCurrentPost={setCurrentPost} postInfo={postInfo} index={index} />
                    if (size == 6) return <Size6 key={postInfo.id} setCurrentPost={setCurrentPost} postInfo={postInfo} index={index} />
                })
                }
            </div>

        </main>
    )
}

export default page