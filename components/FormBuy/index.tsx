import { Form, Formik } from "formik";
import { DataService, FormBuy } from "types";
import FormItem, { TYPE_INPUT } from "../FormItem";
import { useTranslation } from "next-i18next";
import { Button, Col, Row } from "antd";
import { formBuySchema } from "utils/schema";
import { useAppDispatch } from "hooks/useStore";
import { handleSeclectService, setServicesCheckout } from "redux/service/slice";
import { useRouter } from "next/router";
import { APP_URL } from "constants/routes";
import FavouriteStatus from "../pages/home/FavouriteStatus";
import { useHomeHook } from "../pages/home/hooks";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { TYPE_SERVICE } from "../../constants";

type Props = {
  service?: DataService;
  isRow?: boolean;
  title?: string;
};

const FormBuy: ForwardRefRenderFunction<any, Props> = (
  { service, isRow = true, title },
  ref
) => {
  const { t } = useTranslation();
  const {
    title: name,
    price,
    desc,
    id,
    favourite,
    typeService,
    minQuantity,
    maxQuantity,
  } = service || {};
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isDisable = typeService === "cms";

  const { addToCart } = useHomeHook();

  const onBuy = (data: FormBuy) => {
    const { quantity, link } = data;
    dispatch(
      setServicesCheckout([{ name, link, quantity, price, desc, id }] as any)
    );
    dispatch(handleSeclectService({ visible: false, service: {} } as any));
    // onAddToCart(data, false);
    router.push(APP_URL.CHECKOUT);
  };

  const onAddToCart = (values: any, isShowMessage?: boolean) => {
    const params = {
      link: values?.link,
      quantity: +values?.quantity || 1,
    };
    addToCart(id, params, isShowMessage);
  };

  return (
    <Row className="form-buy" gutter={[20, 0]}>
      {title && (
        <Col xs={24} sm={24}>
          <div className="modal-buy-title">{title}</div>
        </Col>
      )}
      <Col xs={24} sm={isRow ? 12 : 24}>
        <div className="service__info">
          <div className="service__info-header">
            <div className="service__price">$ {price}</div>
            <FavouriteStatus id={id} status={favourite as boolean} />
          </div>
          <div className="service__info-title">
            <img
              src="/images/logo-x.png"
              alt="logo"
              className="service__logo"
            />
            <div className="service__name">{name}</div>
          </div>
          <div className="service__desc">{desc}</div>
        </div>
      </Col>
      <Col xs={24} sm={isRow ? 12 : 24}>
        <Formik
          onSubmit={onBuy}
          initialValues={{
            link: "",
            quantity: "",
            price,
            minQuantity,
            maxQuantity,
          }}
          validationSchema={formBuySchema}
          enableReinitialize
          innerRef={ref}
        >
          {({ values }) => (
            <Form>
              <FormItem
                name="link"
                placeholder={t("home.link")}
                typeInput={TYPE_INPUT.TEXT}
                disabled={isDisable}
                className="link"
              />
              <div className="text-note">
                {[
                  TYPE_SERVICE.COMMENT,
                  TYPE_SERVICE.LIKE,
                  TYPE_SERVICE.RETWEET,
                  TYPE_SERVICE.VIEW,
                ].includes(typeService as string) && (
                  <div
                    dangerouslySetInnerHTML={{ __html: t("home.warningPost") }}
                  />
                )}
                {typeService === TYPE_SERVICE.FOLLOW && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t("home.warningFollow"),
                    }}
                  />
                )}
              </div>
              <FormItem
                name="quantity"
                placeholder={t("home.quantity")}
                disabled={isDisable}
                typeInput={TYPE_INPUT.NUMBER}
              />
              <FormItem
                name="price"
                placeholder={t("home.price")}
                typeInput={TYPE_INPUT.TEXT}
                prefix={"$"}
                value={Number(
                  Number(values?.quantity || 1) * Number(price)
                ).toFixed(3)}
                disabled
              />
              <Row gutter={[20, 20]} className="btn-contain">
                <Col xs={24} sm={isRow ? 12 : 24}>
                  <Button
                    className="btn btn-buy"
                    htmlType="submit"
                    disabled={isDisable}
                  >
                    {t("home.buyNow")}
                  </Button>
                </Col>
                <Col xs={24} sm={isRow ? 12 : 24}>
                  <Button
                    className="btn btn-add"
                    onClick={() => onAddToCart(values)}
                    icon={<img src="/svg/cart.svg" />}
                    disabled={isDisable}
                  >
                    {t("home.addCart")}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default forwardRef(FormBuy);
