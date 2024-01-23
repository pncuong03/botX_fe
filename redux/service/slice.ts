import { createSlice } from '@reduxjs/toolkit';

export interface Service {
  serviceData : {
    visible : boolean,
    service : {} | any
  } | any,
  myCart : [],
  isShowModalSuccess : boolean | any,
  servicesCheckout : [],
  notiData: {},
  categories : []
}

const initialState: Service = {
    serviceData : {
        visible : false,
        service : {}
    },
    myCart:[],
    isShowModalSuccess:false,
    servicesCheckout:[],
    notiData:{},
    categories:[]
};

export const ServiceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    handleSeclectService : (state: Service, action: any) =>{
      return {
        ...state, serviceData : action.payload
      }
    },
    setMyCart : (state: Service, action: any)=>{
      return {
        ...state, myCart : action.payload
      }
    },
    setShowModalSuccess : (state: Service, action: any)=>{
      return {
        ...state, isShowModalSuccess : action.payload
      }
    },
    setServicesCheckout : (state: Service, action: any)=>{
      return {
        ...state, servicesCheckout : action.payload
      }
    },
    setNotiList : (state: Service, action: any)=>{
      return {
        ...state, notiData : action.payload
      }
    },
    setCategories : (state: Service, action: any)=>{
      return {
        ...state, categories : action.payload
      }
    },
  },
});

export const {handleSeclectService,setMyCart,setShowModalSuccess,setServicesCheckout,setNotiList,setCategories } = ServiceSlice.actions;

export const namespace = 'ServiceSlice';

export default ServiceSlice.reducer;
