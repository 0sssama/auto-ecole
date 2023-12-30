import dynamic from 'next/dynamic';

export { default as PageContentHeader } from './page-content-header';
export { default as ProfileImageColumn } from './profile-image-column';
export { default as DossierInfo } from './dossier-info';
export { default as PageHeader } from './page-header';

const AddStudentModal = dynamic(() => import('./modals/add-student-modal'), { ssr: false });
const AddInstructorModal = dynamic(() => import('./modals/add-instructor-modal'), { ssr: false });
const AddLicenseFileModal = dynamic(() => import('./modals/add-license-file-modal'), { ssr: false });
const AddExamModalSike = dynamic(() => import('./modals/add-exam-modal-sike'), { ssr: false });
const AddExamModal = dynamic(() => import('./modals/add-exam-modal'), { ssr: false });
const DeleteExamConfirmModal = dynamic(() => import('./modals/delete-exam-confirm'), { ssr: false });
const AddLessonModal = dynamic(() => import('./modals/add-lesson-modal'), { ssr: false });
const AddLicenseFileLessonModal = dynamic(() => import('./modals/add-license-file-lesson-modal'), { ssr: false });
const AddLicenseFilePaymentModal = dynamic(() => import('./modals/add-license-file-payment-modal'), { ssr: false });
const AddPaymentModalSike = dynamic(() => import('./modals/add-payment-modal-sike'), { ssr: false });
const AddVehicleModal = dynamic(() => import('./modals/add-vehicle-modal'), { ssr: false });
const AddVehicleExpenseModal = dynamic(() => import('./modals/add-vehicle-expense-modal'), { ssr: false });
const AddLicenseFileExpenseModal = dynamic(() => import('./modals/add-license-file-expense-modal'), { ssr: false });
const ShouldCreateLicenseFileModal = dynamic(() => import('./modals/should-create-license-file-modal'), { ssr: false });

export {
  AddStudentModal,
  AddInstructorModal,
  AddLicenseFileModal,
  AddLicenseFileLessonModal,
  AddLicenseFilePaymentModal,
  AddPaymentModalSike,
  AddLessonModal,
  AddExamModalSike,
  AddExamModal,
  DeleteExamConfirmModal,
  AddVehicleModal,
  AddVehicleExpenseModal,
  AddLicenseFileExpenseModal,
  ShouldCreateLicenseFileModal,
};
