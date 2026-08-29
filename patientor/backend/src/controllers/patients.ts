import express, { type Request, type Response } from 'express';
import patientService from '../services/patientsService.ts';
import { type PatientEntry, type NewPatientEntry, type NonSensitivePatientEntry } from '../../types.ts';
import { newPatientParser, errorMiddleware } from '../../utils.ts';

const router = express.Router();

router.get('/api/patients', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const data = patientService.getNonSensitiveEntries();
  res.send(data);
});


router.post('/api/patients', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>
  , res: Response<PatientEntry>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  });

  router.use(errorMiddleware);

export default router;