import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='text-white flex flex-row bg-gradient-to-br from-blue-600 to-violet-900 '>
 <main className=' items-center py-5 w-[60%] h-[100vh] flex flex-col justify-around'>
 <div> <h2 className='font-bold  text-5xl'>Welcome to Form Builder</h2>
  <p className='-mr-12'>build amazing forms with drag and drop functionality <br /> published by pushing a single button easy to moniter and create...</p></div>
  <div>
    <h1 className='font-bold text-5xl text-muted-foreground'>BUILD SHARE MONITER</h1>
  </div>
  <div className='flex flex-row gap-14'>
    <p>All rights reserved</p>
    <span>Created by subhanshu jha</span>
    <p>Powered by nextjs15, clerk and postgresql </p>
  </div>
 </main>
 <main className=' items-center flex flex-col justify-center'>
  <SignIn />
 </main>
  </div>
}