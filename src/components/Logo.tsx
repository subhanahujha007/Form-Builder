import React from 'react'
import Link from 'next/link'
const Logo = () => {
  return (
    <div>
       <Link href={"/"}
       className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-transparent bg-clip-text hover:cursor-pointer"
       >Form Builder</Link></div>
  )
}

export default Logo