import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { formatNumber } from '../../../myCodes/Util'
import UserAvatar from '../User/Avatar'
import { useAUTHListener } from '../../../../../StateManager/AUTHListener'
import { addToDatabase, fetchDocument, updateArrayDatabaseItem, updateDatabaseItem } from '../../../myCodes/Database'
import { getUID } from '../../../myCodes/Auth'
import { useGlobalContext } from '../../../../../StateManager/GlobalContext'
import LoaddingMask from '../LoadingMask'

const PostComment = ({ user, comment, commentLikes, commentReply, commentID, post, likeCount, commentLoading }) => {
    const [commenter, setCommenter] = useState({})
    const [likedComment, setLikedComment] = useState(false)
    const [loading, setLoading] = useState(false)
    const getData = async () => {
        const _user = await fetchDocument('Users', user)
        setCommenter(_user)

    }
    const { dispatch } = useGlobalContext()
    const UID = getUID(useAUTHListener())
    const _user = commenter?.UserInfo

    useEffect(() => {
        getData()


    }, [user])

    const likeComment = async (noOverload) => {
        setLoading(true)
        setLikedComment(!likedComment)

        const { comments } = await fetchDocument('Posts', post)
        if (!likedComment) {
            await updateDatabaseItem('Posts', post, 'comments', {
                ...comments,
                [commentID]: {
                    commentID: commentID,
                    user: user,
                    comment: comment,
                    commentLikes: [...commentLikes, UID],
                    commentReply: [...commentReply],
                    likeCount: likeCount + 1
                }
            })
        } else {
            await updateDatabaseItem('Posts', post, 'comments', {
                ...comments,
                [commentID]: {
                    commentID: commentID,
                    user: UID,
                    comment: comment,
                    commentLikes: [...commentLikes].filter(i => !i.includes(UID)),
                    commentReply: [...commentReply],
                    likeCount: likeCount - 1
                }
            })

        }
        setLoading(false)

        dispatch({ type: "NEW_POST", value: {} })


    }


    useEffect(() => {
        setLikedComment(commentLikes?.includes(UID))


    }, [UID, comment])




    return UID == user ? (
        <div className=" flex justify-end z-20">
            {(loading || commentLoading) && <LoaddingMask forThis={'contain'} />}
            <div className='flex between'>
                <div className="flex gap-2 p-1">
                    <Button onPress={likeComment} className=" min-h-0 h-fit  min-w-fit text-white p-0  bg-opacity-0 m-0 bg-none">
                        {likedComment ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
                    </Button>
                    {formatNumber(commentLikes?.length)}
                </div>
                <h1 className=" py-4 px-2 text-sm">{comment}</h1>
            </div>
            <UserAvatar gustName={user} forthis={'comment'} size='sm' user={_user} />
        </div>
    ) :
        (
            <div className=" flex ">
                <UserAvatar forthis={'comment'} gustName={user} size='sm' user={_user} />
                <div className='flex between  '>
                    <h1 className=" py-4 px-2 text-sm">{comment}</h1>
                    <div className="flex gap-2 p-1">
                        <Button onPress={() => { likeComment(true) }} className=" min-h-0 h-fit  min-w-fit text-white p-0  bg-opacity-0 m-0 bg-none">
                            {likedComment ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
                        </Button>
                        {formatNumber(commentLikes?.length)}
                    </div>
                </div>
            </div>
        )
}

export default PostComment