import axios, { AxiosError } from 'axios';
import {
  BadRequestServiceError,
  InternalServiceError,
  UnauthorizedServiceError,
} from '../exceptions';
import { HTTP_STATUS } from '@/constants/HttpStatus';

const defaultErrorMessage = 'Se produjo un error interno del servidor';

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === HTTP_STATUS.UNAUTHORIZED) {
      const axiosError = error as AxiosError<{ errorCode?: string; errorMessage?: string; }>;
      const message = axiosError.response?.data?.errorMessage;

      throw new UnauthorizedServiceError(message);
    } if (status === HTTP_STATUS.BAD_REQUEST) {
      const axiosError = error as AxiosError<{ errorCode?: string; errorMessage?: string; }>;
      const message = axiosError.response?.data?.errorMessage || defaultErrorMessage;

      throw new BadRequestServiceError(message);
    } else {
      throw new InternalServiceError();
    }
  }

  throw error;
};
