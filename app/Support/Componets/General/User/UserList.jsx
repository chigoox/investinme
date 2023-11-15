import React, { useState } from 'react'
import UserAvatar from './Avatar'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { fetchDocument } from '../../../myCodes/Database'

function UserList({ forThis, list, setShowUserList }) {
    const shownList = list[`${forThis}`]?.map(item => {
        return (
            Object.keys(item)[0]
        )
    })


    return (
        <Modal placement="auto" isOpen={true} onClose={() => { setShowUserList(false) }} className="bg-black-800 h-96 text-white bottom-12 ">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{forThis}</ModalHeader>
                        <ModalBody className="overflow-y-scroll hidescroll flex">
                            <div className='flex flex-wrap'>
                                {shownList.map((UID) => {
                                    const [userData, setUserData] = useState()

                                    fetchDocument('Users', UID).then(data => {
                                        if (!userData) setUserData(data)
                                    })


                                    return (
                                        <div className='m-auto'>
                                            <UserAvatar user={userData?.UserInfo} forthis='comment' />
                                        </div>
                                    )
                                })}
                            </div>
                        </ModalBody>
                        <ModalFooter className="text-black">

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default UserList