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
        <div className="flex flex-col items-center justify-center w-full h-full">
            <ImSpinner className='h-6 w-6 animate-spin'/>
        </div>
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