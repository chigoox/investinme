import { Avatar, Card, Skeleton } from '@nextui-org/react'
import React from 'react'

const UserAvatar = ({ user }) => {
    return (
        <div className=' h-full flex items-center gap-2'>
            <Skeleton className='rounded-full' isLoaded={user.img}>
                <Avatar size='lg' src={user.img} />

            </Skeleton>
            <Skeleton className='rounded-full w-auto' isLoaded={user.uid}>
                <Card className='w-auto bg-black center h-fit text-white bg-opacity-75  p-1'>
                    <h1>${user?.uid}</h1>

                </Card>
            </Skeleton>

        </div>
    )
}

export default UserAvatar