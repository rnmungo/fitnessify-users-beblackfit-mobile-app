export type AuthStatus = 'authenticated' | 'checking' | 'unauthenticated';

export type OnBoardingStatus = 'Completed' | 'Draft' | 'Omitted';

export interface Authorization {
  expires: number;
  issuedAt: number;
  refreshToken?: string;
  token: string;
};

export interface User {
  id: string;
  email: string;
  roles: string[];
  tenant: string;
};

export interface Profile {
  name: string;
  lastName: string;
  height: number;
  weight: number;
  bodyMassIndex: number;
  preferredEquipment: string;
  goals: Array<string>;
  physicalState: string;
  gender: string;
  level: string;
  onBoardingStatus: OnBoardingStatus;
  tenant: {
    name: string;
    email: string;
  };
};

export type ProfileUpdated = Omit<Profile, 'tenant'>;

export interface Subscription {
  id: string;
  status: string;
  dueDate: string;
  userTenantId: string;
  planId: string;
  planName: string;
}

export interface BaseSession {
  applicationId: string;
  status: AuthStatus;
  authorization?: Authorization;
  user?: User;
};

export interface ProfileSession {
  profile?: Profile;
  subscription?: Subscription;
};

export type Session = BaseSession & ProfileSession;

