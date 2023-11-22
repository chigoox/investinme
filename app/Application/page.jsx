'use client'
import { Button, Card, Input, Select, SelectItem } from '@nextui-org/react'
import { Concert_One } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { getUID } from '../Support/myCodes/Auth'
import { useAUTHListener } from '../../StateManager/AUTHListener'
import { COUNTRIES } from '../CountriesDATA.JS'
import { getRand, makeUniq } from '../Support/myCodes/Util'
import { Income, Occupations } from '../Occupations'
import { message } from 'antd'
import { addToDatabase, addToDoc, updateDatabaseItem } from '../Support/myCodes/Database'
import { useRouter } from 'next/navigation'
const font2 = Concert_One({ subsets: ['latin'], weight: ['400'] })

function page() {
    const [formData, setFormData] = useState({})
    const [realData, setRealData] = useState({})
    const [countryData, setCountryData] = useState([])




    const user = useAUTHListener()
    const UID = getUID(user)

    const getIp = async () => {
        const res = await fetch('https://api.ipify.org?format=json')
        const { ip } = await res.json()
        return ip
    }
    const getCData = async () => {
        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const run = async () => {
            const data = await getCData()


            const countryFlag = data?.map(data => {
                return (data.flag)
            })
            const countryName = data?.map(data => {
                return (data.name.common)
            })

            setCountryData([countryFlag, countryName])

            return data

        }
        run()


    }, [])


    useEffect(() => {
        const run = async () => {
            setRealData({
                data: {
                    type: 'individualApplication',
                    attributes: {
                        ssn: formData.ssn,
                        fullName: {
                            first: formData.firstName,
                            last: formData.lastName,
                        },
                        dateOfBirth: formData.dob,
                        address: {
                            street: formData.street,
                            city: formData.city,
                            state: formData.state,
                            postalCode: formData.zip,
                            country: formData.country || 'US',
                        },
                        email: formData.email,
                        phone: {
                            countryCode: formData.countryCode?.replace('+', '') || 1,
                            number: formData.phone,
                        },
                        ip: await getIp(),
                        occupation: formData.Occupation,
                        annualIncome: formData.annualIncome,
                        sourceOfIncome: 'EmploymentOrPayrollIncome',
                        tags: {
                            userId: UID,
                        },
                        idempotencyKey: localStorage.getItem('idempotencyKey')
                    },
                },
            })
        }
        run()
    }, [formData])
    const { push } = useRouter()

    const submit = async () => {
        try {
            const response = await fetch("/api/unit/CreateAccount", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(realData),
            });

            const { data, title, source } = await response?.json()
            if (title || source) message.error(title + ' @ ' + source.pointer.replace('/data/attributes', '').replace('/', ''))


            await addToDatabase('Users', UID, 'customerID', data?.relationships.customer.data.id)
            await addToDatabase('Users', UID, 'address', data.attributes.address)




            const openBank = await fetch('/api/unit/OpenBank', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: {
                        type: 'depositAccount',
                        attributes: {
                            depositProduct: 'checking',
                            tags: { purpose: 'checking' },
                            idempotencyKey: localStorage.getItem('idempotencyKey')
                        },
                        relationships: {
                            customer: {
                                data: {
                                    type: 'customer',
                                    id: data?.relationships.customer.data.id
                                }
                            }
                        }
                    }
                }),
            });
            let bank = await openBank?.json()
            bank = bank.data


            const createCard = await fetch('/api/unit/CreateCard', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: {
                        type: "individualDebitCard",
                        attributes: {
                            shippingAddress: {
                                street: data.attributes.address.street,
                                street2: null,
                                city: data.attributes.address.city,
                                state: data.attributes.address.state,
                                postalCode: data.attributes.address.postalCode,
                                country: data.attributes.address.country,
                            },
                            limits: {
                                dailyWithdrawal: 50000,
                                dailyPurchase: 50000,
                                monthlyWithdrawal: 500000,
                                monthlyPurchase: 700000
                            },
                        },
                        relationships: {
                            account: {
                                data: {
                                    type: bank.type,
                                    id: bank.id
                                }
                            }
                        }
                    }
                }),
            });

            let { phisicalCard, virtualCard } = await createCard?.json()

            phisicalCard = phisicalCard?.data
            virtualCard = virtualCard?.data

            console.log(virtualCard)
            console.log(phisicalCard)


            await addToDatabase('Users', UID, 'bankID', bank.id)

            await addToDatabase('Users', UID, 'vCardID', virtualCard?.id)

            await addToDatabase('Users', UID, 'pCardID', phisicalCard?.id)
            message.success('Digits Account Opened')
            push('/Profile')


        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div className={`min-h-screen bg-black text-white ${font2.className}`}>
            <div className='trans md:px-20 lg:px-40 xl:px-32 py-4 w-full hidescroll  p-4 h-full  lg:ml-60 overflow-y-scroll overflow-hidden'>
                <h1 className='text-5xl px-4 mb-10'>Application</h1>

                <Card className='bg-black-800   gap-4 overflow-y-scroll hidescroll h-auto p-4 center-col md:w-3/4 m-auto'>
                    <div className=' center-col gap-1 w-full m-auto'>
                        <Input label={'First Name'} onValueChange={(v) => setFormData(o => ({ ...o, firstName: v }))} />
                        <Input label={'Last Name'} onValueChange={(v) => setFormData(o => ({ ...o, lastName: v }))} />
                        <Input label={'SSN'} onValueChange={(v) => setFormData(o => ({ ...o, ssn: v }))} />
                        <Input label={'Date of Birth'} type='date' onValueChange={(v) => setFormData(o => ({ ...o, dob: v }))} />
                    </div>

                    <div className='center-col gap-1 w-full  m-auto'>
                        <Input label={'Street'} onValueChange={(v) => setFormData(o => ({ ...o, street: v }))} />
                        <Input label={'City'} onValueChange={(v) => setFormData(o => ({ ...o, city: v }))} />
                        <Input label={'State'} onValueChange={(v) => setFormData(o => ({ ...o, state: v }))} />
                        <Input label={'Zip'} onValueChange={(v) => setFormData(o => ({ ...o, zip: v }))} />
                        <Select
                            label="Select country"
                            className="max-w-xs text-black m-auto"
                            onChange={({ target }) => {
                                setFormData(o => ({ ...o, country: target.value }))
                            }}
                        >

                            {COUNTRIES.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                    {country.code}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className='w-full m-auto center-col gap-1'>
                        <Input type='email' label={'Email'} onValueChange={(v) => setFormData(o => ({ ...o, email: v }))} />
                        <div className='flex gap-2 w-full'>

                            <Select
                                label="C. Code"
                                className="max-w-xs text-black m-auto w-64"
                                onChange={({ target }) => {
                                    setFormData(o => ({ ...o, countryCode: target.value.replace('+', '') }))
                                }}
                            >
                                {COUNTRIES?.map((country, index) => {
                                    for (let index = 0; index < countryData[1]?.length; index++) {
                                        const ele = countryData[1][index];
                                        if (ele == country.name) return (
                                            <SelectItem textValue={`${countryData[0][index]} ${country.mobileCode}`} key={country.mobileCode} value={country.mobileCode}>
                                                {countryData[0][index]}{country.mobileCode}
                                            </SelectItem>
                                        )

                                    }

                                })}
                            </Select>
                            <Input type='tel' className='w-full flex' label={'Phone'} onValueChange={(v) => setFormData(o => ({ ...o, phone: v }))} />
                        </div>

                    </div>


                    <Select
                        label="Select an income"
                        className="max-w-xs text-black m-auto"
                        onChange={({ target }) => {
                            setFormData(o => ({
                                ...o,
                                annualIncome:
                                    target.value == 0 ? Income[0] :
                                        target.value == 1 ? Income[1] :
                                            target.value == 2 ? Income[2] :
                                                target.value == 3 ? Income[3] :
                                                    target.value == 4 ? Income[4] : Income[5]



                            }))
                        }}
                    >
                        {['$10k', '$10k-$25k', '$25k-$50k', '$50k-$100k', '$100k-$250k', '$250k+'].map((income, index) => (
                            <SelectItem key={
                                index

                            }


                                value={
                                    index
                                }>
                                {income}
                            </SelectItem>
                        ))}
                    </Select>


                    <Select
                        label="Select occupation"
                        className="max-w-xs text-black m-auto"
                        onChange={({ target }) => {
                            setFormData(o => ({ ...o, Occupation: target.value }))
                        }}
                    >
                        {Occupations.map((occupation, index) => (
                            <SelectItem key={occupation}>
                                {occupation}
                            </SelectItem>
                        ))}
                    </Select>

                    <Button onPress={submit} className='mb-20'>
                        Submit
                    </Button>








                </Card>



            </div>

        </div>
    )
}

