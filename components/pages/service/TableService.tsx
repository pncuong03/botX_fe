import Nodata from "@components//NoData";
import { Button, Table } from "antd";
import { useAppDispatch } from "hooks/useStore";
import { useTranslation } from "next-i18next";
import { handleSeclectService } from "redux/service/slice";
import { useMemo } from "react";
import FavouriteStatus from "../home/FavouriteStatus";
import { useHomeHook } from "../home/hooks";

const TableService = ({ servicesData }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { addToCart } = useHomeHook();

  const onOpenModalBuy = (service: any) => {
    dispatch(handleSeclectService({ visible: true, service } as any));
  };

  const columns = [
    {
      title: "",
      key: "id",
      dataIndex: "id",
      width: "3%",
      render: function renderData(id: any, values: any) {
        return (
          <FavouriteStatus id={id} status={values?.favourite as boolean} />
        );
      },
    },
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
      title: t("home.name"),
      dataIndex: "title",
      key: "name",
      width: "20%",
      render: function renderData(name: any) {
        return <div className="text-dark">{name}</div>;
      },
    },
    {
      title: t("home.desc"),
      dataIndex: "desc",
      key: "desc",
      width: "40%",
      render: function renderData(description: any) {
        return <div className="text-dark">{description}</div>;
      },
    },
    {
      title: `${t("home.price")} $`,
      dataIndex: "price",
      key: "price",
      width: "10%",
      render: function renderData(price: number) {
        return <div className="text-dark">{price}</div>;
      },
    },
    {
      title: t("home.action"),
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: function renderData(id: any, data: any) {
        return (
          <div className="btn-action">
            <img
              src="/svg/shopping-cart.svg"
              alt="shopping"
              className="icon-shopping"
              onClick={() => addToCart(id)}
            />
            <Button className="btn-buy" onClick={() => onOpenModalBuy(data)}>
              {t("home.buy")}
            </Button>
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
        dataSource={servicesData}
        locale={{
          emptyText: RenderEmptyData,
        }}
        pagination={false}
        scroll={{ x: 600 }}
      />
    </div>
  );
};

export default TableService;
