import React, { useEffect, useRef } from 'react'
import Post from './Post'

function PostFeed({ allPosts, currentPost }) {

    const refs = allPosts?.reduce((acc, value) => {
        acc[value.id] = useRef();

        return acc;
    }, {});



    useEffect(() => {


        refs[currentPost]?.current.scrollIntoView({
            behavior: "instant",
            block: "center"
        });
    }, [refs])
    return (
        <div className="grid grid-cols-1  gap-8 mt-10 last:mb-12 h-auto w-full">
            {
                allPosts?.map((postInfo, indexx) => {
                    const ref = refs[postInfo.id]
                    if (postInfo.id) return (
                        <div ref={ref} key={postInfo.id}>
                            <Post
                                postINFO={postInfo}
                                id={postInfo.id}
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
                        </div>
                    )
                })
            }



        </div>
    )
}

export default PostFeed