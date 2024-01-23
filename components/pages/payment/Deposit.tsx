import React, { useState } from "react";
import FormItem, { TYPE_INPUT } from "@components//FormItem";
import { Button, Col, Modal, Row } from "antd";
import { Formik, Form } from "formik";
import { useTranslation } from "next-i18next";
import DepositQR from "./DepositQR";
import { PaymentHook } from "./hooks";
import { amountPaymentSchema, paymentSchema } from "utils/schema";
import { CURRENCY_VALUE, NAME_CURRENCY } from "../../../constants";
import { formatLongText, handleCopyInClipboard } from "utils";
import { APP_URL } from "constants/routes";
import { useRouter } from "next/router";
import showMessage from "@components//Message";
import TYPE_CONSTANTS from "constants/type";

const addressPublic = "0x35af935d45839077603f9DB320242e8F592896D4";
const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

function Deposit({ getListPayment, params, payment }: any) {
  const { postPayment } = PaymentHook();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const { t } = useTranslation();

  const [showqr, setShowQR] = useState({
    isShow: false,
    content: " ",
    money: " ",
    currency: "",
  });

  const { currency } = payment || {};

  const CURRENCY = Object.keys(NAME_CURRENCY).map((key) => ({
    name: NAME_CURRENCY[key],
    value: key,
  }));

  const onPaymentSuccess = (data: any) => {
    setShowQR({
      isShow: true,
      content: data?.content,
      money: data?.amountSys,
      currency: data?.currency,
    });
    getListPayment(params);
    if ([CURRENCY_VALUE.VND, CURRENCY_VALUE.USD].includes(data?.currency)) {
      showMessage(typeOfMessage.SUCCESS, t("home.createInvoice"));
    } else {
      setOpenModal(true);
    }
  };

  const onSubmit = (data: any) => {
    const { currency, amountDeposit, txHash } = data;
    if (
      !txHash &&
      ![CURRENCY_VALUE.VND, CURRENCY_VALUE.USD].includes(data?.currency)
    ) {
      return setShowQR((prev) => ({ ...prev, isShow: true, currency }));
    }
    postPayment(
      {
        amountDeposit: Number(amountDeposit),
        currency,
        txHash,
      },
      onPaymentSuccess
    );
  };

  const getAmountConvert = (currencyName: string) => {
    const rate =
      currency?.find((item: any) => item?.name === currencyName)?.rate || 1;
    return rate;
  };

  const isPaymentCrypto =
    [CURRENCY_VALUE.USDT, CURRENCY_VALUE.BNB]?.includes(showqr?.currency) &&
    showqr?.isShow;

  const renderNoteRate = (currency: string) => {
    let contentNote;
    if (currency === CURRENCY_VALUE.USDT) {
      contentNote = `1 USD = ${getAmountConvert(currency)} ${currency}`;
    }
    if (currency === CURRENCY_VALUE.BNB) {
      contentNote = `1 ${currency} = ${getAmountConvert(currency)} USD`;
    }

    if (currency === CURRENCY_VALUE.VND) {
      contentNote = `1 USD = ${Number(
        1 / getAmountConvert(currency)
      ).toLocaleString()} ${currency}`;
    }

    return {
      content: contentNote,
      time: "5/12/2023",
    };
  };

  return (
    <div className="your-account">
      <div className="title">
        <img src="/svg/orange.svg" alt="" />
        <h5 className="title-text">{t("home.payDeposit")}</h5>
      </div>

      {showqr.isShow &&
      (showqr?.currency === CURRENCY_VALUE.VND ||
        showqr?.currency === CURRENCY_VALUE.USD) ? (
        <div>
          <DepositQR
            transferContent={showqr.content}
            tranferAmount={showqr.money}
            currency={showqr?.currency}
          />
        </div>
      ) : (
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            amountDeposit: "",
            currency: CURRENCY_VALUE.VND,
            txHash: "",
          }}
          validationSchema={
            !showqr.isShow ? amountPaymentSchema : paymentSchema
          }
        >
          {({ values }) => (
            <Form className="form">
              <div className="row-currency">
                <div
                  hidden={values?.currency === CURRENCY_VALUE.USD}
                  dangerouslySetInnerHTML={{
                    __html: t(
                      "home.noteRate",
                      renderNoteRate(values?.currency)
                    ),
                  }}
                />
              </div>

              {!isPaymentCrypto && (
                <Row gutter={[10, 20]}>
                  <Col xs={18} sm={18}>
                    <FormItem
                      className="formitem-vnd"
                      typeInput={TYPE_INPUT.NUMBER}
                      name="amountDeposit"
                      placeholder={t("home.amountDeposit")}
                    />
                  </Col>
                  <Col xs={6} sm={6}>
                    <FormItem
                      className="select-currency"
                      typeInput={TYPE_INPUT.SELECT}
                      options={CURRENCY}
                      name="currency"
                      placeholder={t("home.selectCurrency")}
                    />
                  </Col>
                </Row>
              )}

              {CURRENCY_VALUE.USD !== values?.currency && !showqr.isShow && (
                <FormItem
                  className="formitem-usd"
                  typeInput={TYPE_INPUT.NUMBER}
                  name="usd"
                  placeholder={"Amount receive($)"}
                  value={
                    Number(values?.amountDeposit || 0) *
                    Number(getAmountConvert(values?.currency))
                  }
                  disabled
                />
              )}

              {isPaymentCrypto && (
                <div>
                  <div
                    className="section-back"
                    onClick={() =>
                      setShowQR((prev) => ({ ...prev, isShow: false }))
                    }
                  >
                    <img src="/svg/left-arrow.svg" alt="left arrow" />
                    {t("home.back")}
                  </div>
                  <div className="qr-crypto">
                    <img
                      src="/images/qr-crypto-final.PNG"
                      style={{ maxWidth: 200 }}
                      alt="qr-crypto"
                    />
                    <div className="name-qr">
                      <div className="name">{t("home.myAddress")}</div>
                      <div className="address">
                        {formatLongText(addressPublic, 6, 6)}{" "}
                        <img
                          src="/svg/copy.svg"
                          alt=""
                          className="icon-copy"
                          onClick={(e) =>
                            handleCopyInClipboard(e, addressPublic)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isPaymentCrypto && (
                <FormItem
                  className="formitem-vnd"
                  typeInput={TYPE_INPUT.TEXT}
                  name="txHash"
                  placeholder={t("home.txId")}
                />
              )}

              <Button className="button" htmlType="submit">
                {t("home.payRecharge")}
              </Button>
            </Form>
          )}
        </Formik>
      )}
      <Modal
        open={openModal}
        footer={false}
        onCancel={() => router.push(APP_URL.DASHBOARD)}
      >
        <div className="modal-success">
          <img src="/images/banner-success.png" alt="banner-success" />
          <div className="title">{t("home.titleSuccess")}</div>
          <div className="desc">{t("home.subSuccess")}</div>
        </div>
      </Modal>
    </div>
  );
}

export default Deposit;
