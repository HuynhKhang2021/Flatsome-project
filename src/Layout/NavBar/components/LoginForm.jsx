import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input, Button, Checkbox, Radio, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../redux/actions";
import * as S from "../styles";

// import * as yup from "yup";
// const schema = yup.object({
//   email: yup
//     .string()
//     .required("Bạn chưa nhập email")
//     .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email không đúng định dạng"),
//   password: yup
//     .string()
//     .required("Bạn chưa nhập mật khẩu")
//     .min(6, "Mật khẩu của bạn phải nằm trong khoảng 6-14 kí tự")
//     .max(14, "Mật khẩu của bạn phải nằm trong khoảng 6-14 kí tự"),
// });
const LoginForm = ({ setIsLogin,setIsModalVisible }) => {
  // const authCtx = useContext(AuthContext);
  // // Sử dụng useForm của React Hook Form
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });
  const dispatch = useDispatch();
  const [loginForm] = Form.useForm();
  const { responseAction } = useSelector((state) => state.authReducer);

  const onFinish = (values) => {
    dispatch(
      loginAction({
        data: values,
        callback: {
          goBackHome: () => {
            setIsModalVisible(false);
          },
        },
      })
    );
  };

  const onFinishFailed = (errorInfo) => {};

  useEffect(() => {
    if (
      responseAction.login.error &&
      responseAction.login.error === "Cannot find user"
    ) {
      loginForm.setFields([
        {
          name: "email",
          error: [responseAction.login.error],
        },
      ]);
    } else if (
      responseAction.login.error &&
      responseAction.login.error === "Incorrect password"
    ) {
      loginForm.setFields([
        {
          name: "password",
          error: [responseAction.login.error],
        },
      ]);
    }
  }, [responseAction.login.error]);

  return (
    <S.FormInput
      form={loginForm}
      name="login-form"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h3>Login</h3>
      <Form.Item
        name="email"
        label="E-mail"
        {...(responseAction.login.error &&
          responseAction.login.error === "Cannot find user" && {
            help: responseAction.login.error,
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
        {...(responseAction.login.error &&
          responseAction.login.error === "Incorrect password" && {
            help: responseAction.login.error,
            validateStatus: "error",
          })}
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{ offset: { md: 0, lg: 8 }, span: { lg: 16, md: 24 } }}
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={responseAction.login.loading}
        >
          Login
        </Button>
      </Form.Item>
      <p className="change-behavior">
        You have not account! &nbsp;
        <b
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsLogin(false);
          }}
        >
          Click to register
        </b>
      </p>
    </S.FormInput>
    // <Form onSubmit={handleSubmit(onSubmitHandler)}>
    //   <Form.Group className="mb-3">
    //     <Form.Label>Email</Form.Label>
    //     <Form.Control
    //       type="text"
    //       placeholder="Enter email"
    //       {...register("email", {
    //         required: true,
    //         pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    //       })}
    //     />
    //     <span className="text-danger">{errors.email?.message}</span>
    //   </Form.Group>

    //   <Form.Group className="mb-3">
    //     <Form.Label>Password</Form.Label>
    //     <Form.Control
    //       type="password"
    //       placeholder="Password"
    //       {...register("password", {
    //         required: true,
    //         minLength: 6,
    //         maxLength: 14,
    //       })}
    //     />
    //     <span className="text-danger">{errors.password?.message}</span>
    //   </Form.Group>
    //   <Button type="submit" variant="dark" className="w-20">
    //     Submit
    //   </Button>
    // </Form>
  );
};

export default LoginForm;
