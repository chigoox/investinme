import { Avatar, Card, Skeleton } from '@nextui-org/react'
import React from 'react'

const UserAvatar = ({ user, size = 'sm', forthis, noLable }) => {
    return (
        <div className={`${forthis == 'profile' ? 'flex-col' : 'flex '} h-full  items-center gap-2`}>
            <Skeleton className='rounded-full w-fit' isLoaded={user?.avatarURL}>
                <Avatar className={`${size == 'lg' ? 'h-32 w-32' : size == 'md' ? 'h-24 w-24' : 'w-14 h-14'}`} src={user?.avatarURL} />

            </Skeleton>
            {!noLable && <Skeleton className='rounded-full w-auto' isLoaded={user?.displayName}>
                <Card className={`${forthis == 'profile' ? 'w-32 text-sm' : 'w-auto'} bg-black  center h-fit text-white bg-opacity-75 overflow-hidden p-1 px-3`}>
                    {true && <h1>${user?.displayName}</h1>}

                </Card>
            </Skeleton>}

        </div >
    )
}

export default UserAvatar