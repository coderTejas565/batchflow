import { randomUUID } from "crypto";

import { teacherRepository } from "./teacher.repository";

import type {
  InviteTeacherInput,
  TeacherInviteDTO,
  TeacherPageDTO,
} from "./teacher.types";

import {
  inviteTeacherSchema,
} from "./teacher.validation";

import { parseOrThrow } from "@/lib/validate";
import { ConflictError } from "@/lib/errors";


export async function getTeacherPage(
  instituteId: string
): Promise<TeacherPageDTO> {

  const [
    teachers,
    pendingInvites,
  ] = await Promise.all([
    teacherRepository.findTeachers({
      instituteId,
    }),

    teacherRepository.findPendingInvites({
      instituteId,
    }),
  ]);


  return {
    teachers,
    pendingInvites,
  };
}



type InviteTeacherParams = InviteTeacherInput & {
  instituteId:string;
  invitedBy:string;
};


export async function inviteTeacher({
  instituteId,
  invitedBy,
  email,
}: InviteTeacherParams): Promise<TeacherInviteDTO> {


  const data = parseOrThrow(
    inviteTeacherSchema,
    {
      email,
    }
  );


  const existingInvite =
    await teacherRepository.findInviteByEmail({
      instituteId,
      email:data.email,
    });


  if(existingInvite){
    throw new ConflictError(
      "A pending invitation already exists for this email."
    );
  }



  const existingTeacher =
    await teacherRepository.findTeacherByEmail({
      instituteId,
      email:data.email,
    });


  if(existingTeacher){
    throw new ConflictError(
      "This teacher is already part of the institute."
    );
  }



  const invite =
    await teacherRepository.createInvite({
      id:randomUUID(),
      instituteId,
      email:data.email,
      invitedBy,
      token:randomUUID(),
      expiresAt:new Date(
        Date.now()+7*24*60*60*1000
      ),
    });



  if(!invite){
    throw new Error(
      "Failed to create teacher invite"
    );
  }



  // TODO:
  // await sendTeacherInviteEmail(invite);


  return invite;
}