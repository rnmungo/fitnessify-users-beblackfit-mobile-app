import axios, { AxiosInstance } from 'axios';
import { SecureStorage } from '../../utilities/secure-storage';
import { StorageKeys } from '@/constants/StorageKeys';

type HeaderValue = boolean | number | string;

const timeOutForDev = 60000;
const timeOutForProd = 10000;

const isTestScope = (): boolean =>
  process.env.EXPO_PUBLIC_SCOPE ? !/[prod|PROD]/.test(process.env.EXPO_PUBLIC_SCOPE) : true;

const baseURL = process.env.EXPO_PUBLIC_GATEWAY_BASE_URL || '';
const tenant = process.env.EXPO_PUBLIC_TENANT || '';
const language = process.env.EXPO_PUBLIC_LANGUAGE || 'en';
const timeout = isTestScope() ? timeOutForDev : timeOutForProd;

const headers: Record<string, HeaderValue> = {
  'User-Agent': 'fitnessify-users-beblackfit-mobile-app',
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Language': language,
  'X-Application-Id': tenant,
};

const gatewayClient: AxiosInstance = axios.create({
  baseURL,
  timeout,
  headers,
});

gatewayClient.interceptors.request.use(async (config) => {
  const token = await SecureStorage.getItem(StorageKeys.TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { isTestScope, gatewayClient };
