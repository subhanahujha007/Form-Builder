"use client"
import { UserButton } from "@clerk/nextjs"
import React ,{ReactNode} from "react"
import Logo from "@/components/Logo"
import ThemeSwitcher from "@/components/ThemeSwitcher"
export default function layout({children}:{children:React.ReactNode}){
  return (
    <div className="flex flex-grow w-full mx-auto">
        {children}
    </div>
  )
}

