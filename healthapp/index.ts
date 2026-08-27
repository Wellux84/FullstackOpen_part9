import express from 'express';
import type { Request, Response } from 'express';
import { calculateExercises } from './exerciseCalculator.ts';
import { calculateBmi } from './bmiCalculator.ts';
const app = express();

app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;
  if (Number.isNaN(Number(height)) || Number.isNaN(Number(weight))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    return res.send({
      height: Number(height),
      weight: Number(weight),
      bmi: bmi
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }
    return res.status(400).send({ error: 'Unknown error' });
  }
});

app.post('/exercises', (req: Request, res: Response) => {

  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((value) => Number.isFinite(value)) ||
    !Number.isFinite(target)
  ) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, target);
  return res.send({
    periodLength: result.periodLength,
    trainingDays: result.trainingDays,
    success: result.success,
    rating: result.rating,
    ratingDescription: result.ratingDescription,
    target: result.target,
    average: result.average
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});