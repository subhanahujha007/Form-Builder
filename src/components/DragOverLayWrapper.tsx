import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, {  useState } from 'react'
import { SidebarBtnoverlay } from './SidebarBtn'
import { ElementsType, FormElement } from './FormElements'

const DragOverLayWrapper = () => {
    const [dragitem,setdragitem]=useState<Active | null>(null)
    useDndMonitor({
            onDragStart:(event)=>{
                    setdragitem(event.active)
            },
            onDragCancel:(event)=>{
                setdragitem(null)
            },
            onDragEnd:(event)=>{
                setdragitem(null)
            }
    })  
    if(!dragitem)return null
    let node=<div>{"NO draggable item"}</div>
    const isSideBarBtnElement=dragitem.data?.current?.isDesignerBtnElement
    const type=dragitem.data?.current?.type as ElementsType
    if(isSideBarBtnElement)node=<SidebarBtnoverlay formElement={FormElement[type] }  />
    return (
    <DragOverlay>{node}</DragOverlay>
  )
}

export default DragOverLayWrapper