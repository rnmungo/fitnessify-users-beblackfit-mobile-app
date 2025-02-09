import { HTTP_STATUS } from "@/constants/HttpStatus";

const defaultStatus = HTTP_STATUS.BAD_REQUEST;

export class BadRequestServiceError extends Error {
  public status: number;
  constructor(
    message: string,
    status: number = defaultStatus
  ) {
    super(message);
    this.name = 'InternalServiceError';
    this.status = status;
  }
}
