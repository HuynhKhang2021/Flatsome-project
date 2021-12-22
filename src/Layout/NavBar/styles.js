import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { Badge, Modal, Image, Form, Drawer } from "antd";
import { COLOR } from "../../constants/color";
import { DEVICES } from "../../constants/device";
export const NavbarContainer = styled.div`
  background-color: #fff;
  width: 100%;
  min-height: 60px;
  position: fixed;
  z-index: 10;
  box-shadow: 0 0 3px rgb(161, 161, 161);
  transition: all 0.5s ease-out;
  justify-content: center;
  align-items: center;
`;
export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  max-width: 1200px;
  padding: 0 16px;
  min-height: 60px;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`;

export const NavBarMenu = styled.div`
  display: none;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  margin-right: auto;
  @media ${DEVICES.laptop} {
    display: flex;
  }
`;

export const NavBarDrawer = styled(Drawer)`
  .ant-drawer-title {
    align-items: center;
    font-size: 1.3rem;
    color: ${COLOR.MINOR_COLOR};
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
  }
  & h3 {
    margin-bottom: none;
  }
  a {
    color: ${COLOR.MAIN_COLOR};
    font-size: 1.2rem;
    text-transform: capitalize;
  }
  a:hover {
    color: ${COLOR.MINOR_COLOR};
  }
`;

export const NavBarBrand = styled(Link)`
  /* position: absolute; */
  overflow: hidden;
  /* left: 16px; */
  img {
    max-width: 150px;
    height:auto;
  }
`;

export const NavBarMenuIcon = styled.div`
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  span {
    font-size: 2rem;
    color: ${COLOR.MAIN_COLOR};
  }
  @media ${DEVICES.laptop} {
    display: none;
  }
`;

export const NavBarSearch = styled.span`
  position: relative;
  margin-left: 2rem;
  /* overflow: hidden; */
  /* width: 100px; */
  i {
    width: 2rem;
    height: 2rem;
    background-color: black;
    color: white;
    text-align: center;
    line-height: 2rem;
    border-radius: 1rem;
    border: none;
  }
  &:hover {
    .search-section {
      display: flex;
    }
  }
`;

export const SearchDisplay = styled.div`
  position: absolute;
  display: none;
  /* height: 40px; */
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 0 1px rgb(161, 161, 161);
  z-index: 100;
  .search-input {
    min-width: 100px;
    border: 1px solid #ccc;
    border-top-right-radius: none;
    border-bottom-right-radius: none;
  }
  button {
    background-color: #000;
    border: none;
  }
`;

export const NavBarNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    position: relative;
    div {
      position: absolute;
      top: auto;
      display: none;
    }
  }
  & a {
    font-size: 1rem;
    font-weight: 600;
    line-height: 0.9rem;
    color: rgba(102, 102, 102, 0.85);
    text-transform: uppercase;
    img {
      width: 20px;
    }
    &.active {
      color: black;
    }
    &:last-child {
      margin-left: auto;
    }
    &:hover {
      color: black;
    }
  }
`;

export const NavBarLink = styled(NavLink)`
  margin-left: 0.6rem;
  margin-right: 0.6rem;
`;

export const NavBarCart = styled(Badge)`
  color: rgba(102, 102, 102, 0.85);
  text-transform: uppercase;
  text-decoration: none;
  border-left: 1px solid rgb(175, 172, 172);
  i {
    font-size: 2rem;
    color: ${COLOR.MAIN_COLOR}
  }
  p {
    margin: auto;
  }
  &:hover {
    color: black;
  }
  .cart-icon {
    margin: auto;
    padding-left: 0.6em;
    color: rgb(49, 47, 47);
    font-size: 1rem;
  }
`;
export const NavbarUserContainer = styled.div`
  position: absolute;
  right: 16px;
`;
export const NavBarUser = styled.div`
  display: flex;
`;
export const AuthFormContainer = styled.div`
  margin-right: 0;
`;
export const FormModal = styled(Modal)`
  width: 1000px;
  &.ant-modal {
    width: 1000px;
  }
  & .ant-modal-body {
    padding: 0;
  }
  .ant-modal-footer {
    padding: 0;
  }
`;
export const FormImage = styled(Image)`
  height: 600px;
`;
export const FormInput = styled(Form)`
  width: 90%;
  height: 90%;
  padding: 1rem;
  margin: auto;
  margin-top: 5%;
  background-color: #fff;
  h3 {
    font-weight: bold;
    text-align: center;
    padding: 1rem;
    font-size: 1.5rem;
    color: #666;
  }
  .change-behavior {
    margin-top: 0;
    /* margin-bottom: 1 em; */
    align-items: center;
    text-align: center;
    padding-bottom: 1rem;
    font-size: 1.1rem;
  }
  button {
    width: 100%;
    background-color: ${COLOR.MAIN_COLOR};
    border: none;
    text-transform: uppercase;
    &:hover,
    &:focus {
      background-color: ${COLOR.MINOR_COLOR};
    }
  }
  .ant-form-item-label {
    color: #666;
  }
`;
