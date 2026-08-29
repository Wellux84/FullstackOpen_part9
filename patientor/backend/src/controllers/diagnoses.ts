import express from 'express';
import diagnosesService from '../services/diagnosesService.ts';
const router = express.Router();

router.get('/api/diagnoses', (_req, res) => {
  const diagnoses = diagnosesService.getEntries();
  res.send(diagnoses);
});

router.post('/api/diagnoses', (_req, _res) => {
  return
});

export default router;