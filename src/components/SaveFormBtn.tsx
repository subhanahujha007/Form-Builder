import React, { useTransition } from 'react'
import { Button } from './ui/button'
import {HiSaveAs} from "react-icons/hi"
import useDesigner from './hooks/Designerhooks'
import { toast } from '@/hooks/use-toast'
import { FaSpinner } from 'react-icons/fa'
import { updateData } from '@/actions/form'
const SaveFormBtn = ({id}:{id:number}) => {
  const {elements}=useDesigner()
  const [loading,setTransition]=useTransition()
  async function updateDatafunction(){
    try {
      const JsonContent=JSON.stringify(elements)
      const response=await updateData(id,JsonContent)
      toast({
        title:"Saved Successfully",
        description:"Your Form Has Been Saved"
      })
    } catch (error) {
      toast({
        title:"Error",
        description:"Something went wrong",
        variant:"destructive"
      })
    }
  }
  return (
    <Button variant={"outline"} className='gap-2' onClick={()=>setTransition(updateDatafunction)} disabled={loading} >
      Save <HiSaveAs/>
      {loading && <FaSpinner className='animate-spin'/>}
      </Button>
  )
}

export default SaveFormBtn