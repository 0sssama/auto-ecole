import { z } from "zod";
import validator from "validator";

export const ClientFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(255, {
      message: "First name must be at most 255 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(255, {
      message: "Last name must be at most 255 characters.",
    }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .max(255, {
      message: "Phone number must be at most 255 characters.",
    })
    .refine(validator.isMobilePhone, {
      message: "Phone number is invalid.",
    }),
  cin: z
    .string()
    .min(8, {
      message: "CIN must be at least 8 characters.",
    })
    .max(10, {
      message: "CIN must be at most 10 characters.",
    }),
});
