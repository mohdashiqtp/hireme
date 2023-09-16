import { NextResponse } from "next/server";
// import * as nodemailer from 'nodemailer'
import { auth } from '@clerk/nextjs'
import type { Prisma } from "../../../types"
import prisma from "../../../lib/prismadb";


export async function POST(req: Request, res: NextResponse) {

    try {

        const body = await req.json()

        // save to user application section

        const id: string = body.user.userDetails.clerkId as any

        const applications = await prisma.job.findMany({
            where : {
                applications : {
                    clerkId : id
                }
            },
        })

        var isapplied : boolean = false


        if(applications.length > 0){

            applications.map((application) => {

                console.log(application.id)
                console.log(body.job.id)

                if(application.id.trim() === body.job.id.trim()){
                    
                   isapplied = true

                } 
            } )
        }

        if(isapplied){

            return new NextResponse('Allready applied' , { status : 400 })
        }


        const updatedUser = await prisma.job.update({
            where: {
                id: body.job.id
            },
            data: {
                applications: {
                    connect :{
                        clerkId : body.user.userDetails.clerkId
                    }
                }
            }
        })

        if(!updatedUser){

            return new NextResponse("failed to apply" , { status : 400 })

        } else {
            
        return new NextResponse('Application sented succefullt' ,  { status : 200 })
        
        }



        // sending Email that to Recruiter 

        // if (!body) {
        //     return new NextResponse('Please fill out the necessary fields', { status: 400 })
        // }

        // const mailData = {
        //     from: fromemail,
        //     to: toemail,
        //     subject: `Hire Me Apply ${body.user.userDetails.name}`,
        //     text: `${body.user.userDetails} has applied for your job ${body.job} | Sent from: ${fromemail}`,
        //     html: `<div>${body.user.userDetails}</div><p>Sent from: ${fromemail}</p>`,
        // };

        // console.log(mailData)

        // const transporter = nodemailer.createTransport({
        //     host: 'smtp-relay.brevo.com',
        //     port: 587,
        //     auth: {
        //         user: 'ashuqmuhammed79@gmail.com', // The account you signed up with SendinBlue
        //         pass: process.env.SMTP_PASS,
        //     },
        //     secure: false,
        // });

        // console.log(transporter)


        // const result = await new Promise((resolve, reject) => {
        //     transporter.sendMail(mailData, (err: Error | null, info: any) => {
        //         if (err) {
        //             reject(err);
        //             return new NextResponse("Cannot send Email", { status: 401 })
        //         } else {
        //             resolve(info.accepted);
        //             return new NextResponse("Email sented Succefully", { status: 200 })
        //         }
        //     });
        // });

        // console.log(result)




    } catch (err) {

        return new NextResponse("Internal error", { status: 500 })
    }

}