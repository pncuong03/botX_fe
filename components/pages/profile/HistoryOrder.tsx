import { Input } from "antd";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import { useProfileHook } from "./hooks";
import TableOrder from "./TableOrder";
import { StatusOrder } from "types";

const HistoryOrder = () => {
  const { t } = useTranslation();
  const { setParams, getOrderHistory, ordersHistoryData, params } =
    useProfileHook();

  useEffect(() => {
    getOrderHistory(params);
  }, [params]);

  const debouncedSearch = useRef(
    debounce((value) => {
      setParams((prev) => ({ ...prev, search: value }));
    }, 700)
  ).current;

  const listTabs = [
    {
      name: t("home.all"),
      key: null,
    },
    {
      name: t("home.active"),
      key: StatusOrder.ACTIVE,
    },
    {
      name: t("home.done"),
      key: StatusOrder.DONE,
    },
    {
      name: t("home.error"),
      key: StatusOrder.ERROR,
    },
  ];

  return (
    <div className="service">
      <div className="service__title">
        <div className="service__dot" />
        {t("home.orderHistory")}
      </div>

      <div>
        <div className="service__header">
          <div className="service__tabs">
            {listTabs?.map?.((item, k: number) => (
              <div
                className={classNames("service__tab", {
                  "tab-active": params?.status === item?.key,
                })}
                key={k}
                onClick={() =>
                  setParams((prev: any) => ({ ...prev, status: item?.key }))
                }
              >
                {item?.name}
              </div>
            ))}
          </div>
          <div>
            <Input
              name="search"
              placeholder="Search"
              onChange={(e) => debouncedSearch(e?.target?.value)}
              prefix={<img src="/svg/search-normal.svg" />}
              className="input-search"
            />
          </div>
        </div>
        <TableOrder ordersHistoryData={ordersHistoryData} />
      </div>
    </div>
  );
};

export default HistoryOrder;
