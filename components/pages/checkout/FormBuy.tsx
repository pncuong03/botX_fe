import FormItem, { TYPE_INPUT } from "@components//FormItem";
import { Button } from "antd";
import { Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import { useServiceHook } from "../service/hooks";

const FormBuy = ({ servicesCheckout }: any) => {
  const { t } = useTranslation();
  const { onCreateOrder, loading } = useServiceHook();

  const totalPrice =
    servicesCheckout
      ?.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0)
      .toFixed(2) || 0;

  const onBuy = (data: any) => {
    const params = servicesCheckout?.map((item: any) => ({
      serviceId: item?.id,
      link: item?.link,
      amount: item?.quantity,
      uplineId: data?.refCode,
      cartId: item?.cartId,
    }));
    onCreateOrder(params);
  };

  return (
    <div className="form-buy">
      <Formik onSubmit={onBuy} initialValues={{ refCode: "" }}>
        {() => (
          <Form>
            <div className="section-affilicate">
              <FormItem
                name="refCode"
                placeholder={t("home.enterLink")}
                label={"Affiliate code"}
                typeInput={TYPE_INPUT.TEXT}
              />
              <div
                className="note"
                dangerouslySetInnerHTML={{ __html: t("home.noteAff") }}
              />
            </div>
            <div className="total-price">
              <div>{t("home.total")}</div>
              <div className="price">
                $ {Number(totalPrice).toLocaleString()}
              </div>
            </div>
            <Button
              disabled={servicesCheckout?.length === 0}
              htmlType="submit"
              loading={loading}
            >
              {t("home.payments")}
            </Button>
          </Form>
        )}
      </Formik>
      <div></div>
    </div>
  );
};
export default FormBuy;
