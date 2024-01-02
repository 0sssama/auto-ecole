'use client';

// import { useEffect } from 'react';

import { Contract } from '@/components/pages';

export default function ContractPage() {
  //   useEffect(() => {
  //     window.print();
  //   }, []);

  return (
    <main className="h-full w-full" dir="rtl">
      <Contract
        date="02/01/2024"
        city="طنجة"
        licenseFile={{
          id: '123456789',
          category: 'B',
          practiceHours: '69',
          theoryHours: 'theo69',
        }}
        school={{
          name: 'ECPP',
          address: 'عنوان المدرسة',
          numRegistreTax: 'WED123456789',
          numRegistrePermis: 'CSD123456789',
          numRegistreCommerce: 'QWO123456789',
          city: 'طنجة',
          fax: '0568393819',
          phone: '0661519014',
          email: 'test@ecpp.com',
        }}
        student={{
          cin: 'cd387878',
          birthdate: '02/08/2002',
          birthplace: 'طنجة',
          address: '3 زنقة مصر',
          numReferenceWeb: '23412452',
        }}
      />
    </main>
  );
}
