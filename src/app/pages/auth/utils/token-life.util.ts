export const isTokenExpired = (): boolean => {
  // console.log(new Date());
  // console.log(new Date(localStorage.getItem('PlanTokenExpiredTime') as string));
  if (
    localStorage.getItem('PlanTokenExpiredTime') &&
    new Date() >
      new Date(localStorage.getItem('PlanTokenExpiredTime') as string)
  ) {
    return true;
  }
  return false;
};
