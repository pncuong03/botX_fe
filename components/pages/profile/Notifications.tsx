import moment from "moment";
import { useTranslation } from "next-i18next";

const Notifications = ({ notiData }: any) => {
  const { t } = useTranslation();

  return (
    <div className="notification">
      {notiData?.items?.map((item: any, k: number) => (
        <div className="notification__item" key={k}>
          <div className="notification__header">
            <div className="notification__status">
              <img src="/svg/noti.svg" alt="noti" />
              <div hidden={item?.isSeen}>{t("home.new")}</div>
            </div>
            <div className="notification__time">
              {moment(item?.createdAt).fromNow()}
            </div>
          </div>
          <div className="notification__name">{item?.title}</div>
          <div className="notification__desc">{item?.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
