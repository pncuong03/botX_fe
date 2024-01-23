import PrivateLayout from "@components//Layout/Private";
import Information from "@components//pages/home/Information";
import { GetServerSideProps } from "next";
import { wrapper } from "redux/configStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import HotTrend from "@components//pages/home/HotTrend";
import { useHomeHook } from "@components//pages/home/hooks";
import { useEffect } from "react";
import HistoryOrder from "@components//pages/profile/HistoryOrder";

function Dashboard() {
  const { t } = useTranslation();
  const { getListService, listServicesData } = useHomeHook();

  useEffect(() => {
    getListService();
  }, []);

  return (
    <PrivateLayout title={t("home.home")}>
      <div className="home page-profile">
        <Information />
        <HotTrend serviceTrendings={listServicesData?.listTrending} />
        <HistoryOrder />
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

export default Dashboard;
