'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '../../../../StateManager/GlobalContext'
import { FetchThisDocs, FetchThisDocs2, fetchDocument, fetchInOrder } from '../../myCodes/Database'
import Post from '../General/Post/Post'
import { initFollowing } from '../../myCodes/DatabaseUtils'
import { useAUTHListener } from '../../../../StateManager/AUTHListener'
import { getUID } from '../../myCodes/Auth'

export const HomeFeed = () => {
    const [postData, setPostData] = useState([])
    const [followingPostData, setFollowingPostData] = useState([])
    const { state, dispatch } = useGlobalContext()

    //sort postData b ID desc  .sort((a, b) => b.id - a.id)


    const getAllPosts = async () => {
        let FEED = await fetchInOrder('Posts', 'timeStamp')
        FEED = Object.values(FEED || {})
        setPostData(FEED)
        return FEED
    }

    const getFollowingsPost = async () => {
        const userData = await fetchDocument('Users', UID)
        console.log(userData)
        const following = userData.following
        following?.forEach(async (item) => {
            console.log('first')
            const newPosts = await FetchThisDocs('Posts', 'creator', '==', Object.keys(item)[0], 'timeStamp')
            setFollowingPostData(oldPosts => {
                return (
                    [...oldPosts, ...newPosts].sort((a, b) => b.timeStamp - a.timeStamp)
                )
            })










        })
    }

    const user = useAUTHListener()
    const UID = getUID(user)

    console.log(postData, followingPostData)



    useEffect(() => {
        //router.refresh()
        console.log(user?.email)
        if (user?.email) {
            console.log('second')
            setPostData([])
            getFollowingsPost()
        } else {
            getAllPosts()
        }


    }, [state, user?.email])

    useEffect(() => {
        initFollowing()
    }, [])



    return (


        <div className="grid grid-cols-1  gap-8 mt-10 last:mb-12">
            {
                (user.email ? followingPostData : postData)?.map((postInfo) => {
                    if (postInfo.id) return (
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
                    )
                })
            }



        </div>
    )

}
