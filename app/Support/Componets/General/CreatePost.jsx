import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import ShippinInfo from '../User/ShippinInfo'
import { Uploader } from './Uploader'

const CreatePost = ({ showCreatePost, setShowCreatePost }) => {
    const [pagePosition, setPagePosition] = useState(0)
    const [post, setPost] = useState()

    const UploadPost = (<div>
        <ModalHeader className="flex flex-col text-center  gap-1">Create new post</ModalHeader>
        <ModalBody className="overflow-y-scroll hidescroll">
            <Uploader setter={setPost} limit={1} folderName={'Posts'} />
        </ModalBody>


    </div>)

    const CropPost = (<div>
        <ModalHeader className="flex flex-col text-center  gap-1">Create Post</ModalHeader>
        <ModalBody className="overflow-y-scroll hidescroll">

        </ModalBody>
    </div>)
    const EditPost = (<div>
        <ModalHeader className="flex flex-col text-center  gap-1">Create Post</ModalHeader>
        <ModalBody className="overflow-y-scroll hidescroll">

        </ModalBody>

    </div>)
    const sharePost = (<div>
        <ModalHeader className="flex flex-col text-center  gap-1">Create Post</ModalHeader>
        <ModalBody className="overflow-y-scroll hidescroll">

        </ModalBody>


    </div>)

    const page = [UploadPost, CropPost, EditPost, sharePost]

    useEffect(() => {
        console.log(post)
        console.log(post?.img == [])
        if (post?.img == []) setPagePosition(1)
    }, [post])

    return (
        <Modal isDismissable={false} placement="auto" isOpen={showCreatePost} onClose={() => { setShowCreatePost(false) }} className="bg-black-800 w-auto trans h-96 text-white bottom-12 ">

            <ModalContent>
                {page[pagePosition]}

            </ModalContent>

        </Modal>
    )
}

export default CreatePost