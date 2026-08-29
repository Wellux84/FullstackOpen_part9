import { useState, useEffect } from 'react';
import { Weather, Visibility } from './types';
import type { Diary, NewDiary } from './types';
import diaryService from './diaryService';
import './App.css';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewDiary = {
      date,
      weather,
      visibility
    };

    try {
      const returnedDiary = await diaryService.create(newDiary);

      setDiaries(previousDiaries =>
        previousDiaries.concat(returnedDiary)
      );

      setDate('');
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Great);
      setError('');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <>
      <div>
        <h2>Diary entries</h2>

        {diaries.map(diary => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
          </div>
        ))}
      </div>

      <div>
        <h2>Add New Diary</h2>

        {error && (
          <div style={{ color: 'red' }}>
            {error}
          </div>
        )}

        <form onSubmit={diaryCreation}>
          <div>
            Date:{' '}
            <input
              type="date"
              value={date}
              onChange={event => setDate(event.target.value)}
            />
          </div>

          <div>
            Weather:

            {Object.values(Weather).map(value => (
              <label key={value}>
                <input
                  type="radio"
                  name="weather"
                  value={value}
                  checked={weather === value}
                  onChange={() => setWeather(value)}
                />
                {value}
              </label>
            ))}
          </div>

          <div>
            Visibility:

            {Object.values(Visibility).map(value => (
              <label key={value}>
                <input
                  type="radio"
                  name="visibility"
                  value={value}
                  checked={visibility === value}
                  onChange={() => setVisibility(value)}
                />
                {value}
              </label>
            ))}
          </div>

          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
}

export default App;