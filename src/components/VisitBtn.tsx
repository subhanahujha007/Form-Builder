"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const VisitBtn = ({shareUrl}:{shareUrl:string}) => {
    const [mounted,setmounted]=useState(false)
    useEffect(() => {
      setmounted(true)
    }, [])
    if(!mounted)return null
    
    const sharelink=`${window.location.origin}/submit/${shareUrl}`
  return (
   <Button className='w-[200px]' onClick={()=>{window.open(sharelink,"_blank")}} variant={"default"}>
        Visit
   </Button>
  )
}

export default VisitBtn