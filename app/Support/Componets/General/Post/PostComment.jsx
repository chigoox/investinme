import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { formatNumber } from '../../../myCodes/Util'
import UserAvatar from '../User/Avatar'
import { useAUTHListener } from '../../../../../StateManager/AUTHListener'
import { fetchDocument } from '../../../myCodes/Database'

const PostComment = ({ user, comment, commentLikes }) => {
    const [commenter, setCommenter] = useState({})
    const getData = async () => {
        const _user = await fetchDocument('Users', user)
        setCommenter(_user)

    }
    const UID = useAUTHListener().uid
    console.log(UID)
    const _user = commenter.UserInfo
    useEffect(() => {
        getData()


    }, [user])

    const [likedComment, setLikedComment] = useState(false)
    return UID == user ? (
        <div className=" flex justify-end">
            <div className='flex between'>
                <div className="flex gap-2 p-1">
                    <Button onPress={() => { setLikedComment(!likedComment) }} className=" min-h-0 h-fit  min-w-fit text-white p-0  bg-opacity-0 m-0 bg-none">
                        {likedComment ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
                    </Button>
                    {formatNumber(commentLikes.length)}
                </div>
                <h1 className=" py-4 px-2 text-sm">{comment}</h1>
            </div>
            <UserAvatar forthis={'comment'} size='sm' user={_user} />
        </div>
    ) :
        (
            <div className=" flex ">
                <UserAvatar forthis={'comment'} size='sm' user={_user} />
                <div className='flex between  '>
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