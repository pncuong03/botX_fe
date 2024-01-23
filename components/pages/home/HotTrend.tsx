import CardService from "@components//CardService";
import { Col, Row } from "antd";
import { useAppDispatch } from "hooks/useStore";
import { useTranslation } from "next-i18next";
import { handleSeclectService } from "redux/service/slice";
import { DataService } from "types";

type Props = {
  serviceTrendings: DataService | any;
};

const HotTrend = ({ serviceTrendings }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onOpenModalBuy = (service: DataService) => {
    dispatch(handleSeclectService({ visible: true, service: service } as any));
  };

  return (
    <div className="hot-trend">
      <div className="hot-trend__title">
        <div className="hot-trend__dot" /> {t("home.hotTrend")}
      </div>
      <Row gutter={[20, 20]}>
        {serviceTrendings?.map((item: DataService, k: number) => (
          <Col xs={24} sm={24} md={12} xl={8} xxl={6} key={k}>
            <CardService onBuy={onOpenModalBuy} {...item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default HotTrend;
