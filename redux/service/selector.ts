
export const selectServiceDetail = {
getServiceDetail: (state: any) => state?.ServiceSlice?.serviceData,
};

export const selectMyCart = {
getMyCart: (state: any) => state?.ServiceSlice?.myCart,
};
export const selectShowModalSuccess = {
getStatusShow: (state: any) => state?.ServiceSlice?.isShowModalSuccess,
};

export const selectServiceCheckout = {
getServiceCheckout: (state: any) => state?.ServiceSlice?.servicesCheckout,
};
              
export const selectNotiData = {
getNotiList: (state: any) => state?.ServiceSlice?.notiData,
};

export const selectCategories = {
getCategories: (state: any) => state?.ServiceSlice?.categories,
};