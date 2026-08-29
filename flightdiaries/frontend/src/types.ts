export interface Diary {
    id: number,
    date: string,
    weather: Weather,
    visibility: Visibility
}

export type NewDiary = Omit<Diary, 'id'>

export interface ValidationError {
  error: {
    code: string;
    path: string[];
    message: string;
  }[];
}

export const Weather = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
} as const;

export type Weather = typeof Weather[keyof typeof Weather];

export const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const;

export type Visibility = typeof Visibility[keyof typeof Visibility];