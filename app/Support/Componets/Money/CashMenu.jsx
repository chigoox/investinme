import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { message } from 'antd'
import React, { useState } from 'react'
import { sendPayment } from '../../myCodes/UnitUtils'
import { FetchThisDocs, fetchDocument } from '../../myCodes/Database'

function CashMenu({ forThis, setShow, setCurrentDigits, UID }) {
    const [selectedValue, setSelectedValue] = useState('')
    const [counterParty, setCounterParty] = useState('')
    const [memo, setMemo] = useState('')

    const addDigits = async () => {
        setCurrentDigits(o => (o + selectedValue))
    }


    const cashOutDigits = async () => {
        setCurrentDigits(o => {
            if (o - selectedValue < 0) message.error('Not enough digits')
            return (o - selectedValue < 0) ? o : (o - selectedValue)
        })
    }

    const sendDigits = async (myCustomerID, otherCustomerID) => {
        sendPayment(selectedValue, memo, myCustomerID, otherCustomerID)
    }

    const buttonPress = async () => {

        const { bankID } = await fetchDocument('Users', UID)
        let otherBankID = await FetchThisDocs('Users', 'displayName', '==', counterParty)
        otherBankID = otherBankID[0]?.bankID

        if (forThis == 'cash') await cashOutDigits()
        if (forThis == 'add') await addDigits()
        if (forThis == 'send' && bankID && otherBankID) await sendDigits(bankID, otherBankID)



        //setShow(false)

    }




    return (
        < Modal isOpen={forThis} backdrop={'blur'} onOpenChange={() => { setShow(false) }
        } placement='auto' scrollBehavior='inside' className={`h-auto mb-10 w-full bg-black ${{
            backdrop: "bg-black bg-opacity-100 text-white"
        }}`}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-center font-bold text-3xl text-white">{(forThis ? forThis.charAt(0).toUpperCase() + forThis.slice(1) + ' Digits' : 'Menu')}</ModalHeader>
                        <ModalBody className='hidescroll overflow-hidden overflow-y-scroll text-white  p-0 m-auto'>
                            <Input onValueChange={v => { setCounterParty(v) }} className={`text-black`} label={`${forThis} ${forThis == 'request' ? 'from' : 'to'}...`} />
                            <Input onValueChange={v => { setMemo(v) }} className={`text-black`} label={`Add notes`} />
                            <div className='grid grid-cols-3 gap-4 '>
                                {['$10', '$25', '$50', '$100', '$250', 'input'].map(option => {
                                    if (option != 'input') return (
                                        <Button onPress={() => { setSelectedValue(Number(option.replace('$', ''))) }} className='m-auto p-4 h-14 w-24 font-bold bg-slate-800 text-white'>{option}</Button>
                                    )

                                    return (<Input value={selectedValue} onValueChange={(v) => { setSelectedValue(Number(v)) }} className='m-auto h-14 w-24 font-bold text-2xl text skew-x-6 bg-slate-800 text-black rounded-xl p-2' />)
                                })}

                            </div>
                            <Button className='w-full h-12 text-lg font-extrabold ' onPress={buttonPress} >
                                {forThis == 'request' ? `Request ${selectedValue} Digits` :
                                    forThis == 'add' ? `Add ${selectedValue} Digits` :
                                        forThis == 'send' ? `Send ${selectedValue} Digits` :
                                            forThis == 'lend' ? `Lend ${selectedValue} Digits` :
                                                forThis == 'cash' ? `Cashout ${selectedValue} Digits` : '???'
                                }
                            </Button>
                        </ModalBody>
                        <ModalFooter>


                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}

export default CashMenu