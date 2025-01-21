import React from 'react'
import { Button } from './ui/button'
import {MdPreview} from "react-icons/md"
const PreviewDialogBtn = () => {
  return (
    <Button variant={"outline"} className='gap-2'>Preview <MdPreview/></Button>
  )
}

export default PreviewDialogBtn