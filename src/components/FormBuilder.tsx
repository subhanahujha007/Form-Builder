import React from 'react'
import { Form } from '@prisma/client'
import PreviewDialogBtn from './PreviewDialogBtn'
import SaveFormBtn from './SaveFormBtn'
import PublishBtn from './PublishBtn'
const FormBuilder = ({form}:{form:Form}) => {
  return (
    <div className='flex flex-col w-full'>
        <div className='flex justify-between border-b-2 p-4 gap-3 items-center'>
            <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form:</span>
            {form.name}
            </h2>
            <div className='flex items-center gap-2'>
                <PreviewDialogBtn/>
                {
                    !form.published && (
                        <>
                        <SaveFormBtn/>
                        <PublishBtn/>
                        </>
                    )
                }
            </div>
        </div>

    </div>
  )
}

export default FormBuilder