'use client'
import React, { useEffect, useState } from 'react'
import { getRand } from "../Support/myCodes/Util";
import { useGlobalContext } from '../../StateManager/GlobalContext';
import { fetchDocument, fetchInOrder } from '../Support/myCodes/Database';
import Post from '../Support/Componets/General/Post/Post';
import { Button, Skeleton } from '@nextui-org/react';
import UserAvatar from '../Support/Componets/General/User/Avatar';
import PostView from '../Support/Componets/General/Post/PostView';
import { PostInside } from './PostInside';






function page() {

    const [data, setData] = useState([])
    const { state, dispatch } = useGlobalContext()

    const [showPostView, setShowPostView] = useState(false)








    const getData = async () => {
        let FEED = await fetchInOrder('Posts', 'likesCount', 100)
        FEED = Object.values(FEED || {})
        setData(FEED)
        return FEED
    }


    const Size1 = ({ postInfo, index, data }) => {
        const { type, link, creator } = postInfo

        return (
            <button className=' overflow-hidden flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow bg-black-800 mx-auto my-auto   lg:h-36 md:h-32 h-24 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside data={data} creator={creator} link={link} type={type} index={index} />
            </button>
        )
    }


    const Size2 = ({ postInfo, index, data, }) => {
        const { type, link, creator } = postInfo
        return (
            <div className='flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow  bg-green-500 mx-auto mt-2 mb-2 lg:h-60 m-auto  md:h-48 h-32 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside data={data} creator={creator} link={link} type={type} index={index} />

            </div>
        )
    }
    const Size3 = ({ postInfo, index, data, }) => {
        const { type, link, creator } = postInfo
        return (
            <div className='flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow bg-blue-500 mx-auto my-auto overflow-hidden m-auto lg:h-52 md:h-40 h-36  lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside data={data} creator={creator} link={link} type={type} index={index} />

            </div>
        )
    }

    const Size4 = ({ postInfo, index, data, }) => {
        const { type, link, creator } = postInfo
        return (
            <div className='flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow bg-stone-600 mx-auto mt-2 mb-2 overflow-hidden m-auto lg:h-64 md:h-52 h-48 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside data={data} creator={creator} link={link} type={type} index={index} />

            </div>
        )
    }
    const Size5 = ({ postInfo, index, data }) => {
        const { type, link, creator } = postInfo
        return (
            <div className='flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow bg-purple-700 mx-auto mt-1 mb-1 lg:h-72 md:h-64 h-52 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside data={data} creator={creator} link={link} type={type} index={index} />

            </div>
        )
    }

    const Size6 = ({ postInfo, index, data, }) => {
        const { type, link, creator } = postInfo
        return (
            <div className=' flex-shrink-0 hover:scale-[1.1] scale-1 trans-slow bg-emerald-700 my-1 m-auto overflow-hidden lg:h-[20rem] md:h-52 h-48  lg:w-96 md:w-48 w-32 rounded-xl'>
                <PostInside data={data} creator={creator} link={link} type={type} index={index} />

            </div>
        )
    }


    useEffect(() => {
        //router.refresh()

        const run = async () => {
            await getData()
        }
        run()
    }, [state])

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [Sized, setSized] = useState(false)

    console.log(selectedIndex)
    return (
        <main className='bg-gradient-to-t via-black  from-black h-screen to-[#030012] flex min-h-screen w-screen  overflow-x-hidden flex-col items-center justify-center text-white'>
            <PostView allPosts={data} index={selectedIndex} showPostView={showPostView} setShowPostView={setShowPostView} currentPost={data[selectedIndex]?.id} />
            <div className='flex flex-wrap  mb-12 trans md:px-20 lg:px-40 xl:px-32 py-4 w-full   h-full    lg:ml-60 overflow-y-scroll overflow-hidden  '>
                {data.map((postInfo, index) => {

                    const size = getRand(7) - 1


                    if (!Sized) setSized(true)
                    return (<button onClick={() => { setSelectedIndex(index); setShowPostView(true) }} className='h-fit w-fit mx-auto m1-2 mb-1'>
                        {(size == 1) && <Size1 data={data} key={postInfo.id} postInfo={postInfo} index={index} setSelectedIndex={setSelectedIndex} />}
                        {(size == 2) && <Size2 data={data} key={postInfo.id} postInfo={postInfo} index={index} setSelectedIndex={setSelectedIndex} />}
                        {(size == 3) && <Size3 data={data} key={postInfo.id} postInfo={postInfo} index={index} setSelectedIndex={setSelectedIndex} />}
                        {(size == 4) && <Size4 data={data} key={postInfo.id} postInfo={postInfo} index={index} setSelectedIndex={setSelectedIndex} />}
                        {(size == 5) && <Size5 data={data} key={postInfo.id} postInfo={postInfo} index={index} setSelectedIndex={setSelectedIndex} />}
                        {(size == 6) && <Size6 data={data} key={postInfo.id} postInfo={postInfo} index={index} setSelectedIndex={setSelectedIndex} />}
                    </button>)

                })
                }
            </div>

        </main>
    )
}

export default page