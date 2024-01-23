import { ReactElement } from "react";
import * as Yup from "yup";
import PublicLayout from "@components//Layout/Public";
import { Form, Formik } from "formik";
import FormItem, { TYPE_INPUT } from "@components//FormItem";
import { Button } from "antd";
import { flatMap } from "lodash";
import { forgotSchema } from "utils/schema";

function ForgotPassword() {
  const onSubmit = (data: any) => {};
  return (
    <div className="forgot">
      <div className="">
        <div>
          <a href="/login">
            <img src="/svg/arrow-left.svg" alt="" />
          </a>
        </div>
        <div className="title">
          <h2>Forgot password</h2>
          <p>Enter your gmail or phone number for us to assist.</p>
        </div>
      </div>

      <Formik
        onSubmit={onSubmit}
        initialValues={{ contact: "" }}
        validationSchema={forgotSchema}
      >
        {({}) => {
          return (
            <Form className="forgotpassword">
              <FormItem
                typeInput={TYPE_INPUT.TEXT}
                name="contact"
                placeholder={"Enter your phone number/gmail"}
              />
              <Button htmlType="submit" className="send">
                Send
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default ForgotPassword;
