import { Card, CardBody, CardHeader } from '@nextui-org/react'
import React from 'react'
import { CompletePayment } from './CompletePayment'

function Transactions({ transactions }) {
    return (
        <Card className='bg-black-800 mb-10' >
            <CardHeader className='text-white font-bold text-2xl'>
                Completed
            </CardHeader>
            <CardBody className='flex flex-col  px-4 border-t  text-white max-h-96 overflow-hidden overflow-y-scroll hidescroll'>
                {Object.values(transactions || {})?.reverse().map(request => {
                    return (
                        <CompletePayment setShowTransactionView={setShowTransactionView} transaction={request} />
                    )
                })}
            </CardBody>
        </Card >
    )
}

export default Transactions