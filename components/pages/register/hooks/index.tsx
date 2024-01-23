import showMessage from "@components//Message";
import { APP_URL } from "constants/routes";
import TYPE_CONSTANTS from "constants/type";
import { useAppDispatch } from "hooks/useStore";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { handleSetUser } from "redux/authentication/slice";
import listServices from "services/service";

const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

const useRegisterHook = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const onRegister = async (params: any) => {
    setLoading(true);
    const data: any = await listServices.register(params);
    if (data) {
      showMessage(typeOfMessage.SUCCESS, "Đăng ký thành công");
      router.push(APP_URL.LOGIN);
    }
    setLoading(false);
  };

  return {
    onRegister,
    loading,
  };
};

export { useRegisterHook };
