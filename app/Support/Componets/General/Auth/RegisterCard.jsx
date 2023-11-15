'use client'
import { Button, Card, Input, Spacer } from '@nextui-org/react';
import { MailCheckIcon, UserIcon } from 'lucide-react';
import React, { useState } from 'react';
import { AiFillCloseCircle, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { signUp } from '../../../myCodes/Auth';
import { useRouter } from 'next/navigation';
import { addToDatabase } from '../../../myCodes/Database';
import { message } from 'antd';


function RegisterCard({ toggleRegister }) {
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible)
    const [credentials, setCredentials] = useState({ password: '', email: '' })
    const { push } = useRouter()
    const signup = () => {
        if (credentials.password === credentials.passwordMatch && credentials.password.length >= 5) {
            (async () => {
                try {
                    await signUp(credentials.email, credentials.password).then((user) => {
                        addToDatabase('Users', user.uid, 'uid', user.uid)
                        addToDatabase('Users', user.uid, 'displayName', credentials?.displayName)
                        addToDatabase('Users', user.uid, 'UserInfo', {
                            displayName: credentials?.displayName,
                        })
                        addToDatabase('Users', user.uid, 'followers', [])
                        addToDatabase('Users', user.uid, 'following', [])
                        addToDatabase('Users', user.uid, 'donations', [])
                        message.success('Account Created!', [500])

                        push(`/Profile`)
                        toggleRegister()


                    })
                } catch (error) {
                    console.log(error.message)
                    message.error(error.message, [500])

                }
            })()
        } else {
            throw new error('Password must be 5 Characters or do not match')
        }
    }


    return (
        <div className='fixed z-[99999] top-16 '>
            <Card variant="bordered" className='fadeInBottom h-auto w-64 p-4 bg-black '>
                <Input
                    onChange={({ target }) => { setCredentials(prvState => ({ ...prvState, displayName: target.value })) }}

                    className='w-full text-black'
                    type="text"
                    label="@UserName"
                    labelPlacement={'inside'}
                    endContent={<UserIcon color='black' />}
                />
                <Spacer y={2} />

                <Input
                    onChange={({ target }) => { setCredentials(prvState => ({ ...prvState, email: target.value })) }}

                    className='w-full text-black'
                    placeholder="Enter your email"

                    type="email"
                    label="Email"
                    labelPlacement={'inside'}
                    endContent={<MailCheckIcon color='black' />}
                />
                <Spacer y={2} />
                <Input
                    onChange={({ target }) => setCredentials(prvState => ({ ...prvState, password: target.value }))}
                    label="Password"
                    placeholder="Enter your password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                />
                <Spacer y={2} />
                <Input
                    onChange={({ target }) => setCredentials(prvState => ({ ...prvState, passwordMatch: target.value }))}

                    label="Password"
                    placeholder="Match password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                />

                <br />
                <Button onPress={signup} className='w-1/2 m-auto font-bold text-white bg-black-800'>Sign Up</Button>
                <Spacer y={2} />
                <Button onPress={toggleRegister} className='h-8 min-w-0 w-fit  m-auto font-bold text-red bg-black-800'><AiFillCloseCircle color='white' size={32} /></Button>


            </Card>
        </div>
    )
}

export default RegisterCard