import React from 'react'
import { FormElement } from './FormElements'
import SidebarBtn from "./SidebarBtn"
const DesignerSidebar = () => {
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-grow flex-col
    bg-background p-4 gap-2 border-l-2 border-muted h-full overflow-y-auto'>
            <SidebarBtn formElement={FormElement.TextFeild}/> 
    </aside>
  )
}

export default DesignerSidebar