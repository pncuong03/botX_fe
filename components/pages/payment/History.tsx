import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "hooks/useStore";
import { selectUserInfo } from "redux/authentication/selector";
import moment from "moment";

function Payment({ payments }: any) {
  const { t } = useTranslation();

  const user = useAppSelector(selectUserInfo.getUser);

  return (
    <div className="payment-history">
      <div className="main title-note">{t("home.noteTransfer")}</div>
      <div className="main">
        <div className="title">
          <img src="\svg\blue.svg" alt="" />
          <h5 className="title-text">{t("home.payHistory")}</h5>
        </div>
        <div className="history">
          <div className="container">
            <div className="item">{t("home.payContent")}</div>
            <div className="itemtime">{t("home.payTime")}</div>
            <div className="itemam">{t("home.payAmount")}</div>
            <div className="itemst">{t("home.payStatus")}</div>
          </div>

          <>
            {payments && payments.length > 0 ? (
              <div className="containerr">
                {payments?.map((item: any, index: number) => (
                  <div className="item" key={index}>
                    <div className="content">
                      <div>{item?.content}</div>
                      <div className="timee">
                        {moment(item?.createdAt).format(
                          "DD/MM/YYYY | HH:mm:ss"
                        )}
                      </div>
                    </div>
                    <div className="time">
                      {moment(item?.createdAt).format("DD/MM/YYYY | HH:mm:ss")}
                    </div>
                    <div className="amount">{item?.amountSys}</div>
                    <div className="st">
                      <div className={`status ${item?.statusPayment}`}>
                        {item?.statusPayment}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <img className="img" src="\svg\history.svg" alt="" />
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default Payment;
