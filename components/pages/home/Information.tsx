import { Col, Row } from "antd";
import { APP_URL } from "constants/routes";
import { useAppSelector } from "hooks/useStore";
import { useTranslation } from "next-i18next";
import { selectUserInfo } from "redux/authentication/selector";
import { handleCopyInClipboard } from "utils";
import Link from "next/link";

type Props = {
  isEdit?: boolean;
};

const Information = ({ isEdit = false }: Props) => {
  const user = useAppSelector(selectUserInfo.getUser);
  
  const { t } = useTranslation();

  const {
    balanceSys,
    refId,
    username,
    email,
    phoneNumber,
    spent,
    numberOrder,
    avatarUrl,
  } = user || {};

  
  const dataInfo = [
    {
      img: "/images/balance.png",
      name: t("home.balance"),
      value: `$ ${Number(balanceSys || 0).toLocaleString()}`,
    },
    {
      img: "/images/order.png",
      name: t("home.orderNumber"),
      value: `${Number(numberOrder || 0).toLocaleString()}`,
    },
    {
      img: "/images/spent.png",
      name: t("home.spent"),
      value: `$ ${Number(spent || 0).toLocaleString()}`,
    },
  ];
  

  return (
    <div className="home">
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={16} className="col-info">
          <div className="home__info">
            <div className="home__user">
              <img src={avatarUrl || "/images/avatar-default.jpg"} alt="" />
              <div>
                <div className="home__user-name">
                  {username || email || phoneNumber}
                  {isEdit && (
                    <Link href={APP_URL.PROFILE_EDIT}>
                      <img src="/svg/edit.svg" className="btn-edit" />
                    </Link>
                  )}
                </div>
                <div className="home__user-email">{email}</div>
                <div className="code-ref">
                  <div>
                    {t("home.codeRef")}: <span>{refId}</span>
                  </div>
                  <img
                    src="/svg/copy.svg"
                    alt=""
                    className="icon-copy"
                    onClick={(e) => handleCopyInClipboard(e, refId)}
                  />
                </div>
              </div>
            </div>
            <Row gutter={[20, 20]}>
              {dataInfo?.map((item, k) => (
                <Col key={k} xs={24} sm={24} md={8}>
                  <div
                    className="info-user"
                    style={{
                      backgroundImage: `url(${item?.img})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div>
                      <div className="label">{item?.name}</div>
                      <div className="value">{item?.value}</div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} className="section-affilicate">
          <div className="affilicate">
            <div className="main">
              <div className="code">Affiliate</div>
              <div className="copy">
                {refId}
                <img
                  src="/svg/copy.svg"
                  alt=""
                  className="icon-copy"
                  onClick={(e) => handleCopyInClipboard(e, refId)}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Information;
