import { useAppDispatch } from "hooks/useStore";
import PrivateLayout from "@components//Layout/Private";
import { GetServerSideProps } from "next";
import { wrapper } from "redux/configStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Col, Input, Row } from "antd";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import { useServiceHook } from "@components//pages/service/hooks";
import CardService from "@components//CardService";
import { handleSeclectService } from "redux/service/slice";
import TableService from "@components//pages/service/TableService";
import { useRouter } from "next/router";
import Nodata from "@components//NoData";

function ServicePage() {
  const { t } = useTranslation();
  const { setParams, params } = useServiceHook();
  const { isViewCard } = params || {};
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { getListServiceAll, servicesData } = useServiceHook();

  const onOpenModalBuy = (service: any) => {
    dispatch(handleSeclectService({ visible: true, service } as any));
  };

  useEffect(() => {
    getListServiceAll({ ...params, categoryId: id });
  }, [params, id]);

  const debouncedSearch = useRef(
    debounce((value) => {
      setParams((prev) => ({ ...prev, search: value }));
    }, 700)
  ).current;

  return (
    <PrivateLayout title={t("home.service")}>
      <div className="service-page ">
        <div className="service-page__header">
          <img
            className="menu-view"
            src={isViewCard ? "/svg/menu-card.svg" : "/svg/menu-table.svg"}
            alt="menu-card"
            onClick={() =>
              setParams((prev) => ({ ...prev, isViewCard: !isViewCard }))
            }
          />
          <Input
            name="search"
            placeholder="Search"
            onChange={(e) => debouncedSearch(e?.target?.value)}
            prefix={<img src="/svg/search-normal.svg" />}
            className="input-search"
          />
        </div>

        {servicesData?.length > 0 ? (
          <>
            {isViewCard ? (
              <Row gutter={[20, 20]}>
                {servicesData.map((item: any, k: number) => (
                  <Col xs={24} sm={6} key={k}>
                    <CardService {...item} onBuy={onOpenModalBuy} />
                  </Col>
                ))}
              </Row>
            ) : (
              <TableService servicesData={servicesData} />
            )}
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Nodata />
          </div>
        )}
      </div>
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(() => async ({ locale }: any) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  });

export default ServicePage;
