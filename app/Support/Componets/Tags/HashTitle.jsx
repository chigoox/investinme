'use client'
import { usePathname } from 'next/navigation'
import React from 'react'


function HashTitle() {
    const path = usePathname()
    return (
        <div className='text-5xl px-20'>{path.replace('/Tags/', '#')}</div>
    )
}

export default HashTitle