'use client'
import { Button, Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'
import { ArrowRightFromLineIcon } from 'lucide-react'
import { Concert_One, Kenia } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { useAUTHListener } from '../../StateManager/AUTHListener'
import LineChart from '../Support/Componets/Charts/LineChart'
import FormatNumber from '../Support/Componets/General/FormatNumber'
import CashMenu from '../Support/Componets/Money/CashMenu'
import DCard from '../Support/Componets/Money/DCard'
import { fetchDocument } from '../Support/myCodes/Database'
import { fetchBankAccount } from '../Support/myCodes/UnitUtils'
import { getRand } from '../Support/myCodes/Util'


const font = Kenia({ subsets: ['latin'], weight: ['400'] })
const font2 = Concert_One({ subsets: ['latin'], weight: ['400'] })


function page() {
    const [digits, setDigits] = useState(999999999.5)
    const [showCashMenu, setShowCashMenu] = useState(false)
    const [account, setAccount] = useState({})
    const [history, setHistory] = useState({})
    const [vCardPK, setVCardPK] = useState({})
    const [transactions, setTransactions] = useState({})

    let UID = useAUTHListener(null, null, true); UID = UID.uid
    let uToken
    if (typeof window != undefined) uToken = localStorage?.getItem('uToken')



    const historyDate = Object.values(history)?.map(day => {
        return (
            day.attributes.date
        )
    })

    const historyBalance = Object.values(history)?.map(day => {
        return (
            day.attributes.balance
        )
    })

    console.log(transactions)

    useEffect(() => {
        const run = async () => {
            const { bankID, customerID, vCardID } = await fetchDocument('Users', UID)
            const { history, account, vcardPK, transactions } = await fetchBankAccount(bankID, customerID, vCardID, uToken)
            setHistory(history)
            setAccount(account)
            setVCardPK(vcardPK)
            setTransactions(transactions)
        }

        run()


    }, [UID])




    return (
        <div className={`flex min-h-screen overflow-x-hidden md:px-20 lg:px-40 xl:px-32 py-4 flex-col items-center justify-evenly bg-gradient-to-bl from-black via-black to-[#000e00] text-white ${font2.className}`}>


            <Button onPress={() => {
                test()
            }} ></Button>
            <CashMenu forThis={showCashMenu} setShow={setShowCashMenu} setCurrentDigits={setDigits} />
            <div className='w-full md:w-3/4 flex flex-col gap-8 h-auto p-4'>
                <h1 className='text-6xl'>Digits</h1>
                <LineChart data={historyBalance} lable={historyDate} />
                <Card className='h-auto border-black border p-4 relative text-white w-full m-auto bg-black-800'>
                    <div className='flex flex-col  '>
                        <div className='w-fit p-2 '>
                            <div className='center-col w-fit  m-auto'>
                                <h1>Cash Balance</h1>
                                <div className='text-5xl   md:text-7xl font-extrabold'><Skeleton isLoaded={account?.attributes?.available >= 0} className='h-auto w-auto rounded-full  p-3'><FormatNumber number={account?.attributes?.available / 100} before={'$'} /></Skeleton></div>
                            </div>
                            <div className='w-fit flex gap-2 mt-12  m-auto'>
                                <Button onPress={() => { setShowCashMenu('add') }} className='bg-slate-800 w-1/2 text-white '>Add Digits</Button>
                                <Button onPress={() => { setShowCashMenu('cash') }} className='bg-slate-800 w-1/2 text-white'>Cash Out</Button>
                            </div>
                        </div>
                        <div className='border'>

                        </div>
                    </div>
                    <div className='absolute  top-2 right-4'>
                        <Button className='bg-opacity-0 text-white text-xs left-8 sm:text-sm overflow-visible'>Account and Routing<ArrowRightFromLineIcon /></Button>
                        <DCard UID={UID} last4={vCardPK?.attributes?.last4Digits} name={account?.attributes?.name} exp={vCardPK?.attributes?.expirationDate} />

                    </div>
                </Card>

                <Card className='bg-black-800 mb-10'>
                    <CardHeader className='text-white font-bold text-2xl'>
                        Transactions
                    </CardHeader>
                    <CardBody className='center-col gap-2 px-4 border-t  text-white h-96 overflow-hidden overflow-y-scroll hidescroll'>
                        {Object.values(transactions || {})?.map((transaction) => {
                            return (
                                <div className='h-auto flex-shrink-0 w-full bg-black-900 my-1 rounded-xl p-2 between'>
                                    <div className='center gap-2'>
                                        <div className='bg-white rounded-full h-12 w-12 overflow-hidden '>
                                            <img className='h-full w-full object-cover ' src="https://images.unsplash.com/photo-1619881589928-a0c6516c074c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                        </div>
                                        <div className='w-40'>
                                            <h1 className='font-bold'>{transaction?.attributes?.companyName}</h1>
                                            <h1 className=' text-xs text-purple-600 realtive bottom-2'>{transaction?.type}</h1>
                                            <h1 className='text-gray-400 text-sm font-light realtive bottom-2'>{transaction?.attributes?.summary || transaction?.attributes?.description}</h1>
                                        </div>

                                    </div>
                                    <div className='text-2xl font-extrabold'>
                                        <div><h1 className={`${transaction?.attributes?.direction == 'Debit' ? 'text-rose-400' : 'text-lime-400'}`}>${transaction?.attributes?.amount / 100}</h1> </div>
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