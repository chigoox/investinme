import React, { useState } from 'react'
import EmblaCarouselThumb from '../General/Carousel/CarouselThumb'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Skeleton } from '@nextui-org/react'
import { Red_Hat_Text } from 'next/font/google'
import FormatNumber from '../General/FormatNumber'
import { filterNullFromArray } from '../../myCodes/Util'
const font1 = Red_Hat_Text({ subsets: ['latin'] })

function ProductView({ showShopView, setShowShopView, product, forThis, category }) {



    console.log(product.id)
    console.log(showShopView)

    const thisProduct = {}
    const filteredPrice = 0
    const price = product.price
    const name = product?.name
    const slides = product?.media.map(item => (item.url))
    const desc = product.caption
    const likes = product.likes
    const variants = filterNullFromArray(product?.variants)

    const [prices, setPrices] = useState({})
    const [itemToCheckOut, setItemToCheckOut] = useState({ priceID: 0, Qty: 0, images: [] })
    const addToCart = () => {
        //if (itemToCheckOut.priceID && itemToCheckOut.Qty > 0) dispatch({ type: "ADD_TO_CART", value: itemToCheckOut })
    }



    const PayOptions = ({ price, service }) => {
        const services = ['After Pay', 'Klarna', 'Affirm']
        return (
            <div className={'rounded-xl w-fit center-col m-auto mt-2 gap-2 relative p-2 overflow-hidden'} >
                <div className='font-thin text-sm md:text-base'>or 4 interest-free payments of <span className=' font-normal'><Skeleton isLoaded={price} className='w-fit  relative top-[.40rem] inline-block'>${price / 4}</Skeleton ></span> with:</div>

                <div className='center gap-2 mt-1 bg-white -200 p-2 rounded-full'>
                    {services.map(service => (<Skeleton isLoaded={price} key={service} className='w-20 h-8 center  font-bold text-gray-500 text-sm'>
                        <h1 className='text-center h-full rounded-full'>{<img src={
                            service == 'After Pay' ? 'https://business.afterpay.com/rs/539-RJA-633/images/AP_logo_badge_6328x2204_mintblack_jpg.jpg' :
                                service == 'Affirm' ? 'https://cdn-assets.affirm.com/images/black_logo-transparent_bg.png' :
                                    service == 'Klarna' ? 'https://www.klarna.com/b2b/_next/image/?url=https://images.ctfassets.net/4pxjo1vaz7xk/MTY3NzgzNTg4MDQ4ODQ/7f165976461ae5e1a60c149ccf8b5841/logo-black-thumbnail.png&w=3840&q=75' : ''




                        } />


                        }</h1>
                    </Skeleton>))}
                </div>


            </div>

        )
    }


    return (
        < Modal isOpen={showShopView == product.id} backdrop={'blur'} onOpenChange={() => { setShowShopView(false) }
        } placement='auto' scrollBehavior='inside' className={`h-auto min-w-full w-auto overflow-x-hidden md:px-20 lg:px-40 xl:px-32 py-4  bg-black ${{
            backdrop: "bg-black bg-opacity-100 text-white"
        }}`}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="between gap-1 text-white px-10">
                            {product.name}
                            <div>
                                <span className='font-thin'>from</span>
                                <Skeleton isLoaded={price} className='w-fit flex'>
                                    <span className=' font-light text-2xl'>${price}.00</span>
                                </Skeleton>
                            </div>
                        </ModalHeader>
                        <ModalBody className='hidescroll overflow-hidden overflow-y-scroll text-white  p-0 m-auto'>

                            <div>

                                <div className='flex md:flex-row flex-col gap-2'>
                                    <Skeleton className='h-auto' isLoaded={product}>
                                        <EmblaCarouselThumb options={{}} slides={slides} />
                                    </Skeleton>



                                    <div className='h-fit md:w-1/2 p-2 '>

                                        <PayOptions price={price} />
                                        <div className='center flex-wrap md:w-3/4 m-auto mt-2 gap-2'>
                                            <Select
                                                onChange={({ target }) => { setItemToCheckOut(prev => ({ ...prev, price: Number(target.value.split(',', 3)[2]?.replace('$', '')), priceID: target.value.split(',', 2)[0], variant: target.value.split(',', 2)[1] })) }}
                                                labelPlacement={'outside'}
                                                label="Select Variant"
                                                className="max-w-xs my-8 text-black"
                                            >
                                                {variants.map((variant) => {
                                                    return (
                                                        <SelectItem key={variant} value={variant}>
                                                            {variant}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </Select>

                                        </div>
                                        <div className='mt-2 '>
                                            <div className=' gap-4 items-center  flex md:flex-row flex-col'>
                                                {/* <ItemQTYButton state={itemToCheckOut} setState={setItemToCheckOut} />*/}
                                                <Button onClick={addToCart} className='h-12 rounded-md w-48 bg-gray-500 mb-2'>ADD TO CART</Button>
                                            </div>
                                        </div>

                                        <div className={font1.className}>
                                            <h1 className='text-2xl font-extralight text-white bg-black-800'>Description</h1>
                                            <Skeleton className='w-fit' isLoaded={desc}>
                                                <h1>{desc}</h1>
                                                <h1 className='center gap-4 bg-black-800 mt-2 mb-10'>likes <FormatNumber number={likes.length} /></h1>
                                            </Skeleton>
                                        </div>
                                    </div>

                                </div>
                            </div>



















                        </ModalBody>
                        <ModalFooter>
                            <Button className='w-full' onPress={() => { setShowShopView(false) }} color="danger" variant="light">
                                Close
                            </Button>

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}

export default ProductView