import CardService from "@components//CardService";
import { Col, Input, Row, Grid } from "antd";
import { useTranslation } from "next-i18next";
import { useHomeHook } from "./hooks";
import classNames from "classnames";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import FormBuy from "@components//FormBuy";
import { DataService } from "types";
import { TYPE_TAB_SERVICE } from "../../../constants/index";
import Nodata from "@components//NoData";
import { handleSeclectService } from "redux/service/slice";
import { useAppDispatch } from "hooks/useStore";

const { useBreakpoint } = Grid;

const Service = () => {
  const { t } = useTranslation();
  const { setParams, params, getListServiceAll, listServicesData } =
    useHomeHook();
  const { md } = useBreakpoint();
  const dispatch = useAppDispatch();

  const [service, setService] = useState<DataService>({});
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    getListServiceAll(params);
  }, [params]);

  useEffect(() => {
    if (listServicesData?.services) {
      setService(listServicesData?.services[0]);
    }
  }, [listServicesData])

  const debouncedSearch = useRef(
    debounce((value) => {
      setParams((prev) => ({ ...prev, search: value }));
    }, 1000)
  ).current;

  const listTabs = [
    {
      name: t("home.all"),
      logo: "/svg/all.svg",
      key: TYPE_TAB_SERVICE.ALL,
    },
    {
      name: t("home.favourite"),
      logo: "/svg/heart-white.svg",
      key: TYPE_TAB_SERVICE.FAVOURITE,
    },
  ];

  console.log(listTabs);
  
  const onBuy = (data: DataService) => {
    if (!md) {
      return dispatch(
        handleSeclectService({ visible: true, service: data } as any)
      );
    }
    setIsSelected(true);
    setService(data);
  };

  useEffect(() => {
    if (isSelected) {
      setTimeout(() => {
        setIsSelected(false);
      }, 500);
    }
  }, [isSelected]);

  return (
    <div className="service">
      <div className="service__title">
        <div className="service__dot" />
        {t("home.service")}
      </div>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} xl={16}>
          <div>
            <div className="service__header">
              <div className="service__tabs">
                {listTabs?.map?.((item, k: number) => (
                  <div
                    className={classNames("service__tab", {
                      active: params?.type === item?.key,
                    })}
                    key={k}
                    onClick={() =>
                      setParams((prev) => ({ ...prev, type: item?.key }))
                      
                    }
                  >
                    <img src={item?.logo} alt="all icon" />
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
            <Row gutter={[20, 20]}>
              {listServicesData?.services?.length > 0 ? (
                listServicesData?.services.map(
                  (item: DataService, k: number) => (
                    <Col xs={24} sm={24} md={12} xxl={8} key={k}>
                      <div
                        className={classNames({
                          "card-active": service?.id === item?.id,
                        })}
                      >
                        <CardService {...item} onBuy={onBuy} />
                      </div>
                    </Col>
                  )
                )
              ) : (
                <Col xs={24} sm={24}>
                  <Nodata />
                </Col>
              )}
            </Row>
          </div>
        </Col>
        <Col xs={0} sm={24} xl={8} hidden={!service}>
          <div
            className={classNames("service__buy ", {
              "form-buy-active": isSelected,
            })}
          >
            <FormBuy isRow={false} service={service} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Service;
