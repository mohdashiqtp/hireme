import type { Prisma } from "../types/index"
import prisma from "../lib/prismadb";

export async function getUsers() {
  return await prisma.user.findMany();
}


// export async function isUserIsOld(id: string) {

//   return await prisma.user.findFirst({ where: { clerkId : id } });

// }

export async function getUser(id : string){
  return await prisma.user.findUnique({
    where:{
      clerkId : id
    }

  })
}

export async function getExpereice(id : string){
  return await prisma.experience.findMany({
    where:{
      userId : id
    }
  })
}
export async function getSkills(id : string){
  return await prisma.skill.findMany({
    where:{
      userId : id
    }
  })
}

export async function createUser(data: Prisma.UserCreateInput) {
  return await prisma.user.create({ data });
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id },
  });
}