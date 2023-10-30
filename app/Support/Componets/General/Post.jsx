'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react"
import { useState } from "react"

import React from 'react'
import { AiFillDollarCircle, AiFillHeart, AiOutlineDollarCircle, AiOutlineHeart } from "react-icons/ai"
import PostComment from "./PostComment"
import { formatNumber } from "../../myCodes/Util";

const Post = ({ type, likes, link, text, comments, desc, donations }) => {
    const [showComments, setShowComments] = useState(false)
    const [postLike, setPostLike] = useState(false)
    const [postDoantion, setPostDonation] = useState(false)

    return (
        <div className=" overflow-hidden   relative h-[40rem] rounde d-tl-[2.5rem] w-full">
            <div className="bg-white h-20 w-20 absolute top-2 left-2 rounded-full">

            </div>

            {type == 'img' && <img className="h-[75%] w-full object-cover md:rounded-3xl" src={link} alt='' />}
            {type == 'vid' && <video controls muted autoPlay loop playsInline preload="auto" width="100%" height="100%" className="h-[75%] object-fill w-full md:rounded-3xl" >
                <source src={link} type="video/mp4" />
                Your browser does not support the video tag.
            </video>}
            {type == 'str' && <div className="mt-24 rounded-3xl border h-[50%] overflow-hidden font-bold w-full border-b p-4">
                <h1 className="w-auto break-words" >{text}</h1>
            </div>}



            <div className="evenly">
                <div className="flex gap-2 p-1">
                    <Button onPress={() => { setPostLike(!postLike) }} className=" min-h-0 h-fit  min-w-fit text-white p-0  bg-opacity-0 m-0 bg-none">
                        {postLike ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
                    </Button>
                    {formatNumber(likes)}
                </div >
                <div className="flex gap-2 p-1">
                    <Button onPress={() => { setPostDonation(!postDoantion) }} className=" min-h-0 h-fit  min-w-fit text-white p-0  bg-opacity-0 m-0 bg-none">
                        {postDoantion ? <AiFillDollarCircle size={24} /> : <AiOutlineDollarCircle size={24} />}
                    </Button>
                    {formatNumber(donations)}
                </div >
            </div>
            <div className="p-2 overflow-x-scroll  h-auto">
                {desc}
            </div>
            <div className="px-4">{comments[0].comment}</div>
            <Button onPress={() => { setShowComments(!showComments) }} className="px-2 w-full rounded-none p-0">
                Show all {formatNumber(Object.keys(comments).length)} comments
            </Button>

            <Modal scrollBehavior={'outside'} isOpen={showComments} onClose={() => { setShowComments(!showComments) }} className="bg-black-800 h-96 text-white ">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">comments</ModalHeader>
                            <ModalBody className="overflow-y-scroll hidescroll">
                                {comments.map(({ user, commentLikes, comment }) => {
                                    return (
                                        <PostComment user={user} commentLikes={commentLikes} comment={comment} />
                                    )
                                })}
                            </ModalBody>
                            <ModalFooter className="text-black">
                                <Input placeholder="add a comment" />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </div >)
}

export default Post