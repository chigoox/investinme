'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { addToDatabase } from '../../../myCodes/Database'
import { Uploader } from '../Uploader'

function EditProfile({ user, forCheckOut, event }) {
    const [profileInfo, setProfileInfo] = useState({})
    const [showTerms, setShowTerms] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const updateShippingInfo = async ({ target }) => {
        setProfileInfo(oldState => ({ ...oldState, [target.name]: target.value }))
    }

    const updateDatabase = (() => {
        addToDatabase('Users', user?.uid ? user?.uid : user?.gid, 'ShippingInfo', profileInfo)
        if (forCheckOut && Object.keys(profileInfo).reduce((a, c) => a + 'email firstName lastName address zipcode phone img'.includes(c), 0) >= 7
        ) {
            console.log('first')
            forCheckOut(profileInfo, event)
        }

    })
    return (
        <div className={`center-col w-full absolute  z-[99] hidescroll h-[50rem]`}>
            <Card className={`w-full shadow-md shadow-black border-2 border-[#121212] h-auto bg-[#171717] center-col`}>
                <CardHeader className="font-bold  text-white bg-black-800 mb-4">
                    <h1 className="text-center w-full">Edit Info</h1>
                </CardHeader>
                <CardBody className="hidescroll overflow-y-scroll relative gap-2 text-black">


                    <Uploader inCricle={true} setter={setProfileInfo} limit={1} folderName={'Profile'} />

                    <TextArea type="text"
                        onChange={updateShippingInfo}
                        placements={'outside'}
                        name="bio"
                        label={'bio'}
                        placeholder='bio'
                        rows={4}
                        className="w-full placeholder:text-white  mt-2 text-white bg-black-900 flex-shrink-0 hidescroll  "
                    />
                    <Select
                        label="Select an Gender"
                        className="max-w-xs text-black"
                        onSelectionChange={(selection) => {
                            setProfileInfo(o => ({ ...o, gender: selection.currentKey }))
                        }}
                    >
                        {['Male', 'Female', 'Other'].map((gender) => (
                            <SelectItem key={gender} value={gender}>
                                {gender}
                            </SelectItem>
                        ))}
                    </Select>


                </CardBody>
                <CardFooter className='p-2  bg-black-800'><Button className="w-3/4 m-auto mb-4" onPress={updateDatabase}>Edit</Button></CardFooter>
            </Card>


        </div>

    )
}

export default EditProfile