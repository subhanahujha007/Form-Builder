import React from 'react'
import { FormElement } from './FormElements'
import SidebarBtn from "./SidebarBtn"
import useDesigner from './hooks/Designerhooks'
import PropertiesFormSidebar from './PropertiesFormSidebar'
const DesignerSidebar = () => {
  const {selectedElement}=useDesigner()
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-grow flex-col
    bg-background p-4 gap-2 border-l-2 border-muted h-full overflow-y-auto'>
{!selectedElement && <SidebarBtn formElement={FormElement.TextFeild}/> }
{selectedElement && <PropertiesFormSidebar /> }
    </aside>
  )
}

export default DesignerSidebar