export interface Patient {
  patientId?: number;
  documentType: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber?: string;
  email?: string;
  createdAt?: string;
}
