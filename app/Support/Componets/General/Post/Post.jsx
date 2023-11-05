'use client'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiFillDollarCircle, AiFillHeart, AiOutlineDollarCircle, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { postIDPrefix } from "../../../../META";
import { updateArrayDatabaseItem, updateDatabaseItem } from "../../../myCodes/Database";
import PostComment from "./PostComment";
import { useGlobalContext } from "../../../../../StateManager/GlobalContext";
import { getUID } from "../../../myCodes/Auth";
import { useAUTHListener } from "../../../../../StateManager/AUTHListener";
import { formatNumber, getRandTN } from "../../../myCodes/Util";
import UserAvatar from "../User/Avatar";

const Post = ({ id, type, likes, link, text, comments, desc, donations, postINFO, creator }) => {
    const [showComments, setShowComments] = useState(false)
    const [postDoantion, setPostDonation] = useState(false)
    const [comment, setComment] = useState('')
    const { state, dispatch } = useGlobalContext()
    const user = useAUTHListener()
    const UID = getUID(user)
    console.log(likes, '=>', id)
    const [postLike, setPostLike] = useState(likes.includes(UID))

    const postComment = async () => {
        await updateArrayDatabaseItem('Posts', `${postIDPrefix}-${id}`, 'comments', {
            [UID]: {
                user: UID,
                comment: comment,
                commentLikes: []
            }
        }
        )
        dispatch({ type: "NEW_POST", value: {} })
        setComment('')

    }



    const likePost = async () => {

        if (postLike == false) {
            updateArrayDatabaseItem('Posts', `${postIDPrefix}-${id}`, 'likes', UID)
            dispatch({ type: "NEW_POST", value: {} })
        } else {
            updateArrayDatabaseItem('Posts', `${postIDPrefix}-${id}`, 'likes', UID, true)

        }


        dispatch({ type: "NEW_POST", value: {} })
        setPostLike(!postLike)

    }

    useEffect(() => {



    }, [])


    return (
        <div className=" overflow-hidden rounded-lg relative h-[40rem] rounde d-tl-[2.5rem] w-96">
            <div className="absolute top-2 left-2 rounded-full">
                <UserAvatar user={creator} />
            </div>





            {type == 'img' && <img className="h-[75%] w-full object-cover md:rounded-lg" src={link} alt='' />}
            {type == 'vid' &&
                <video autoPlay loop muted playsInline className="h-[75%] object-cover w-full md:rounded-lg" >
                    <source src={link} type="video/mp4" />
                </video>}
            {type == 'str' && <div className="mt-24 rounded-lg border h-[50%] overflow-hidden font-bold w-full border-b p-4">
                <h1 className="w-auto break-words" >{text}</h1>
            </div>}

            <div className="p-2 overflow-x-scroll text-white  h-auto">
                {desc}
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

            <div className="px-4">{ }</div>
            <Button onPress={() => { setShowComments(!showComments) }} className="px-2 w-full rounded-none p-0">
                Show all {formatNumber(Object.keys(comments || {}).length)} comments
            </Button>

            <Modal placement="auto" isOpen={showComments} onClose={() => { setShowComments(!showComments) }} className="bg-black-800 h-96 text-white bottom-12 ">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">comments</ModalHeader>
                            <ModalBody className="overflow-y-scroll hidescroll">
                                {comments?.map((commentt) => {
                                    const aComment = Object.values(commentt)[0]

                                    return (
                                        <PostComment user={aComment.user} commentLikes={aComment.commentLikes} comment={aComment.comment} />
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