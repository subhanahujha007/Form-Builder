"use client"
import React, {  useState } from 'react'
import DesignerSidebar from './DesignerSidebar'
import {useDndMonitor, useDraggable, useDroppable} from "@dnd-kit/core"
import { cn } from '@/lib/utils'
import { ElementsType, FormElement, FormElementInstance } from './FormElements'
import useDesigner from './hooks/Designerhooks'
import { Button } from './ui/button'
import { BiSolidTrash } from 'react-icons/bi'
const Designer = () => {
    const { elements, addElements ,selectedElement,setSelectedElement ,removeElements} = useDesigner()
   const droppable=useDroppable({
    id:"designer-drop-area",
    data:{
        isDesignerDropArea:true
    }
   })
   useDndMonitor({
    onDragEnd: (event) => {
      const { over, active } = event;
  
      if (!over || !active) return;
  
      const activeData = active?.data?.current;
      const overData = over?.data?.current;
  
      const isDesignerBtnElement = activeData?.isDesignerBtnElement;
  
      const isDroppingOverDesignerDropArea = overData?.isDesignerDropArea;
  
      if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
        const type = activeData?.type;
        const newElement = FormElement[type as ElementsType].construct(
          Math.floor(Math.random() * 100001).toString()
        );
        addElements(0, newElement);
        return;
      }
  
      const isDroppingOverTopHalf = overData?.iSTopHalfDesignerElement;
      const isDroppingOverBottomHalf = overData?.iSbottomHalfDesignerElement;
      const isDroppingOverDesignerElement = isDroppingOverTopHalf || isDroppingOverBottomHalf;
  
      if (isDesignerBtnElement && isDroppingOverDesignerElement) {
        const type = activeData?.type;
        const newElement = FormElement[type as ElementsType].construct(
          Math.floor(Math.random() * 100001).toString()
        );
  
        const overId = overData?.id;
        const targetIndex = elements.findIndex((el) => el.id === overId);
  
        if (targetIndex === -1) throw new Error("Index does not exist");
  
        const insertIndex = isDroppingOverBottomHalf ? targetIndex + 1 : targetIndex;
        addElements(insertIndex, newElement);
        return;
      }


      const isDesignerElementDragging=active?.data?.current?.isDesignerElement
      const draggingDesignerElementOverAnotherDesignerElement=isDesignerElementDragging && isDesignerElementDragging

      if(draggingDesignerElementOverAnotherDesignerElement){
        const activeid=active?.data?.current?.id 
        const overid=over?.data?.current?.id 

        const activEelementIndex=elements.findIndex((el)=>el.id==activeid)
        const overElementIndex=elements.findIndex((el)=>el.id===overid)

        if(activEelementIndex==-1 || overElementIndex==-1)throw new Error("Index Not Found")

            const activeElements={...elements[activEelementIndex]}
            removeElements(activeid)
            
            let newIndex=overElementIndex
            if(isDroppingOverBottomHalf)newIndex=overElementIndex+1

            addElements(newIndex,activeElements)
      }
    },
  });
  
      
  return (
    <div className='flex  w-full h-full'>
        <div className='p-4 w-full' onClick={()=>{if(selectedElement)setSelectedElement(null)}}>
            <div
            ref={droppable.setNodeRef}
            className={cn("max-w-[960px] bg-background h-full mr-auto rounded-xl flex flex-col  overflow-y-auto",
             droppable.isOver && "ring-2 ring-primary ring-insert",elements.length ===0 && "flex-grow flex-1 items-center justify-center"
             )}> 
              { !droppable.isOver && elements.length===0 && <p className='flex flex-grow text-muted-foreground text-3xl font-bold items-center'>
                    Drop Here
                </p>}
                {
                    droppable.isOver  && elements.length===0 && (
                        <div className='w-full h-full top-0 p-4'>
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
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {removeElements,selectedElement,setSelectedElement}=useDesigner()
    const topHalf=useDroppable({
        id:element.id + "-top",
        data:{
            type:element.type,
            id:element.id,
            iSTopHalfDesignerElement:true
        }
    })

    const bottomHalf=useDroppable({
        id:element.id + "-bottom",
        data:{
            type:element.type,
            id:element.id,
            iSbottomHalfDesignerElement:true
        }
    })
    const draggable=useDraggable({
        id:element.id + "-drag-handler",
        data:{
            type:element.type,
            id:element.id,
            isDesignerElement:true,
        }
    })

  
    
    if(draggable.isDragging) return null;
    const DesignerComponent=FormElement[element.type].designerComponents
return(<div ref={draggable.setNodeRef} 
    onClick={(e)=>{
        e.stopPropagation()
        setSelectedElement(element)
}}  {...draggable.attributes} {...draggable.listeners} onMouseEnter={()=>setmouseover(true)} onMouseLeave={()=>setmouseover(false)} 
 className='relative flex items-center text-foreground-muted md:pr-6 pr-2 lg:pr-12 w-full h-[120px] bg-accent/40 rounded-xl '>
    <div className="absolute w-full h-1/2 bottom-0 rounded-b-md" ref={bottomHalf.setNodeRef} ></div>
    <div className="absolute w-full  h-1/2 top-0 rounded-b-md" ref={topHalf.setNodeRef} ></div>
    {mouseover && (<>
        <div className='absolute h-full right-0'>
        <Button
        onClick={()=>removeElements(element.id)}
         className='z-50000 h-full flex justify-center  border rounded-sm rounded-t-md bg-red-500' variant={"outline"}>
            <BiSolidTrash  className='z-40  h-6 w-6' />
            </Button>
        </div>
    <div className='absolute top-1/2 left-1/2 animate-pulse -translate-x-1/2 -translate-y-1/2'>
        <p className='text-muted-foreground text-sm'>click for properties or drag to move</p>
    </div></>)}
    {
        topHalf.isOver && (
            <div className='absolute top-0 rounded-md rounded-b-none w-full bg-primary h-[7px]'/>
        )
    }
    <div className={cn("flex opacity-100 w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-6" , mouseover && "opacity-30" )}>
<DesignerComponent elementInstance={element}/>
    </div>
    {
        bottomHalf.isOver && (
            <div className='absolute bottom-0 rounded-md rounded-t-none w-full bg-primary h-[7px]'/>
        )
    }
    </div>)
}

export default Designer
