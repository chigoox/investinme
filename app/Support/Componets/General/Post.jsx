'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react"
import { useState } from "react"

import React from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import PostComment from "./PostComment"

const Post = ({ type, likes, link, text, comments, desc }) => {
    const [showComments, setShowComments] = useState(false)
    const [likePost, setLikePost] = useState(false)

    return (
        <div className=" overflow-hidden   relative h-[40rem] rounde d-tl-[2.5rem] w-full">
            <div className="bg-white h-20 w-20 absolute top-2 left-2 rounded-full">

            </div>

            {type == 'img' && <img className="h-[75%] w-full object-cover" src={link} alt='' />}
            {type == 'vid' && <video autoPlay muted loop className="h-[75%] object-fill w-full" src={link} alt='' />}
            {type == 'str' && < div className="mt-24 h-[50%] overflow-hidden w-full border p-2">
                && <h1 className=""  >{text}</h1>
            </div>}



            <div className="flex gap-2 p-1">
                <Button onPress={() => { setLikePost(!likePost) }} className=" min-h-0 h-fit  min-w-fit text-white p-0  bg-opacity-0 m-0 bg-none">
                    {likePost ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
                </Button>
                Likes {likes}
            </div >
            <div className="p-2 overflow-x-scroll  h-auto">
                {desc}
            </div>
            <div>{comments[0].comment}</div>
            <Button onPress={() => { setShowComments(!showComments) }} className="px-2 w-full rounded-none p-0">
                Show all {Object.keys(comments).length} comments
            </Button>

            <Modal isOpen={showComments} onClose={() => { setShowComments(!showComments) }} className="bg-black-800 text-white">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">comments</ModalHeader>
                            <ModalBody>
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