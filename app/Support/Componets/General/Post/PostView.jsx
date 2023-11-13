import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import PostFeed from './PostFeed'


function PostView({ showPostView, setShowPostView, allPosts, currentPost, forThis }) {





    return (

        < Modal isOpen={showPostView} backdrop={'blur'} onOpenChange={() => { setShowPostView(false) }
        } placement='auto' scrollBehavior='inside' className={`h-[90%] w-full bg-black ${{
            backdrop: "bg-black bg-opacity-100 text-white"
        }}`}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-white">{(forThis ? forThis : 'Explore Feed')}</ModalHeader>
                        <ModalBody className='hidescroll overflow-hidden overflow-y-scroll text-white  p-0 m-auto'>
                            <PostFeed allPosts={allPosts} currentPost={currentPost} />
                        </ModalBody>
                        <ModalFooter>
                            <Button className='w-full' onPress={() => { setShowPostView(false) }} color="danger" variant="light">
                                Close
                            </Button>

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}

export default PostView