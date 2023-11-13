'use client'
import { Button, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiFillDollarCircle, AiFillHeart, AiOutlineDollarCircle, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { postIDPrefix } from "../../../../META";
import { fetchDocument, updateArrayDatabaseItem, updateDatabaseItem } from "../../../myCodes/Database";
import PostComment from "./PostComment";
import { useGlobalContext } from "../../../../../StateManager/GlobalContext";
import { getUID } from "../../../myCodes/Auth";
import { useAUTHListener } from "../../../../../StateManager/AUTHListener";
import { formatNumber, getRandTN } from "../../../myCodes/Util";
import UserAvatar from "../User/Avatar";
import { serverTimestamp } from "firebase/firestore";

const Post = ({ id, type, likes, likesCount, tags, link, text, comments, desc, donations, postINFO, creator }) => {
    const [showComments, setShowComments] = useState(false)
    const [postDoantion, setPostDonation] = useState(false)
    const [comment, setComment] = useState('')
    const { state, dispatch } = useGlobalContext()
    const user = useAUTHListener()
    const UID = getUID(user)
    const [postLike, setPostLike] = useState(likes.includes(UID))
    const [creatorData, setCreatorData] = useState({})

    const _creatorData = creatorData?.UserInfo


    const postComment = async () => {



        const { commentID } = await fetchDocument('MetaData', 'postMeta')
        const { comments } = await fetchDocument('Posts', `${postIDPrefix}-${id}`)

        await updateDatabaseItem('Posts', `${postIDPrefix}-${id}`, 'comments', {
            ...comments,
            [commentID]: {
                commentID: commentID,
                user: UID,
                comment: comment,
                commentReply: [],
                commentLikes: [],
                likeCount: 0,
                timeStamp: serverTimestamp()
            }
        })

        await updateDatabaseItem('MetaData', 'postMeta', 'commentID', commentID + 1)

        dispatch({ type: "NEW_POST", value: {} })
        setComment('')

    }




    const likePost = async () => {
        setPostLike(!postLike)
        if (postLike == false) {
            await updateArrayDatabaseItem('Posts', `${postIDPrefix}-${id}`, 'likes', UID)
            await updateDatabaseItem('Posts', `${postIDPrefix}-${id}`, 'likesCount', likes?.length)
        } else {
            await updateArrayDatabaseItem('Posts', `${postIDPrefix}-${id}`, 'likes', UID, true)
            await updateDatabaseItem('Posts', `${postIDPrefix}-${id}`, 'likesCount', likes?.length)
        }


        dispatch({ type: "NEW_POST", value: {} })

    }
    const getCreatorData = async () => {
        await fetchDocument('Users', creator, setCreatorData)
    }
    useEffect(() => {
        const run = async () => {
            await getCreatorData()
        }

        run()


    }, [])

    return (
        <div className={`${type == 'txt' ? 'h-fit' : ' h-[40rem]'} overflow-hidden  rounded-lg relative  w-96`}>
            <div className="absolute w-full  top-2 left-2 s">
                <UserAvatar user={_creatorData} gustName={creator} creatorData={creatorData} />
            </div>





            {type == 'img' && <img className="h-[75%] w-full object-cover md:rounded-lg" src={link} alt='' />}
            {type == 'vid' &&
                <video autoPlay loop muted playsInline className="h-[75%] object-cover w-full md:rounded-lg" >
                    <source src={link} type="video/mp4" />
                </video>}
            {type == 'txt' && <div className="mt-24 rounded-lg  h-fit overflow-hidden font-bold w-full  px-8">
                <h1 className="w-auto break-words" >{link}</h1>
            </div>}

            <div className="text-white px-2 py-1  h-fit bg-black-900 max-h-10 overflow-y-scroll hidescroll">
                {tags?.map((tag => {
                    console.log(tag)
                    return (
                        <Link href={`/Tags/${tag.replace('#', '')}`}>{tag}</Link>
                    )
                }))}
            </div>

            {type != 'txt' && <div className="px-2 py-1 overflow-x-scroll text-white  h-auto">
                {desc}
            </div>}



            <div className="px-4 center ">
                <Button onPress={() => { setShowComments(!showComments) }} className="px-2 w-fit m-auto rounded-none p-0 bg-none bg-opacity-0 text-white" >
                    Show all {formatNumber(Object.keys(comments || {}).length)} comments
                </Button>
            </div>

            <div className="evenly">
                <div className="flex gap-2 p-1">
                    <Button onPress={likePost} className=" min-h-0 h-fit  min-w-fit text-white p-0  bg-opacity-0 m-0 bg-none">
                        {likes.includes(UID) ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
                    </Button>
                    {formatNumber(likes?.length)}
                </div >
                <div className="flex gap-2 p-1">
                    <Button onPress={() => { setPostDonation(!postDoantion) }} className=" min-h-0 h-fit  min-w-fit text-white p-0  bg-opacity-0 m-0 bg-none">
                        {postDoantion ? <AiFillDollarCircle size={24} /> : <AiOutlineDollarCircle size={24} />}
                    </Button>
                    {formatNumber(donations?.length)}
                </div >
            </div>



            <Modal placement="auto" isOpen={showComments} onClose={() => { setShowComments(!showComments) }} className="bg-black-800 h-96 text-white bottom-12 ">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">comments</ModalHeader>
                            <ModalBody className="overflow-y-scroll hidescroll">
                                {Object.values(comments)?.sort((a, b) => b.likeCount - a.likeCount)?.map((commentt) => {

                                    const aComment = commentt

                                    return (
                                        <PostComment post={`${postIDPrefix}-${id}`} user={aComment.user} likeCount={aComment.likeCount} commentLikes={aComment.commentLikes} commentID={aComment.commentID} commentReply={aComment.commentReply} comment={aComment.comment} />
                                    )
                                })}
                            </ModalBody>
                            <ModalFooter className="text-black">
                                <Input value={comment} onValueChange={(text) => { setComment(text) }} placeholder="add a comment" />
                                <Button onPress={postComment} className="min-w-fit"><AiOutlineSend size={32} /></Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </div >)
}

export default Post