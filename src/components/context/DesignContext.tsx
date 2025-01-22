"use client"
import {FormElementInstance} from "@/components/FormElements"
import { createContext, ReactNode, useState } from "react"
type Designcontexttype={
    elements:FormElementInstance[],
    addElements:(index:number,elements:FormElementInstance)=>void,
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
    return(
        <Designercontext.Provider value={{elements,addElements}}>
                {children}
        </Designercontext.Provider>
    )
}