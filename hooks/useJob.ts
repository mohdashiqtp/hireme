"use client"
import { useEffect, useState } from "react";
import type { Job , Prisma, User } from "../types";

export function useJobs() {
  const [areJobsLoading, setAreJobsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsRetrievalError, setJobsRetrievalError] = useState(null);

  /** Example of how to properly retrieve posts. */
  useEffect(() => {
    const retrievePosts = async function () {
      setAreJobsLoading(true);
      try {


        const job = (await (await fetch(`/api/jobs`)).json()) as Job[];


        setJobs(job);
      } catch (err: any) {
        alert(err)
        setJobsRetrievalError(err);
      } finally {
        setAreJobsLoading(false);
      }
    };

    retrievePosts();
  }, []);

  /** Example of how to update a single job updation only done the recruiter only. */
  const updateJobs = async function (
    jobId: string,
    job: Prisma.JobUpdateInput
  ) {
    try {
      const response = await fetch(`/api/posts/${jobId}`, {
        method: "PUT",
        body: JSON.stringify(job),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const [updatedJob] = await response.json();

      /** Find the changed post and replace it. */
      const updatedJobIndex = jobs.findIndex(
        (job) => job.id === updatedJob.id
      );
      jobs.splice(updatedJobIndex, 1, updatedJob);

      setJobs([...jobs]);
    } catch (err) {
      throw err;
    }
  };

  const deleteJob = async function (jobId: string) {
    try {
      const response = await fetch(`/api/posts/${jobId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      /** Find the changed post and delete it. */
      const deletedJobIndex = jobs.findIndex((job) => job.id === jobId);
      jobs.splice(deletedJobIndex, 1);
      setJobs([...jobs]);
    } catch (err) {
      throw err;
    }
  };

  const createJob = async function (job: Prisma.JobCreateInput) {
    try {
      const response = await fetch(`/api/jobs`, {
        method: "POST",
        body: JSON.stringify(job),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      /** Append the new post on the existing ones */
      const newJob = await response.json();
      setJobs([...jobs, newJob]);
    } catch (err) {
      throw err;
    }
  };

  return {
    areJobsLoading,
    jobs,
    jobsRetrievalError,
    updateJobs,
    deleteJob,
    createJob,
  };
}