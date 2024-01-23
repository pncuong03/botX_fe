import { useAppSelector } from "hooks/useStore";
import PrivateLayout from "@components//Layout/Private";
import { GetServerSideProps } from "next";
import { wrapper } from "redux/configStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Col, Row } from "antd";
import TableOrder from "@components//pages/checkout/TableOrder";
import FormBuy from "@components//pages/checkout/FormBuy";
import { selectServiceCheckout } from "redux/service/selector";

function Checkout() {
  const { t } = useTranslation();
  const servicesCheckout = useAppSelector(
    selectServiceCheckout.getServiceCheckout
  );

  return (
    <PrivateLayout title={t("home.orderConfirm")}>
      <div className="page-checkout  ">
        <Row gutter={[30, 20]}>
          <Col xs={24} sm={14}>
            <TableOrder servicesCheckout={servicesCheckout} />
          </Col>
          <Col xs={24} sm={10}>
            <FormBuy servicesCheckout={servicesCheckout} />
          </Col>
        </Row>
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

export default Checkout;
