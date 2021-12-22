import React, { useEffect } from "react";
import { Form, Input, Button,Space,Card } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { changePasswordAction } from "../../../redux/actions";
import * as S from '../styles'

const ChangePassword = () => {
  const [changePasswordForm] = Form.useForm();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.authReducer);
  const { responseAction } = useSelector((state) => state.authReducer);
  // useEffect(() => {
  //   if (responseAction.changePassword.error) {
  //     changePasswordForm.setFields([
  //       {
  //         name: "oldPassword",
  //         error: [responseAction.changePassword.error],
  //       },
  //     ]);
  //   }
  // }, [responseAction.changePassword.error]);

  const handleChangePassword = (values) => {
    dispatch(
      changePasswordAction({
        id: userInfo.data.id,
        data: {
          ...values,
          email: userInfo.data.email,
        },
        callback: {
          clearForm: () => changePasswordForm.resetFields(),
        },
      })
    );
  };

  return (
    <>
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <S.PageTitle>Personal Information</S.PageTitle>
      </Space>
      <S.ContentContainer>
        {/* <S.UserInformation>
          <S.SectionTitle>user information</S.SectionTitle>
        </S.UserInformation> */}
        <S.UserCOntact>
          <Card size="small">
          <Form
      form={changePasswordForm}
      name="changePasswordForm"
      layout="vertical"
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      onFinish={(values) => handleChangePassword(values)}
    >
      <Form.Item
        label="Old Password"
        name="oldPassword"
        // {...(responseAction.changePassword.error && {
        //   help: responseAction.changePassword.error,
        //   validateStatus: "error",
        // })}
        rules={[{ required: true, message: "Required!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[{ required: true, message: "Required!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["newPassword"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      {/* <Button htmlType="submit" type="primary" loading={responseAction.changePassword.loading}>
        Thay đổi
      </Button> */}
      <S.SettingBtn htmlType="submit" loading={responseAction.changePassword.loading}>Change Password</S.SettingBtn>
    </Form>
          </Card>
        </S.UserCOntact>
      </S.ContentContainer>
    </>
    
  );
};

export default ChangePassword;
