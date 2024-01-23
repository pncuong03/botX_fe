import Nodata from "@components//NoData";
import { Table } from "antd";
import { useTranslation } from "next-i18next";
import { formatLongText } from "utils";

const TableOrder = ({ servicesCheckout }: any) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("home.name"),
      dataIndex: "name",
      key: "name",
      width: "35%",
      render: function renderData(name: any, values: any) {
        return (
          <div>
            <div className="text-dark">{name}</div>
            <div className="text-light">{values?.desc}</div>
          </div>
        );
      },
    },
    {
      title: t("home.link"),
      dataIndex: "link",
      key: "link",
      width: "25%",
      render: function renderData(link: any) {
        return (
          <div className="text-link">
            <a target="__blank" href={link}>
              {formatLongText(link)}
            </a>
          </div>
        );
      },
    },
    {
      title: t("home.quantity"),
      dataIndex: "quantity",
      key: "quantity",
      width: "20%",
      render: function renderData(quantity: any, values: any) {
        return (
          <div>
            <div className="text-dark">
              x {Number(quantity).toLocaleString()}
            </div>
            <div className="text-light">
              $ {Number(values?.price).toLocaleString()}
            </div>
          </div>
        );
      },
    },
    {
      title: t("home.total"),
      dataIndex: "price",
      key: "price",
      width: "20%",
      render: function renderData(price: number, values: any) {
        return (
          <div className="text-dark">
            <div>
              ${" "}
              {Number(
                Number(price) * Number(values?.quantity)
              ).toLocaleString()}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={servicesCheckout}
        locale={{
          emptyText: <Nodata title={t("home.noOrder")} />,
        }}
        pagination={false}
        scroll={{ x: 500, y: 600 }}
      />
    </div>
  );
};
export default TableOrder;
