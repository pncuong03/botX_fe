import { ReactElement } from "react";
import PublicLayout from "@components//Layout/Public";
import { Form, Formik } from "formik";
import FormItem, { TYPE_INPUT } from "@components//FormItem";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { loginSchema } from "utils/schema";
import { useLoginHook } from "@components//pages/login/hooks";
import { selectRememberLogin } from "redux/user/selector";
import { handleRememberLogin } from "redux/user/slice";
function Login() {
  const dispatch = useAppDispatch();
  const infoRememberLogin = useAppSelector(selectRememberLogin.getInfoRemember);
  const { isRemember, phoneNumber, password } = infoRememberLogin || {};
  const { onLogin, onloginGoogle, loading } = useLoginHook();

  const onSubmit = (data: any) => {
    dispatch(
      handleRememberLogin({
        phoneNumber: data?.isRemember ? data?.phoneNumber : "",
        password: data?.isRemember
          ? Buffer.from(data?.password).toString("base64")
          : "",
        isRemember: data?.isRemember,
      } as any)
    );
    onLogin({
      ...data,
    });
  };

  return (
    <div className="login">
      <div className="login-title">Sign in</div>
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          phoneNumber: isRemember ? phoneNumber : "",
          password: isRemember
            ? Buffer.from(password, "base64").toString("utf-8")
            : "",
          isRemember,
        }}
        validationSchema={loginSchema}
      >
        {({}) => {
          return (
            <Form className="login-form">
              <FormItem
                typeInput={TYPE_INPUT.TEXT}
                name="phoneNumber"
                placeholder={"Enter your phone number"}
              />
              <FormItem
                typeInput={TYPE_INPUT.PASSWORD}
                name="password"
                placeholder={"Enter your password"}
              />
              <div className="login-checkbox">
                <div className="checkbox">
                  <FormItem typeInput={TYPE_INPUT.CHECKBOX} name="isRemember" />
                  <p>Remember me</p>
                </div>
                <a href="/forgot-password">Forgot password?</a>
              </div>
              <Button
                loading={loading}
                htmlType="submit"
                className="login-signin"
              >
                Sign in
              </Button>
            </Form>
          );
        }}
      </Formik>

      <p>or</p>
      <Button
        htmlType="submit"
        className="login-google"
        onClick={() => onloginGoogle()}
      >
        <img src="/svg/logo-google.svg" alt="" />
        Continue sign in with Google
      </Button>

      {/* <div className="login-change">
        <p>Don’t have an account?</p>
        <a href="/register">Sign up</a>
      </div> */}
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Login;
