import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, {  useState } from 'react'
import { SidebarBtnoverlay } from './SidebarBtn'
import { ElementsType, FormElement } from './FormElements'
import useDesigner from './hooks/Designerhooks'

const DragOverLayWrapper = () => {
    const [dragitem,setdragitem]=useState<Active | null>(null)
    const {elements}=useDesigner()
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

    const isDesignerElement=dragitem.data?.current?.isDesignerElement
    if(isDesignerElement){
        const elementID=dragitem.data?.current?.id 
        const element=elements.find((el)=>el.id==elementID)
        if(!element)node=<div>Element Not Found</div>
        else {
            const DesignerElementComponent=FormElement[element.type].designerComponents
            node=(
                <div className="px-2 py-4 h-[120px] pointer-events-none border opacity-80 bg-accent w-full rounded-md flex">
                <DesignerElementComponent elementInstance={element}  />
                </div>
            )
        }
    }

    return (
    <DragOverlay>{node}</DragOverlay>
  )
}

export default DragOverLayWrapper