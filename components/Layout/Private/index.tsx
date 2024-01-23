import HeaderApp from "@components//AppHeader";
import AppSideBar from "@components//AppSideBar";
import Contact from "@components//Contact";
import FormBuy from "@components//FormBuy";
import HeadSEO from "@components//HeadSeo";
import { Button, Col, Modal, Row } from "antd";
import { APP_URL } from "constants/routes";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { selectAccessToken } from "redux/authentication/selector";
import {
  selectServiceDetail,
  selectShowModalSuccess,
} from "redux/service/selector";
import { handleSeclectService, setShowModalSuccess } from "redux/service/slice";

function PrivateLayout({ children, title }: any) {
  const formRef = useRef(null) as any;
  const router = useRouter();

  const { visible, service } =
    useAppSelector(selectServiceDetail.getServiceDetail) || {};
  const isShowModalSuccess = useAppSelector(
    selectShowModalSuccess.getStatusShow
  );
  const accessToken = useAppSelector(selectAccessToken.getToken);

  useEffect(() => {
    if (!accessToken) {
      router.push(APP_URL.LOGIN);
    }
  }, [accessToken]);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onCancelModalBuy = () => {
    dispatch(handleSeclectService({ visible: false, service: {} } as any));
    formRef?.current?.handleReset();
  };

  const onCancelModalSuccess = () => {
    dispatch(setShowModalSuccess(false as any));
  };

  return (
    <>
      {accessToken ? (
        <div className="private-layout ">
          <HeadSEO title="xspeeder.shop" />
          <Row gutter={[20, 20]} className="row-main">
            <Col className="ant-col-left">
              <AppSideBar />
            </Col>
            <Col className={"ant-col-right"}>
              {/* <div className="warning-bar">{t("home.stopWeb")}</div> */}
              <HeaderApp title={title} />
              <div className="children">
                <div className="title-mobile">{title}</div>
                <div>{children}</div>
              </div>
            </Col>
          </Row>
          <Modal
            open={visible}
            footer={false}
            onCancel={onCancelModalBuy}
            width={950}
          >
            <div className="service">
              <FormBuy
                service={service}
                title={t("home.serviceDetail")}
                ref={formRef}
              />
            </div>
          </Modal>
          <Modal
            open={isShowModalSuccess}
            footer={false}
            onCancel={onCancelModalSuccess}
            width={600}
          >
            <div className="modal-sucess">
              <img src="/images/banner-success.png" alt="banner-success" />
              <div className="title">{t("home.orderPlaced")}</div>
              <Link href={APP_URL.PROFILE}>
                <Button onClick={onCancelModalSuccess}>
                  {t("home.backProfile")}
                </Button>
              </Link>
            </div>
          </Modal>
          <Contact />
        </div>
      ) : null}
    </>
  );
}

export default PrivateLayout;
