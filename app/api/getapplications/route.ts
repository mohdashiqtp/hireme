import { getUser } from '@/models/User'
import { auth } from '@clerk/nextjs'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import type { Prisma } from "../../../types"
import prisma from "../../../lib/prismadb";

export async function GET
(
    req : Request,
    res : NextResponse
)
{
    const { userId } = auth()

    if(!userId){
        return new NextResponse("UnAuthorized" ,{ status : 401 })
    }


    const id : string = userId as string

    const userDetails = await getUser(id)

    if(!userDetails){

        return new NextResponse("No user found" , { status : 404 })
    }

    const applications = await prisma.job.findMany({
        where : {
            applications : {
                clerkId : userDetails?.clerkId
            }
        }
    })

    console.log(applications)

    if(applications){

        return NextResponse.json(applications)

    } else {

        return new NextResponse("User has no Job application" , { status : 404 })

    }

    
}
