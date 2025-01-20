"use server"
import {currentUser} from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma";
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