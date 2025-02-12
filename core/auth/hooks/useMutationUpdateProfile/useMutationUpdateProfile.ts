import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gatewayClient } from '@/core/shared/services/rest-clients';
import { ProfileUpdated } from '../../interfaces/session';

interface UpdateProfileParams {
  name: string;
  lastName: string;
  height: number;
  weight: number;
  preferredEquipment: string;
  goals: Array<string>;
  physicalState: string;
  gender: string;
};

const updateProfile = async (profileData: UpdateProfileParams): Promise<ProfileUpdated> => {
  const response = await gatewayClient.put('/api/user/me/profile', profileData);
  return response.data;
};

const useMutationUpdateProfile = (): UseMutationResult<ProfileUpdated, unknown, UpdateProfileParams, unknown> => {
  const mutation = useMutation<ProfileUpdated, unknown, UpdateProfileParams, unknown>({
    mutationFn: updateProfile,
  });

  return mutation;
};

export default useMutationUpdateProfile;
