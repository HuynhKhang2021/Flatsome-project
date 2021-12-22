import React, { useState } from "react";
import Modal from "../UI/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Row, Col,Image } from "antd";
import * as S from "./styles";

const Auth = ({ onCloseLogin, setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [usersList, setUsersList] = useState([]);

  return (
    <Row>
      <Col lg={{ span: 12 }}>
        <Image src="https://cdn2.edumall.io/k-577a160c047c994bb7e5b397/20170728-/technology.jpg" style={{width:'100%'}}/>
      </Col>
      <Col lg={{ span: 12 }}>
        <Modal onCloseLogin={onCloseLogin}>
          <h3 className="login-title">{isLogin ? "Login" : "Register"}</h3>
          {isLogin ? (
            <LoginForm setShowLogin={setShowLogin} usersList={usersList} />
          ) : (
            <RegisterForm
              setIsLogin={setIsLogin}
              usersList={usersList}
            />
          )}
          <p
            style={{ cursor: "pointer" }}
            className="change-behavior"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {!isLogin ? "Alredy have an account !" : "Create a new account!"}
          </p>
        </Modal>
      </Col>
    </Row>
  );
};
export default Auth;
