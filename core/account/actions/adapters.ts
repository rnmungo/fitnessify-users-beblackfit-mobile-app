import { jwtDecode } from 'jwt-decode';
import { AUTH_STATUS } from '../constants';
import type { BaseSession, OnBoardingStatus, Profile, Subscription } from '../interfaces/session';
import type {
  AuthorizationData,
  DecodedToken,
  InitializeResetPasswordData,
  ProfileData,
  SubscriptionData,
} from './types';
import { ForgotPasswordToken } from '../interfaces/forgot-password';

export const adaptAuthorization = (data: AuthorizationData): BaseSession => {
  const decodedToken = jwtDecode<DecodedToken>(data.token);
  const {
    sub: userId,
    email,
    exp: expires,
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': roles,
    iat: issuedAt,
    tenant,
  } = decodedToken;

  return {
    applicationId: tenant,
    status: AUTH_STATUS.AUTHENTICATED,
    authorization: {
      expires,
      issuedAt,
      refreshToken: data?.refreshToken,
      token: data?.token,
    },
    user: {
      id: userId,
      email,
      roles,
      tenant,
    },
  };
};

export const adaptProfile = (data: ProfileData): Profile => ({
  name: data.name,
  lastName: data.lastName,
  height: data.height,
  weight: data.weight,
  bodyMassIndex: data.bodyMassIndex,
  preferredEquipment: data.preferredEquipment,
  goals: data.goals,
  physicalState: data.physicalState,
  gender: data.gender,
  level: data.level,
  onBoardingStatus: data.onBoardingStatus as OnBoardingStatus,
  tenant: {
    name: data.tenant.name,
    email: data.tenant.email
  }
});

export const adaptSubscription = (responseData: SubscriptionData): Subscription => ({
  id: responseData.id,
  status: responseData.status,
  dueDate: responseData.dueDate,
  userTenantId: responseData.userTenantId,
  planId: responseData.planId,
  planName: responseData.plan.name,
});

export const adaptForgotPasswordToken = (responseData: InitializeResetPasswordData): ForgotPasswordToken => ({
  token: responseData.token,
});
