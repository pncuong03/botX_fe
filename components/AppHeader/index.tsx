import { Badge, Drawer, Grid, Popover } from "antd";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppSelector } from "hooks/useStore";
import {
  selectCategories,
  selectMyCart,
  selectNotiData,
} from "redux/service/selector";
import { EVENT_SOCKET, LANGUAGES } from "../../constants/index";
import { APP_URL, getMenuItems } from "constants/routes";
import Link from "next/link";
import classNames from "classnames";
import { useHomeHook } from "../pages/home/hooks";
import { useLoginHook } from "../pages/login/hooks";
import { useSocket } from "hooks/useSocket";
import Notifications from "../pages/profile/Notifications";
import MyCart from "../pages/profile/MyCart";
import AppSideBar from "../AppSideBar";

type Props = {
  title?: string;
};

enum TYPE_DRAWER {
  NOTI = "NOTI",
  CART = "CART",
  MENU = "MENU",
}

const { useBreakpoint } = Grid;

const HeaderApp = ({ title }: Props) => {
  const router = useRouter();
  const [drawer, setDrawer] = useState({
    open: false,
    type: "",
  });

  const { md } = useBreakpoint();

  const { t } = useTranslation();
  const { getAllNoti } = useHomeHook();
  const { onLogout } = useLoginHook();
  const listCartData = useAppSelector(selectMyCart.getMyCart);
  const notiData = useAppSelector(selectNotiData.getNotiList);

  const { pathname, asPath, query, locale } = router;

  useSocket({
    event: EVENT_SOCKET.NEW_NOTI,
    handleEvent: (data: any) => {
      getAllNoti();
    },
  });

  const changeLanuage = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale: locale });
  };

  const toggleDrawer = (type: TYPE_DRAWER | any) => {
    reCallGetNoti();
    setDrawer({ type, open: !drawer.open });
  };

  const reCallGetNoti = () => {
    if (drawer?.type === TYPE_DRAWER.NOTI && drawer.open) {
      const isExistNotiNotSeen =
        notiData?.items?.filter((item: any) => !item?.isSeen)?.length > 0;
      isExistNotiNotSeen && getAllNoti({ updateSeen: true });
    }
  };

  const Items = [
    {
      logo: "/svg/shopping-cartt.svg",
      key: TYPE_DRAWER.CART,
      count: listCartData?.length,
    },
    {
      logo: "/svg/notification-bing.svg",
      key: TYPE_DRAWER.NOTI,
      count: notiData?.numberNotiNotSeen,
    },
  ];

  const ContentLanguage = () => {
    return (
      <div className="language">
        <div onClick={() => changeLanuage(LANGUAGES.VIETNAMESE)}>
          Vietnamese
        </div>
        <div onClick={() => changeLanuage(LANGUAGES.ENGLISH)}>English</div>
      </div>
    );
  };

  return (
    <div className="header-app">
      <div className="title">
        {!md ? (
          <Link href={APP_URL.DASHBOARD}>
            <div>
              <img width={40} height={30} src="/svg/logos.svg" alt="" />
            </div>
          </Link>
        ) : (
          title
        )}
      </div>
      <div className="logo-header">
        {Items?.map((item: any, k: number) => (
          <Badge className="badge-icon" key={k} count={item?.count}>
            <img
              src={item?.logo}
              alt=""
              onClick={() => toggleDrawer(item?.key)}
            />
          </Badge>
        ))}
        <Popover placement="bottom" content={ContentLanguage}>
          <img
            src={
              locale === LANGUAGES.ENGLISH
                ? "/svg/america.svg"
                : "/svg/vietnamese.jpg"
            }
            width={24}
            height={24}
          />
        </Popover>

        <img src="/svg/menu-logout.svg" alt="" onClick={onLogout} />
        <img
          src="/svg/menu.svg"
          alt=""
          onClick={() => toggleDrawer(TYPE_DRAWER.MENU)}
          className="menu-header"
        />
      </div>
      <Drawer
        title={
          drawer.type === TYPE_DRAWER.CART
            ? t("home.myCart")
            : drawer.type === TYPE_DRAWER.NOTI
            ? t("home.notice")
            : t("home.menu")
        }
        placement="right"
        onClose={() => toggleDrawer("")}
        open={drawer.open}
        width={!md ? 360 : 500}
        extra={
          <img
            src="/svg/close.svg"
            alt="icon close"
            className="icon-close"
            onClick={() => toggleDrawer("")}
          />
        }
        closeIcon={false}
      >
        {drawer.type === TYPE_DRAWER.CART && <MyCart />}
        {drawer.type === TYPE_DRAWER.NOTI && (
          <Notifications notiData={notiData} />
        )}
        {drawer.type === TYPE_DRAWER.MENU && <AppSideBar />}
      </Drawer>
    </div>
  );
};

export default HeaderApp;
