import showMessage from "@components//Message";
import axios from "axios";
import TYPE_CONSTANTS from "constants/type";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import listServices from "services/service";
import { FormEditProfile } from "types";
import { useHomeHook } from "../../home/hooks";
import HTTP_STATUS_CONTSTANTS from "constants/httpStatus";

const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

const useProfileHook = () => {
  const { t } = useTranslation();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 50,
    status: null,
  });
  const { getUserInfo } = useHomeHook();

  const [ordersHistoryData, setOrderHistoryData] = useState([]);
  const [bankData, setBankData] = useState([]);

  const getOrderHistory = async (params: any) => {
    const data = await listServices.getOrderHistory(params);
    if (data) {
      setOrderHistoryData(data?.items);
    }
  };

  const getListBank = async () => {
    const data = await axios.get("https://api.vietqr.io/v2/banks");
    if (data?.status === HTTP_STATUS_CONTSTANTS.OK) {
      const optionBank = data?.data?.data?.map((item: any) => ({
        name: item?.name,
        value: item?.shortName,
      }));
      setBankData(optionBank);
    }
  };

  const onUpdateUserInfo = async (params: FormEditProfile) => {
    const newObj = Object.entries(params).reduce((acc: any, [key, value]) => {
      acc[key] = value === "" ? null : value;
      return acc;
    }, {});

    const data = await listServices.updateUserInfo(newObj);
    if (data) {
      showMessage(typeOfMessage.SUCCESS, t("home.updateSuccess"));
      getUserInfo();
    }
  };

  const onChangeAvatar = async (data: any, setFieldValue: any) => {
    const params = {
      photo_url: data?.originFileObj,
    } as any;

    const formData = new FormData();
    for (const key in params) {
      formData.append(key, params[key]);
    }
    const responseUpload = await listServices.uploadAvatar(formData);
    if (responseUpload) {
      setFieldValue("avatarUrl", responseUpload?.image_url);
    }
  };

  return {
    setParams,
    getOrderHistory,
    getListBank,
    onChangeAvatar,
    onUpdateUserInfo,
    ordersHistoryData,
    params,
    bankData,
  };
};

export { useProfileHook };