export default page






/* '


{"data":{"type":"depositAccount","attributes":{"depositProduct":"checking","tags":{"purpose":"main"}},"relationships":{"customer":{"data":{"type":"customer","id":"1461002"}}}}}

















{
    type: 'individualApplication',
    id: '1677971',
    attributes: {
      createdAt: '2023-11-19T11:46:24.236Z',
      fullName: { first: 'Emma', last: 'Watson' },
      ssn: '987654324',
      address: {
        street: '729 Suburban RD.',
        city: 'Union',
        state: 'NJ',
        postalCode: '07083',
        country: 'US'
      },
      dateOfBirth: '1993-09-03',
      email: 'dikeemmanuel54@gmail.com',
      phone: {
        countryCode: '1',
        number: '9082202312'
      },
      status: 'Approved',
      message: 
        'Congrats - your application has been approved!',
      evaluationId: 'S-sfYetq8qUN7Kq6EWurl6',
      ip: '73.160.38.33',
      soleProprietorship: false,
      tags: {
        userId: 'lwcKnsyR8nePdbBggwmIEoNCQv63'
      },
      archived: false,
      updatedAt: '2023-11-19T11:46:26.341Z',
      idTheftScore: 888,
      occupation: 
        'BusinessAnalystAccountantOrFinancialAdvisor',
      annualIncome: 'Between50kAnd100k',
      sourceOfIncome: 
        'EmploymentOrPayrollIncome'
    },
    relationships: {
      org: {
        data: { type: 'org', id: '4270' }
      },
      customer: {
        data: {
          type: 'individualCustomer',
          id: '1461006'
        }
      }
    }
  }



*/