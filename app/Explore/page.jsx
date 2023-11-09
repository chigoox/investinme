'use client'
import React, { useEffect, useState } from 'react'
import { getRand } from "../Support/myCodes/Util";
import { useGlobalContext } from '../../StateManager/GlobalContext';
import { fetchInOrder } from '../Support/myCodes/Database';
import Post from '../Support/Componets/General/Post/Post';

function page() {
    /* 
    
    <Post
                                postINFO={postInfo}
                                id={postInfo.id}
                                key={postInfo.id}
                                PostId={postInfo.id}
                                type={postInfo.type}
                                link={postInfo?.post?.img[0]}
                                likes={postInfo.likes}
                                likesCount={postInfo.likesCount}
                                donations={postInfo.donations}
                                desc={postInfo.caption}
                                tags={postInfo.tags}
                                comments={postInfo.comments}
                                creator={postInfo?.creator}
                            />
    
    */
    const PostInside = ({ type, link }) => {
        return (<div className='h-full  center-col overflow-hidden'>
            {type == 'img' && <img className="h-full w-full object-cover md:rounded-lg" src={link} alt='' />}
            {type == 'vid' &&
                <video autoPlay loop muted playsInline className="h-full object-cover w-full md:rounded-lg" >
                    <source src={link} type="video/mp4" />
                </video>}
            {type == 'txt' && <div className="rounded-lg  h-fit overflow-hidden font-bold w-full  px-8">
                <h1 className="w-auto break-words" >{link}</h1>
            </div>}
        </div>)
    }

    const Size1 = ({ postInfo }) => {
        const { type, link } = postInfo

        return (
            <div className=' overflow-hidden flex-shrink-0 bg-black-800 mx-auto my-auto   lg:h-36 md:h-32 h-24 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside link={link} type={type} />
            </div>
        )
    }


    const Size2 = ({ postInfo }) => {
        const { type, link } = postInfo
        return (
            <div className='flex-shrink-0  bg-green-500 mx-auto mt-2 mb-2 lg:h-60 m-auto  md:h-48 h-32 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside link={link} type={type} />

            </div>
        )
    }
    const Size3 = ({ postInfo }) => {
        const { type, link } = postInfo
        return (
            <div className='flex-shrink-0 bg-blue-500 mx-auto my-auto overflow-hidden m-auto lg:h-52 md:h-40 h-36  lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside link={link} type={type} />

            </div>
        )
    }

    const Size4 = ({ postInfo }) => {
        const { type, link } = postInfo
        return (
            <div className='flex-shrink-0 bg-stone-600 mx-auto mt-2 mb-2 overflow-hidden m-auto lg:h-64 md:h-52 h-48 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside link={link} type={type} />

            </div>
        )
    }
    const Size5 = ({ postInfo }) => {
        const { type, link } = postInfo
        return (
            <div className='flex-shrink-0 bg-purple-700 mx-auto mt-1 mb-1 lg:h-72 md:h-64 h-52 lg:w-52 md:w-48 w-32 rounded-xl'>
                <PostInside link={link} type={type} />

            </div>
        )
    }

    const Size6 = ({ postInfo }) => {
        const { type, link } = postInfo
        return (
            <div className=' flex-shrink-0 bg-emerald-700 my-1 m-auto overflow-hidden lg:h-[20rem] md:h-52 h-48  lg:w-96 md:w-48 w-32 rounded-xl'>
                <PostInside link={link} type={type} />

            </div>
        )
    }

    const [data, setData] = useState([])
    const { state, dispatch } = useGlobalContext()




    const getData = async () => {
        let FEED = await fetchInOrder('Posts', 'likesCount')
        FEED = Object.values(FEED || {})
        setData(FEED)
        return FEED
    }


    console.log(data)

    useEffect(() => {
        //router.refresh()
        getData()

    }, [state])




    return (
        <main className='bg-gradient-to-t via-black  from-black h-screen to-[#030012] flex min-h-screen w-screen  overflow-x-hidden flex-col items-center justify-center text-white'>

            <div className='flex flex-wrap  mb-12 trans md:px-20 lg:px-40 xl:px-32 py-4 w-full   h-full border   lg:ml-60 overflow-y-scroll overflow-hidden  '>
                {data.map((postInfo) => {

                    console.log(postInfo.likesCount)

                    const size = getRand(7) - 1
                    if (size == 1) return <Size1 key={postInfo.id} postInfo={postInfo} />
                    if (size == 2) return <Size2 key={postInfo.id} postInfo={postInfo} />
                    if (size == 3) return <Size3 key={postInfo.id} postInfo={postInfo} />
                    if (size == 4) return <Size4 key={postInfo.id} postInfo={postInfo} />
                    if (size == 5) return <Size5 key={postInfo.id} postInfo={postInfo} />
                    if (size == 6) return <Size6 key={postInfo.id} postInfo={postInfo} />
                })
                }
            </div>

        </main>
    )
}

export default page