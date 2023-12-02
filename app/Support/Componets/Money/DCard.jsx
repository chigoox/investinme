'use client'
import { Button, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch } from '@nextui-org/react';
import { Skeleton } from 'antd';
import { ArrowRight, EyeIcon, EyeOffIcon, LockIcon, UnlockIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AiFillMoneyCollect } from 'react-icons/ai';
import { IoMdKeypad } from "react-icons/io";
import { fetchDocument } from '../../myCodes/Database';



function DCard({ last4, exp = '06/26', name = 'your fullName', UID }) {
    const [showCard, setShowCard] = useState(false)
    const [seeCardInfo, setSeeCardInfo] = useState(false)
    const toggleCardInfo = () => setSeeCardInfo(!seeCardInfo)
    const [number, setNumber] = useState()
    const [vCard, setVCard] = useState(false)

    const showCardInfo = async () => {
        const show = window.VGSShow?.create('tntazhyknp1');



        const customerToken = "<CUSTOMER TOKEN>";
        const { vCardID } = await fetchDocument('Users', UID)
        setVCard(vCardID)


        const cvv2iframe = show?.request({
            name: 'data-text',
            method: 'GET',
            path: '/cards/' + vCardID + '/secure-data/cvv2',
            headers: {
                "Authorization": "Bearer " + customerToken
            },
            htmlWrapper: 'text',
            jsonPathSelector: 'data.attributes.cvv2'
        });
        cvv2iframe?.render('#cvv2');

        const cardNumberIframe = show?.request({
            name: 'data-text',
            method: 'GET',
            path: '/cards/' + cardId + '/secure-data/pan',
            headers: {
                "Authorization": "Bearer " + customerToken
            },
            htmlWrapper: 'text',
            jsonPathSelector: 'data.attributes.pan'
        });
        cardNumberIframe?.render('#cardNumber');
    }



    useEffect(() => { if (seeCardInfo) showCardInfo() }, [seeCardInfo])






    const Cardd = ({ forthis }) => {

        useEffect(() => {

            document.querySelector("#custom-button")?.addEventListener("click", () => {
                document
                    .querySelector("unit-elements-card")
                    .dispatchEvent(new CustomEvent("unitRequestOpenActionsMenu"));
            });


        }, [])
        console.log(localStorage.getItem('aToken'))
        return (
            <Card className='h-full w-full p-2'>
                <unit-elements-card
                    hide-actions-menu-button="false"
                    hide-card-title="false"
                    hide-sensitive-data-button="false"
                    card-id={vCard}
                    customer-token={process.env.UNITTOKEN}
                >
                </unit-elements-card>
                <button id="#custom-button">Manage Card</button>

            </Card>
        )
    }

    return (
        <div className='h-32 trans   -bottom-8 left-8 sm:left-2 sm:bottom-0  relative  scale-[0.6] sm:scale-[1] md:scale-[0.6] lg:scale-[1] cursor-pointer' onClick={() => { setShowCard(true) }}>
            <Cardd />
            < Modal isOpen={showCard} backdrop={'blur'} onOpenChange={() => { setShowCard(false) }
            } placement='auto' scrollBehavior='inside' className={`h-[90%] w-full bg-black ${{
                backdrop: "bg-black bg-opacity-100 text-white"
            }}`}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-white"></ModalHeader>
                            <ModalBody className='hidescroll overflow-hidden overflow-y-scroll text-white  p-0 m-auto'>
                                <div className=' w-72 h-40 font-extrabold'>
                                    <Cardd forthis={'cardView'} />
                                    <div className='evenly p-2 mt-2'>
                                        <div className='center-col'>
                                            <Switch
                                                onChange={toggleCardInfo}
                                                className='text-white'
                                                size="lg"
                                                color="secondary"
                                                startContent={<EyeIcon size={32} />}
                                                endContent={<EyeOffIcon size={32} />}
                                            >
                                            </Switch>
                                            Show Card
                                        </div>
                                        <div className='center-col'>
                                            <Switch
                                                className='text-white'
                                                size="lg"
                                                color="success"
                                                startContent={<LockIcon size={32} />}
                                                endContent={<UnlockIcon size={32} />}
                                            >
                                            </Switch>
                                            Lock Card
                                        </div>
                                    </div>
                                    <div className=''>

                                        <div className='between my-4'>
                                            <div className='center gap-4 text-3xl'>
                                                <IoMdKeypad />
                                                <h1>Change PIN</h1>
                                            </div>
                                            <ArrowRight />
                                        </div>
                                        <div className='between my-4'>
                                            <div className='center gap-4 text-3xl'>
                                                <AiFillMoneyCollect />
                                                <h1>Find ATM</h1>
                                            </div>
                                            <ArrowRight />
                                        </div>


                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className='w-full' onPress={() => { setShowCard(false) }} color="danger" variant="light">
                                    Close
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </div>
    )
}

export default DCard