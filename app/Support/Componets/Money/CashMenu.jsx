import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { message } from 'antd'
import React, { useState } from 'react'

function CashMenu({ forThis, setShow, setCurrentDigits }) {
    const [selectedValue, setSelectedValue] = useState('')

    const addDigits = () => {
        setCurrentDigits(o => (o + selectedValue))
    }
    const cashOutDigits = () => {
        setCurrentDigits(o => {
            if (o - selectedValue < 0) message.error('Not enough digits')
            return (o - selectedValue < 0) ? o : (o - selectedValue)
        })
    }

    const buttonPress = () => {
        if (forThis == 'cash') cashOutDigits()
        if (forThis == 'add') addDigits()




        setShow(false)

    }
    console.log(forThis)




    return (
        < Modal isOpen={forThis} backdrop={'blur'} onOpenChange={() => { setShow(false) }
        } placement='auto' scrollBehavior='inside' className={`md:h-[30%] h-[40%] w-full bg-black ${{
            backdrop: "bg-black bg-opacity-100 text-white"
        }}`}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-center font-bold text-3xl text-white">{(forThis ? forThis : 'Menu')}</ModalHeader>
                        <ModalBody className='hidescroll overflow-hidden overflow-y-scroll text-white  p-0 m-auto'>
                            <div className='grid grid-cols-3 gap-4 '>
                                {['$10', '$25', '$50', '$100', '$250'].map(option => {
                                    return (
                                        <Button onPress={() => { setSelectedValue(Number(option.replace('$', ''))) }} className='m-auto p-4 h-14 w-24 font-bold bg-slate-800 text-white'>{option}</Button>
                                    )
                                })}

                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button className='w-full h-12 text-lg font-extrabold  bottom-12' onPress={buttonPress} >
                                {forThis == 'request' ? `Request ${selectedValue} Digits` :
                                    forThis == 'add' ? `Add ${selectedValue} Digits` :
                                        forThis == 'send' ? `Send ${selectedValue} Digits` :
                                            forThis == 'lend' ? `Lend ${selectedValue} Digits` :
                                                forThis == 'cash' ? `Cashout ${selectedValue} Digits` : '???'
                                }
                            </Button>

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}

export default CashMenu