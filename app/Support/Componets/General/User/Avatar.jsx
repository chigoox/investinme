import { Avatar, Card, Link, Skeleton } from '@nextui-org/react'
import React, { useState } from 'react'

const UserAvatar = ({ user, size = 'sm', forthis, noLable, gustName }) => {
    const [loadGust, setLoadGust] = useState(false)
    return (
        <Link href={`/${user?.displayName?.replace(/\s+/g, '') || gustName}`} className={`${forthis == 'profile' ? 'flex-col' : 'flex '} ${forthis == 'comment' ? 't' : 'flex '} h-full z-50 w-fit relative items-center gap-2`}>
            <Skeleton className='rounded-full w-fit' isLoaded={user?.avatarURL || (() => {
                setTimeout(() => {
                    setLoadGust(true)
                }, 1500);
                return loadGust
            })()}>
                <Avatar className={`${size == 'lg' ? 'h-32 w-32' : size == 'md' ? 'h-24 w-24' : 'w-14 h-14'}`} src={user?.avatarURL} />

            </Skeleton>
            {!noLable && <Skeleton className={`rounded-full   ${forthis == 'comment' ? ' scale-[0.6]  absolute z-50 text-center -left-9 -bottom-3 w-32 h-8' : 'w-auto'}`} isLoaded={loadGust}>
                <Card className={`${forthis == 'profile' ? 'w-32 text-sm' : 'w-auto'}  bg-black  center h-fit text-white bg-opacity-75 overflow-hidden p-1 px-3`}>
                    {true && <h1 className=''>${user?.displayName || gustName}</h1>}

                </Card>
            </Skeleton>}

        </Link >
    )
}

export default UserAvatar