// Header.tsx

import React, { useState } from "react";
import { Drawer } from "antd";
import Link from "next/link";
import { APP_URL } from "constants/routes";

const Header: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <header id="header" className="header">
      <div className="logo">
        {/* <img className="img" src="/images/logo.png" alt="" /> */}
      </div>

      <div className="content">
        <a href="#services-section">
          <img src="/svglanding/se.svg" alt="" />
        </a>
        <a href="#faq-section">
          <img src="/svglanding/faq.svg" alt="" />
        </a>
        <Link href={APP_URL.DASHBOARD}>
          <a className="abt">Launch app</a>
        </Link>
        <div className="icon-menu" onClick={showDrawer}>
          <img src="/svglanding/menu.svg" alt="" />
        </div>
      </div>
      <Drawer
        className="menu"
        title="MENU"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={drawerVisible}
      >
        <a href="#services-section">
          <img src="/svglanding/se.svg" alt="" />
        </a>
        <a href="#faq-section">
          <img src="/svglanding/faq.svg" alt="" />
        </a>
        <Link href={APP_URL.DASHBOARD}>
          <a className="bt">Launch app</a>
        </Link>

        <button className="bt" onClick={onClose}>
          Close
        </button>
      </Drawer>
    </header>
  );
};

export default Header;
