import showMessage from "@components//Message";
import TYPE_CONSTANTS from "constants/type";
import { useState } from "react";
import listServices from "services/service";

const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

const PaymentHook = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const postPayment = async (
    params: any,
    onPaymentSuccess: (data: any) => void
  ) => {
    const data: any = await listServices.postPayment(params);

    if (data) {
      onPaymentSuccess({ ...data, currency: params?.currency });
      // showMessage(typeOfMessage.SUCCESS, "Giao dịch đang xử lí");
    }
  };
  const [payment, setPayment] = useState({
    data: [],
    currency: null,
  });

  const getListPayment = async (params: any) => {
    const data: any = await listServices.getListTransaction(params);

    if (data) {
      setPayment({
        data: data?.items,
        currency: data?.currency,
      });
    }
  };
  return {
    postPayment,
    getListPayment,
    payment,
    params,
  };
};

export { PaymentHook };
