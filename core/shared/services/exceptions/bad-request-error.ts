import { HTTP_STATUS } from "@/constants/HttpStatus";

const defaultStatus = HTTP_STATUS.BAD_REQUEST;

export class BadRequestServiceError extends Error {
  public status: number;
  public code: string;
  constructor(
    message: string,
    code: string,
    status: number = defaultStatus,
  ) {
    super(message);
    this.name = 'BadRequestServiceError';
    this.code = code;
    this.status = status;
  }
}
