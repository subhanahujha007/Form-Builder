import { GetFormContentByFormUrl } from '@/actions/form'
import { FormElementInstance } from '@/components/FormElements'
import {FormSubmitComponent} from '@/components/FormSubmitComponent'
import React from 'react'

async function Submitpage ({params}:{params:{formurl:string}}) {
  const {formurl}= params
const response=await GetFormContentByFormUrl(formurl) 
if(!response)throw new Error("form doesnt exists")

  const formcontent=JSON.parse(response.content) as FormElementInstance[]
  return <FormSubmitComponent formUrl={formurl} content={formcontent} />
}

export default Submitpage