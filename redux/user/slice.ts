import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  rememberLogin : {
    password : string,
    phoneNumber : string,
    isRemember : boolean
  }
}

const initialState: UserInfo = {
  rememberLogin : {
    password : '',
    phoneNumber : '',
    isRemember : false
  }
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleRememberLogin: (state: UserInfo, action: any) => {
      return {
        ...state,
        rememberLogin: action.payload,
      };
    },
  },
});

export const { handleRememberLogin } = UserSlice.actions;

export const namespace = "UserSlice";

export default UserSlice.reducer;
