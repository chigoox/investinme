import { Avatar, Card } from '@nextui-org/react'
import React from 'react'

const UserAvatar = ({ user }) => {
    return (
        <div className='w-full h-full center'>
            <Avatar size='lg' src='' />
            <Card className='w-32 h-fit absolute -right-24'>
                <h1>{user?.username}</h1>

            </Card>

        </div>
    )
}

export default UserAvatar