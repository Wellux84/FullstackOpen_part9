import express from 'express';
import patientService from '../services/patientsService.ts';
const router = express.Router();

router.get('/api/patients', (_req, res) => {
  const patients = patientService.getEntries();
  res.send(patients);
});

router.post('/api/patients', (_req, res) => {
  const newPatient = patientService.addPatient(_req.body);
  res.send(newPatient);
});

export default router;