import React from 'react';
import { GetFormByID } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';

async function page({ params }: { params: Promise<{ id: string }> }) {
  const  id  = (await params).id;  
  const form = await GetFormByID(Number(id));

  if (!form) throw new Error('Form not found');
  
  return <FormBuilder form={form} />;
}

export default page;
