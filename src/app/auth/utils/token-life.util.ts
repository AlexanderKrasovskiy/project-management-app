import { LocalStorageItems } from 'src/app/shared/models/common.model';

export const isTokenExpired = (): boolean => {
  if (
    localStorage.getItem(LocalStorageItems.PlanTokenExpiredTime) &&
    new Date() >
      new Date(
        localStorage.getItem(LocalStorageItems.PlanTokenExpiredTime) as string,
      )
  ) {
    return true;
  }
  return false;
};
