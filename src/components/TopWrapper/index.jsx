import React, { useMemo } from "react";
import { Breadcrumb } from "antd";
import { useHistory } from "react-router";
// import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import * as S from "./styles";

const TopWrapper = ({ breadcrumb }) => {

  const history = useHistory()

  const redirectPath = (e, path) => {
    e.preventDefault()
    history.push(path)
  }
  const renderBreadcrumb = useMemo(() => {
    return breadcrumb.map((breadcrumbItem, breadcrumbIndex) => (
      <Breadcrumb.Item
        key={`breadcrumb-${breadcrumbIndex}`}
        {...(breadcrumbIndex !== breadcrumb.length - 1 && { href: "#" })}
        onClick={(e) => {
          redirectPath(e,breadcrumbItem.path)
        }}
      >
        {breadcrumbItem.icon && breadcrumbItem.icon}
        {breadcrumbItem.title}
      </Breadcrumb.Item>
    ));
  }, []);
  return (
    <S.TopWrapperContainer>
      <Breadcrumb>{renderBreadcrumb}</Breadcrumb>
    </S.TopWrapperContainer>
  );
};

export default TopWrapper;
