import axios, { AxiosError } from 'axios';
import type { Diary, NewDiary, ValidationError } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async (): Promise<Diary[]> => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
};

const create = async (object: NewDiary): Promise<Diary> => {
  try {
    const response = await axios.post<Diary>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError>(error)) {
      const validationErrors = error.response?.data.error;

      if (validationErrors && validationErrors.length > 0) {
        throw new Error(validationErrors[0].message);
      }

      throw new Error(error.message);
    }

    throw new Error('Unexpected error');
  }
};

export default { getAll, create };
