"use client"
import React from 'react'
import { Button } from './ui/button'
import {MdPreview} from "react-icons/md"
import useDesigner from './hooks/Designerhooks'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { FormElement } from './FormElements'
const PreviewDialogBtn = () => {
  const {elements}=useDesigner()
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant={"outline"} className="gap-2">
        <MdPreview className="h-6 w-6" />
        Preview
      </Button>
    </DialogTrigger>
    <DialogTitle></DialogTitle>
    <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col p-0 gap-0">
      <div className="px-2 py-4 border-b">
        <p className="text-lg font-bold text-muted-foreground">Form Preview</p>
        <p className="text-sm text-muted-foreground">
          This is how your Form will look to the users.
        </p>
      </div>
      <div className="bg-accent overflow-y-auto flex bg-[url(/banner.svg)] dark:bg-[url(/banner.svg)] flex-col flex-grow items-center justify-center p-4">
        <div className="max-w-[680px] bg-background flex flex-col gap-4 flex-grow h-full w-full rounded-4xl p-8 overflow-y-auto">
          {elements.map((element) => {
            const FormComponent = FormElement[element.type].FormComponents;
            return <FormComponent elementInstance={element} key={element.id} />;
          })}
        </div>
      </div>
    </DialogContent>
  </Dialog>  
  )
}

export default PreviewDialogBtn