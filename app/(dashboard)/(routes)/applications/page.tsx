"use client"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { useState , useEffect } from "react"
import { Blocks } from 'react-loader-spinner'

type Applications = {
    title : string,
    company : string,
    description : string,
    companyProfile : string
}

export default function Application() {

    const [applications , setAppications] = useState<Applications[]>([])
    const [isLoading , setIsLoading] = useState(false)

    

    useEffect(() => {
        const retrievePosts = async function () {
          setIsLoading(true);
          try {
    
    
            const applications = (await (await fetch(`/api/getapplications`)).json()) as Applications[];

            console.log(applications)
    
    
            setAppications(applications);
          } catch (err: any) {
            console.log(err);
          } finally {
            setIsLoading(false);
          }
        };
    
        retrievePosts();
      }, []);
    


    return (
        <div>
            {
                isLoading ? (
                    <div className='flex flex-col items-center justify-center w-full h-[450px]'>
            <Blocks visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper" />
          <h1 className='text-gray-500'>Please wait while we build dashboard for you...</h1>
          </div>
                ) : (
                    <div>
                        <div className="flex text-3xl font-bold text-start  h-[70px] items-center pl-[10px]">
                <h1>Applications</h1>
            </div>
            <div className="p-[30px] hover:shadow-sm hover:cursor-pointer ">
                {
                    applications.map((app) => (
                        <Card>
                    <CardHeader>
                        <Image src={app.companyProfile}  alt="logo" width={30} height={30}/>
                        <CardTitle>{app.company}</CardTitle>
                        <CardDescription>{app.title}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex">
                        <p>{app.description}</p>
                    </CardFooter>
                </Card>
                    ))
                }
            </div>
                    </div>
                )
            }
            

        </div>
    )
}