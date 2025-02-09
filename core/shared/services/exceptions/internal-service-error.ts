import { HTTP_STATUS } from "@/constants/HttpStatus";

const defaultErrorMessage = 'Ocurrió un error inesperado';
const defaultStatus = HTTP_STATUS.INTERNAL_SERVER_ERROR;

export class InternalServiceError extends Error {
  public status: number;
  constructor(
    message: string = defaultErrorMessage,
    status: number = defaultStatus
  ) {
    super(message);
    this.name = 'InternalServiceError';
    this.status = status;
  }
}
