import { GetFormContentByFormUrl } from '@/actions/form'
import { FormElementInstance } from '@/components/FormElements'
import FormSubmitComponent from '@/components/FormSubmitComponent'
import React from 'react'

async function Submitpage ({params}:{params:{formurl:string}}) {
const response=await GetFormContentByFormUrl(params.formurl) 
if(!response)throw new Error("form doesnt exists")

  const formcontent=JSON.parse(response.content) as FormElementInstance[]
  return <FormSubmitComponent content={formcontent} formUrl={params.formurl} />
}

export default Submitpage