import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getJobs } from "@/models/Jobs";
import { NextApiResponse } from 'next'



export async function GET(
  req: Request,
  res : NextApiResponse
) {
  try {

    const { userId } = auth()

    const jobs = await getJobs();

    if(!userId){

        return new NextResponse("Unauthorized" , {  status : 401 })

    }

    if(!jobs){

        return new NextResponse("No jobs Found" , { status : 400 })

    }

    return  NextResponse.json(jobs)


  } catch (error) {

    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
    
  }
};

export async function POST
(
  req : Request,
  res : NextResponse
){
  try{

    

  } catch(error){
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}