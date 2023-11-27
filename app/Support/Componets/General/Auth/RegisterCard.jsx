'use client'
import { Button, Card, Input, Spacer } from '@nextui-org/react';
import { MailCheckIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { signUp } from '../../../myCodes/Auth';
import { useRouter } from 'next/navigation';
import { addToDatabase, fetchDocument, updateArrayDatabaseItem } from '../../../myCodes/Database';
import { message } from 'antd';
import { clearTokensAtLogin } from '../../../myCodes/Util';


function RegisterCard({ toggleRegister, setLoading }) {
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible)
    const [credentials, setCredentials] = useState({ password: '', email: '' })
    const [UserMeta, setUserMeta] = useState({})
    const { push } = useRouter()

    const checkPassword = () => {
        let passwordSTR = 0
        if (credentials?.password?.match(/.{8,}/)) passwordSTR += 2
        if (credentials?.password?.match(/[0-9]/)) passwordSTR++
        if (credentials?.password?.match(/[a-z]/)) passwordSTR++
        if (credentials?.password?.match(/[A-Z]/)) passwordSTR++
        if (credentials?.password?.match(/[^A-Za-z0-9]/)) passwordSTR += 2
        console.log(passwordSTR)
        return passwordSTR
    }

    const signup = async () => {

        if (UserMeta?.displayNames?.includes(credentials.displayName)) return message.error('Username Taken')
        if (!credentials.displayName) return message.error('No username')
        if (!credentials.email) return message.error('No email')

        setLoading(true)




        if (credentials.password === credentials.passwordMatch && credentials.password.length >= 5 && checkPassword() > 5) {
            (async () => {
                try {
                    await signUp(credentials.email, credentials.password).then((user) => {
                        addToDatabase('Users', user.uid, 'uid', user.uid)
                        addToDatabase('Users', user.uid, 'displayName', credentials?.displayName)
                        updateArrayDatabaseItem('MetaData', 'Users', 'displayNames', credentials?.displayName)
                        addToDatabase('Users', user.uid, 'UserInfo', {
                            displayName: credentials?.displayName,
                        })
                        addToDatabase('Users', user.uid, 'followers', [])
                        addToDatabase('Users', user.uid, 'following', [])
                        addToDatabase('Users', user.uid, 'donations', [])
                        message.success('Account Created!', [3])

                        push(`/Profile`)
                        clearTokensAtLogin()
                        toggleRegister()


                    })
                } catch (error) {
                    console.log(error.message)
                    message.error(error.message, [20])

                }
            })()
        } else {
            message.error('Password must contain 5 or more characters')
        }
        setLoading(false)
    }

    useEffect(() => {
        const run = async () => {
            const UserMeta = await fetchDocument('MetaData', 'Users')
            setUserMeta(UserMeta)
        }

        run()


    }, [])


    console.log()
    return (
        <div className='bottom-20 relative z-[999]'>
            <Card variant="bordered" className='fadeInBottom h-auto w-64 p-4 bg-black '>
                <Input
                    onChange={({ target }) => { setCredentials(prvState => ({ ...prvState, displayName: target.value })) }}
                    color={!UserMeta?.displayNames?.includes(credentials.displayName) ? 'default' : 'danger'}
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
                    color={checkPassword() < 5 ? 'danger' : 'default'}
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
                    color={credentials.password != credentials.passwordMatch ? 'danger' : 'default'}
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