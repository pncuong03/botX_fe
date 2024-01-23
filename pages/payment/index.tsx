import PrivateLayout from "@components//Layout/Private";
import { GetServerSideProps } from "next";
import { wrapper } from "redux/configStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import History from "@components//pages/payment/History";
import Deposit from "@components//pages/payment/Deposit";
import { PaymentHook } from "@components//pages/payment/hooks";
import { useEffect } from "react";

function Payment() {
  const { t } = useTranslation();
  const { getListPayment, params, payment } = PaymentHook();

  useEffect(() => {
    getListPayment(params);
  }, [params]);

  return (
    <PrivateLayout title={t("home.payment")}>
      <div className="page-payment">
        <Deposit
          getListPayment={() => getListPayment(params)}
          params={params}
          payment={payment}
        />
        <History payments={payment?.data} />
      </div>
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(() => async ({ locale }: any) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  });

export default Payment;
