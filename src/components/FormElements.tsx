import { TextFeildFormat } from "./feilds/Textfeild"

export type ElementsType = "TextFeild"

export type FormElement={
    type:ElementsType ,
    construct:(id:string)=>FormElementInstance;
    designerBtnElement:{
        icon:React.ElementType,
        label: string,
      }
    designerComponents:React.FC<
    {elementInstance:FormElementInstance}
    >,
    PropertiesComponents:React.FC<
    {elementInstance:FormElementInstance}
    >,
    FormComponents:React.FC
}

type FormElementsType={
    [key in ElementsType]:FormElement
}

export type FormElementInstance={
    type:ElementsType,
    id:string,
    extraattributes?:Record<string,any>
}


export const FormElement:FormElementsType={
    TextFeild:TextFeildFormat,
}
