import { Popover, PopoverTrigger, PopoverContent, Button, Input } from "@nextui-org/react";
import { createElement, useState } from "react";
import { AiFillFileText, AiFillPicture, AiFillVideoCamera, AiOutlinePlus } from "react-icons/ai";
import CreatePost from "../../General/CreatePost";

const NewPostMenu = ({ name, screenWidth, setShowNewPost, showNewPost }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Popover isDismissable={true} isOpen={!showNewPost && isOpen} placement="right" showArrow offset={(screenWidth > 900) ? 10 : screenWidth > 700 ? -70 : -40}>
            <PopoverTrigger>
                <Button
                    onPress={() => {
                        setIsOpen(!isOpen)
                    }}

                    className='md:my-5 overflow-visible flex justify-start    bg-opacity-0 text-white   group lg:hover:bg-gray-700 rounded-2xl trans'>
                    <div className='relative right-4 md:right-6  p-0  lg:right-4 trans group-hover:bg-gray-500 lg:shadow-md rounded-2xl'>
                        <AiOutlinePlus size={24} />
                    </div>
                    <h1 className='md:relative  opacity-0 absolute md:opacity-100'>{name}</h1>



                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-32">
                {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                        <p className="text-small font-bold text-foreground" {...titleProps}>
                            Create Post
                        </p>
                        <div className="mt-2 flex flex-col gap-2 w-full">
                            <Button onPress={() => { setShowNewPost('vid') }} size="sm" ><AiFillVideoCamera /> Video</Button>
                            <Button onPress={() => { setShowNewPost('img') }} size="sm" ><AiFillPicture />Image</Button>
                            <Button onPress={() => { setShowNewPost('txt') }} size="sm" ><AiFillFileText />Text</Button>
                        </div>
                    </div>
                )}
            </PopoverContent>

        </Popover>
    )
}

export default NewPostMenu