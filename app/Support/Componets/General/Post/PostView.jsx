import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import PostFeed from './PostFeed'


function PostView({ showPostView, setShowPostView, allPosts, currentPost }) {





    return (


        <Modal isOpen={showPostView} backdrop={'opaque'} onOpenChange={() => { setShowPostView(false) }} placement='auto' scrollBehavior='inside' className={`h-[90%] w-full bg-black ${{
            backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}`}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                        <ModalBody className='hidescroll overflow-hidden overflow-y-scroll  p-0 ml-0'>
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
        </Modal>
    )
}

export default PostView