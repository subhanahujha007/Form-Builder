import React from 'react';
import { GetFormByID } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';
type tparams=Promise<{slug:string}>
async function page( props : { params:  tparams }) {
  const slug = await props.params
  const form = await GetFormByID(Number(slug));

  if (!form) throw new Error('Form not found');
  
  return <FormBuilder form={form} />;
}

export default page;
