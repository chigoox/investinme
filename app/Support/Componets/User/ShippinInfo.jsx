'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { Uploader } from '../General/Uploader'
import { addToDatabase } from '../../myCodes/Database'
import { siteEmail, siteName } from '../../../META'
import TextArea from 'antd/es/input/TextArea'

function ShippinInfo({ user, forCheckOut, event }) {
    const [shippingInfo, setShippingInfo] = useState({})
    const [showTerms, setShowTerms] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const updateShippingInfo = async ({ target }) => {
        setShippingInfo(oldState => ({ ...oldState, [target.name]: target.value }))
    }


    const updateDatabase = (() => {
        addToDatabase('User', user?.uid ? user?.uid : user?.gid, 'ShippingInfo', shippingInfo)
        if (forCheckOut && Object.keys(shippingInfo).reduce((a, c) => a + 'email firstName lastName address zipcode phone img'.includes(c), 0) >= 7
        ) {
            console.log('first')
            forCheckOut(shippingInfo, event)
        }

    })
    return (
        <div className={`center-col w-full fadeInRight  relative hidescroll ${forCheckOut ? 'h-[45rem] md:h-[50rem]' : 'h-auto'}`}>
            <Card className={`${forCheckOut ? 'w-full' : 'w-3/4'} shadow-md shadow-black border-2 border-[#121212] h-auto bg-[#171717] center-col`}>
                <CardHeader className="font-bold  text-white bg-black-800 mb-4">
                    <h1 className="text-center w-full">Add shipping Info</h1>
                </CardHeader>
                <CardBody className="center-col hidescroll relative gap-2 text-black">


                    <Uploader setProductData={setShippingInfo} limit={1} folderName={'Posts'} />



                    <Input type="text"
                        onChange={updateShippingInfo}
                        placements={'inside'}
                        variant="flat"
                        name="tags"
                        label={'tags'}
                        className="w-64 m-auto"
                    />
                    <TextArea type="text"
                        onChange={updateShippingInfo}
                        placements={'inside'}
                        variant="flat"
                        name="firstName"
                        label={'First Name'}
                        className="w-64 m-auto"
                    />


                </CardBody>
                <CardFooter className='p-2 bg-black-800'><Button className="w-3/4 m-auto mb-4" onPress={updateDatabase}>Update</Button></CardFooter>
            </Card>


        </div>

    )
}

export default ShippinInfo