import { useTranslation } from "next-i18next";

type Props = {
  title?: string;
};

const Nodata = ({ title }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="no-data">
      <div>
        <img src="/images/nodata.png" alt="empty" />
        <div style={{ textAlign: "center" }}>{title || t("home.noData")}</div>
      </div>
    </div>
  );
};
export default Nodata;
