"use client"

import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import {MdTextFields} from "react-icons/md"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Span } from "next/dist/trace"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "../hooks/Designerhooks"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Switch } from "../ui/switch"
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

FormComponents:FormComponent,
designerComponents:DesignerComponenet,
PropertiesComponents:PropertiesComponent
}

type CustomInstance = FormElementInstance & {
  extraattributes:typeof extraattributes
}
const PropertiesComponentSchema=z.object({
label:z.string().min(4).max(50),
helperText:z.string().max(50),
placeholder:z.string().max(150),
required:z.boolean().default(false),
})

type PropertiesComponentSchematype=z.infer<typeof PropertiesComponentSchema>
function PropertiesComponent({elementInstance}:{elementInstance:FormElementInstance}){
  const element=elementInstance as CustomInstance
  const {updateElement}=useDesigner()
  const form=useForm<PropertiesComponentSchematype>({
    resolver:zodResolver(PropertiesComponentSchema),
    mode:"onBlur",
    defaultValues:{
      label:element.extraattributes.label,
      required:element.extraattributes.required,
      helperText:element.extraattributes.helperText,
      placeholder:element.extraattributes.placeholder
    }
  }
  )

  useEffect(() => {
   form.reset(element.extraattributes)
  }, [form,element])
  
  function applyChanges(values:PropertiesComponentSchematype){
    updateElement(element.id,{
      ...element,
      extraattributes:{...values}
    })
  } 
  return(
    <div>
      Properties for {element.extraattributes.helperText}
      <Form {...form}>
        <form onSubmit={(e)=>{e.preventDefault()}} onBlur={form.handleSubmit(applyChanges)} className="space-y-3">
          <FormField
          control={form.control}
          name="label"
          render={({field})=>(
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} 
                onKeyDown={(e)=>{
                 if( e.key==="Enter")e.currentTarget.blur()
                }}/>
              </FormControl>
              <FormDescription>
                The Label of the Feild <br />It will be Displayed Above the Field
              </FormDescription>
              <FormMessage/>
              </FormItem>
          )}
          />

<FormField
          control={form.control}
          name="placeholder"
          render={({field})=>(
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input {...field} 
                onKeyDown={(e)=>{
                 if( e.key==="Enter")e.currentTarget.blur()
                }}/>
              </FormControl>
              <FormDescription>
                The Placeholder of the Feild <br />It will be Displayed Above the Field
              </FormDescription>
              <FormMessage/>
              </FormItem>
          )}
          />

<FormField
          control={form.control}
          name="helperText"
          render={({field})=>(
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} 
                onKeyDown={(e)=>{
                 if( e.key==="Enter")e.currentTarget.blur()
                }}/>
              </FormControl>
              <FormDescription>
                The HelperText of the Feild <br />It will be Displayed Above the Field
              </FormDescription>
              <FormMessage/>
              </FormItem>
          )}
          />

<FormField
          control={form.control}
          name="required"
          render={({field})=>(
            <FormItem className="flex items-center justify-between rounded-lg shadow-sm p-3 border">
             <div className="space-y-3"> <FormLabel>Required</FormLabel>

              <FormDescription>
                Is this Field Required
              </FormDescription></div>

              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage/>
              </FormItem>
          )}
          />
        </form>
      </Form>
    </div>
  )
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


function FormComponent({elementInstance}:{elementInstance:FormElementInstance}){
  const element=elementInstance as CustomInstance
  return <div className="text-white flex flex-col gap-2 w-full"> 
  <Label>
  {element?.extraattributes?.label}
  {element?.extraattributes?.required && "*"}
  </Label>
  <Input  placeholder={element?.extraattributes?.placeholder}/>
  {element?.extraattributes?.helperText  && <span className="text-muted-foreground text-[0.8rem]">{elementInstance?.extraattributes?.helperText}</span>}
  </div> 
}