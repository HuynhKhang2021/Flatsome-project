import { useEffect } from "react";
import AuthContext from "../../context-store/auth-context";
// import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/actions";
import { Form, Input, Button, Checkbox, Radio, Select } from "antd";

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
  // Phần useForm của React Hook Form
  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   watch,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  const onFinish = (values) => {
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
        },
      })
    );
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
    <Form
      form={registerForm}
      name="register-form"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
        { ...responseAction.register.error && {
          help: responseAction.register.error,
          validateStatus: 'error',
      }}
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
      <Form.Item name="role" label="Role">
        <Radio.Group>
          <Radio value="admin">Admin</Radio>
          <Radio value="user">User</Radio>
        </Radio.Group>
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
        wrapperCol={{ offset: 5, span: 19 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
