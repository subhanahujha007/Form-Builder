import {GetForms, getuser} from "@/actions/form"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode, Suspense } from "react";
import {LuView} from "react-icons/lu"
import {FaEdit, FaWpforms} from "react-icons/fa"
import {HiCursorClick} from "react-icons/hi"
import {TbBounceLeft} from "react-icons/tb"
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/CreateFormButton";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import {BiRightArrowAlt} from "react-icons/bi"
import { Button } from "@/components/ui/button";
import Link from "next/link";
function DashboardPage() {
    return (
        <main className="container px-2">
           <Suspense fallback={<StatsCards loading={true}/>}>
            <CardStatsWrapper  />
           </Suspense>
           <Separator className="my-6"/>
            <h2 className="cols-span-2 font-bold text-3xl">Your Forms</h2>
           <Separator className="my-6"/>
           <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <CreateFormButton/>  
           <Suspense fallback={[1,2,3,4].map((el)=><Formcardskeleton key={el} />)}>
            <FormCards/>
            </Suspense>   
           </div>      
        </main>
    );
}

async function CardStatsWrapper(){
  const stats=await getuser();
  return <StatsCards loading={false} data={stats} />
}

interface Statcardsinterface{
loading:boolean,
data?:Awaited<ReturnType <typeof getuser>>
}

function StatsCards(props:Statcardsinterface){
  const {data,loading}=props
return (
  <div className="w-full pt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    <StatsCard 
    title="total visits"
    icon={<LuView color="text-blue-500" />}
    helperText="All Time form Visits"
    loading={loading}
    value={data?.visits.toLocaleString() || ""}
    className="shadow-md shadow-blue-700" 
    />
     <StatsCard 
    title="total Submissions"
    icon={<FaWpforms color="text-green-500" />}
    helperText="All Time form submissions"
    loading={loading}
    value={data?.visits.toLocaleString() || ""}
    className="shadow-md shadow-green-700" 
    />
     <StatsCard 
    title="total submissions rate"
    icon={<HiCursorClick color="text-yellow-500" />}
    helperText="All Time submissiona rate"
    loading={loading}
    value={data?.visits.toLocaleString() + "%" || ""}
    className="shadow-md shadow-yellow-700" 
    />
     <StatsCard 
    title="total bounce rate"
    icon={<TbBounceLeft color="text-red-500" />}
    helperText="All Time bounce rate"
    loading={loading}
    value={data?.visits.toLocaleString() + "%" || ""}
    className="shadow-md shadow-red-700" 
    />
  </div>
)
}

function StatsCard({title,icon,helperText,loading,value,className}:{
  title:string,icon:ReactNode,loading:boolean,value:string,helperText:string,className:string
}){

  return(
   <Card  className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle>{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
<div className="text-2xl font-bold">
{loading && <Skeleton> <span className="opacity-0">0</span> </Skeleton>}
{!loading && value}
</div>
<p className="text-xs pt-1">{helperText}</p>
    </CardContent>
   </Card>
  )
}

function Formcardskeleton(){
  return <Skeleton className="border-2 border-primary-/20 h-[140px] "></Skeleton>
}

async function FormCards(){
  const forms=await GetForms()
  return(
    <>
    {
      forms.map((form)=>(
        <FormCard key={form.id} form={form}/>
      ))
    }
    </>
  )
}

function FormCard({form}:{form:Form}){

  return(<Card>
    <CardHeader>
      <CardTitle className="flex items-center justify-between gap-2">
       <span className="truncate font-bols">{form.name}</span> 
       {form.published && <Badge>Published</Badge>}
       {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
      </CardTitle>
      <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
        {formatDistance(form.createdAt,new Date(),{
          addSuffix:true
        })}
        {form.published && (
          <span className="flex items-start gap-2">
            <LuView className="text-muted-foreground"/>
            <span>{form.visits.toLocaleString() || 0}</span>
          
          <FaWpforms className="text-muted-foreground"/>
          <span>{form.submissions.toLocaleString() || 0}</span>
        </span>
        )}
      </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground truncate h-[20px]">
      {form.description || "No Description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full text-md mt-2 gap-4">
            <Link href={`/forms/${form.id}`}>
            Veiw Form Submissions <BiRightArrowAlt/>
            </Link>
          </Button>
        )}
         {!form.published && (
          <Button asChild variant="secondary" className="w-full text-md mt-2 gap-4">
            <Link href={`/builder/${form.id}`}>
            Edit Form <FaEdit/>
            </Link>
          </Button>
        )}
      </CardFooter>
    
  </Card>)
}

export default DashboardPage