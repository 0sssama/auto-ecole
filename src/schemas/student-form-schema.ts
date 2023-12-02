import { z } from "zod";

import { isMobilePhone } from "@/utils/isMobilePhone";
import { isArabicString } from "@/utils/isArabicString";

export const studentFormSchema = z.object({
  firstNameFr: z
    .string()
    .min(2, {
      message: "Le prénom doit comporter au moins 2 caractères.",
    })
    .max(255, {
      message: "Le prénom doit comporter au maximum 255 caractères.",
    }),
  firstNameAr: z
    .string()
    .min(2, {
      message: "يجب أن يتكون الاسم الشخصي من حرفين على الأقل.",
    })
    .max(255, {
      message: "يجب أن يكون الاسم الشخصي 255 حرفًا على الأكثر.",
    })
    .refine(isArabicString, {
      message: "يجب أن يحتوي الاسم الشخصي على أحرف عربية فقط.",
    }),
  lastNameFr: z
    .string()
    .min(2, {
      message: "Le nom de famille doit comporter au moins 2 caractères.",
    })
    .max(255, {
      message: "Le nom de famille doit comporter au maximum 255 caractères.",
    }),
  lastNameAr: z
    .string()
    .min(2, {
      message: "يجب أن يتكون الاسم العائلي من حرفين على الأقل.",
    })
    .max(255, {
      message: "يجب أن يكون الاسم العائلي 255 حرفًا على الأكثر.",
    })
    .refine(isArabicString, {
      message: "يجب أن يحتوي الاسم العائلي على أحرف عربية فقط.",
    }),
  addressFr: z
    .string()
    .min(2, {
      message: "L'adresse doit comporter au moins 8 caractères.",
    })
    .max(255, {
      message: "L'adresse doit comporter au maximum 255 caractères.",
    }),
  addressAr: z
    .string()
    .min(2, {
      message: "يجب أن يتكون العنوان من 8 أحرف على الأقل.",
    })
    .max(255, {
      message: "يجب أن يكون العنوان 255 حرفًا على الأكثر.",
    })
    .refine(isArabicString, {
      message: "يجب أن يحتوي العنوان على أحرف عربية فقط.",
    }),
  professionFr: z
    .string()
    .min(2, {
      message: "La profession doit comporter au moins 8 caractères.",
    })
    .max(255, {
      message: "La profession doit comporter au maximum 255 caractères.",
    }),
  professionAr: z
    .string()
    .min(2, {
      message: "يجب أن تتكون المهنة من 8 أحرف على الأقل.",
    })
    .max(255, {
      message: "يجب أن تكون المهنة 255 حرفًا على الأكثر.",
    })
    .refine(isArabicString, {
      message: "يجب أن تحتوي المهنة على أحرف عربية فقط.",
    }),
  phone: z
    .string()
    .min(10, {
      message: "Le numéro de téléphone doit comporter au moins 10 caractères.",
    })
    .max(10, {
      message: "Le numéro de téléphone ne doit pas dépasser 10 caractères.",
    })
    .refine(isMobilePhone, {
      message: "Le numéro de téléphone n'est pas valide.",
    }),
  cin: z
    .string()
    .min(8, {
      message: "La CIN doit comporter au moins 8 caractères.",
    })
    .max(10, {
      message: "Le CIN doit comporter au maximum 10 caractères.",
    }),
  email: z.string().email({
    message: "L'adresse électronique n'est pas valide.",
  }),
  birthdate: z.date().refine(
    (value) => {
      const userAge =
        new Date(Date.now() - value.getTime()).getUTCFullYear() - 1970;

      return userAge >= 18;
    },
    {
      message: "L'étudiant doit être âgé d'au moins 18 ans.",
    },
  ),
});
