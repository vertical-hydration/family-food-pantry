import { parseWithZod } from "@conform-to/zod";
import { AddMinorSchema, AddressSchema, AddStudentSchema, RemoveMinorSchema, RemoveStudentSchema, SetAdultsSchema } from "./schemas";
import { data, redirect } from "@remix-run/react";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";
import { PrimaryContact } from "~/lib/business-logic/common-types";

const updateAddress = async ({
  formData,
  userId,
  email,
}: {
  formData: FormData;
  userId: string;
  email:string;
}) => {
  const submission = parseWithZod(formData, { schema: AddressSchema });
  if (submission.status !== "success") {
    return data(submission.reply(), { status: 400 });
  }

  const userDoc= await foodPantryDb.users.read({id: userId})
  
  if(!userDoc){
    await foodPantryDb.users.create({
      language:"en",
      email,
      userId,
    })
  }



  await foodPantryDb.users.update({
    id:userId,
    updateData: { address: submission.value}
  })
  



 
  return submission.reply();
};

const addStudent = async ({ formData }: { formData: FormData }) => {
  const userId = formData.get("userId") as string;
  const submission = parseWithZod(formData, { schema: AddStudentSchema });
  if (submission.status !== "success") {
    return data(submission.reply(), { status: 400 });
  }

  const { fname, lname, school } = submission.value;
  const student = {
    fname,
    lname,
    school,
  };

  await foodPantryDb.users.addStudent({ userId, student });

  return data({
    ...submission.reply(),
    message: "Student added.",
  });
};

const removeStudent = async ({ formData }: { formData: FormData }) => {
  const userId = formData.get("userId") as string;
  const submission = parseWithZod(formData, { schema: RemoveStudentSchema });
  if (submission.status !== "success") {
    return data(submission.reply(), { status: 400 });
  }

  const { studentId } = submission.value;

  await foodPantryDb.users.removeStudent({ userId, studentId });

  return {
    ...submission.reply(),
    message: "Student removed.",
  }
  
};

const setAdults = async ({ formData }: { formData: FormData }) => {
  const userId = formData.get("userId") as string;
  const submission = parseWithZod(formData, { schema: SetAdultsSchema });
  if (submission.status !== "success") {
    return data(submission.reply(), { status: 400 });
  }

  const { adults } = submission.value;

  await foodPantryDb
    .users
    .update({ id: userId, updateData: { household_adults: adults } });

  return submission.reply()
};


const addMinor = async ({ formData }: { formData: FormData }) => {
  const userId = formData.get("userId") as string;
  const submission = parseWithZod(formData, { schema: AddMinorSchema });
  if (submission.status !== "success") {
    return data(submission.reply(), { status: 400 });
  }

  const { fname, lname, birthyear } = submission.value;
  const minor = {
    fname,
    lname,
    birthyear,
  };

  await foodPantryDb.users.addMinor({ userId, minor });

  return {
    ...submission.reply(),
    message: "Minor added.",
  };
};

const removeMinor = async ({ formData }: { formData: FormData }) => {
  const userId = formData.get("userId") as string;
  const submission = parseWithZod(formData, { schema: RemoveMinorSchema });
  if (submission.status !== "success") {
    return data(submission.reply(), { status: 400 });
  }

  const { minorId } = submission.value;

  await foodPantryDb.users.removeMinor({ userId, minorId });

  return {
    ...submission.reply(),
    message: "Minor removed.",
  };
};


const submitApplication = async ({ 
  userId, primaryContact, semesterId 
}: { 
  userId: string, 
  primaryContact: PrimaryContact,
  semesterId:string,
}) => {
  const userProfileDoc = await foodPantryDb.users.read({ id: userId });
  if (!userProfileDoc) {
    throw new Error ("no profile")
  }

  // get active semester


  // check if application already exists
  const applicationDoc = await foodPantryDb
    .applications
    .checkApplication({ userId, semesterId });

  if (applicationDoc) {
    throw redirect("/apply-semester");
  }

  const students = userProfileDoc.students;
  const address = userProfileDoc.address;

  const addressCheck = AddressSchema.safeParse(address);
  const studentData = students[0] ?? {};
  const studentsCheck = AddStudentSchema.safeParse(studentData);
  const success = addressCheck.success && studentsCheck.success;

  if (!success) {
    return { success, message:"failed check", status: "error" };
  }

  

  const applicationId = await foodPantryDb.applications.create({
    data: {
      status: "pending",
      semesterId,
      address,
      students,
      minors: userProfileDoc.minors,
      userId: userId,
      household_adults: userProfileDoc.household_adults,
      primaryContact,
    },
  });

  return redirect("/apply-semester");
};




export const mutations = {
  updateAddress,
  addStudent,
  removeStudent,
  setAdults,
  addMinor,
  removeMinor,
  submitApplication,
}
