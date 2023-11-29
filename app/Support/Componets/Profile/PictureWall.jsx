import React, { useEffect, useState } from 'react'
import { createArray, getRand } from '../../myCodes/Util'
import { Button, Image, select } from '@nextui-org/react'
import { fetchDocument } from '../../myCodes/Database'
import PostInside from '../General/Post/PostInside'

function PictureWall({ UID }) {
    const [selected, setSelected] = useState(getRand(6) - 1)
    const [pins, setPins] = useState({})
    const [postArray, setPostArray] = useState([])



    useEffect(() => {
        const run = async () => {
            const { pins } = await fetchDocument('Users', UID)
            setPins(pins)
        }

        run()
    }, [UID])

    useEffect(() => {
        const run = async () => {
            const post1 = pins.slot0 ? await fetchDocument('Posts', pins?.slot0) : null
            const post2 = pins.slot1 ? await fetchDocument('Posts', pins?.slot1) : null
            const post3 = pins.slot2 ? await fetchDocument('Posts', pins?.slot2) : null
            const post4 = pins.slot3 ? await fetchDocument('Posts', pins?.slot3) : null
            const post5 = pins.slot4 ? await fetchDocument('Posts', pins?.slot4) : null
            const post6 = pins.slot5 ? await fetchDocument('Posts', pins?.slot5) : null
            setPostArray([post1, post2, post3, post4, post5, post6])
        }

        run()
    }, [pins])

    return (
        <div className='lg:w-[50%] w-[90%] m-auto gap-4 h-auto  my-4 center'>
            {postArray.map(pin => {
                return (
                    <div className={`${selected === pin?.id ? 'rounded-3xl  relative  w-[100%]' : 'lg:w-[5%] w-[12%] '} relative h-auto  rounded-[40px] gap-5 flex-grow-1 center-col overflow-hidden min-w-[10%] lg:min-w-[5%]   trans  border-black border max-w-full`}>

                        <PostInside link={pin?.link} type={pin?.type} forThis={'pins'} />
                        <Button onPress={() => { setSelected(selected === pin?.id ? false : pin?.id) }} className=' absolute bg-opacity-25 bottom-4 min-w-0  z-50 bg-black-800 border-2 border-dotted h-8 w-8 min-h-0 p-0 md:h-10 md:w-10 rounded-full'>

                        </Button>
                    </div>
                )
            })}

        </div>
    )
}

export default PictureWall