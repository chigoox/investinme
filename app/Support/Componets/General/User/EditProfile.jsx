'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Select, SelectItem, Switch, useDisclosure } from '@nextui-org/react'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { addToDatabase, fetchDocument, updateArrayDatabaseItem } from '../../../myCodes/Database'
import { Uploader } from '../Uploader'
import { useAUTHListener } from '../../../../../StateManager/AUTHListener'
import { UpdateUser, getUID } from '../../../myCodes/Auth'
import { useGlobalContext } from '../../../../../StateManager/GlobalContext'
import { getRandTN } from '../../../myCodes/Util'
import { Book, Clock, Edit2, EditIcon, SaveIcon, ShoppingBagIcon } from 'lucide-react'
import { message } from 'antd'
import LoaddingMask from '../LoadingMask'
import { IoIosCloseCircle } from 'react-icons/io'

function EditProfile({ forCheckOut, event, toggleEdit, userData }) {
    const user = useAUTHListener()
    const UID = getUID(user)
    const { displayName, gender, address, avatarURL } = userData?.UserInfo || { displayName: `User${getRandTN(5)}`, avatarURL: 'none' }
    const [profileInfo, setProfileInfo] = useState({ displayName: user.displayName, avatarURL: user.photoURL })
    const [usedDisplayNames, setUsedDisplayNames] = useState([])
    const [lodding, setLodding] = useState(false)
    const [pageSections, setPageSections] = useState({ store: false, blogs: false, posts: false, bookings: false, pins: false })

    const getUsers = async () => {
        try {
            const { displayNames } = await fetchDocument('MetaData', 'Users')
            const { pageSections } = await fetchDocument('Users', UID)
            setUsedDisplayNames(displayNames)
            setPageSections({ ...pageSections })
        } catch (error) {
            console.log(error.message)

        }
    }

    const updateprofile = async ({ target }) => {
        setProfileInfo(oldState => ({ ...oldState, [target.name]: target.value }))
    }
    const updateDatabase = (async () => {
        if (usedDisplayNames?.includes(profileInfo?.displayName) && (profileInfo?.displayName != user?.displayName)) return message.error('Username taken!')
        setLodding(true)
        await addToDatabase('Users', UID, 'UserInfo', { ...profileInfo, displayName: profileInfo?.displayName?.replace(/[^\w ]/g, '').replace(/\s+/g, '_'), avatarURL: profileInfo.post.img[0] || user.photoURL })
        await addToDatabase('Users', UID, 'displayName', profileInfo?.displayName?.replace(/[^\w ]/g, '').replace(/\s+/g, '_'))
        if (profileInfo?.displayName != user?.displayName) await updateArrayDatabaseItem('MetaData', 'Users', 'displayNames', user?.displayName, true)
        await updateArrayDatabaseItem('MetaData', 'Users', 'displayNames', profileInfo?.displayName)

        if (forCheckOut && Object.keys(profileInfo).reduce((a, c) => a + 'email firstName lastName address zipcode phone img'.includes(c), 0) >= 7
        ) {
            console.log('first')
            forCheckOut(profileInfo, event)
        }
        UpdateUser(profileInfo?.displayName?.replace(/[^\w ]/g, '').replace(/\s+/g, '_'), profileInfo?.post?.img[0], profileInfo?.post?.phoneNumber)

        setLodding(false)
        toggleEdit('fetch')


    })

    const updatePageOptions = (async () => {
        setLodding(true)
        await addToDatabase('Users', user?.uid ? user?.uid : user?.gid, 'pageSections', { ...pageSections })
        setLodding(false)


    })


    useEffect(() => {
        getUsers()
        setProfileInfo(o => ({ ...o, displayName: user?.displayName?.replace(/[^\w ]/g, '').replace(/\s+/g, '_'), avatarURL: user.photoURL }))
    }, [user])

    useEffect(() => {
        updatePageOptions()
    }, [pageSections])




    return (
        <div className={`center-col w-full top-5  absolute  z-[99] hidescroll h-[50rem]`}>
            {lodding && <LoaddingMask lable='Updating profile' />}
            <Card className={`w-full md:w-96 shadow-md shadow-black border-2 border-[#121212] h-auto bg-[#171717] center-col`}>
                <CardHeader className="font-bold  text-white bg-black-800 mb-4">
                    <h1 className="text-center w-full">Edit Info</h1>
                </CardHeader>
                <CardBody className="hidescroll overflow-y-scroll relative gap-2 text-black">


                    <div className='relative bottom-5'><Uploader inCricle={true} setter={setProfileInfo} limit={1} folderName={'Profile'} /></div>
                    <Input color={usedDisplayNames?.includes(profileInfo?.displayName) ? 'danger' : 'default'} value={profileInfo.displayName} name='displayName' onChange={updateprofile} label={'username'} placeholder='$' variant='flat' labelPlacement='inside' />
                    <div className={`${usedDisplayNames?.includes(profileInfo?.displayName) ? 'text-rose-500' : 'text-emerald-500'} text-center`}>${profileInfo?.displayName?.replace(/[^\w ]/g, '').replace(/\s+/g, '_')} {usedDisplayNames?.includes(profileInfo?.displayName) ? 'is taken' : 'is avaiable'}</div>
                    <TextArea type="text"
                        maxLength={250}
                        onChange={updateprofile}
                        defaultValue={userData?.UserInfo?.bio}
                        placements={'outside'}
                        name="bio"
                        label={'bio'}
                        placeholder='bio'
                        rows={4}
                        className="w-full placeholder:text-white  mt-2 text-white bg-black-900 flex-shrink-0 hidescroll  "
                    />

                    <div className='grid grid-cols-1 gap-4 '>
                        <div className='center gap-4'>
                            <Switch
                                defaultSelected
                                isSelected={pageSections.pins}
                                onValueChange={(value) => {
                                    setPageSections(old => { return ({ ...old, pins: value }) })
                                }}
                                size="lg"
                                color="secondary"
                                thumbIcon={({ isSelected, className }) =>
                                    isSelected ? (
                                        <ShoppingBagIcon className={'text-black'} size={16} />
                                    ) : (
                                        <IoIosCloseCircle className={'text-xs'} />
                                    )
                                }>
                                <h1 className='text-white'>Pins</h1>
                            </Switch>

                            <Switch
                                defaultSelected
                                isSelected={pageSections.posts}
                                onValueChange={(value) => {
                                    setPageSections(old => { return ({ ...old, posts: value }) })
                                }}
                                size="lg"
                                color="secondary"
                                thumbIcon={({ isSelected, className }) =>
                                    isSelected ? (
                                        <EditIcon className={'text-black'} size={16} />
                                    ) : (
                                        <IoIosCloseCircle className={''} />
                                    )
                                }>
                                <h1 className='text-white'>posts</h1>
                            </Switch>

                            <Switch
                                defaultSelected
                                isSelected={pageSections.blogs}
                                onValueChange={(value) => {
                                    setPageSections(old => { return ({ ...old, blogs: value }) })
                                }}
                                size="lg"
                                color="secondary"
                                thumbIcon={({ isSelected, className }) =>
                                    isSelected ? (
                                        <Book className={'text-black'} size={16} />
                                    ) : (
                                        <IoIosCloseCircle className={''} />
                                    )
                                }>
                                <h1 className='text-white'>Blog</h1>
                            </Switch>
                        </div>




                        <div className='center gap-4'>
                            <Switch
                                defaultSelected
                                isSelected={pageSections.store}
                                onValueChange={(value) => {
                                    setPageSections(old => { return ({ ...old, store: value }) })
                                }}
                                size="lg"
                                color="secondary"
                                thumbIcon={({ isSelected, className }) =>
                                    isSelected ? (
                                        <ShoppingBagIcon className={'text-black'} size={16} />
                                    ) : (
                                        <IoIosCloseCircle className={'text-xs'} />
                                    )
                                }>
                                <h1 className='text-white'>Storefront</h1>
                            </Switch>
                            <Switch
                                defaultSelected
                                isSelected={pageSections.bookings}
                                onValueChange={(value) => {
                                    setPageSections(old => { return ({ ...old, bookings: value }) })
                                }}
                                size="lg"
                                color="secondary"
                                thumbIcon={({ isSelected, className }) =>
                                    isSelected ? (
                                        <Clock className={'text-black'} size={16} />
                                    ) : (
                                        <IoIosCloseCircle className={''} />
                                    )
                                }>
                                <h1 className='text-white'>bookings</h1>
                            </Switch>
                        </div>
                    </div>


                    <div className='center'>
                        <Button className="w-3/4 m-auto mb-4 font-bold bg-blue-500 text-white" onPress={updateDatabase}>Update<SaveIcon /></Button>
                        <Button className="w-12 m-auto mb-4 bg-rose-500" onPress={toggleEdit}>close</Button>
                    </div>

                </CardBody>
                <CardFooter className='p-2  bg-black-800'>

                </CardFooter>
            </Card>


        </div>

    )
}

export default EditProfile