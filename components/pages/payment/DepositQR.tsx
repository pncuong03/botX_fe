import { CURRENCY_VALUE } from "../../../constants";
import { useTranslation } from "next-i18next";
import { handleCopyInClipboard } from "utils";

const DepositQR = ({ transferContent, tranferAmount, currency }: any) => {
  const { t } = useTranslation();
  const isUsd = currency === CURRENCY_VALUE.USD;

  return (
    <div className="">
      <div className="pay-qr">
        <div className="recharge">
          {t("home.payRecharge")} + ${Number(tranferAmount).toLocaleString()}
        </div>
        <img

          // src="/images/qr-payment-off.jpg"
          src="/images/qr-payment-khanh.jpeg"

          alt="qr-payment"
          className="img-qr"
          hidden={isUsd}
        />
      </div>
      <div className="section-note">
        <div hidden={!isUsd} className="note-payment">
          {t("home.pleaseSend")}:
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.paypal.me/johnlahboo"
          >
            https://www.paypal.me/johnlahboo
          </a>
        </div>
        <div className="name-qr" hidden={!isUsd}>
          <div className="name">{t("home.payContent")}</div>
          <div className="nameQR">
            {transferContent}{" "}
            <img
              src="/svg/copy.svg"
              alt=""
              className="icon-copy"
              onClick={(e) => handleCopyInClipboard(e, transferContent)}
            />
          </div>
        </div>
      </div>

      <div className="user-qr" hidden={isUsd}>
        <div className="name-qr">
          <div className="name">{t("home.payAccount")}</div>

          <div className="nameQR">NGUYEN QUOC KHANH</div>

        </div>
        <div className="name-qr">
          <div className="name">{t("home.payNum")}</div>
          <div className="nameQR">

            2152866948{" "}

            <img
              src="/svg/copy.svg"
              alt=""
              className="icon-copy"

              onClick={(e) => handleCopyInClipboard(e, "2152866948")}

            />
          </div>
        </div>
        <div className="name-qr">
          <div className="name">{t("home.payBank")}</div>
          <div className="nameQR">Ngân hàng VCB chi nhánh Ba Đình</div>
        </div>
        <div className="name-qr">
          <div className="name">{t("home.payContent")}</div>
          <div className="nameQR">
            {transferContent}{" "}
            <img
              src="/svg/copy.svg"
              alt=""
              className="icon-copy"
              onClick={(e) => handleCopyInClipboard(e, transferContent)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositQR;
