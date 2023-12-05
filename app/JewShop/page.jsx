import { Image } from '@nextui-org/react'
import React from 'react'

function page() {
    const navItem = ['Home', 'Shop', 'About us']
    return (
        <div className='bg-black min-h-screen text-white'>
            <nav className='flex between h-24 overflow-hidden'>
                <div className='center mt-4'>
                    <Image className='h-20 w-20 ml-20 rounded-full' src={'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D'} />
                    <h1 className='text-white ml-4 font-bold text-2xl'>JewShop</h1>

                </div>

                <div className='center gap-4 mr-20'>
                    {navItem.map(item => {
                        return (
                            <a className href={`#${item.replace(/\s+/g, '')}`}>{item}</a>
                        )
                    })}



                </div>

            </nav>
            <div className='mt-6 relative'>
                <Image src={'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
                <div className='absolute w-full h-full bg-opacity-10  top-0 bg-black z-50 center'>
                    <h1 className='bg-black w-fit text-5xl p-2 rounded text-white hover:text-pink-500 hover:scale-[1.1] scale-1  trans-slow font-extrabold'>Shop Now</h1>


                </div>
            </div>

        </div>
    )
}

export default page