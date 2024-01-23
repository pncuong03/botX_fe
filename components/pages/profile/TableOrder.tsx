import { Table } from "antd";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import Nodata from "@components//NoData";
import moment from "moment";
import { FORMAT_TIME } from "../../../constants";
import { formatLongText } from "utils";

const TableOrder = ({ ordersHistoryData }: any) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("home.idService"),
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: function renderData(id: any) {
        return <div className="text-dark">{id}</div>;
      },
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: "10%",
      render: function renderData(link: any) {
        return (
          <a target="_blank" rel="noreferrer" href={link} className="text-link">
            {formatLongText(link)}
          </a>
        );
      },
    },
    {
      title: t("home.purchaseDate"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: "30%",
      render: function renderData(createdAt: any) {
        return (
          <div className="text-dark">
            {moment(createdAt).format(FORMAT_TIME)}
          </div>
        );
      },
    },
    {
      title: t("home.price"),
      dataIndex: "price",
      key: "price",
      width: "10%",
      render: function renderData(price: number) {
        return (
          <div className="text-dark">{Number(price).toLocaleString()}</div>
        );
      },
    },
    {
      title: t("home.service"),
      dataIndex: "service",
      key: "service",
      width: "10%",
      render: function renderData(service: any) {
        return <div className="text-dark">{service?.typeService}</div>;
      },
    },
    {
      title: t("home.amount"),
      dataIndex: "amount",
      key: "amount",
      width: "10%",
      render: function renderData(amount: number) {
        return <div className="text-dark">{Number(amount)}</div>;
      },
    },
    {
      title: t("home.status"),
      dataIndex: "statusOrder",
      key: "statusOrder",
      width: "10%",
      render: function renderData(statusOrder: any, data: any) {
        return (
          <div
            className={statusOrder === "processing" ? "active" : statusOrder}
          >
            {statusOrder === "processing" ? "Active" : statusOrder}
          </div>
        );
      },
    },
  ];

  const RenderEmptyData = useMemo(() => {
    return <Nodata title={t("home.noOrder")} />;
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={ordersHistoryData}
        locale={{
          emptyText: RenderEmptyData,
        }}
        pagination={{ position: ["bottomLeft"] }}
        scroll={{ x: 600 }}
      />
    </div>
  );
};

export default TableOrder;
