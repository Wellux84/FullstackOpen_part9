import express from 'express';
import cors from 'cors';
import diagnosesRouter from './src/controllers/diagnoses.ts';
import patientsRouter from './src/controllers/patients.ts';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use(diagnosesRouter);
app.use(patientsRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});