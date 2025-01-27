"use client"
import React from 'react'
import SidebarBtn from './SidebarBtn'
import { FormElement } from './FormElements'
import { Separator } from '@radix-ui/react-separator'

const Formselectedsidebarelement = () => {
  return (
    <div> 
      <p className='text-sm text-foreground/70'>Drag and drop elements</p>
      <Separator/>
    <div className='place-items-center grid sm:grid-cols-1 md:grid-col-2 gap-2'>
    <SidebarBtn formElement={FormElement.TextFeild}/> 
    <SidebarBtn formElement={FormElement.TitleFeild}/>
    <SidebarBtn formElement={FormElement.SubTitleField}/>
    </div>
    </div>
  )
}

export default Formselectedsidebarelement