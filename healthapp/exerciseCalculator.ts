const calculateExercises = (dailyExercises: number[], target: number): { periodLength: number, trainingDays: number, success: boolean, rating: number, ratingDescription: string, target: number, average: number } => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(day => day > 0).length;
  const average = dailyExercises.reduce((sum, day) => sum + day, 0) / periodLength;
  const success = average >= target;
  let rating: number = 1;
  let ratingDescription: string = "";


  if (average >= target) {
    rating = 3;
    ratingDescription = "Thats great!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  }
  else if (average >= target * 0.5) {
    rating = 1;
    ratingDescription = "Not very well";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const args = process.argv.slice(2).map(Number)

if (args.map(isNaN).includes(true)) {
  throw new Error('Provided values were not numbers!');
}

const target = args[0]
const dailyExercises = args.slice(1)

console.log(calculateExercises(dailyExercises, target))