import { useAppDispatch } from "hooks/useStore";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { setServicesCheckout, setShowModalSuccess } from "redux/service/slice";
import listServices from "services/service";
import { DataService } from "types";
import { useHomeHook } from "../../home/hooks";
import { SORT_TYPE } from "../../../../constants";

const useServiceHook = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { getAllCart, getUserInfo } = useHomeHook();

  const [params, setParams] = useState({
    isViewCard: true,
    search: "",
    page: 1,
    limit: 50,
    sortType: SORT_TYPE.ASC,
  });
  const [servicesData, setServicesData] = useState([]);

  const getListServiceAll = async (params: any) => {
    const data: DataService | any = await listServices.getListServiceAll(
      params
    );
    if (data) {
      setServicesData(data?.items || []);
    }
  };

  const onCreateOrder = async (params: any) => {
    setLoading(true);
    const data: any = await listServices.createOrder(params);
    if (data) {
      dispatch(setShowModalSuccess(true as any));
      dispatch(setServicesCheckout([] as any));
      getAllCart();
      getUserInfo();
    }
    setLoading(false);
  };

  return {
    setParams,
    getListServiceAll,
    onCreateOrder,
    loading,
    params,
    servicesData,
  };
};

export { useServiceHook };
