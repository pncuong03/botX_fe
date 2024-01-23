import { useAppSelector } from "hooks/useStore";
import { useHomeHook } from "../pages/home/hooks";
import { selectAccessToken } from "redux/authentication/selector";
import { useEffect } from "react";
import { getToken } from "services/api";

const WrapConponent = ({ children }: any) => {
  const { getAllCart, getAllNoti, getUserInfo, getCategotirsSerive } =
    useHomeHook();
  const accessToken = useAppSelector(selectAccessToken.getToken);

  useEffect(() => {
    if (accessToken) {
      getToken(accessToken);
      getAllCart();
      getAllNoti();
      getUserInfo();
      getCategotirsSerive();
    }
  }, []);
  return <div>{children}</div>;
};

export default WrapConponent;
