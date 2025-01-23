import React from 'react'
import useDesigner from './hooks/Designerhooks'
import { FormElement } from './FormElements'
import { Button } from './ui/button'
import {AiOutlineClose} from "react-icons/ai"
import { Separator } from './ui/separator'
const PropertiesFormSidebar = () => {
    const {selectedElement,setSelectedElement}=useDesigner()
    if(!selectedElement)return null
    const PropertiesForm=FormElement[selectedElement.type]?.PropertiesComponents
  return (
    <div className='flex flex-col gap-2'>
    <div className='flex   justify-between items-center'>
        <p className="text-sm text-foreground-[70%]">Element Properties</p>
        <Button
         size={"icon"} onClick={()=>{setSelectedElement(null)}} 
         variant={"ghost"}>
            <AiOutlineClose/>
        </Button>
        </div>
        <Separator className='mb-4'/>
        <PropertiesForm elementInstance={selectedElement}/>
        </div>
  )
}

export default PropertiesFormSidebar