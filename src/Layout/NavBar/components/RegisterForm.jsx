import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../../redux/actions";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Select,
  notification,
} from "antd";
import * as S from "../styles";

// Ví dụ làm bằng React hook Form

// import * as yup from "yup";
// const schema = yup.object({
//   email: yup
//     .string()
//     .required("Bạn chưa nhập email")
//     .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email không đúng định dạng"),
//   name: yup.string().required("Bạn chưa nhập tên"),
//   password: yup
//     .string()
//     .required("Bạn chưa nhập password")
//     .min(6, "Mật khẩu phải từ 6 đến 14 kí tự")
//     .max(14, "Mật khẩu phải từ 6 đến 14 kí tự"),
//   rePassword: yup
//     .string()
//     .oneOf([yup.ref("password"), null], "Mật khẩu nhập lại không chính xác"),
//   isOK: yup.boolean().required("Đồng ý điều khoản trước khi đăng kí"),
// });
const RegisterForm = ({ setIsLogin }) => {
  const [registerForm] = Form.useForm();
  const dispatch = useDispatch();
  const { responseAction } = useSelector((state) => state.authReducer);
  const [agreeMessage, setAgreeMessage] = useState(null);

  const onFinish = (values) => {
    // console.log("🚀 ~ file: RegisterForm.jsx ~ line 34 ~ onFinish ~ values", values)
    if (values.remember === false) {
      setAgreeMessage("You are still not agree with the terms");
    } else {
      dispatch(
        registerAction({
          data: {
            email: values.email,
            password: values.password,
            username: values.username,
            gender: values.gender,
            role: values.role,
          },
          callback: {
            backToLogin: () => setIsLogin(true),
            registerSuccess: () =>
              notification.success({
                message: "Register is success!",
              }),
          },
        })
      );
    }
  };

  useEffect(() => {
    if (responseAction.register.error) {
      registerForm.setFields([
        {
          name: "email",
          error: [responseAction.register.error],
        },
      ]);
    }
  }, [responseAction.register.error]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <S.FormInput
      form={registerForm}
      name="register-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h3>Register</h3>
      <Form.Item
        label="Your Name"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        {...(responseAction.register.error && {
          help: responseAction.register.error,
          validateStatus: "error",
        })}
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
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
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please chosse your gender!",
          },
        ]}
        label="Gender"
        name="gender"
      >
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
        {...(agreeMessage && {
          help: agreeMessage,
          validateStatus: "error",
        })}
      >
        <Checkbox>Agree to the terms</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: { md: 0, lg: 8 }, span: { lg: 16, md: 24 } }}
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={responseAction.register.loading}
        >
          Register
        </Button>
      </Form.Item>
      <p className="change-behavior">
        Already have an account ! &nbsp;
        <b
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsLogin(true);
          }}
        >
          Click to login
        </b>
      </p>
    </S.FormInput>
  );
};

export default RegisterForm;
