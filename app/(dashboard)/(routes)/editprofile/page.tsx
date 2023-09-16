"use client"
import React, { useState } from 'react';
import { useRouter  } from 'next/navigation'
import { Blocks } from 'react-loader-spinner'
interface Skill {
  skillName: string;
}

interface Experience {
  company: string;
  duration: string;
  title: string;
  summary: string;
  startedDate: Date | null; // Change the type to string for date input
  endDate: Date | null;   // Change the type to string for date input
  description: string;

}

const EditProfile: React.FC = () => {
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // profilePic: null as File | null, // To store the selected profile picture
    name: '',
    jobTitle: '',
    mobile: '',
    email: '',
    skills: [{ skillName: '' } as Skill], // To store multiple skills
    aboutMe: '',
    experiences: [{ company: '', duration: '', title: '', summary: '', startedDate: new Date(0), endDate: new Date(0), description: '' } as Experience], // To store multiple work experiences
    // resume: null as File | null, // To store the uploaded resume
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, files } = e.target;
  //   setFormData({ ...formData, [name]: files?.[0] || null });
  // };

  const addSkillField = () => {
    setFormData({ ...formData, skills: [...formData.skills, { skillName: '' }] });
  };

  const addExperienceField = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { company: '', duration: '', title: '', summary: '', startedDate: new Date(0) , endDate: new Date(0), description: '' },
      ],
    });
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSkills = [...formData.skills];
    newSkills[index].skillName = e.target.value;
    setFormData({ ...formData, skills: newSkills });
  };

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newExperiences = [...formData.experiences];
    const { name, value } = e.target;
  
    if (name === 'startedDate' || name === 'endDate') {

      // Convert value to ISO 8601 format
    const isoDate = value ? new Date(value).toISOString() : null as any;
    newExperiences[index][name as keyof Experience] = isoDate;


    } else {
      newExperiences[index][name as keyof Experience] = value as any;
    }
  
    setFormData({ ...formData, experiences: newExperiences });
  };
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true)

    const result = await fetch('/api/user', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
        // Add any other headers as needed
      },

      body: JSON.stringify(formData),

    })
    
    if(result){
      router.push('/dashboard')
      
      setIsLoading(false)
    }

  };


  return (
    <div>
      {
        isloading ? (
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
          <div className="max-w-4xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-semibold mb-4">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
        {/* Profile Picture Upload */}
        <div className="mb-4">
          {/* <label htmlFor="profile-pic" className="block text-gray-700 font-semibold mb-2">Profile Picture</label>
          <input
            type="file"
            id="profile-pic"
            name="profilePic"
            className="w-full border rounded-lg p-2"
            accept="image/*"
            onChange={handleFileChange}
          />
          {formData.profilePic && (
            <img
              src={URL.createObjectURL(formData.profilePic)}
              alt="Profile Preview"
              className="mt-2"
              style={{ maxWidth: '200px' }}
            />
          )} */}
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border rounded-lg p-2"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <label htmlFor="job-title" className="block text-gray-700 font-semibold mb-2">Job Title</label>
          <input
            type="text"
            id="job-title"
            name="jobTitle"
            className="w-full border rounded-lg p-2"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />
        </div>

        {/* Contact */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Contact</label>
          <div className="mb-2">
            <label htmlFor="mobile" className="block text-gray-700 font-medium">Mobile</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              className="w-full border rounded-lg p-2"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded-lg p-2"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Skills</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`skills[${index}].name`}
                className="w-full border rounded-lg p-2"
                placeholder="Skill"
                value={skill.skillName}
                onChange={(e) => handleSkillChange(e, index)}
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
            onClick={addSkillField}
          >
            Add Skill
          </button>
        </div>

        {/* About Me */}
        <div className="mb-4">
          <label htmlFor="aboutMe" className="block text-gray-700 font-semibold mb-2">About Me</label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            rows={4}
            className="w-full border rounded-lg p-2"
            value={formData.aboutMe}
            onChange={handleInputChange}
          />
        </div>

        {/* Work Experience */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Work Experience</label>
          {formData.experiences.map((experience, index) => (
            <div key={index} className="space-y-2 mb-2">
              <div>
                <label htmlFor={`company${index}`} className="block text-gray-700 font-medium">Company</label>
                <input
                  type="text"
                  id={`company${index}`}
                  name="company"
                  className="w-full border rounded-lg p-2"
                  value={experience.company}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
              <div>
                <label htmlFor={`duration${index}`} className="block text-gray-700 font-medium">Duration</label>
                <input
                  type="text"
                  id={`duration${index}`}
                  name="duration"
                  className="w-full border rounded-lg p-2"
                  value={experience.duration}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
              <div>
                <label htmlFor={`title${index}`} className="block text-gray-700 font-medium">Job Title</label>
                <input
                  type="text"
                  id={`title${index}`}
                  name="title"
                  className="w-full border rounded-lg p-2"
                  value={experience.title}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
              <div>
                <label htmlFor={`summary${index}`} className="block text-gray-700 font-medium">Summary</label>
                <textarea
                  id={`summary${index}`}
                  name="summary"
                  rows={3}
                  className="w-full border rounded-lg p-2"
                  value={experience.summary}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
              <div>
                <label htmlFor={`summary${index}`} className="block text-gray-700 font-medium">Description</label>
                <textarea
                  id={`summary${index}`}
                  name="description"
                  rows={3}
                  className="w-full border rounded-lg p-2"
                  value={experience.description}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
              <div>
                <label htmlFor={`startDate${index}`} className="block text-gray-700 font-medium">end Date</label>
                <input
                  type="date"
                  id={`startedDate${index}`}
                  name="startedDate"
                  className="w-full border rounded-lg p-2"
                  value={experience.startedDate ? experience.startedDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
              <div>
                <label htmlFor={`endDate${index}`} className="block text-gray-700 font-medium">Start Date</label>
                <input
                  type="date"
                  id={`endDate${index}`}
                  name="endDate"
                  className="w-full border rounded-lg p-2"
                  value={experience.endDate ? experience.endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
            onClick={addExperienceField}
          >
            Add Experience
          </button>
        </div>

        {/* Resume Upload */}
        {/* <div className="mb-4">
          <label htmlFor="resume" className="block text-gray-700 font-semibold mb-2">Upload Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            className="w-full border rounded-lg p-2"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div> */}

        {/* Save Changes Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
        )
      }
    </div>
  );
};

export default EditProfile;
