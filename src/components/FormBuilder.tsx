"use client"
import React from 'react'
import { Form } from '@prisma/client'
import PreviewDialogBtn from './PreviewDialogBtn'
import SaveFormBtn from './SaveFormBtn'
import PublishBtn from './PublishBtn'
import Designer from './Designer'
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core"
import DragOverLayWrapper from './DragOverLayWrapper'
const FormBuilder = ({form}:{form:Form}) => {
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
                        <SaveFormBtn/>
                        <PublishBtn/>
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