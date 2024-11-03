import type { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import type { FogoCruzadoCities, FogoCruzadoOccurrences } from './types';

interface Response {
  data: {
    accessToken: string;
    expiresIn: number;
  };
}

const baseURL = process.env.EXPO_PUBLIC_FOGO_CRUZADO_API;

export const api = axios.create({
  baseURL,
  maxRate: 4
});

const refreshTokenAPI = (token: string) => {
  console.log('TOKEN: ', token);

  return axios.post<Response>(
    `${baseURL}/auth/refresh`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const authAPI = () =>
  axios.post<Response>(`${baseURL}/auth/login`, {
    email: process.env.EXPO_PUBLIC_FOGO_CRUZADO_EMAIL,
    password: process.env.EXPO_PUBLIC_FOGO_CRUZADO_PASSWORD
  });

api.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem('fogo-cruzado:token');

  const authorization = `Bearer ${token}`;

  if (token) request.headers.Authorization = authorization;

  return request;
});

api.interceptors.response.use(
  (response) => response,
  handleUnauthorizedRequest
);

async function handleUnauthorizedRequest(error: AxiosError) {
  // console.log('POPOPO: ', error.response?.status);

  const originalRequest = error.config;

  if (
    error.response?.data?.msg === 'Unauthorized access. Incorrect credentials.'
  ) {
    const { data: response } = await authAPI();

    await AsyncStorage.setItem('fogo-cruzado:token', response.data.accessToken);

    if (originalRequest) return await api(originalRequest);
  } else if (error.response?.status === 401) {
    const refreshToken = await AsyncStorage.getItem('fogo-cruzado:token');

    if (refreshToken) {
      try {
        const { data: response } = await refreshTokenAPI(refreshToken);

        await AsyncStorage.setItem(
          'fogo-cruzado:token',
          response.data.accessToken
        );
      } catch (err) {
        const error = err as AxiosError;

        console.log('ERROR: ', error.response?.data);
      }
    } else {
      const { data: response } = await authAPI();

      await AsyncStorage.setItem(
        'fogo-cruzado:token',
        response.data.accessToken
      );
    }

    if (originalRequest) return await api(originalRequest);
  }

  return Promise.reject(error);
}

export async function getOccurrencesByCityAndState({
  stateId,
  cityId
}: {
  stateId: string;
  cityId?: string;
}) {
  const response = await api.get<FogoCruzadoOccurrences>('/occurrences', {
    params: {
      idState: stateId,
      idCities: cityId
    }
  });

  return response;
}

export async function getCities(params?: {
  stateId?: string;
  cityName?: string;
}) {
  const response = await api.get<FogoCruzadoCities>('/cities', {
    params
  });

  return response;
}
