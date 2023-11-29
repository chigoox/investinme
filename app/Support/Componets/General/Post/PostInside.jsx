import { Image } from '@nextui-org/react'
import React from 'react'
function PostInside({ link, type, forThis }) {
    return (
        <div className='h-fit w-full '>
            {type == 'img' && <Image width={1920} height={1080} className={` ${forThis == 'pins' ? 'h-[25rem]  rounded-full' : 'h-full'}  min-h-full w-full object-cover md:rounded-lg`} src={link} alt='' />}
            {type == 'vid' &&
                <video autoPlay loop muted playsInline className={` ${forThis == 'pins' ? 'h-[32rem] rounded-full' : 'h-full'}  object-cover w-full md:rounded-lg`} >
                    <source src={link} type="video/mp4" />
                </video>}
            {type == 'txt' && <div className={`rounded-full   ${forThis == 'pins' ? 'h-[20rem] rounded-full' : 'h-full'} overflow-hidden font-bold w-full  px-4`}>
                <h1 className="w-auto break-words" >{link}</h1>
            </div>}
        </div>
    )
}

export default PostInside