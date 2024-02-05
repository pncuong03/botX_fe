import { Collapse } from "antd";
import { useTranslation } from "next-i18next";
const { Panel } = Collapse;

const Faq = () => {
  const { t } = useTranslation();

  const faqData = [
    {
      header: t("home.whatsXs"),
      content: t("home.xsShop"),
      img: "/images/What is XFarm.shop.png",
    },
    {
      header: t("home.howPurchase"),
      content: t("home.Topay"),
      img: "/images/How to purchase a product.png",
    },
    {
      header: t("home.whatIs"),
      content: t("home.haveSeen"),
      img: "/images/What_is_the_process_to_recover_the_money_if_I_transferred_it_wrongly.png",
    },
    {
      header: t("home.howRe"),
      img: "/images/How to recharge.png",
      content: t("home.toTop"),
    },

    {
      header: t("home.iMade"),
      content: t("home.ocfcEnter"),
      img: "/images/I made a deposit but the money didn't show up in my account.png",
    },
    {
      header: t("home.isCancel"),
      content: t("home.weDo"),
      img: "/images/Is it possible to cancel my order.png",
    },
    {
      header: t("home.warrantly"),
      content: t("home.inCase"),
      img: "/images/What is the warranty policy.png",
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
          <img className="img-faq" src={data?.img} alt="" />
        </Panel>
      ))}
    </Collapse>
  );
};

export default Faq;
