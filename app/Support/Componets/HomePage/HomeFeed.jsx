'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export const HomeFeed = () => {
    const [data, setData] = useState([])


    const getData = async () => {
        let FEED = await fetchInOrder('Posts', 'IVA-0')
        console.log(FEED)
        FEED = Object.values(FEED[0] || {})
        setData(FEED)
        return FEED
    }


    const router = useRouter()
    router.refresh()

    return (


        <div className="grid grid-cols-1  gap-8 mt-10">


            {
                data?.map((postInfo) => {
                    if (postInfo.id) return (
                        <Post
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
