import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { formatNumber } from '../../myCodes/Util'

const PostComment = ({ user, comment, commentLikes }) => {
    const [likedComment, setLikedComment] = useState(false)
    return (
        <div className="border-b">
            <h1>{user}</h1>
            <div className='flex between'>
                <h1 className=" py-4 px-2 text-sm">{comment}</h1>
                <div className="flex gap-2 p-1">
                    <Button onPress={() => { setLikedComment(!likedComment) }} className=" min-h-0 h-fit  min-w-fit text-white p-0  bg-opacity-0 m-0 bg-none">
                        {likedComment ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
                    </Button>
                    {formatNumber(commentLikes.length)}
                </div>
            </div>
        </div>
    )
}

export default PostComment