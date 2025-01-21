"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Tabs } from './ui/tabs'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LampDeskIcon, MoonIcon, SunIcon } from 'lucide-react'

const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme()
    const [mounted,setmounted]=useState(false)  
    useEffect(() => {
     setmounted(true)
    }, [])
      if(!mounted)return null
  return <Tabs  defaultValue={theme}>
    <TabsList >
        <TabsTrigger value="light" onClick={()=>setTheme("light")}>
        <SunIcon className='w-[1.75rem] h-[1.75rem]'/>
        </TabsTrigger>
        <TabsTrigger value="Dark" onClick={()=>setTheme("dark")}>
        <MoonIcon className='w-[1.75rem] h-[1.75rem] rotate-90 transition-all duration-150 dark:rotate-0'/>
        </TabsTrigger><TabsTrigger value="System" onClick={()=>setTheme("system")}>
        <LampDeskIcon className='w-[1.75rem] h-[1.75rem] '/>
        </TabsTrigger>
    </TabsList>
  </Tabs>
}

export default ThemeSwitcher