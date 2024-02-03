import { Menu, MenuProps } from "antd";
import classNames from "classnames";
import { APP_URL, getMenuItems } from "constants/routes";
import { useAppSelector } from "hooks/useStore";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { selectUserInfo } from "redux/authentication/selector";
import { selectCategories } from "redux/service/selector";

type MenuItem = Required<MenuProps>["items"][number];

const AppSideBar = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [openKeys, setOpenKeys] = useState([]) as any;

  const { id } = router.query;

  const user = useAppSelector(selectUserInfo.getUser);
  const categories = useAppSelector(selectCategories.getCategories);

  const { username, email, phoneNumber, avatarUrl, balanceSys } = user || {};

  
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  // const itemsMenu = (
  //   subMenu: any,
  //   title: string,
  //   icon: string,
  //   urlParent: string
  // ): MenuItem[] => {
  //   const items = [];
  //   for (let i = 0; i < subMenu.length; i++) {
  //     items.push(getItem(t(subMenu[i]?.subName), subMenu[i]?.id));
  //   }
  //   return [getItem(title, urlParent, <img src={icon} alt={title} />, items)];
  // };

  const onClickSubmenu: MenuProps["onClick"] = (e) => {
    router.push({
      pathname: APP_URL.SERVICE,
      query: { id: e?.key },
    });
  };

  const onOpenChange: MenuProps["onOpenChange"] = (keys: any) => {
    setOpenKeys(keys);
  };

  useEffect(() => {
    if (id) {
      setOpenKeys([Number(id), router.pathname]);
    }
  }, [id]);

    
  return (
    <div className="app-sidebar">
      <div>
        <Link href={APP_URL.DASHBOARD}>
          <div className="title">
            <img src="/svg/logos.svg" alt="" height={60} width={60} />
            XFarm.shop
          </div>
        </Link>
        <div className="user-info">
          <img
            src={avatarUrl || "/images/avatar-default.jpg"}
            alt={username || email || phoneNumber}
            className="avatar"
          />
          {username && (
            <div className="username">{username || phoneNumber}</div>
          )}
          {email && <div className="email">{email}</div>}
          <span className="balance">
            <img src="/svg/wallet.svg" alt="wallet" />{" "}
            {Number(balanceSys || 0).toLocaleString()}
          </span>
        </div>
        <div className="menu">
          {getMenuItems(categories)?.map((item: any, k: number) => (
            <>
              {/* {item?.subMenu ? (
                <Menu
                  style={{ width: 240 }}
                  mode="inline"
                  items={itemsMenu(
                    item?.subMenu,
                    t(item?.name),
                    item?.icon,
                    item?.url
                  )}
                  onClick={onClickSubmenu}
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                  defaultSelectedKeys={[router.asPath]}
                />
              ) : ( */}
                <Link href={item?.url} key={k}>
                  <div
                    key={k}
                    className={classNames("menu__item", {
                      active: item?.url === router.pathname,
                    })}
                  >
                    <img src={item?.icon} />
                    <div>{t(item?.name)}</div>
                  </div>
                </Link>
              {/* )} */}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppSideBar;
