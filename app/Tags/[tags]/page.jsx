import React from 'react'
import HashTitle from '../../Support/Componets/Tags/HashTitle'
import PostsGird from '../../Support/Componets/General/Post/PostsGird'
async function page() {



    return (
        <main className="min-h-screen overflow-x-hidden  bg-black text-white">
            <div className='md:w-3/4 lg:w-3/4 m-auto  lg:mr-[10rem]'>
                <div className='p-4'>
                    <HashTitle />
                </div>
                <div className='flex  flex-col   justify-evenly'>
                    <PostsGird forThis={'tags'} />
                </div>

            </div>









        </main>
    )
}

export default page