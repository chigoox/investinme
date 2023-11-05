'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '../../../../StateManager/GlobalContext'
import { fetchInOrder } from '../../myCodes/Database'
import Post from '../General/Post'

export const HomeFeed = () => {
    const router = useRouter()
    const [data, setData] = useState([])
    const { state, dispatch } = useGlobalContext()



    const getData = async () => {
        let FEED = await fetchInOrder('Posts', 'id')
        FEED = Object.values(FEED || {})
        setData(FEED)
        return FEED
    }




    useEffect(() => {
        //router.refresh()
        getData()
    }, [state])

    console.log(data)


    return (


        <div className="grid grid-cols-1  gap-8 mt-10 last:mb-12">


            {
                data?.map((postInfo) => {
                    if (postInfo.id) return (
                        <Post
                            postINFO={postInfo}
                            id={postInfo.id}
                            key={postInfo.id}
                            PostId={postInfo.id}
                            type={postInfo.type}
                            link={postInfo?.post?.img[0]}
                            likes={postInfo.likes}
                            donations={postInfo.donations}
                            desc={postInfo.caption}
                            tags={postInfo.tags}
                            postOrigin={postInfo.creator}
                            comments={postInfo.comments}
                        />
                    )
                })
            }



        </div>
    )

}
