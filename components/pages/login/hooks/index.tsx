import showMessage from "@components//Message";
import TYPE_CONSTANTS from "constants/type";
import { useAppDispatch } from "hooks/useStore";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { handleSetToken, handleSetUser } from "redux/authentication/slice";
import listServices from "services/service";
import { useGoogleLogin } from "@react-oauth/google";
import { APP_URL } from "constants/routes";

const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

const useLoginHook = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const onLogin = async (params: any) => {
    setLoading(true);
    const data: any = await listServices.login(params);
    if (data) {
      dispatch(handleSetToken(data?.accessToken));
      router.push(APP_URL.DASHBOARD);
      showMessage(typeOfMessage.SUCCESS, t("home.loginSuccess"));
    }
    setLoading(false);
  };

  const onloginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const response = codeResponse;
      if (response) {
        const data = await listServices.loginGoogle({
          tokenIdOAuth: response?.access_token,
        });

        dispatch(handleSetToken(data?.accessToken));
        router.push(APP_URL.DASHBOARD);
        showMessage(typeOfMessage.SUCCESS, t("home.loginSuccess"));
      }
    },
  });

  const onLogout = () => {
    dispatch(handleSetToken(null as any));
    dispatch(handleSetUser({} as any));
    router.push("/login");
    showMessage(typeOfMessage.SUCCESS, t("home.logoutSuccess"));
  };

  return {
    onLogin,
    loading,
    onLogout,
    onloginGoogle,
  };
};

export { useLoginHook };
