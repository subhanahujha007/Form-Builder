"use client"
import {FormElementInstance} from "@/components/FormElements"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
type Designcontexttype={
    elements:FormElementInstance[],
    addElements:(index:number,elements:FormElementInstance)=>void,
    removeElements:(index:string)=>void,

    selectedElement:FormElementInstance | null,
    setSelectedElement:Dispatch<SetStateAction<FormElementInstance | null>>,

    updateElement:(id:string,Form:FormElementInstance)=>void
}

export const Designercontext=createContext<Designcontexttype | null>(null)

export default function DesignerContextProvider({children}:{children:ReactNode}){
    const [selectedElement,setSelectedElement]=useState<FormElementInstance | null>(null)
    const [elements,setelements]=useState<FormElementInstance[] >([])
    const addElements=(index:number,elements:FormElementInstance)=>{
     setelements((prev)=>{
        const newelements=[...prev]
        newelements.splice(0,index,elements)
        return newelements
     })  
    }
    const removeElements=(id:string)=>{
    setelements((prev)=>(
        prev.filter((elem)=>elem.id!==id)
    ))
    }
    const updateElement=(id:string,element:FormElementInstance)=>{
        setelements((prev)=>{
            const newelements=[...prev]
            const index=elements.findIndex((el)=>el.id==id)
            newelements[index]=element
            return newelements
        })
    }
    return(
        <Designercontext.Provider value={{elements,addElements,removeElements,selectedElement,setSelectedElement,updateElement}}>
                {children}
        </Designercontext.Provider>
    )
}