import { useEffect, useState } from "react"
import { fetchDocument } from "../Support/myCodes/Database"
import UserAvatar from "../Support/Componets/General/User/Avatar"

export const PostInside = ({ type, link, creator, index, data, setSelectedIndex }) => {
    const [creatorData, setCreatorData] = useState({})

    const getCreatorData = async (userID) => {
        await fetchDocument('Users', userID, setCreatorData)
    }

    useEffect(() => {

        const run = async () => {
            await getCreatorData(creator)
        }

        run()
    }, [])




    return (<div className='h-full relative center-col overflow-hidden'>
        <div className='absolute scale-50 md:scale-75 md:top-0 md:-left-0 -top-2 -left-6 '>

            <UserAvatar user={creatorData.UserInfo} />
        </div>
        <button onClick={() => { }} className='p-0 h-full w-full  overflow-hidden center-col bg-opacity-0'>
            {type == 'img' && <img className="h-full w-full object-cover rounded-xl" src={link} alt='' />}
            {type == 'vid' &&
                <video autoPlay loop muted playsInline className="h-full object-cover w-full rounded-xl" >
                    <source src={link} type="video/mp4" />
                </video>}
            {type == 'txt' && <div className="rounded-xl center break-words text-center text-white  h-full w-full overflow-hidden font-bold  px-8">
                <div className=" break-words text-center " >{link}</div>
            </div>}
        </button>



    </div>)
}


