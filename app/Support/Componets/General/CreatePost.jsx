import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { addToDatabase, fetchDocument, updateArrayDatabaseItem, updateDatabaseItem } from '../../myCodes/Database'
import { Uploader } from './Uploader'
import { useGlobalContext } from '../../../../StateManager/GlobalContext'

const CreatePost = ({ showCreatePost, setShowCreatePost }) => {
    const postDefault = {
        post: { img: [''] },
        postType: 'undefined',
        tags: [],
        caption: '',
        id: 0,
        like: 0,
        doantions: 0,
        comments: [],
        creator: 'UID',
        timeStamp: new Date()

    }
    const [pagePosition, setPagePosition] = useState(0)
    const [post, setPost] = useState(postDefault)
    const { dispatch } = useGlobalContext()


    const handleCaption = (text) => {
        setPost(old => {
            return ({ ...old, caption: text, tags: text.toLowerCase().match(/#[a-z0-9_]+/g) })
        })
    }

    const submitPost = async () => {
        const { postID } = await fetchDocument('Posts', 'PostMeta')
        await addToDatabase('Posts', 'AllPosts', `IVA-${postID}`, {
            ...post,
            link: post?.post?.img[0],
            type: post?.postType?.includes('video') ?
                'vid' :
                post?.postType?.includes('image') ?
                    'img' :
                    'txt',
            id: postID
        })
        await updateDatabaseItem('Posts', 'PostMeta', 'postID', postID + 1)
        post?.tags?.forEach(async tag => {
            await updateArrayDatabaseItem('Posts', 'PostMeta', 'tags', tag)
        });


        setPagePosition(0)
        setPost(postDefault)
        setShowCreatePost(false)
        dispatch({ type: "NEW_POST", value: {} })
    }








    const UploadPost = (<div>
        <ModalHeader className="evenly  text-center">

            <h1>Create new post</h1>

        </ModalHeader>
        <ModalBody className="overflow-y-scroll hidescroll">
            <Uploader post={post} setter={setPost} limit={1} folderName={'Posts'} />
        </ModalBody>


    </div>)
    const postHeader = (
        <ModalHeader className="between top-2  text-center absolute w-[21.3rem] gap-1">
            {post?.post?.img[0]?.includes('http') &&
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


    const EditPost = (<div className='relative w-full' >

        <ModalBody className="overflow-y-scroll w-full  overflow-x-hidden hidescroll">
            {postHeader}
            <div className=' overflow-y-scroll hidescroll mt-12   h-72  text-white rounded-3xl '>
                {post?.postType?.includes('video') && <video autoPlay muted playsInline loop className='w-full  object-cover' src={post.post.img[0]} alt="" />}
                {post?.postType?.includes('image') && <img className='w-full  object-cover' src={post?.post.img[0]} alt="" />}

            </div>
            <div className='overflow-x-scroll flex gap-4 items-center w-full border-y p-1 hidescroll'>
                {[1, 2, 3, 4, 5, 6].map(() => {
                    return (<div className='bg-white relative border-2 h-24 w-24 flex-shrink-0  border-black rounded-2xl'>


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

    const page = [UploadPost, EditPost, sharePost]

    useEffect(() => {
        if (post?.post?.img[0]?.includes('https') && pagePosition == 0) setPagePosition(1)
    }, [post])

    return (
        <Modal isDismissable={false} placement="auto" isOpen={showCreatePost} onClose={() => { setShowCreatePost(false) }} className="bg-black-800 w-auto trans h-[30rem] text-white bottom-12 ">

            <ModalContent>
                {page[pagePosition]}

            </ModalContent>

        </Modal>
    )
}

export default CreatePost