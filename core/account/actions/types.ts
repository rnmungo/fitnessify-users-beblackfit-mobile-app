export interface DecodedToken {
  sub: string;
  email: string;
  exp: number;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string[];
  iat: number;
  tenant: string;
}

export interface AuthorizationData {
  token: string;
  refreshToken: string;
}

export interface ProfileData {
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
  onBoardingStatus: string;
  tenant: {
    name: string;
    email: string;
  };
};

export interface SubscriptionData {
  id: string;
  status: string;
  dueDate: string;
  userTenantId: string;
  planId: string;
  plan: {
    name: string;
  }
}

export interface InitializeResetPasswordData {
  token: string;
}
