"use server"
import {currentUser} from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma";
import { formschema, formschematype } from "../../schemas/form";
class UserNotFoundErr  extends Error{}
export async function getuser() {
    const user=await currentUser();
    if (!user) throw new UserNotFoundErr()
        const stats=await prisma.form.aggregate({
    where:{
        userID:user.id,
    },
    _sum:{
        visits:true,
        submissions:true
    }
})
const visits=stats._sum.visits || 0;
const submissions=stats._sum.submissions || 0;

const submissionsrate=visits>0?(submissions/visits)*100:0;
const bouncerate=100-submissionsrate

return {
    visits,submissions,submissionsrate,bouncerate
}

}

export async function CreateForm(props:formschematype){
    const validation=formschema.safeParse(props)
    if(!validation)throw new Error("wrong feilds entered")
    const user=await currentUser();
    if(!user)throw new UserNotFoundErr();
    const form=await prisma.form.create({
        data:{
            userID:user.id,
            name:props.name,
            description:props?.description || ""
        }
    })

    if(!form)throw new Error("Something went wrong")

    return form.id
}

export async function GetForms(){
const user=await currentUser();
if(!user) throw new UserNotFoundErr();

const response=await prisma.form.findMany({
    where:{
        userID:user.id
    },
    orderBy:{
        createdAt:"desc"
    }
})

return response
}

export async function GetFormByID(id:number){
const user=await currentUser();
if(!user) throw new UserNotFoundErr()

    const form=await prisma.form.findUnique({
        where:{
            id:id,
            userID:user.id
        }
    })
    if(!form) throw new Error("Form Not Found")

        return form
}