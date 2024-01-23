const selectAuthentication = {
  getAuthenticationToken: (state: any) => state?.AuthenticationSlice,
};

export const selectUserInfo = {
  getUser: (state: any) => state?.AuthenticationSlice?.user,
};

export const selectAccessToken = {
  getToken: (state: any) => state?.AuthenticationSlice?.accessToken,
};

export default selectAuthentication;
