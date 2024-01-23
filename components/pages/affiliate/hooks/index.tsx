import { useTranslation } from "next-i18next";
import { useState } from "react";
import listServices from "services/service";
import { DataService, StatusOrder } from "types";
import TYPE_CONSTANTS from "constants/type";
import { useAppDispatch } from "hooks/useStore";
import { handleSetUser } from "redux/authentication/slice";

const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

const useAffiliateHook = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [affiliateUser, setAffiliateUser] = useState({}) as any;

  const getAffiliateInfo = async () => {
    const data: DataService | any = await listServices.getInforAffiliate();

    if (data) {
      setAffiliateUser(data);
    }
  };
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 50,
    status: StatusOrder.ACTIVE,
  });

  const [ordersWithdrawn, setOrderWithdrawn] = useState([]);
  const getWithdrawn = async (params: any) => {
    const data = await listServices.getWithdrawn(params);
    if (data) {
      setOrderWithdrawn(data?.items);
    }
  };

  return {
    getAffiliateInfo,
    setParams,
    getWithdrawn,
    ordersWithdrawn,
    params,
    affiliateUser,
  };
};

export { useAffiliateHook };
