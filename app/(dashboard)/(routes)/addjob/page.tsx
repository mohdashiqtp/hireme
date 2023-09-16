"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Blocks } from 'react-loader-spinner';

function AddJob() {
  const router = useRouter()
  const [loading , setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    experience: '',
    employment: '',
    salary: '',
    description: '',
    company: '',
    companyProfile: '',
    responsibilities: '',
    location: '',
  });

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API

    setLoading(true)

    const result = await fetch('/api/recruiter', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
          // Add any other headers as needed
        },
  
        body: JSON.stringify(formData),
  
      })

      console.log(result)
      
    // if(result){
    //   // router.push("/dashboard")
    //   setLoading(false)
    // }
  };

  return (
    <div>
      {
        loading ? (
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
          <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Add Job</h1>
          <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full border rounded-lg p-2"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="experience" className="block text-gray-700 font-semibold mb-2">Experience</label>
              <input
                type="text"
                id="experience"
                name="experience"
                className="w-full border rounded-lg p-2"
                value={formData.experience}
                onChange={handleInputChange}
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="employment" className="block text-gray-700 font-semibold mb-2">Employment</label>
              <input
                type="text"
                id="employment"
                name="employment"
                className="w-full border rounded-lg p-2"
                value={formData.employment}
                onChange={handleInputChange}
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="salary" className="block text-gray-700 font-semibold mb-2">Salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                className="w-full border rounded-lg p-2"
                value={formData.salary}
                onChange={handleInputChange}
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full border rounded-lg p-2"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full border rounded-lg p-2"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="companyProfile" className="block text-gray-700 font-semibold mb-2">Company Profile</label>
              <input
                type="text"
                id="companyProfile"
                name="companyProfile"
                className="w-full border rounded-lg p-2"
                value={formData.companyProfile}
                onChange={handleInputChange}
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="responsibilities" className="block text-gray-700 font-semibold mb-2">Responsibilities</label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                className="w-full border rounded-lg p-2"
                value={formData.responsibilities}
                onChange={handleInputChange}
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full border rounded-lg p-2"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
    
            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
        )
      }
    </div>
   
  );
}

export default AddJob;
