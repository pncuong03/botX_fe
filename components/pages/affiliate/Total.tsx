import React, { useState } from "react";
import { Button, Col, Row, Modal } from "antd";
import { useTranslation } from "next-i18next";
import { handleCopyInClipboard } from "utils";
import { useAppSelector } from "hooks/useStore";
import FormWithdraw from "./formwithdrawn";
import { selectUserInfo } from "redux/authentication/selector";
import listServices from "services/service";

const Total = ({ affiliateUser, params, getWithdrawn }: any) => {
  const { t } = useTranslation();

  const { amount, numberMember, balanceAffi, rate } = affiliateUser || {};

  const [modalVisible, setModalVisible] = useState(false);
  const user = useAppSelector(selectUserInfo.getUser);

  const { refId } = user || {};

  const handleWithdrawButtonClick = () => {
    setModalVisible(true);
  };

  const handleWithdrawCancel = () => {
    setModalVisible(false);
  };

  const dataInfo = [
    {
      img: "/images/total.png",
      name: t("home.payTotal"),
      value: `$ ${Number(amount).toLocaleString()}`,
    },
    {
      img: "/images/number.png",
      name: t("home.payMember"),
      value: `$ ${Number(numberMember).toLocaleString()}`,
    },
    {
      img: "/images/money.png",
      name: t("home.payOrder"),
      value: `$ ${Number(balanceAffi).toLocaleString()}`,
      button: (
        <Button className="btWithdraw" onClick={handleWithdrawButtonClick}>
          Withdraw
        </Button>
      ),
    },
    {
      img: "/images/conversion.png",
      name: t("home.payRate"),
      value: ` ${Number(rate).toLocaleString()} %`,
    },
  ];

  const onWithdraw = async (values: any) => {
    const response = await listServices.createOrderWithdraw({
      ...values,
      balanceAffiWithdrawn: +values?.balanceAffiWithdrawn,
    });

    if (response) {
      getWithdrawn(params);
    }
  };

  return (
    <div className="total">
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={11} className="section-affilicate">
          <div className="affilicate">
            <div className="main">
              <div className="code">{t("home.affiliate")}</div>
              <div className="copy">
                {refId}{" "}
                <img
                  src="/svg/copy.svg"
                  alt=""
                  className="icon-copy"
                  onClick={(e) => handleCopyInClipboard(e, refId)}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={13} className="col-info">
          <div className="home__info">
            <Row gutter={[20, 20]}>
              {dataInfo?.map((item, k) => (
                <Col key={k} xs={24} sm={24} md={12}>
                  <div
                    className="info-user"
                    style={{
                      backgroundImage: `url(${item?.img})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div>
                      <div className="label">{item?.name}</div>
                      <div className="value">
                        {item?.value}
                        {item?.button && <div>{item?.button}</div>}
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>

      <Modal
        className="modal-withdraw"
        open={modalVisible}
        onCancel={handleWithdrawCancel}
        footer={false}
      >
        <FormWithdraw onWithdraw={onWithdraw} />
      </Modal>
    </div>
  );
};

export default Total;
