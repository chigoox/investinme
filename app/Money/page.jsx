'use client'
import { Button, Card, CardBody, CardHeader, Skeleton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { ArrowRightFromLineIcon } from 'lucide-react'
import { Concert_One, Kenia } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { useAUTHListener } from '../../StateManager/AUTHListener'
import LineChart from '../Support/Componets/Charts/LineChart'
import FormatNumber from '../Support/Componets/General/FormatNumber'
import CashMenu from '../Support/Componets/Money/CashMenu'
import DCard from '../Support/Componets/Money/DCard'
import { FetchThisDocs, fetchDocument, updateArrayDatabaseItem } from '../Support/myCodes/Database'
import { fetchBankAccount, sendPayment } from '../Support/myCodes/UnitUtils'
import { formatNumber, genToken, getRand, getRandTN, getUUID } from '../Support/myCodes/Util'
import UserAvatar from '../Support/Componets/General/User/Avatar'
import LoaddingMask from '../Support/Componets/General/LoadingMask'
import { message } from 'antd'


const font = Kenia({ subsets: ['latin'], weight: ['400'] })
const font2 = Concert_One({ subsets: ['latin'], weight: ['400'] })


const RequestPayment = ({ request, setLoading, toggleRerender, UID }) => {
    console.log(request, setLoading, toggleRerender, UID)
    const [UserInfo, setUserInfo] = useState()
    const getData = async () => {
        const { UserInfo } = await fetchDocument('Users', (request.recivierUID || request.senderUID))
        setUserInfo(UserInfo)
        return UserInfo
    }

    useEffect(() => {
        getData()
    }, [])

    const send = async () => {
        setLoading(true)
        localStorage.setItem('idempotencyKey', getUUID())
        const payment = await sendPayment(request.amount, request.memo, request.sender, request.reciver)
        await updateArrayDatabaseItem("Users", UID, 'DigitRequest', request, true)
        await updateArrayDatabaseItem("Users", request.recivierUID, 'DigitResponse', { sender: request.sender, reciver: request.reciver, senderUID: UID, amount: request.amount, memo: request.memo }, true)
        toggleRerender()
        message.success('Payment Sent')
        setLoading(false)
    }
    const cancel = async () => {
        console.log(UID)
        setLoading(true)
        await updateArrayDatabaseItem("Users", request.senderUID, 'DigitRequest', { sender: request.sender, reciver: request.reciver, reciverUID: UID, amount: request.amount, memo: request.memo }, true)
        await updateArrayDatabaseItem("Users", UID, 'DigitResponse', request, true)
        toggleRerender()
        message.success('Canceled')
        setLoading(false)
    }



    return (
        <div className='h-auto my-2  flex-shrink-0 w-full bg-black-900 rounded-xl p-2 between'>
            <div className='w-3/4'>
                <UserAvatar user={UserInfo} />
                <div>{request.memo}</div>
            </div>
            <div className='text-2xl font-extrabold'>
                <div className='flex items-center justify-center md:flex-row flex-col gap-2'>
                    <h1 className={`${request.senderUID ? 'text-xl' : ''}`}>${request.amount / 100}</h1>
                    {!request.senderUID && <Button onPress={send} className='bg-lime-500' >Pay</Button>}
                    <Button onPress={cancel} className='bg-rose-500' >{request.senderUID ? 'cancel' : 'Reject'}</Button>
                </div>
            </div>
        </div>
    )
}



const CompletePayment = ({ transaction, setShowTransactionView }) => {
    const [data, setData] = useState([])


    const getData = async () => {
        setData(await FetchThisDocs('Users', 'bankID', '==', transaction.relationships.counterpartyAccount.data.id))
    }
    console.log()
    useEffect(() => {
        getData()
    }, [])

    return (
        <button onClick={() => { setShowTransactionView(transaction) }} className='h-auto my-2  flex-shrink-0 w-full bg-white bg-opacity-10 rounded-xl p-2 between'>
            <div className='center gap-2'>
                <div className='bg-white rounded-full h-12 w-12 overflow-hidden '>
                    {data[0]?.UserInfo ? <UserAvatar noLable={true} user={data[0]?.UserInfo} /> : <img className='h-full w-full object-cover ' src={data[0]?.UserInfo.avatarURL || "https://images.unsplash.com/photo-1619881589928-a0c6516c074c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />}
                </div>
                <div className='w-40'>
                    <h1 className='font-bold'>{transaction?.attributes?.companyName || data[0]?.displayName}</h1>
                    <h1 className=' text-xs text-purple-600 realtive bottom-2'>{transaction?.type}</h1>
                    <h1 className='text-gray-400 text-sm font-light realtive bottom-2'>{transaction?.attributes?.summary || transaction?.attributes?.description}</h1>
                </div>

            </div>
            <div className='text-2xl font-extrabold'>
                <div className='center gap-3'>
                    <h1 className='text-xs'>${transaction?.attributes?.balance}</h1>
                    <h1 className={`${transaction?.attributes?.direction == 'Debit' ? 'text-rose-400' : 'text-lime-400'}`}>${formatNumber(transaction?.attributes?.amount / 100)}</h1>
                </div>
            </div>
        </button>
    )
}


const TransactionView = (showTransactionView, setShowTransactionView) => {
    < Modal isOpen={showTransactionView} backdrop={'blur'} onOpenChange={() => { setShowTransactionView(false) }
    } placement='auto' scrollBehavior='inside' className={`h-[90%] w-full bg-black ${{
        backdrop: "bg-black bg-opacity-100 text-white"
    }}`}>
        <ModalContent>
            {() => (
                <>
                    <ModalHeader className="flex flex-col gap-1 text-white">{(forThis ? forThis : 'Explore Feed')}</ModalHeader>
                    <ModalBody className='hidescroll overflow-hidden overflow-y-scroll text-white  p-0 m-auto'>

                    </ModalBody>
                    <ModalFooter>
                        <Button className='w-full' onPress={() => { setShowTransactionView(false) }} color="danger" variant="light">
                            Close
                        </Button>

                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal >
}
function page() {
    const [digits, setDigits] = useState(999999999.5)
    const [showCashMenu, setShowCashMenu] = useState(false)
    const [account, setAccount] = useState({})
    const [history, setHistory] = useState({})
    const [vCardPK, setVCardPK] = useState({})
    const [transactions, setTransactions] = useState({})
    const [showTransactionView, setShowTransactionView] = useState()
    const [digitRequests, setDigitRequests] = useState()
    const [digitResponse, setDigitResponse] = useState()

    const [reRender, setReRender] = useState()

    const [loading, setLoading] = useState(false)

    const toggleRerender = () => setReRender(!reRender)


    const user = useAUTHListener(null, null, true);
    const UID = user.uid
    let uToken
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('uToken') == null) genToken(UID)
        uToken = localStorage?.getItem('uToken')

    }


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


    useEffect(() => {
        const run = async () => {
            const { bankID, customerID, vCardID, DigitResponse, DigitRequest } = await fetchDocument('Users', UID)
            const { history, account, vcardPK, transactions } = await fetchBankAccount(bankID, customerID, vCardID, uToken)

            setHistory(history)
            setAccount(account)
            setVCardPK(vcardPK)
            setTransactions(transactions)
            setDigitRequests(DigitRequest)
            setDigitResponse(DigitResponse)
        }

        run()


    }, [UID, reRender])










    const [pendingSelection, setPendingSelection] = useState('Pending Approval')
    return (
        <div className={`flex min-h-screen overflow-x-hidden md:px-20 lg:px-40 xl:px-32 py-4 flex-col items-center justify-evenly bg-gradient-to-bl from-black via-black to-[#000e00] text-white ${font2.className}`}>
            <TransactionView showTransactionView={showTransactionView} setShowTransactionView={setShowTransactionView} />
            {loading && <LoaddingMask />}
            <CashMenu forThis={showCashMenu} setShow={setShowCashMenu} setCurrentDigits={setDigits} />
            <div className='w-full md:w-3/4 flex flex-col gap-8 h-auto mb-20 p-4'>
                <h1 className='text-6xl'>Digits</h1>
                <LineChart data={historyBalance.reverse()} lable={historyDate.reverse()} />
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
                    <CardHeader className='text-white font-bold evenly text-2xl'>
                        {['Pending Approval', 'Awaiting Payment'].map((selection) => {
                            return (<Button onPress={() => { setPendingSelection(selection) }} className={`${(pendingSelection == 'Pending Approval' && pendingSelection == selection) ? 'text-rose-700' : (pendingSelection == 'Awaiting Payment' && pendingSelection == selection) ? 'text-lime-500' : 'text-gray-500'} bg-black-800 h-12   text-xl`}>
                                {selection}
                            </Button>)
                        })}
                    </CardHeader>
                    <CardBody className='flex flex-col  px-4 border-t  text-white max-h-96 overflow-hidden overflow-y-scroll hidescroll'>
                        {(pendingSelection == 'Pending Approval' ? digitRequests : digitResponse)?.reverse().map((request) => {

                            return (<RequestPayment key={getRandTN} toggleRerender={toggleRerender} request={request} setLoading={setLoading} UID={UID} />)

                        })}
                    </CardBody>
                </Card>
                <Card className='bg-black-800 mb-10'>
                    <CardHeader className='text-white font-bold text-2xl'>
                        Completed
                    </CardHeader>
                    <CardBody className='flex flex-col  px-4 border-t  text-white max-h-96 overflow-hidden overflow-y-scroll hidescroll'>
                        {Object.values(transactions || {})?.reverse().map(request => {
                            return (
                                <CompletePayment setShowTransactionView transaction={request} />
                            )
                        })}
                    </CardBody>
                </Card>
            </div>







        </div>
    )
}

export default page