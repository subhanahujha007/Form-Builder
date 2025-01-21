import React from 'react'
import { Button } from './ui/button'
import {MdOutlinePublish} from "react-icons/md"
const PublishBtn = () => {
  return (
    <Button variant={"outline"} className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-500'>Publish <MdOutlinePublish/></Button>
  )
}

export default PublishBtn