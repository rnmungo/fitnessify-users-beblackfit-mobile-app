export type AuthStatus = 'authenticated' | 'checking' | 'unauthenticated';

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
  tenant: {
    name: string;
    email: string;
  };
};

export type ProfileUpdated = Omit<Profile, 'tenant'>;

export interface BaseSession {
  applicationId: string;
  status: AuthStatus;
  authorization?: Authorization;
  user?: User;
};

export interface ProfileSession {
  profile?: Profile;
};

export type Session = BaseSession & ProfileSession;

