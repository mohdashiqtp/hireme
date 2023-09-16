import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next'
import { createUser, getExpereice, getSkills, getUser } from "@/models/User";
import path from "path";
import { writeFile } from "fs/promises";
import formidable from "formidable";
import fs from 'fs/promises'
import { getClerkUserPrimaryEmail } from "@/lib/clerk";
import { get } from "http";



export async function GET(
    req: Request,
    res: NextApiResponse
) {

    try {



        const { userId } = auth();

        const id: string = userId as string

        const userDetails = await getUser(id)

        const userIds : string = userDetails?.id as string

        const userExperience = await getExpereice(userIds)

        const userSkills = await getSkills(userIds)

        if(!userDetails){

            return new NextResponse("No user Found" , { status : 200 })

        } else {

            // sending the user user details
        }

        if(userId){

            const userData = {
                userDetails,
                userExperience,
                userSkills
            }

            return NextResponse.json(userData)
        }


    } catch (error) {

        console.log('[CODE_ERROR]', error);

        return new NextResponse("Internal Error", { status: 500 });

    }
}

// const readfile = (req : NextApiRequest ,saveLocally? : boolean): Promise<{fields : formidable.Fields; files : formidable.Files}> => {
//     const options : formidable.Options = {};
//     if(saveLocally){
//         options.uploadDir = path.join(process.cwd() , '/public/uploads')
//         options.filename = (name , ext , path , form) => {
//             return Date.now().toString() + "_" + path.originalFilename ;
//         }
//     }
//     const form = formidable()
//     return new Promise((resolve , reject) => {
//         form.parse(req, (err , fields , files) => {
//             if(err) reject(err)
//             resolve({fields , files})
//         })
//     })
// }



export async function POST(
    req: any,
    res: NextResponse
) {

    try {
        const body = await req.json();

        const skils = body.skills

        const exp = body.experiences

        const { userId } = auth()

        

        if (!userId) {

            return new NextResponse("Unauthorized", { status: 401 })

        }

        const newUser = await createUser({
            email: body.email,
            name: body.name,
            about: body.aboutMe,
            phone: body.mobile,
            clerkId : userId,
            skills: {
                create: [
                    ...skils
                ]
            },

            experiences: {
                create: [
                    ...exp
                ]
            },
        })

        
        if (!newUser) {

            return new NextResponse("failed to add User Please try again", { status: 400 })
        }

        if(newUser){

            return new NextResponse("User created" , { status : 200 })

        }

    } catch (error) {

        console.log('[CODE_ERROR]', error);

        return new NextResponse("Internal Error", { status: 500 });

    }

}
