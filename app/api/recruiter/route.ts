import { getClerkUserPrimaryEmail } from "@/lib/clerk";
import { createJob, findRecruiter } from "@/models/Jobs";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client'

export async function POST(
    req: Request,
    res: NextResponse
) {

    try{

        const body = await req.json();

    const { userId } = auth()

    const id: string = userId as string

    const authorEmail = await getClerkUserPrimaryEmail(id)

    const recruiter = await findRecruiter(authorEmail) as any

    if (!recruiter) {

        return new NextResponse("UnAuthorized Please Login as a recruiter or Crete a profile as Recruiter", { status: 401 })
    }

    if (authorEmail !== null) {


        const newJob = await createJob({
            title: body.title,
            experience: body.experience,
            employment: body.employment,
            salary: body.salary,
            description: body.description,
            company: body.company,
            companyProfile: body.companyProfile,
            resposibilties: body.responsibilities, // Corrected the property name
            location: body.location,
            recruiter: {

                connect :{

                    id : recruiter.id
                }
                
            },
            applications: {
                connect : {
                    clerkId : id
                }
            }, // You can provide user applications here if needed
        });

        console.log(newJob)


        if(newJob){

            return new NextResponse("Job Created" , { status : 200 })
        }

        // Handle the result of creating the job here
    } else {

        return new NextResponse("UnAuthorized", { status: 401 })

    }

    } catch (e){
        
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
              console.log(
                e,
                'There is a unique constraint violation, a new job cannot be created with this email'
              )
            }
          }
          throw e
    }
    
}
