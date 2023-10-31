import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'
import ShippinInfo from '../User/ShippinInfo'

const CreatePost = ({ showCreatePost, setShowCreatePost }) => {

    return (
        <Modal placement="auto" isOpen={showCreatePost} onClose={() => { setShowCreatePost(false) }} className="bg-black-800 abs h-auto text-white bottom-12 ">

            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Create Post</ModalHeader>
                        <ModalBody className="overflow-y-scroll hidescroll">
                            <ShippinInfo />
                        </ModalBody>
                        <ModalFooter className="text-black">
                            <Input placeholder="what's going on?" />
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default CreatePost