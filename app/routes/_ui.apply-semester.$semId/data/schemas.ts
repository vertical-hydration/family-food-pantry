import { z } from "zod";

export const AddressSchema = z.object({
  street: z
    .string({ required_error: "Street is required" })
    .min(1, { message: "Street must be at least 1 character" }),
  unit: z.string().default(" "),
  city: z
    .string({ required_error: "City is required" })
    .min(1, { message: "City must be at least 1 character" }),
  state: z.literal("NC", { invalid_type_error: "Must be NC" }),
  zip: z
    .string({ required_error: "Zip is required" })
    .regex(/^\d{5}$/, { message: "Zip must be 5 digits" }),
});

export const AddStudentSchema = z.object({
  fname: z.string({ required_error: "First Name is required" }),
  lname: z.string({ required_error: "Last Name is required" }),
  school: z.enum(["tps", "lde", "tms", "ths"], {
    errorMap(issue, ctx) {
      switch (issue.code) {
        case "invalid_type": {
          if (ctx.data === undefined) {
            return { message: "School is required" };
          }
          return { message: "School is required" };
        }
        case "invalid_enum_value": {
          return {
            message: "Must be a Thomasville School (TPS, LDE, TMS, THS)",
          };
        }
        default:
          return { message: ctx.defaultError };
      }
    },
  }),
});


export const RemoveStudentSchema = z.object({
  studentId: z.string({ required_error: "Student ID is required" }),
});

export const SetAdultsSchema = z.object({
  adults: z.coerce
    .number({ required_error: "Adults is required" })
    .min(1, { message: "Adults must be at least 1 person" }),
});

export const AddMinorSchema = z.object({
  fname: z.string({ required_error: "First Name is required" }),
  lname: z.string({ required_error: "Last Name is required" }),
  birthyear: z.coerce
    .number({ required_error: "Birth Year is required" })
    .min(2000, { message: "Birth Year must be greater than 2000" }),
});

export const RemoveMinorSchema = z.object({
  minorId: z.string({ required_error: "Minor ID is required" }),
});
