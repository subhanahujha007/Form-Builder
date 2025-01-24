"use client";
import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElement, FormElementInstance } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "@/hooks/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";

export function FormSubmitComponent({ formUrl, content }: { formUrl: string; content: FormElementInstance[] }) {
  const FormValues = useRef<{ [key: string]: string }>({});
  const [FormErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
  const [submitted,setsubmitform]=useState(false)
  const [pending,setTransition]=useTransition()
  const validateform = useCallback((): boolean => {
    const errors: { [key: string]: boolean } = {};

    for (const field of content) {
      const actualValue = FormValues.current[field.id] || "";
      const valid = FormElement[field.type]?.validate(field, actualValue);

      if (!valid) {
        errors[field.id] = true;
      }
    }

    setFormErrors(errors); 
    return Object.keys(errors).length === 0; 
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    FormValues.current[key] = value; 
  }, []);

  async function submitForm  ()  {
    const isValid = validateform(); 

    if (!isValid) {
      toast({
        title: "Error submitting the form",
        description: "Please fill in all fields correctly.",
      });
      return;
    }



    try {
      const JsonContent=JSON.stringify(FormValues.current)
      await SubmitForm(formUrl,JsonContent)
      setsubmitform(true)
      toast({
        title: "Form submitted successfully!",
        description: "Your data has been submitted.",
      });
    } catch (error) {
      toast({
        title: "Somthing went wrong",
        description: "Internal server error.",
      });
    }

    console.log("Form submitted with values:", FormValues.current);
  };

  if(submitted){
    return (
      <div className="flex flex-col justify-center items-center w-full h-full p-8">
          <div className="max-w-[680px] bg-background shadow-blue-900 flex flex-col gap-4 flex-grow  w-full border shadow-xl rounded-4xl p-8 overflow-y-auto"
          >
              <h1 className="text-bold text-4xl">Form Submitted</h1>
              <h3 className="text-2xl font-md">thank you for submitting you responses</h3>
          </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center p-8 items-center w-full h-full">
      <div
        className="max-w-[680px] bg-background shadow-blue-900 flex flex-col gap-4 flex-grow h-full w-full border shadow-xl rounded-4xl p-8 overflow-y-auto"
      >
        {content.map((element) => {
          const FormComponents = FormElement[element.type]?.FormComponents;
          if (!FormComponents)
            return (
              <div key={element.id}>
                <h2>No such element</h2>
              </div>
            );

          return (
            <FormComponents
              key={element.id}
              isValid={!FormErrors[element.id]} 
              elementInstance={element}
              submitValue={submitValue}
              defaultValue={FormValues.current[element.id] || ""} 
            />
          );
        })}
        <Button disabled={pending} onClick={()=>{setTransition(submitForm)}}>
         <>Submit
         {!pending && <HiCursorClick className="mr-2" />}
         {pending && <ImSpinner2 className="animate-spin" />}
         </> 
        </Button>
      </div>
    </div>
  );
}
