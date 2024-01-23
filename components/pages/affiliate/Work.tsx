import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { useTranslation } from "next-i18next";
import { useAffiliateHook } from "./hooks";
import moment from "moment";

const work = ["home.shareCode", "home.earn", "home.special", "home.pauout"];

function Work({ affiliateUser, ordersWithdrawn }: any) {
  const { t } = useTranslation();

  const { numberRef, amount, totalCommission } = affiliateUser || {};

  const history = [
    {
      value: `${Number(numberRef).toLocaleString()}`,
    },
    {
      value: `$ ${Number(amount).toLocaleString()}`,
    },
    {
      value: `$ ${Number(totalCommission).toLocaleString()}`,
    },
  ];

  return (
    <div className="work">
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={11} className="section-commission">
          <div className="commission">
            <div className="title">
              <img src="\svg\table.svg" alt="" />
              <div className="title-text">{t("home.payCommission")}</div>
            </div>

            <div className="history">
              <div className="container">
                <div className="item">{t("home.payNumber")}</div>
                <div className="item">{t("home.payAmount")}</div>
                <div className="item">{t("home.payCom")}</div>
              </div>
              <div className="containerr">
                <div className="con">
                  {history.map((item, index) => (
                    <div key={index}>{item.value}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="commission">
            <div className="title">
              <img src="/svg/orange.svg" alt="" />
              <h5 className="title-text">{t("home.affHistory")}</h5>
            </div>

            <div className="history">
              <div className="containerWith">
                <div className="item">#</div>
                <div className="itemtime">{t("home.payTime")}</div>
                <div className="itemamount">{t("home.payAmount")}</div>
                <div className="itemstatus">{t("home.payStatus")}</div>
              </div>
              <div className="containerr">
                <div className="">
                  {ordersWithdrawn?.map((item: any, index: number) => (
                    <div className="withdrawn" key={index}>
                      {item.value}
                      <div className="id">{item?.id}</div>
                      <div className="time">
                        {moment(item?.createdAt).format(
                          "DD/MM/YYYY | HH:mm:ss"
                        )}
                      </div>
                      <div className="amount">{item?.amountVnd}</div>

                      <div className="st">
                        <div
                          className="status"
                          data-status={item?.statusWithdrawn}
                        >
                          {item?.statusWithdrawn}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={13} className="section-work">
          <div className="commission">
            <div className="title">
              <img src="\svg\blue.svg" alt="" />
              <div className="title-text">{t("home.payWork")}</div>
            </div>
            <div className="containerrr">
              {work.map((item, index) => (
                <div key={index} className="item">
                  <li>{t(item)}</li>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Work;
