'use client'
import React, { useState } from 'react'
import { siteName, siteTag } from '../META'
import { Kenia, Concert_One } from 'next/font/google'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { formatNumber, getRand } from '../Support/myCodes/Util'
import { ArrowRightFromLineIcon } from 'lucide-react'
import CashMenu from '../Support/Componets/Money/CashMenu'
import FormatNumber from '../Support/Componets/General/FormatNumber'


const font = Kenia({ subsets: ['latin'], weight: ['400'] })
const font2 = Concert_One({ subsets: ['latin'], weight: ['400'] })


function page() {
    const [digits, setDigits] = useState(100.5)
    const [showCashMenu, setShowCashMenu] = useState(false)
    const test = async () => {
        const response = await fetch("/api/unit/FetchAccount", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ accountID: 2223540 }),
        });
        const data = await response.json()
        console.log(data)
    }
    return (
        <div className={`flex min-h-screen overflow-x-hidden md:px-20 lg:px-40 xl:px-32 py-4 flex-col items-center justify-evenly bg-gradient-to-bl from-black via-black to-[#000e00] text-white ${font2.className}`}>
            <Button onPress={() => {
                test()
            }} ></Button>
            <CashMenu forThis={showCashMenu} setShow={setShowCashMenu} setCurrentDigits={setDigits} />

            <div className='w-full md:w-3/4 flex flex-col gap-8 h-auto p-4'>
                <h1 className='text-6xl mb-20'>Digits</h1>
                <Card className='h-auto border-black border p-4 relative text-white w-full m-auto bg-black-800'>
                    <div className='flex flex-col  '>
                        <div className='w-fit p-2 '>
                            <div className='center-col w-fit  m-auto'>
                                <h1>Cash Balance</h1>
                                <div className='text-5xl   md:text-7xl font-extrabold'><FormatNumber number={digits} before={'$'} /></div>
                            </div>
                            <div className='w-fit flex gap-2 mt-12  m-auto'>
                                <Button onPress={() => { setShowCashMenu('add') }} className='bg-slate-800 w-1/2 text-white '>Add Digits</Button>
                                <Button onPress={() => { setShowCashMenu('cash') }} className='bg-slate-800 w-1/2 text-white'>Cash Out</Button>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className='absolute top-2 right-2 '>
                        <Button className='bg-opacity-0 text-white text-sm overflow-visible'>Account and Routing<ArrowRightFromLineIcon /></Button>

                    </div>
                </Card>

                <Card className='bg-black-800 mb-10'>
                    <CardHeader className='text-white font-bold text-2xl'>
                        Transactions
                    </CardHeader>
                    <CardBody className='center-col gap-2 px-4 border-t  text-white h-96 overflow-hidden overflow-y-scroll hidescroll'>
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((traction) => {
                            return (
                                <div className='h-14 flex-shrink-0 w-full bg-black-900 my-1 rounded-xl px-2 between'>
                                    <div className='center gap-2'>
                                        <div className='bg-white rounded-full h-12 w-12 overflow-hidden '>
                                            <img className='h-full w-full object-cover ' src="https://images.unsplash.com/photo-1619881589928-a0c6516c074c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                        </div>
                                        <div className=''>
                                            <h1 className='font-bold text-2x'>Comp/user Name</h1>
                                            <h1 className='text-gray-400 realtive bottom-2'>Transaction status</h1>
                                        </div>

                                    </div>
                                    <div className='text-2xl font-extrabold'>
                                        <div>{getRand(2) == 1 ? <h1 className='text-rose-400'>-${getRand(200)}</h1> : <h1 className='text-lime-400'>+${getRand(200)}</h1>}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </CardBody>
                </Card>
            </div>







        </div>
    )
}

export default page