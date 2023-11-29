import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { addToDatabase, addToDoc, fetchDocument, updateArrayDatabaseItem, updateDatabaseItem } from '../../../myCodes/Database'
import { Uploader } from '../Uploader'
import { useGlobalContext } from '../../../../../StateManager/GlobalContext'
import { useAUTHListener } from '../../../../../StateManager/AUTHListener'
import { serverTimestamp } from 'firebase/firestore'
import { createArray } from '../../../myCodes/Util'

const CreatePost = ({ showCreatePost, setShowCreatePost, UID }) => {
    const postDefault = {
        post: { img: [''] },
        postType: 'undefined',
        tags: [],
        caption: '',
        id: 0,
        likes: [],
        likesCount: 0,
        doantions: [],
        comments: [],
        creator: 'UID',
        timeStamp: serverTimestamp()

    }

    const productDefault = {
        media: [],
        price: '',
        tags: [],
        caption: '',
        id: 0,
        likes: [],
        likesCount: 0,
        comments: [],
        creator: 'UID',
        timeStamp: serverTimestamp()

    }
    const [pagePosition, setPagePosition] = useState(0)
    const [post, setPost] = useState(postDefault)
    const [product, setProduct] = useState(productDefault)
    const { dispatch } = useGlobalContext()
    const [forProduct, setForProduct] = useState(false)
    const [userCategories, setUserCategories] = useState([])




    const handleCaption = (text) => {
        !forProduct ? setPost(old => {
            return ({ ...old, caption: text, tags: text.toLowerCase().match(/#[a-z0-9_]+/g) })
        }) :
            setProduct(old => {
                return ({ ...old, caption: text, tags: text.toLowerCase().match(/#[a-z0-9_]+/g) })
            })
    }

    const handleInput = ({ target }) => {
        const { name, value } = target
        setProduct(old => {
            return ({ ...old, [name]: value })
        })
    }

    const submitPost = async () => {
        const { postID } = await fetchDocument('MetaData', 'postMeta')
        await addToDoc('Posts', `IVA-${postID}`, {
            ...post,
            link: post?.post?.img[0],
            type: post?.postType?.includes('video') ?
                'vid' :
                post?.postType?.includes('image') ?
                    'img' :
                    'txt',
            id: postID,
            creator: UID
        })
        await updateDatabaseItem('MetaData', 'postMeta', 'postID', postID + 1)

        post?.tags?.forEach(async tag => {
            await updateArrayDatabaseItem('MetaData', 'postMeta', 'tags', tag)
        });


        setPagePosition(0)
        setPost(postDefault)
        setShowCreatePost(false)
        dispatch({ type: "NEW_POST", value: {} })
    }

    const allVariants = [
        { price: (product.variant_0_price) ? product.variant_0_price : (product.variant_0_name) ? product.price : null, name: product.variant_0_name || null },
        { price: (product.variant_1_price) ? product.variant_1_price : (product.variant_1_name) ? product.price : null, name: product.variant_1_name || null },
        { price: (product.variant_2_price) ? product.variant_2_price : (product.variant_2_name) ? product.price : null, name: product.variant_2_name || null },
        { price: (product.variant_3_price) ? product.variant_3_price : (product.variant_3_name) ? product.price : null, name: product.variant_3_name || null },
    ].map(item => {
        if (item.name !== null) {
            return (
                item
            )
        } else {
            return null
        }
    })


    const submitProduct = async () => {
        const { productID } = await fetchDocument('MetaData', 'productMeta')
        await addToDoc('Products', `PID-${productID}`, {
            ...product,
            variants: allVariants,
            id: productID,
            creator: UID
        })
        await updateDatabaseItem('MetaData', 'productMeta', 'productID', productID + 1)
        await updateArrayDatabaseItem('Users', UID, 'shopCategories', product.category)

        product?.tags?.forEach(async tag => {
            await updateArrayDatabaseItem('MetaData', 'productMeta', 'tags', tag)
        });


        setPagePosition(0)
        setProduct(productDefault)
        setShowCreatePost(false)
        dispatch({ type: "NEW_POST", value: {} })
    }








    const UploadPost = (<div>
        <ModalHeader className="evenly  text-center">

            <h1>Create new</h1>

        </ModalHeader>
        <ModalBody className="overflow-y-scroll overflow-x-hidden hidescroll">
            <Uploader setForProduct={setForProduct} submitPost={submitPost} handleCaption={handleCaption} forthis={'post'} post={post} setterArray={setProduct} setter={setPost} limit={1} folderName={'Posts'} />
            {forProduct && <Button onPress={() => { if (product?.media?.length > 0) setPagePosition(3) }} className='mb-6 font-bold text-black'>Next <AiOutlineArrowRight /></Button>}
        </ModalBody>


    </div>)
    const postHeader = (
        <ModalHeader className="between top-2  text-center absolute w-[21.3rem] gap-1">
            {(post?.post?.img[0]?.includes('http') || post?.postType == 'txt') &&
                <button onClick={() => {
                    if (pagePosition >= 1) setPagePosition(o => o - 1)
                }}>
                    <AiOutlineArrowLeft size={32} color='white' />
                </button>}
            Edit Post
            {(post?.post?.img[0]?.includes('http') && pagePosition != 2) &&
                <button onClick={() => {
                    if (pagePosition <= 1) setPagePosition(o => o + 1)
                }}>
                    next
                </button>}
        </ModalHeader>
    )

    const shopHeader = (
        <ModalHeader className="between top-2  text-center absolute w-[21.3rem] gap-1">
            {(post?.post?.img[0]?.includes('http') || post?.postType == 'txt') &&
                <button onClick={() => {
                    if (pagePosition >= 1) setPagePosition(0)
                }}>
                    <AiOutlineArrowLeft size={32} color='white' />
                </button>}
            Edit product
        </ModalHeader>
    )


    const EditPost = (<div className='relative w-full' >

        <ModalBody className="overflow-y-scroll w-full  overflow-x-hidden hidescroll">
            {postHeader}
            <div className=' overflow-y-scroll hidescroll mt-12   h-72  text-white rounded-3xl '>
                {post?.postType?.includes('video') && <video autoPlay muted playsInline loop className='w-full  object-cover' src={post.post.img[0]} alt="" />}
                {post?.postType?.includes('image') && <img className='w-full  object-cover' src={post?.post.img[0]} alt="" />}

            </div>
            <div className='overflow-x-scroll flex gap-4 items-center w-full border-y p-1 hidescroll'>
                {[1, 2, 3, 4, 5, 6].map((i) => {
                    return (<div key={i} className='bg-white relative border-2 h-24 w-24 flex-shrink-0  border-black rounded-2xl'>


                        <div className='bg-black m-auto w-full text-center absolute bottom-4'>FilterName</div>
                    </div>)
                })}
            </div>
        </ModalBody>

    </div>)
    const sharePost = (<div>
        {postHeader}
        <ModalBody className="overflow-y-scroll w-full  overflow-x-hidden hidescroll">
            <Textarea value={post?.caption} onValueChange={handleCaption} placeholder='Write a caption' className='mt-12 w-80 text-black' />
            <h1 className='flex gap-2'>{post?.tags?.map((tag) => <div>{tag}</div>)}</h1>

        </ModalBody>
        <ModalFooter className='w-full  center'>
            <Button onPress={submitPost}>
                Post
            </Button>
        </ModalFooter>


    </div>)

    const Sale = (<div>
        {shopHeader}
        <ModalBody className="overflow-y-scroll w-full  overflow-x-hidden hidescroll">
            <Input name='name' value={product?.name} onChange={handleInput} placeholder='Product name' className='mt-14 w-80 text-black' />
            <div className='evenly'>
                <Input onBeforeInput={'$'} name='price' type='number' value={product?.price} onChange={handleInput} placeholder='Price' className=' w-[30%] text-black' />
                <Input name='category' value={product?.category} onChange={handleInput} placeholder='Category' className=' w-[50%] text-black' />
            </div>
            <Select
                label="Category"
                className="w-full text-black  m-auto"
                name={'category'}
                onChange={handleInput}
            >

                {userCategories?.map((category) => (
                    <SelectItem key={category} value={category}>
                        {category}
                    </SelectItem>
                ))}
            </Select>

            {createArray(4).map(item => {
                return (
                    <div className='center gap-2'>
                        <Input name={`variant_${item}_name`} value={product[`variant_${item}_name`] || ''} onChange={handleInput} placeholder='Variant name eg: lg' className=' w-[50%] text-black' />
                        <Input type='number' name={`variant_${item}_price`} value={product[`variant_${item}_price`] || ''} onChange={handleInput} placeholder='price' className=' w-[30%] text-black' />
                    </div>
                )
            })}

            <Textarea value={product?.caption} onValueChange={handleCaption} placeholder='Write item description' className='mt-6 w-80 text-black' />
            <h1 className='flex gap-2'>{product?.tags?.map((tag) => <div>{tag}</div>)}</h1>

        </ModalBody>
        <ModalFooter className='w-full  center'>
            <Button onPress={submitProduct}>
                Post
            </Button>
        </ModalFooter>


    </div>)

    const page = [UploadPost, EditPost, sharePost, Sale]


    useEffect(() => {
        if ((post?.post?.img[0]?.includes('https') || post?.postType == 'txt') && pagePosition == 0 && !forProduct) setPagePosition(1)
    }, [post])


    useEffect(() => {
        const run = async () => {
            const { shopCategories } = await fetchDocument('Users', UID)
            setUserCategories(shopCategories)
        }

        run()
    }, [UID])

    return (
        <Modal isDismissable={false} placement="auto" isOpen={showCreatePost} onClose={() => { setShowCreatePost(false) }} className="bg-black-800 w-auto overflow-hidden trans h-auto text-white bottom-12 ">

            <ModalContent>
                {page[pagePosition]}

            </ModalContent>

        </Modal>
    )
}

export default CreatePost