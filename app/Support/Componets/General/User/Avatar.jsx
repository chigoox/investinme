import { Avatar, Card, Skeleton } from '@nextui-org/react'
import React from 'react'

const UserAvatar = ({ user, size = 'lg', forthis = 'profile', noLable }) => {
    console.log(user)
    return (
        <div className={`${forthis == 'profile' ? 'flex-col' : 'flex '} h-full  items-center gap-2`}>
            <Skeleton className='rounded-full w-fit' isLoaded={user.img}>
                <Avatar className={`${size == 'lg' ? 'h-32 w-32' : ''}`} src={user.img} />

            </Skeleton>
            {!noLable && <Skeleton className='rounded-full w-auto' isLoaded={user.uid}>
                <Card className={`${forthis == 'profile' ? 'w-32 text-sm' : 'w-auto'} bg-black  center h-fit text-white bg-opacity-75 overflow-hidden p-1`}>
                    {false && <h1>${user?.uid}</h1>}

                </Card>
            </Skeleton>}

        </div >
    )
}

export default UserAvatar