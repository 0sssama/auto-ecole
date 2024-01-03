import { z } from 'zod';

import { isMobilePhone } from '@/base/utils/client/is-mobile-phone';
import { isDigits } from '@/base/utils/client/is-digits';

export const schoolSettingsFormSchema = z.object({
  name: z.string().max(255),
  address: z.string().max(255),
  email: z.string().email(),
  phone: z.string().refine(isMobilePhone, {
    message: 'Numéro de téléphone est invalide',
  }),
  fax: z.string().refine(isMobilePhone, {
    message: 'Numéro de fax est invalide',
  }),
  theoryHours: z.string().refine(isDigits),
  practiceHours: z.string().refine(isDigits),
  numRegistrePermis: z.string().max(255),
  numRegistreCommerce: z.string().max(255),
  numRegistreFiscale: z.string().max(255),
  city: z.string().max(255),
});

export type SchoolSettingsFormType = z.infer<typeof schoolSettingsFormSchema>;
