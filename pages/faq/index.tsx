import PrivateLayout from "@components//Layout/Private";
import { GetServerSideProps } from "next";
import { wrapper } from "redux/configStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Faq from "@components//Faq";
import { Col, Row } from "antd";

function Home() {
  const { t } = useTranslation();

  return (
    <PrivateLayout title={t("home.askeQues")}>
      <Row className="faq " gutter={[20, 20]}>
        <Col xs={24} sm={14}>
          <div>
            <Faq />
          </div>
        </Col>
        <Col xs={24} sm={10}>
          <div className="banner-faq">
            <img className="img-faq" src="/images/banner-faq.png" alt="" />
          </div>
        </Col>
      </Row>
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

export default Home;
