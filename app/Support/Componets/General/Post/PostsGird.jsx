'use client'
import { Skeleton } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { fetchArrayContains } from '../../../myCodes/Database';
import PostView from './PostView';

function PostsGird({ }) {

    const [postData, setPostData] = useState([])
    const [showPostView, setSetShowPostView] = useState(false)
    const [currentPost, setCurrentPost] = useState(0)
    const path = usePathname().replace('/Tags/', '#')

    const getPostData = async () => {
        const data = await fetchArrayContains('Posts', 'tags', path)
        setPostData(data)
    }


    useEffect(() => {
        const run = async () => {
            await getPostData()
        }

        run()
    }, [])







    return (
        <div className='md:felx  md:items-start md:justify-evenly md:flex-wrap grid grid-cols-3 lg:grid-cols-4 gap-2  mb-12 trans md:pl-20 lg:pl-40 xl:pl-32 py-4 w-full   h-auto max-h-96     overflow-y-scroll overflow-hidden '>
            < PostView forThis={'My Posts'} showPostView={showPostView} setShowPostView={setSetShowPostView} allPosts={postData} currentPost={postData[currentPost]?.id} />

            {(postData ? postData : [1, 2, 3, 4, 5])?.map((post, index) => {
                return (
                    <Skeleton key={post.id} isLoaded={post?.link} className="lg:h-[12rem] flex-shrink-0 m-auto lg:w-[12rem] md:w-[10rem] md:h-[10rem] w-[7.3rem] h-[7.3rem] border border-[#1f1f1f] overflow-hidden rounded-lg relative">
                        <button onClick={() => { setCurrentPost(index); setSetShowPostView(true) }} className="h-full w-full  bg-white">

                            {post?.type == 'img' && <img className="object-cover h-full w-full" src={post.link} alt="" />}
                            {post?.type == 'vid' &&
                                <video loop muted playsInline className="object-cover h-full w-full" >
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
    )
}

export default PostsGird