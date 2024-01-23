import { GetServerSideProps } from "next";
import { wrapper } from "redux/configStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@components//pages/landing/Header";
import Social from "@components//pages/landing/Social";
import Footter from "@components//pages/landing/Footter";

function Home() {
  return (
    <div className="landing">
      <Header />
      <Social />
      <Footter />
    </div>
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
