"use client"
import React, { useEffect, useState } from 'react'
import { Form } from '@prisma/client'
import PreviewDialogBtn from './PreviewDialogBtn'
import SaveFormBtn from './SaveFormBtn'
import PublishBtn from './PublishBtn'
import Designer from './Designer'
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core"
import DragOverLayWrapper from './DragOverLayWrapper'
import useDesigner from './hooks/Designerhooks'
import { ImSpinner } from 'react-icons/im'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Confetti from "react-confetti"
import { toast } from '@/hooks/use-toast'
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs'
import Link from 'next/link'
const FormBuilder = ({form}:{form:Form}) => {
    const {setElements}=useDesigner()
    const [ready,setready]=useState(false)
    const mousesensor=useSensor(MouseSensor,{
        activationConstraint:{
            distance:10
        },
    })

    const touchsensors=useSensor(TouchSensor,{
        activationConstraint:{
            delay:300,
            tolerance:5
        }
    })
    const sensor=useSensors(mousesensor,touchsensors)
    useEffect(() => {
        if(ready)return ;
      const elements=JSON.parse(form.content)
      setElements(elements)
      const readytimeout=setTimeout(()=>setready(true),500)
      return ()=>clearTimeout(readytimeout)
    }, [form,setElements])
    
    if(!ready){
       return( <div className="flex flex-col items-center justify-center w-full h-full">
            <ImSpinner className='h-6 w-6 animate-spin'/>
        </div>)
    }
    const shareUrl=`${window.location.origin}/submit/${form.shareUrl}`
    if(form.published){
        return(<>
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} />
            <div className='h-full flex justify-center w-full items-center'>
                <div className='max-w-md'>    <h1 className='text-center text-bold text-primary border-b pb-2 mb-10'>
                        Form Published
                    </h1>
                    <h2 className='text-2xl'>Share this form</h2>
                    <h3 className='text-xl text-muted-foreground border-b pb-10'>
                        Anyone with the link can view this form
                    </h3>
                    <div className='my-4 flex flex-col gap-2 items-center w-full border-b pb-4'>
                            <Input readOnly className='w-full' value={shareUrl} />
                            <Button className='mt-2 w-full' onClick={()=>{navigator.clipboard.writeText(shareUrl)
                                 toast({title:"Copied",description:"link copied to clipboard"}) }} >Copy Link</Button>
                    </div>
                    <div className='flex justify-between'>
                                <Button variant={"link"} asChild>
                                        <Link href={"/"} className="gap-2">
                                        <BsArrowBarLeft/> Go back to home Page 
                                        </Link>
                                </Button>
                                <Button variant={"link"} asChild>
                                        <Link href={`/forms/${form.id}`} className="gap-2">
                                        Go to Forms details <BsArrowBarRight/> 
                                        </Link>
                                </Button>
                    </div>
                    </div>
            </div>
            </>
        )
    }

  return (
    <DndContext sensors={sensor}>
    <div className='flex flex-col w-full'>
        <nav className='flex justify-between border-b-2 p-4 gap-3 items-center'>
            <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form:</span>
            {form.name}
            </h2>
            <div className='flex items-center gap-2'>
                <PreviewDialogBtn/>
                {
                    !form.published && (
                        <>
                        <SaveFormBtn id={form.id}/>
                        <PublishBtn id={form.id}/>
                        </>
                    )
                }
            </div>
        </nav>
        <div className='flex flex-grow items-center justify-center 
        relative overflow-y-auto bg-accent h-[200px] bg-[url(/banner.svg)] dark:bg-[url(/banner.svg)]'>
            <Designer/>
        </div>
    </div>
    <DragOverLayWrapper/>
    </DndContext>
  )
}

export default FormBuilder