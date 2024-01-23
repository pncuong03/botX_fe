import PrivateLayout from "@components//Layout/Private";
import { GetServerSideProps } from "next";
import { wrapper } from "redux/configStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Total from "@components//pages/affiliate/Total";
import Work from "@components//pages/affiliate/Work";
import { useEffect } from "react";
import { useAffiliateHook } from "@components//pages/affiliate/hooks";

function ProfilePage() {
  const { t } = useTranslation();
  const {
    getAffiliateInfo,
    affiliateUser,
    getWithdrawn,
    ordersWithdrawn,
    params,
  } = useAffiliateHook();

  useEffect(() => {
    getAffiliateInfo();
    getWithdrawn(params);
  }, [params]);

  return (
    <PrivateLayout title={t("home.affiliates")}>
      <div className="page-affiliate">
        <Total
          affiliateUser={affiliateUser}
          getWithdrawn={getWithdrawn}
          params={params}
        />
        <Work affiliateUser={affiliateUser} ordersWithdrawn={ordersWithdrawn} />
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
