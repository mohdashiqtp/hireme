"use client"
import JobCard from "@/components/job-card";
import SeacrhBar from "@/components/searchbar";
import { useJobs } from "@/hooks/useJob";
import { useUser } from "@/hooks/useUser";
import { useState } from 'react'

import { Blocks } from 'react-loader-spinner'
export default  function HomePage() {

  const { jobs  , areJobsLoading} = useJobs();
  

  return (
    <div>
      <SeacrhBar />
      <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="left  col-span-1">
        <div className="p-5 shadow-sm felx text-start font-bold text-3xl text-black">
          <h1>Filters</h1>
        </div>
        <div className="p-5 shadow-sm">

          <h4 className="text-gray-500 font-semibold">Employment</h4>

          <div className="p-2 flex items-center">


            <input type="checkbox" id="example-checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />

            <label className="ml-2">Full time</label>
          </div>
          <div className="p-2 flex items-center">


            <input type="checkbox" id="example-checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />

            <label className="ml-2">Part Time</label>
          </div>
          <div className="p-2 flex items-center">


            <input type="checkbox" id="example-checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />

            <label className="ml-2">Internship</label>
          </div>
          <div className="p-2 flex items-center">


            <input type="checkbox" id="example-checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />

            <label className="ml-2">Project Based</label>
          </div>
          <div className="p-2 flex items-center">


            <input type="checkbox" id="example-checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />

            <label className="ml-2">Gig</label>
          </div>

        </div>
        <div className="p-5 shadow-sm">

          <h4 className="text-gray-500 font-semibold">Experience</h4>

          <div className="p-2 flex items-center">


            <input type="checkbox" id="example-checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />

            <label className="ml-2">Full time</label>
          </div>
          <div className="p-2 flex items-center">


            <input type="checkbox" id="example-checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />

            <label className="ml-2">Part Time</label>
          </div>
          <div className="p-2 flex items-center">


            <input type="checkbox" id="example-checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />

            <label className="ml-2">Internship</label>
          </div>
          <div className="p-2 flex items-center">


            <input type="checkbox" id="example-checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />

            <label className="ml-2">Project Based</label>
          </div>
          <div className="p-2 flex items-center">


            <input type="checkbox" id="example-checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />

            <label className="ml-2">Gig</label>
          </div>

        </div>
        <div>

        </div>

      </div>
      <div className=" col-span-3">
        {/* <div className="flex  p-5 shadow-sm text-start font-bold text-3xl text-black">
          <h2 className="">Results</h2>
          <span className="text-gray-500 ml-5">500+</span>
        </div> */}
        

          {
            areJobsLoading ? (
              <div className='flex flex-col items-center justify-center w-full h-[450px]'>
              <Blocks visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper" />
            <h1 className='text-gray-500'>Please wait Jobs are loading...</h1>
            </div>

            ) : (
              <div className="p-10 grid grid-cols-1 gap-10 md:grid-cols-3">
                {
  jobs.map((job) => (
    <JobCard key={job.id} job={job} />
  ))
}

              </div>
            )
          }

        

      </div>
    </div>
    </div>
  );
}
