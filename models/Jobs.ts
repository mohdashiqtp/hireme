import type { Prisma } from "../types/index"
import prisma from "../lib/prismadb";

export async function getJobs() {
  return await prisma.job.findMany();
}

export async function findRecruiter(recruiterEmail : string) {

  return await prisma.recruiter.findUnique({ where : { email : recruiterEmail } })

  
}

export async function getJobById(postId: string) {
  return await prisma.job.findFirst({ where: { id: postId } });
}

export async function createJob(data: Prisma.JobCreateInput) {
  return await prisma.job.create({ data });
}

export async function updateJob(id: string, data: Prisma.JobUpdateInput) {
  return await prisma.job.update({
    where: { id },
    data,
  });
}

export async function deleteJob(id: string) {
  return await prisma.job.delete({
    where: { id },
  });
}