"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "../hooks/Designerhooks";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {  LuHeading2 } from "react-icons/lu";

const type: ElementsType = "SubTitleField";
const extraattributes = {
  title: "SubTitle Field",
};

export const SubTitleFeildFormFormat: FormElement = {
  type,
  designerBtnElement: {
    icon: LuHeading2,
    label: "SubTitle Feild",
  },
  construct: (id: string) => ({
    id,
    type,
    extraattributes,
  }),
  validate: () => true,
  FormComponents: FormComponent,
  designerComponents: DesignerComponent,
  PropertiesComponents: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraattributes: typeof extraattributes;
};

const PropertiesComponentSchema = z.object({
  title: z.string().min(4).max(50),
});

type PropertiesComponentSchematype = z.infer<typeof PropertiesComponentSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const form = useForm<PropertiesComponentSchematype>({
    resolver: zodResolver(PropertiesComponentSchema),
    mode: "onBlur",
    defaultValues: {
      title: element.extraattributes.title,
    },
  });

  useEffect(() => {
    form.reset(element.extraattributes);
  }, [form, element]);

  function applyChanges(values: PropertiesComponentSchematype) {
    updateElement(element.id, {
      ...element,
      extraattributes: { ...values },
    });
  }

  return (
    <div>
      Properties for {element.extraattributes.title}
      <Form {...form}>
        <form
          onSubmit={(e) => e.preventDefault()}
          onBlur={form.handleSubmit(applyChanges)}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The Title of the field <br />
                  It will be displayed above the field.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  return (
    <div className="text-white flex flex-col gap-2 w-full">
      <Label>{element.extraattributes.title}</Label>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {

  const element = elementInstance as CustomInstance;
  return (
    <div className="text-white flex flex-col gap-2 w-full">
      <Label >
        {element.extraattributes.title}
      </Label>
      </div>
  );
}
