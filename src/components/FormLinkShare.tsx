"use client"
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from '@/hooks/use-toast'
import { ImShare } from 'react-icons/im'

const FormLinkShare = ({shareUrl}:{shareUrl:string}) => {
    const[mounted,setmounted]=useState(false)
    useEffect(() => {
        setmounted(true)
    }, [])
    
    if(!mounted)return null

    const shareLink=`${window.location.origin}/submit/${shareUrl}`

  return (
    <div className='flex flex-grow gap-4'>
        <Input readOnly value={shareLink}/>
        <Button
        className='w-[250px]'
        onClick={()=>{
            navigator.clipboard.writeText(shareLink)
            toast({
                title:"copied successfully",
                description:"Link has been successfully copied"
            })
        }}
        >
                <ImShare className='mr-2 h-4 w-4'/>
                Share Link
        </Button>
    </div>
  )
}

export default FormLinkShare