import patientEntries from '../../data/patients.ts' with { type: "json" };
import type { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../../types.ts';
import { v4 as uuidv4 } from 'uuid';

const patients = patientEntries;

const getEntries = (): PatientEntry[] => {
  return patients as PatientEntry[];
}; 

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return (patients as PatientEntry[]).map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newDiaryEntry = {
    id: uuidv4(), ...entry 
  };
  patients.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};