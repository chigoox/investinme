import { Avatar, Card, Link, Skeleton } from '@nextui-org/react'
import React, { useState } from 'react'

const UserAvatar = ({ user, size = 'sm', forthis, noLable, gustName, creatorData }) => {
    const [loadGust, setLoadGust] = useState(false)
    return (
        <div className={`${forthis == 'profile' ? 'flex-col' : 'flex '} ${forthis == 'comment' ? '' : 'flex '} h-full z-[50] w-fit relative rounded-full 
         items-center gap-2`}>
            <div className='overflow-hidden rounded-full'>
                <Link className='rounded-full overflow-clip' href={`/${user?.displayName?.replace(/\s+/g, '') || gustName}`} >
                    <Skeleton className='rounded-full w-fit' isLoaded={user?.avatarURL || (() => {
                        setTimeout(() => {
                            setLoadGust(true)
                        }, 1500);
                        return loadGust
                    })()}>
                        <Avatar className={`${size == 'lg' ? 'h-32 w-32' : size == 'md' ? 'h-24 w-24' : 'w-14 h-14'}`} src={user?.avatarURL} />

                    </Skeleton>


                </Link >
            </div>
            <div className={`rounded-full   ${forthis == 'comment' ? ' scale-[0.6] overflow-hidden absolute z-50 rounded-full  text-center -left-9 -bottom-3 w-32 h-8' : 'w-auto'}`}>
                {!noLable && <Skeleton className={`h-full w-full`} isLoaded={loadGust}>
                    <Card className={`${forthis == 'profile' ? 'w-32 text-sm' : 'w-auto'}  bg-black  center h-fit text-white bg-opacity-75 overflow-hidden p-1 px-3`}>
                        {true && <h1 className=''>${user?.displayName || creatorData?.displayName || gustName}</h1>}

                    </Card>
                </Skeleton>
                }
            </div>
        </div>
    )
}

export default UserAvatar