import { PrismaClient } from "@prisma/client";

const PrismaClientSingleton=()=>{
return new PrismaClient()
}
type PrismaClientSingleton=ReturnType<typeof PrismaClientSingleton>

const globalforprisma=globalThis as unknown as{
prisma:PrismaClientSingleton | undefined
}

const prisma=globalforprisma.prisma  ?? PrismaClientSingleton()

export default prisma

if(process.env.NODE_ENV!="production") globalforprisma.prisma=prisma