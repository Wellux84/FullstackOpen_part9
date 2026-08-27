import data from '../../data/diagnoses.ts' with { type: "json" };
import type { DiagnosisEntry } from '../../types.ts';

const diagnoses: DiagnosisEntry[] = data;
const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

const addDiagnosis = (entry: DiagnosisEntry): DiagnosisEntry => {
  diagnoses.push(entry);
  return entry;
};

export default {
  getEntries,
  addDiagnosis
};