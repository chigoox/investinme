'use client'
import { Satisfy } from 'next/font/google'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AiFillBank, AiOutlineBank, AiOutlineBell, AiOutlineGlobal, AiOutlineHome, AiOutlineMail, AiOutlinePlus, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import { useAUTHListener } from '../../../../StateManager/AUTHListener'
import { useWindowSize } from '../../Hooks/useWindowSize'
import { siteName } from '../../../META'
import useScrollPosition from '../../Hooks/useScrollPosition'

const font = Satisfy({
    weight: '400',
    subsets: ['latin'],
})

function NavBar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [navRoute, setNavRoute] = useState([])
    const user = useAUTHListener()
    const { push } = useRouter()

    let scrollPosition = 1
    scrollPosition = useScrollPosition()

    const NoCart = usePathname().includes('Checkout')


    useEffect(() => {

    }, [])




    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu)
        return (!showMobileMenu)
    }
    const toggleCart = () => {
        setShowCart(!showCart)
        return (!showCart)
    }
    const toggleLogin = () => {
        if (user?.uid) {
            push(`/User/${user.uid}`)
        } else {
            setShowLogin(!showLogin)

        }
    }




    const windowSize = useWindowSize()

    const tabDeskMenu = ['Home', 'Search', 'Explore', 'Post', 'Notifications', 'Profile']
    const menuMobile = ['Home', 'Explore', 'Post', 'Message', 'Profile']
    const menuNames = (windowSize.width <= 462) ? menuMobile : tabDeskMenu

    return (
        <div className='md:h-screen h-10 bottom-0 md:top-0 w-screen z-[99999] fixed md:border-r border-t p-4 pt-10 text-white border-gray-700 bg-black md:w-[3rem] lg:w-[15rem]  flex flex-col overflow-hidden'>

            <div className={` center-col  absolute md:relative  opacity-0 md:opacity-100  mb-4 w-full font-bold text-2xl ${font.className}`}>
                <h1 className='opacity-0 lg:opacity-100'>{siteName}</h1>
                <div className='border-2 lg:opacity-0 border-gray-700 rounded-full bg-red-900'>
                    <AiFillBank />
                </div>
            </div>





            <nav className={`trans h-auto flex md:flex-col justify-evenly  w-full md:w-fit top-0 absolute  md:relative`}>

                {menuNames.map((name) => {

                    return (
                        <Link key={name} href={`/${(name == 'Home') ? '' : (name == 'Profile') ? 'User/uid' : `${name}`}`} className='md:my-5 flex items-center gap-2 group lg:hover:bg-gray-700 rounded-2xl trans'>
                            <div className='relative right-4 lg:right-0 trans group-hover:bg-gray-500 p-2 lg:shadow-md rounded-2xl'>
                                {name == 'Home' && <AiOutlineHome size={24} />}
                                {name == 'Search' && <AiOutlineSearch size={24} />}
                                {name == 'Explore' && <AiOutlineGlobal size={24} />}
                                {name == 'Message' && <AiOutlineMail size={24} />}
                                {name == 'Post' && <AiOutlinePlus size={24} />}
                                {name == 'Notifications' && <AiOutlineBell size={24} />}
                                {name == 'Profile' && <AiOutlineUser size={24} />}
                                {name == 'Bank' && <AiOutlineBank size={24} />}
                            </div>
                            <h1 className='md:relative opacity-0 absolute md:opacity-100'>{name}</h1>


                        </Link>
                    )
                })
                }



            </nav>





        </div >

    )
}

export default NavBar

/* 

routes

shop/Luxury wigs , Luxury bundles , luxury lace , hot tools 
book/book appointments, book a class

*/
