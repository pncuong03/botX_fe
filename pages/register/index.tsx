import { ReactElement, useEffect } from "react";
import PublicLayout from "@components//Layout/Public";
import { Form, Formik } from "formik";
import FormItem, { TYPE_INPUT } from "@components//FormItem";
import { Button } from "antd";
import { registerSchema } from "utils/schema";
import { useRegisterHook } from "@components//pages/register/hooks";
import { useLoginHook } from "@components//pages/login/hooks";
import { useRouter } from "next/router";
import { APP_URL } from "constants/routes";

function Register() {
  const { onRegister, loading } = useRegisterHook();
  const { onloginGoogle } = useLoginHook();
  const router = useRouter();

  const onSubmit = (data: any) => {
    onRegister({
      ...data,
    });
  };

  useEffect(() => {
    router.push(APP_URL.LOGIN);
  }, []);

  return (
    <div className="register">
      <div className="title">Sign up</div>
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          phoneNumber: "",
          username: "",
          password: "",
          rePassword: "",
        }}
        validationSchema={registerSchema}
      >
        {({}) => {
          return (
            <Form className="form">
              <FormItem
                typeInput={TYPE_INPUT.TEXT}
                name="phoneNumber"
                placeholder={"Enter your phone number"}
                className="form-1"
              />
              <FormItem
                typeInput={TYPE_INPUT.TEXT}
                name="username"
                placeholder={"Enter your username"}
              />
              <FormItem
                typeInput={TYPE_INPUT.PASSWORD}
                name="password"
                placeholder={"Enter your password"}
              />
              <FormItem
                typeInput={TYPE_INPUT.PASSWORD}
                name="repassword"
                placeholder={"Enter your repassword"}
              />
              <Button
                loading={loading}
                htmlType="submit"
                className="register-register"
              >
                Sign up
              </Button>
            </Form>
          );
        }}
      </Formik>

      <p>or</p>

      <Button
        htmlType="submit"
        className="resgiter-google"
        onClick={() => onloginGoogle()}
      >
        <img src="/svg/logo-google.svg" alt="" />
        Continue sign in with Google
      </Button>

      <div className="register-change">
        <p>Have an account?</p>
        <a href="/login">Sign in</a>
      </div>
    </div>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Register;
