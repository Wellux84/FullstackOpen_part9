import express from 'express';
import patientService from '../services/patientsService.ts';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import parsePatientEntry from '../../utils.ts';

router.get('/api/patients', (_req, res) => {
  const patients = patientService.getEntries();
  res.send(patients);
});

router.post('/api/patients', (_req, res) => {
  try {
  const newPatientData = parsePatientEntry({ id: uuidv4(), ..._req.body });
  const addedPatient = patientService.addPatient(newPatientData);
  res.json(addedPatient);
  } catch (error: unknown) {
      let errorMessage = 'Something went wrong'
      if (error instanceof Error) {
        errorMessage += ': ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
});

export default router;