export type Status = 'idle' | 'error' | 'pending' | 'success';

type ReactQueryStatusProps = 'Idle' | 'Error' | 'Pending' | 'Success';

export const ReactQueryStatus: Record<ReactQueryStatusProps, Status> = {
  Idle: 'idle',
  Error: 'error',
  Pending: 'pending',
  Success: 'success',
};
