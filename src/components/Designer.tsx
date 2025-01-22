"use client"
import React, { useState } from 'react'
import DesignerSidebar from './DesignerSidebar'
import {useDndMonitor, useDroppable} from "@dnd-kit/core"
import { cn } from '@/lib/utils'
import { ElementsType, FormElement, FormElementInstance } from './FormElements'
import useDesigner from './hooks/Designerhooks'
import { Button } from './ui/button'
import { BiSolidTrash } from 'react-icons/bi'
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
            className={cn("max-w-[960px] bg-background h-full mr-auto rounded-xl flex flex-col  overflow-y-auto",
             droppable.isOver && "ring-2 ring-primary/20",elements.length ===0 && "flex-grow flex-1 items-center justify-center"
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
    const [mouseover,setmouseover]=useState<boolean>()
    const {removeElements}=useDesigner()
    const topHalf=useDroppable({
        id:element.id,
        data:{
            type:element.type,
            elementID:element.id,
            iSTopHalfDesignerElement:true
        }
    })

    const bottomHalf=useDroppable({
        id:element.id,
        data:{
            type:element.type,
            elementID:element.id,
            iSbottomHalfDesignerElement:true
        }
    })


    const DesignerComponent=FormElement[element.type].designerComponents
return(<div onMouseEnter={()=>setmouseover(true)} onMouseLeave={()=>setmouseover(false)}  className='relative flex items-center text-foreground-muted   w-full h-[120px] bg-accent/40 rounded-xl px-4 py-2'>
    <div className="absolute h-1/2 bottom-0 rounded-b-md" ref={bottomHalf.setNodeRef} ></div>
    <div className="absolute h-1/2 rounded-b-md" ref={topHalf.setNodeRef} ></div>
    {mouseover && (<>
        <div className='absolute h-full right-0'>
        <Button
        onClick={()=>removeElements(element.id)}
         className='h-full flex justify-center  border rounded-sm rounded-t-md bg-red-500' variant={"outline"}>
            <BiSolidTrash className='z-40  h-6 w-6' />
            </Button>
        </div>
    <div className='absolute top-1/2 left-1/2 animate-pulse -translate-x-1/2 -translate-y-1/2'>
        <p className='text-muted-foreground text-sm'>click for properties or drag to move</p>
    </div></>)}
    <div className={cn("flex opacity-100 w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-6 pointer-events-none" , mouseover && "opacity-30" )}>
<DesignerComponent elementInstance={element}/>
    </div>
    </div>)
}

export default Designer