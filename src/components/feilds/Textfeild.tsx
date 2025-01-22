"use client"

import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import {MdTextFields} from "react-icons/md"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Span } from "next/dist/trace"
const type:ElementsType="TextFeild"
const  extraattributes={
  helperText:"Text feild",
  label:"Enter the text",
  required:false,
  placeholder:"enter here"
}
export const TextFeildFormat:FormElement={
type,
designerBtnElement:{
icon:MdTextFields,
label:"Text Feild",
},

construct:(id:string)=>({
  id,
  type,
  extraattributes
})
,

FormComponents:()=><div>Form Components</div>,
designerComponents:DesignerComponenet,
PropertiesComponents:()=><div>Properties Components</div>
}

type CustomInstance = FormElementInstance & {
  extraattributes:typeof extraattributes
}


function DesignerComponenet({elementInstance}:{elementInstance:FormElementInstance}){
  const element=elementInstance as CustomInstance
  return <div className="text-white flex flex-col gap-2 w-full"> 
  <Label>
  {elementInstance?.extraattributes?.label}
  {elementInstance?.extraattributes?.required && "*"}
  </Label>
  <Input readOnly disabled placeholder={elementInstance?.extraattributes?.placeholder}/>
  {elementInstance?.extraattributes?.helperText  && <span className="text-muted-foreground text-[0.8rem]">{elementInstance?.extraattributes?.helperText}</span>}
  </div> 
}