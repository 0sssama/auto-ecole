export interface ContractProps {
  date: string;
  city: string;
  licenseFile: { id: string; category: string; practiceHours: string; theoryHours: string };
  school: {
    name: string;
    numRegistrePermis: string;
    address: string;
    numRegistreFiscale: string;
    numRegistreCommerce: string;
    city: string;
    fax: string;
    phone: string;
    email: string;
  };
  student: { cin: string; birthdate: string; birthplace: string; address: string; numReferenceWeb: string };
}
