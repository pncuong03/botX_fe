import { combineReducers } from 'redux';

import AuthenticationSlice, { namespace as AuthenticationNameSpace } from './authentication/slice';
import ServiceSlice, { namespace as ServiceNameSpace } from './service/slice';
import UserSlice, { namespace as UserNameSpace } from './user/slice';

const rootReducer = {
  [AuthenticationNameSpace]: AuthenticationSlice,
  [ServiceNameSpace]: ServiceSlice,
  [UserNameSpace]: UserSlice,
};

export default rootReducer;
