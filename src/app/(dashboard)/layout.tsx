"use client"
import { UserButton } from "@clerk/nextjs"
import React  from "react"
import Logo from "@/components/Logo"
import ThemeSwitcher from "@/components/ThemeSwitcher"
export default function layout({children}:{children:React.ReactNode}){
  return (
    <div className="max-h-screen bg-background min-w-full flex flex-col  min-h-screen">
      <nav className="flex justify-between flex-row items-center px-4">
        <Logo/>
        <div className="flex flex-row  items-center p-2 gap-14">
        <ThemeSwitcher/>
        <UserButton  fallback={"/sign-in"} />
        </div>
      </nav>
      <main className="flex flex-grow w-full">
        {children}
      </main>
    </div>
  )
}

