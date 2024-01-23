import React from "react";
import { Button, Row, Col } from "antd";
import { Formik, Form } from "formik";
import FormItem, { TYPE_INPUT } from "@components//FormItem";
import { affiliateSchema } from "utils/schema";

const WithdrawForm: React.FC<any> = ({ onWithdraw }) => {
  return (
    <Formik
      initialValues={{ balanceAffiWithdrawn: "", content: "" }}
      onSubmit={(values) => onWithdraw(values)}
      validationSchema={affiliateSchema}
    >
      {({}) => (
        <Form>
          <div className="title-modal">Withdraw</div>
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24}>
              <FormItem
                name="balanceAffiWithdrawn"
                typeInput={TYPE_INPUT.NUMBER}
                placeholder={"Enter amount"}
                label={"Amount"}
                required
              />
            </Col>
            <Col xs={24} sm={24}>
              <FormItem
                name="content"
                typeInput={TYPE_INPUT.TEXTAREA}
                placeholder={"Enter amount"}
                label={"Content"}
              />
            </Col>
          </Row>
          <Row justify="end" className="button-contain">
            <Col>
              <Button type="primary" htmlType="submit">
                Withdraw
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default WithdrawForm;
