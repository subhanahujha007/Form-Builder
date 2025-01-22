"use client"
import React from 'react'
import DesignerSidebar from './DesignerSidebar'
import {useDndMonitor, useDroppable} from "@dnd-kit/core"
import { cn } from '@/lib/utils'
import { ElementsType, FormElement, FormElementInstance } from './FormElements'
import useDesigner from './hooks/Designerhooks'
const Designer = () => {
    const { elements, addElements } = useDesigner()

   const droppable=useDroppable({
    id:"designer-drop-area",
    data:{
        isDesignerDropArea:true
    }
   })
   useDndMonitor({
    onDragEnd:(event)=>{
        const {over,active}=event
        if(!over || !active)return null

const isDesignerBtnElement=active?.data?.current?.isDesignerBtnElement

if(isDesignerBtnElement){
    const type=active?.data?.current?.type
    const neweleement=FormElement[type as ElementsType].construct(Math.floor(Math.random()*100001).toString())
addElements(0,neweleement)
}

    }
   })
      
  return (
    <div className='flex  w-full h-full'>
        <div className='p-4 w-full'>
            <div
            ref={droppable.setNodeRef}
            className={cn("max-w-[960px] bg-background h-full mr-auto rounded-xl flex flex-col flex-grow items-center justify-center flex-1 overflow-y-auto",
             droppable.isOver && "ring-2 ring-primary/20"
             )}> 
              { !droppable.isOver && elements.length===0 && <p className='flex flex-grow text-muted-foreground text-3xl font-bold items-center'>
                    Drop Here
                </p>}
                {
                    droppable.isOver && (
                        <div className='w-full h-full p-4'>
                            <div className='h-[120px] rounded-md bg-primary/20'/>
                            </div>
                    )
                }
                {
                    elements.length >0 &&  (
                        <div className='flex flex-col w-full gap-2 p-4 text-background'>
                            {
                                elements.map((el)=>(
                                    <DesignerElementwrapper element={el} key={el.id} />
                                ))
                            }
                            </div>
                    )
                }
            </div>
        </div>
        <DesignerSidebar/>
    </div>
  )
}

function DesignerElementwrapper({element}:{element:FormElementInstance}){
    const DesignerComponent=FormElement[element.type].designerComponents
return<div className='flex items-center pointer-events-none w-full h-[120px] bg-accent/40 rounded-xl px-4 py-2'><DesignerComponent elementInstance={element}/></div>
}

export default Designer