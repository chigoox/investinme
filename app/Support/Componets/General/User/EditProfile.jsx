'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { addToDatabase } from '../../../myCodes/Database'
import { Uploader } from '../Uploader'
import { useAUTHListener } from '../../../../../StateManager/AUTHListener'
import { UpdateUser } from '../../../myCodes/Auth'
import { useGlobalContext } from '../../../../../StateManager/GlobalContext'
import { getRandTN } from '../../../myCodes/Util'
import { SaveIcon } from 'lucide-react'

function EditProfile({ forCheckOut, event, toggleEdit, userData }) {
    const user = useAUTHListener()
    const { displayName, gender, address, avatarURL } = userData?.UserInfo || { displayName: `User${getRandTN(5)}`, avatarURL: 'none' }
    const [profileInfo, setProfileInfo] = useState({ displayName: user.displayName, avatarURL: user.photoURL })





    const updateprofile = async ({ target }) => {
        setProfileInfo(oldState => ({ ...oldState, [target.name]: target.value }))
    }
    const updateDatabase = (() => {
        addToDatabase('Users', user?.uid ? user?.uid : user?.gid, 'UserInfo', { ...profileInfo, displayName: profileInfo?.displayName?.replace(/[^\w ]/g, '').replace(/\s+/g, '_'), avatarURL: profileInfo.post.img[0] || user.photoURL })
        addToDatabase('Users', user?.uid ? user?.uid : user?.gid, 'displayName', profileInfo?.displayName?.replace(/[^\w ]/g, '').replace(/\s+/g, '_'))
        if (forCheckOut && Object.keys(profileInfo).reduce((a, c) => a + 'email firstName lastName address zipcode phone img'.includes(c), 0) >= 7
        ) {
            console.log('first')
            forCheckOut(profileInfo, event)
        }
        UpdateUser(profileInfo?.displayName?.replace(/[^\w ]/g, '').replace(/\s+/g, '_'), profileInfo?.post?.img[0], profileInfo?.post?.phoneNumber)

        toggleEdit('fetch')



    })


    useEffect(() => {

        setProfileInfo(o => ({ ...o, displayName: user?.displayName?.replace(/[^\w ]/g, '').replace(/\s+/g, '_'), avatarURL: user.photoURL }))
    }, [user])




    return (
        <div className={`center-col w-full top-5  absolute  z-[99] hidescroll h-[50rem]`}>
            <Card className={`w-full md:w-96 shadow-md shadow-black border-2 border-[#121212] h-auto bg-[#171717] center-col`}>
                <CardHeader className="font-bold  text-white bg-black-800 mb-4">
                    <h1 className="text-center w-full">Edit Info</h1>
                </CardHeader>
                <CardBody className="hidescroll overflow-y-scroll relative gap-2 text-black">


                    <div className='relative bottom-5'><Uploader inCricle={true} setter={setProfileInfo} limit={1} folderName={'Profile'} /></div>
                    <Input value={profileInfo.displayName} name='displayName' onChange={updateprofile} label={'username'} placeholder='$' variant='flat' labelPlacement='inside' />
                    <div className='text-white text-center'>${profileInfo?.displayName?.replace(/[^\w ]/g, '').replace(/\s+/g, '_')}</div>
                    <TextArea type="text"
                        onChange={updateprofile}
                        defaultValue={userData?.UserInfo?.bio}
                        placements={'outside'}
                        name="bio"
                        label={'bio'}
                        placeholder='bio'
                        rows={4}
                        className="w-full placeholder:text-white  mt-2 text-white bg-black-900 flex-shrink-0 hidescroll  "
                    />


                    <div className='center'> <Button className="w-3/4 m-auto mb-4 font-bold bg-blue-500 text-white" onPress={updateDatabase}>Update<SaveIcon /></Button>
                        <Button className="w-12 m-auto mb-4 bg-rose-500" onPress={toggleEdit}>close</Button></div>

                </CardBody>
                <CardFooter className='p-2  bg-black-800'>

                </CardFooter>
            </Card>


        </div>

    )
}

export default EditProfile