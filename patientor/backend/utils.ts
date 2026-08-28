import type {  NewPatient } from './types.ts';
import { Gender } from './types.ts';

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing id');
  }
  return id;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

type GenderValue = (typeof Gender)[keyof typeof Gender];

const isGender = (param: string): param is GenderValue => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): GenderValue => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parsePatientEntry = (object: unknown): NewPatient => {
   if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('id' in object && 'name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newEntry: NewPatient = {
      id: parseId(object.id),
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default parsePatientEntry;