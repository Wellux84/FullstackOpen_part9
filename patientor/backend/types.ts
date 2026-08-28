

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}


export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export interface NewPatient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;
