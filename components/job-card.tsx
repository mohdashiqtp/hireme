"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, FileWarning, Terminal } from "lucide-react"
import Image from 'next/image'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { ToastAction } from "@/components/ui/toast"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import type { Job } from "../types";
import { useUser } from "@/hooks/useUser"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"



type JobCardProps = {
  job : Job
}

const JobCard = ({
  job
}:JobCardProps) => {

  interface data  {
    job : {
    },
    user : {},

  }
  const { userbasic } = useUser();

  const { toast } = useToast()
  
  const [showerrorAlert, setShowAlert] = useState(false);
  const [succes , setSeccess] = useState(false)

  const applicationData : data = {
    job : {
      ...job
    },
    user :{
      ...userbasic
    },


  }

  const handleSubmit = async (data: any) => {
  
      const res = await fetch('/api/applyjob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (res.status === 200) {
        // Status is 200, so display an alerttoast
        ({
          title: "Application Sent .",
          description: "Application sent succefully please check applications to track.",
        })


      }
      if (res.status === 400) {
        // Status is 200, so display an alert
        toast({
          variant: "destructive",
          title: "Uh oh! Already Applied .",
          description: "it seems already applied for this position.",
          action: <ToastAction altText="Try again">Check Application</ToastAction>,
        })
        
        setShowAlert(true)
      }
      console.log(res)
    
  };
  
  
  return (
    <Card className="w-[300px]">
      
      <CardHeader>
        <div className="flex items-center text-center  text-gray-500 font-semibold">
          <Image src={job.companyProfile} alt="company" width={30} height={30} />
          <h2 className="ml-5">{job.company}</h2>
        </div>
        <CardTitle className="mt-2" >{job.title}</CardTitle>
        <CardDescription>{job.description}.</CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter className="flex  justify-between">
        <Sheet  >
          <SheetTrigger asChild>
            <Button variant="outline">View Job</Button>
          </SheetTrigger>
          <SheetContent className="w-[600px]">
            <SheetHeader>
              <SheetTitle>Job Details</SheetTitle>
              <SheetDescription>
                {job.title}
              </SheetDescription>
            </SheetHeader>
            <div className="">
              <p>Location : {job.location}</p>
              <p>Experience : {job.employment}</p>
              <p>Responsibilities:{job.resposibilties} </p>
              <p>Salary : {job.salary}</p>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Button onClick={handleSubmit}>Apply</Button>
      </CardFooter>
    </Card>
  );
}

export default JobCard;