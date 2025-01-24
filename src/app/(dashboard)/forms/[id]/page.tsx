import React, {  ReactNode } from 'react';
import { GetFormByID, GetFormWithSubmissions } from '@/actions/form';
import VisitBtn from '@/components/VisitBtn';
import FormLinkShare from '@/components/FormLinkShare';
import { StatsCard } from '../../page';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbBounceLeft } from 'react-icons/tb';
import { ElementsType, FormElementInstance } from '@/components/FormElements';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistance } from 'date-fns';

async function page({ params }: { params: { id: string } }) {
  const { id } =await params; 
  const form = await GetFormByID(Number(id)); 
  const {visits,submissions}=form
  

const submissionsrate=visits>0?(submissions/visits)*100:0;
const bouncerate=100-submissionsrate
  
  
  return (<>
  <div className='py-10 border-b px-4 w-full border-muted'>
    <div className='flex justify-between container'>
        <h1 className='text-4xl font-bold truncate'>
          {form.name}
        </h1>
        <VisitBtn shareUrl={form.shareUrl} />
    </div>
    <div className='py-4 border-b border-muted'>
      <div className='container flex gap-2 items-center justify-between'>
        <FormLinkShare shareUrl={form.shareUrl} />
      </div>
    </div>
    <div className='w-full pt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
       <StatsCard 
          title="total visits"
          icon={<LuView color="text-blue-500" />}
          helperText="All Time form Visits"
          loading={false}
          value={visits.toLocaleString() || ""}
          className="shadow-md shadow-blue-700" 
          />
           <StatsCard 
          title="total Submissions"
          icon={<FaWpforms color="text-green-500" />}
          helperText="All Time form submissions"
          loading={false}
          value={submissions.toLocaleString() || ""}
          className="shadow-md shadow-green-700" 
          />
           <StatsCard 
          title="total submissions rate"
          icon={<HiCursorClick color="text-yellow-500" />}
          helperText="All Time submissiona rate"
          loading={false}
          value={submissionsrate.toLocaleString() + "%" || ""}
          className="shadow-md shadow-yellow-700" 
          />
           <StatsCard 
          title="total bounce rate"
          icon={<TbBounceLeft color="text-red-500" />}
          helperText="All Time bounce rate"
          loading={false}
          value={bouncerate.toLocaleString() + "%" || ""}
          className="shadow-md shadow-red-700" 
          />
    </div>
    <div className='container pt-10'>
        <SubmissionsTable id={form.id} />
    </div>
  </div>
  </>);
}

type rowstype={ [key:string]:string} & {submittedAt :Date}

async function SubmissionsTable({id}:{id:number}){
  const response=await GetFormWithSubmissions(id)
  if(!response)throw new Error("Form Not Found")
    const rows:rowstype[]=[]
      response.formsubmission.map((value)=>{
          const content=JSON.parse(value.content)
          rows.push({...content,
            submittedAt:value.createdAt
          })
      })
    const formElements=JSON.parse(response.content) as FormElementInstance[]

    const coloums:{
      id:string,
      label:string,
      type:ElementsType,
      required:boolean
    }[]=[]

    formElements.forEach((element)=>{
      switch(element.type){
        case "TextFeild" :
          coloums.push({
            id:element.id,
            label:element?.extraattributes?.label,
            type:element.type,
            required:element?.extraattributes?.required
          })
          break;
          default :
          break
      }
    })
return (
  <>
  <h1 className='text-3xl font-bold my-4'>Submissions</h1>
  <div className='rounded-md border'>
    <Table>
      <TableHeader>
      <TableRow>
        {coloums.map((el)=>{
          return(
            <TableHead key={el.id} className='uppercase'>{el.label}</TableHead>
          )
        })}
        <TableHead className='uppercase text-right text-muted'>Submitted At</TableHead>
      </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row,index)=>
          (
            <TableRow key={index}>
                {coloums.map((coloumn)=>(
                  <RowCell
                  key={coloumn.id}
                  value={row[coloumn.id]}
                  type={coloumn.type}/>
                ))}
                      <TableCell className='text-muted-foreground text-right'>
                        {
                          formatDistance(row.submittedAt,new Date(),{
                            addSuffix:true
                          })
                        }
                      </TableCell>
                          </TableRow>
          ))}
      </TableBody>
      </Table>
  </div>
  </>
)
}

function RowCell({type,value}:{type:ElementsType,value:string}){
let node:ReactNode =value
return <TableCell>{node}</TableCell>
}

export default page;
