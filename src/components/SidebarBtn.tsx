import React from 'react'
import { FormElement } from './FormElements'
import { Button } from './ui/button'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

const SidebarBtn = ({formElement}:{formElement:FormElement}) => {
    const {icon:Icon,label}=formElement.designerBtnElement
    const draggable=useDraggable({
    id:`designder-btn-${formElement.type}`,
    data:{
        type:formElement.type,
        isDesignerBtnElement:true
    }
    })
  return (
    <Button
    ref={draggable.setNodeRef} 
    {...draggable.attributes}
    {...draggable.listeners}
    className={cn('h-[120px] w-[120px] flex flex-col cursor-grab',
        draggable.isDragging && "ring-primary ring-2"
  )}
     variant={"outline"}>
        <Icon className="h-8 w-8 cursor-grab bg-primary/20" />
        <span className='text-xs'>{label}</span>
    </Button>
  )
}

export const SidebarBtnoverlay = ({formElement}:{formElement:FormElement}) => {
    const {icon:Icon,label}=formElement.designerBtnElement
   
  return (
    <Button
  
    className='h-[120px] w-[120px] flex flex-col cursor-grab'
     variant={"outline"}>
        <Icon className="h-8 w-8 cursor-grab bg-primary/20" />
        <span className='text-xs'>{label}</span>
    </Button>
  )
}


export default SidebarBtn