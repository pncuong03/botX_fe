import { createSlice } from "@reduxjs/toolkit";

export interface Authentication {
  accessToken: string;
  user: {};
}

const initialState: Authentication = {
  accessToken: "",
  user: {},
};

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    handleSetUser: (state: Authentication, action: any) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    handleSetToken: (state: Authentication, action: any) => {
      return {
        ...state,
        accessToken: action.payload,
      };
    },
  },
});

export const { handleSetUser,handleSetToken } = AuthenticationSlice.actions;

export const namespace = "AuthenticationSlice";

export default AuthenticationSlice.reducer;
