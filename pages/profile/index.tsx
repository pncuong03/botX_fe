import PrivateLayout from "@components//Layout/Private";
import { GetServerSideProps } from "next";
import { wrapper } from "redux/configStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Information from "@components//pages/home/Information";
import HistoryOrder from "@components//pages/profile/HistoryOrder";

function ProfilePage() {
  const { t } = useTranslation();

  return (
    <PrivateLayout title={t("home.profile")}>
      <div className="page-profile">
        <Information isEdit={true} />
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

export default ProfilePage;
