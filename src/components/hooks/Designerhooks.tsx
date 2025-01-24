"use client"
import  { useContext } from 'react'
import { Designercontext } from '../context/DesignContext'

const useDesigner = () => {
    const context=useContext(Designercontext)
    if(!context)throw new Error("Designer Context must pe provided")

  return context
}

export default useDesigner