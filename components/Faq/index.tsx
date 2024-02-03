import { Collapse } from "antd";
import { useTranslation } from "next-i18next";
const { Panel } = Collapse;

const Faq = () => {
  const { t } = useTranslation();

  const faqData = [
    {
      header: t("home.whatsXs"),
      content: t("home.xsShop"),
      // img: "/images/whatX.png",
    },
    {
      header: t("home.howPurchase"),
      content: t("home.Topay"),
      // img: "/images/how-buy.png",
    },
    {
      header: t("home.whatIs"),
      content: t("home.haveSeen"),
      // img: "/images/wrong.png",
    },
    {
      header: t("home.howRe"),
      // img: "/images/how-recharge.png",
      content: t("home.toTop"),
    },

    {
      header: t("home.iMade"),
      content: t("home.ocfcEnter"),
      // img: "/images/money-x.png",
    },
    {
      header: t("home.isCancel"),
      content: t("home.weDo"),
      // img: "/images/cancel-order.png",
    },
    {
      header: t("home.warrantly"),
      content: t("home.inCase"),
      // img: "/images/policy.png",
    },
  ];

  return (
    <Collapse
      defaultActiveKey={["0"]}
      bordered={false}
      expandIconPosition="right"
    >
      {faqData.map((data, k: number) => (
        <Panel
          header={<div dangerouslySetInnerHTML={{ __html: data.header }} />}
          key={String(k)}
        >
          <p dangerouslySetInnerHTML={{ __html: data.content }} />
          {/* <img className="img-faq" src={data?.img} alt="" /> */}
        </Panel>
      ))}
    </Collapse>
  );
};

export default Faq;
