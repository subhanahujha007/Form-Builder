"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import {Form, FormControl, FormField ,FormItem, FormLabel, FormMessage} from "./ui/form"
import {Input} from "./ui/input"
import {zodResolver} from "@hookform/resolvers/zod" 
import { Textarea } from './ui/textarea'
import { useToast } from "@/hooks/use-toast"
import { formschema, formschematype } from '../../schemas/form'
import { CreateForm } from '@/actions/form'
import {BsFileEarmarkPlus} from "react-icons/bs"
import { useRouter } from 'next/navigation'
import { ImSpinner2 } from 'react-icons/im'
function CreateFormButton (){
    const [loading,settransition]=useTransition()
    const { toast } = useToast()
   const router=useRouter();
    const form=useForm<formschematype>({
            resolver:zodResolver(formschema),
            defaultValues:{
                name:"",
                description:""
            }
        })

async function onsubmit(values:formschematype){
try {
   const response=await CreateForm(values);
   toast({title:"Form created",variant:"destructive",color:"green"})
   router.push(`/builder/${response}`)
} catch (error) {
    toast({
        title: `Error :${error} `,
        description: "Something went wrong",
        variant:"destructive"
    })
}}

  return (
   <Dialog >
    <DialogTrigger asChild>
        <Button
        variant={"outline"}
         className='group bg-background border:border/primary-20 
         h-[140px] items-center justify-center  flex flex-col
          hover:border-primary border-dashed gap-4'
        >
            <BsFileEarmarkPlus/>
            <span className='font-bold text-xs'>Create New Form</span>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create A New Form</DialogTitle>
            <DialogDescription>creating a new form for collecting data</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className='space-y-2'>
                    <FormField
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field}/> 
                                </FormControl>
                                <FormMessage/>
                        </FormItem>
                        
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="description"
                    render={({field})=>(
                        <FormItem>
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea rows={5} {...field} /> 
                                </FormControl>
                                <FormMessage/>
                        </FormItem>
                        
                    )}
                    />
                </form>
            </Form>
            <DialogFooter>
            <Button onClick={()=>settransition(form.handleSubmit(onsubmit))} className='mt-4 w-full'>
                Save {loading && <ImSpinner2 className='animate-spin' />}
            </Button>
        </DialogFooter>
        </DialogContent>
   </Dialog>
  )
}

export default CreateFormButton