export const CompletePayment = ({ transaction, setShowTransactionView }) => {
    const [data, setData] = useState([])


    const getData = async () => {
        setData(await FetchThisDocs('Users', 'bankID', '==', transaction.relationships.counterpartyAccount.data.id))
    }
    console.log()
    useEffect(() => {
        getData()
    }, [])

    return (
        <button onClick={() => { setShowTransactionView(transaction) }} className='h-auto my-2  flex-shrink-0 w-full bg-white bg-opacity-10 rounded-xl p-2 between'>
            <div className='center gap-2'>
                <div className='bg-white rounded-full h-12 w-12 overflow-hidden '>
                    {data[0]?.UserInfo ? <UserAvatar noLable={true} user={data[0]?.UserInfo} /> : <img className='h-full w-full object-cover ' src={data[0]?.UserInfo.avatarURL || "https://images.unsplash.com/photo-1619881589928-a0c6516c074c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />}
                </div>
                <div className='w-40'>
                    <h1 className='font-bold'>{transaction?.attributes?.companyName || data[0]?.displayName}</h1>
                    <h1 className=' text-xs text-purple-600 realtive bottom-2'>{transaction?.type}</h1>
                    <h1 className='text-gray-400 text-sm font-light realtive bottom-2'>{transaction?.attributes?.summary || transaction?.attributes?.description}</h1>
                </div>

            </div>
            <div className='text-2xl font-extrabold'>
                <div className='center gap-3'>
                    <h1 className='text-xs'>${transaction?.attributes?.balance}</h1>
                    <h1 className={`${transaction?.attributes?.direction == 'Debit' ? 'text-rose-400' : 'text-lime-400'}`}>${formatNumber(transaction?.attributes?.amount / 100)}</h1>
                </div>
            </div>
        </button>
    )
}