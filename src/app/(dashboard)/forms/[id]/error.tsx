"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
const error = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center h-full w-full'> 
    <h2 className='text-3xl font-bold'>Page Doesnt exists</h2> 
    <Link href="/"><Button variant={"link"}>Go Back To Home Page</Button></Link>
    </div>
  )
}

export default error