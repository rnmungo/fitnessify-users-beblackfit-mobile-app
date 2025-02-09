import { HTTP_STATUS } from "@/constants/HttpStatus";

const defaultErrorMessage = 'No está autorizado para realizar esta acción';
const defaultStatus = HTTP_STATUS.UNAUTHORIZED;

export class UnauthorizedServiceError extends Error {
  public status: number;
  constructor(
    message: string = defaultErrorMessage,
    status: number = defaultStatus
  ) {
    super(message);
    this.name = 'UnauthorizedServiceError';
    this.status = status;
  }
}
