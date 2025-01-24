"use client"
import React  from "react"
export default function layout({children}:{children:React.ReactNode}){
  return (
    <div className="flex flex-grow w-full mx-auto">
        {children}
    </div>
  )
}

