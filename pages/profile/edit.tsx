import FormItem, { TYPE_INPUT } from "@components//FormItem";
import PrivateLayout from "@components//Layout/Private";
import UploadComponent from "@components//UploadComponent";
import { useProfileHook } from "@components//pages/profile/hooks";
import { Button, Col, Row } from "antd";
import { Form, Formik } from "formik";
import { useAppSelector } from "hooks/useStore";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { selectUserInfo } from "redux/authentication/selector";
import { wrapper } from "redux/configStore";

const EditProfile = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUserInfo.getUser);

  const { getListBank, onChangeAvatar, onUpdateUserInfo, bankData } =
    useProfileHook();

  const {
    username,
    email,
    bankName,
    phoneNumber,
    accountName,
    avatarUrl,
    accountNumber,
  } = user || {};

  useEffect(() => {
    getListBank();
  }, []);

  return (
    <PrivateLayout title={t("home.profile")}>
      <div className="page-profile-edit">
        <Formik
          initialValues={{
            username,
            email,
            phoneNumber,
            currentPassword: "",
            newPassword: "",
            bankName: bankName || null,
            accountName,
            accountNumber,
            avatarUrl,
          }}
          onSubmit={(data) => onUpdateUserInfo(data)}
        >
          {({ values, setFieldValue }) => (
            <Form className="form-buy">
              <Row>
                <Col xs={24} sm={9}>
                  <div className="title-highlight">{t("home.accDetail")}</div>
                </Col>
                <Col xs={24} sm={15}>
                  <div>
                    <UploadComponent
                      onChange={(file: any) =>
                        onChangeAvatar(file, setFieldValue)
                      }
                      content={
                        <div className="section-avartar">
                          <img
                            src={values?.avatarUrl || "https://bitly.ws/337E4"}
                            className="avatar-img"
                          />{" "}
                          <div>{t("home.updateAvatar")}</div>
                        </div>
                      }
                    />
                  </div>
                  <FormItem
                    name="username"
                    placeholder={t("home.enterName")}
                    typeInput={TYPE_INPUT.TEXT}
                  />
                  <FormItem
                    name="email"
                    placeholder={t("home.enterMail")}
                    typeInput={TYPE_INPUT.TEXT}
                  />
                  <FormItem
                    name="phoneNumber"
                    placeholder={t("home.enterPhone")}
                    typeInput={TYPE_INPUT.NUMBER}
                  />
                </Col>
              </Row>
              <Row className="row-password">
                <Col xs={24} sm={9}>
                  <div className="title-highlight title-orange">
                    {t("home.changePass")}
                  </div>
                </Col>
                <Col xs={24} sm={15}>
                  <FormItem
                    name="currentPassword"
                    placeholder={t("home.enterPass")}
                    typeInput={TYPE_INPUT.PASSWORD}
                  />
                  <FormItem
                    name="newPassword"
                    placeholder={t("home.enterNewPass")}
                    typeInput={TYPE_INPUT.PASSWORD}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={9}>
                  <div className="title-highlight title-">
                    {t("home.payment")}
                  </div>
                </Col>
                <Col xs={24} sm={15}>
                  <FormItem
                    name="bankName"
                    placeholder={t("home.chooseBank")}
                    typeInput={TYPE_INPUT.SELECT}
                    options={bankData}
                  />
                  <FormItem
                    name="accountName"
                    placeholder={t("home.enterAccName")}
                    typeInput={TYPE_INPUT.TEXT}
                  />
                  <FormItem
                    name="accountNumber"
                    placeholder={t("home.enterAccNumber")}
                    typeInput={TYPE_INPUT.NUMBER}
                  />
                </Col>
              </Row>
              <Button className="btn-update" htmlType="submit">
                {t("home.update")}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </PrivateLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(() => async ({ locale }: any) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  });

export default EditProfile;
