import { z } from 'zod';

import { isMobilePhone } from '@/base/utils/client/is-mobile-phone';

export const instructorFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'Le prénom doit comporter au moins 2 caractères.',
    })
    .max(255, {
      message: 'Le prénom doit comporter au maximum 255 caractères.',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Le nom de famille doit comporter au moins 2 caractères.',
    })
    .max(255, {
      message: 'Le nom de famille doit comporter au maximum 255 caractères.',
    }),
  phone: z
    .string()
    .min(10, {
      message: 'Le numéro de téléphone doit comporter au moins 10 caractères.',
    })
    .max(10, {
      message: 'Le numéro de téléphone ne doit pas dépasser 10 caractères.',
    })
    .refine(isMobilePhone, {
      message: "Le numéro de téléphone n'est pas valide.",
    }),
});
