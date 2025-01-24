import React from 'react'
import { FormElement, FormElementInstance } from './FormElements'

const FormSubmitComponent = ({formUrl,content}:{formUrl:string,content:FormElementInstance[]}) => {
  return (
    <div className='flex justify-center items-center w-full h-full'>
    <div className="max-w-[680px] bg-background shadow-blue-900 flex flex-col gap-4 flex-grow h-full w-full rounded-4xl p-8 overflow-y-auto">
              {content.map((element) => {
                const FormComponent = FormElement[element.type].FormComponents;
                return <FormComponent elementInstance={element} key={element.id} />;
              })}
            </div>
            </div>
  )
}

export default FormSubmitComponent