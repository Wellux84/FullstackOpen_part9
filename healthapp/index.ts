import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
const app = express();
app.get('/hello', (_req: any, res: any) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: any, res: any) => {
  const { height, weight } = req.query;
  if (Number.isNaN(Number(height)) || Number.isNaN(Number(weight))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
      height: Number(height),
      weight: Number(weight),
      bmi: bmi
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
  }
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});