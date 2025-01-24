"use client"
import { TextFeildFormat } from "./feilds/Textfeild"
import { TitleFeildFormat } from "./feilds/TitleFeild";

export type ElementsType = "TextFeild" | "TitleFeild"
export type SubmitFunctionType=(key:string,value:string)=>void
export type FormElement={
    type:ElementsType ,
    construct:(id:string)=>FormElementInstance;
    designerBtnElement:{
        icon:React.ElementType,
        label: string,
      },
    designerComponents:React.FC<
    {elementInstance:FormElementInstance}
    >,
    PropertiesComponents:React.FC<
    {elementInstance:FormElementInstance}
    >,
    FormComponents:React.FC<
    {elementInstance:FormElementInstance ,
        submitValue?:SubmitFunctionType,
        isValid?:boolean,
        defaultValue?:string
    }>,
    validate:(formElement:FormElementInstance,current:string)=>boolean

}

type FormElementsType={
    [key in ElementsType]:FormElement
}

export type FormElementInstance={
    type:ElementsType,
    id:string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extraattributes?:Record<string,any>
}


export const FormElement:FormElementsType={
    TextFeild:TextFeildFormat,
    TitleFeild:TitleFeildFormat
}
