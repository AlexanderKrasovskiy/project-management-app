export const isTokenExpired = (): boolean => {
  if (
    localStorage.getItem('PlanTokenExpiredTime') &&
    new Date() >
      new Date(localStorage.getItem('PlanTokenExpiredTime') as string)
  ) {
    return true;
  }
  return false;
};
