import data from '../../data/patients.ts' with { type: "json" };
import type { NonSensitivePatientEntry, PatientEntry } from '../../types.ts';

const patients: PatientEntry[] = data;

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

const addPatient = (entry: PatientEntry): PatientEntry => {
  patients.push(entry);
  return entry;
};

export default {
  getEntries,
  addPatient
};