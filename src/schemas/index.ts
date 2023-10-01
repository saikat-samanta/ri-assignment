import { z as zod } from "zod";

export const EmployeeSchema = zod.object({
  id: zod.number().optional(),
  name: zod.string().min(3),
  role: zod.string().refine((val) => val !== "none" && val !== "", { message: "Please select a job role" }),
  startDate: zod.string(),
  endDate: zod.string().nullish(),
});

export type EmployeeSchema = zod.infer<typeof EmployeeSchema>;
