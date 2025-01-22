"use client"
import {FormElementInstance} from "@/components/FormElements"
import { createContext, ReactNode, useState } from "react"
type Designcontexttype={
    elements:FormElementInstance[],
    addElements:(index:number,elements:FormElementInstance)=>void,
    removeElements:(index:string)=>void,
}

export const Designercontext=createContext<Designcontexttype | null>(null)

export default function DesignerContextProvider({children}:{children:ReactNode}){
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

    return(
        <Designercontext.Provider value={{elements,addElements,removeElements}}>
                {children}
        </Designercontext.Provider>
    )
}