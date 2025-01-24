import React from 'react'
import {ImSpinner2} from "react-icons/im"
const loading = () => {
  return (
    <div className='flex items-center animate-spin transition-all  justify-center w-full h-full'>
        <ImSpinner2/>
    </div>
  )
}

export default loading