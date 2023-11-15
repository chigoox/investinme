'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '../../../../StateManager/GlobalContext'
import { FetchThisDocs2, fetchDocument, fetchInOrder, fetchIncludesArray } from '../../myCodes/Database'
import Post from '../General/Post/Post'
import { initFollowing } from '../../myCodes/DatabaseUtils'
import { useAUTHListener } from '../../../../StateManager/AUTHListener'

export const HomeFeed = () => {
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [userData, setUserData] = useState({})
    const { state, dispatch } = useGlobalContext()

    //sort data b ID desc  .sort((a, b) => b.id - a.id)


    const user = useAUTHListener()




    const getData = async () => {

        let FEED = await fetchInOrder('Posts', 'timeStamp')


        const following = userData?.following?.map((user) => {
            return Object.keys(user)[0]
        })
        const FEED2 = userData?.following ? await fetchIncludesArray('Posts', 'creator', [...following, userData?.uid]) : []
        setData2(FEED2.sort((a, b) => b.timeStamp - a.timeStamp))
        FEED = Object.values(FEED || {})
        setData(FEED)

        return FEED
    }

    useEffect(() => {
        const run2 = async () => {
            if (user.uid) await initFollowing(user, setUserData)
        }


        run2()
    }, [user])


    useEffect(() => {
        //router.refresh()

        const run = async () => {
            await getData()
        }

        run()
    }, [state, userData])




    return (


        <div className="grid grid-cols-1  gap-8 mt-10 last:mb-12">
            {
                ((user.email && data2) ? data2 : data)?.map((postInfo) => {
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
