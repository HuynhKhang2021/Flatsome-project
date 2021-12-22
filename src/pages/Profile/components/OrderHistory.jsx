import React, { useEffect } from "react";
import { Table, Card, Row, Col } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, generatePath } from "react-router-dom";

import { getOrderListAction } from "../../../redux/actions";
import { COLOR } from "../../../constants/color";
import * as S from "../styles";
import { ROUTER } from "../../../constants/router";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.authReducer);
  const { orderList } = useSelector((state) => state.orderReducer);
  console.log("🚀 ~ file: OrderHistory.jsx ~ line 17 ~ OrderHistory ~ orderList", orderList)

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderListAction({ id: userInfo.data.id }));
    }
  }, [userInfo.data]);

  const orderColumns = [
    { title: "Order", dataIndex: "id", key: "id" },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => moment(item).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Amount",
      dataIndex: "productCount",
      key: "productCount",
      render: (_, record) => record.products.length,
      // .map((item) => `${item.name} x ${item.quantity}`)
      // .join(", "),
      ellipsis: true,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (item) => `$${item.toLocaleString()}`,
    },
    {
      title: "Ship",
      dataIndex: "status",
      key: "status",
      render: (item) => "Shipping",
    },
    {
      title: "State",
      dataIndex: "paymentType",
      key: "paymentType",
      render: (item) => (item === "cod" ? "Unpaid" : "Paid"),
    },
  ];

  const tableData = orderList.data?.map((item) => ({
    ...item,
    key: item.id,
  }));

  return (
    <div>
      <S.PageTitle>Order History</S.PageTitle>
      <Card size="small">
        <Table
          columns={orderColumns}
          expandable={{
            expandedRowRender: (record) => {
              return record.products.map((item, index) => {
                const unitPrice = item.option
                  ? item.price + item.option.price
                  : item.price;
                return (
                  <S.ProductItem
                    key={item.id}
                    style={{ borderBottom: "1px solid #ccc" }}
                  >
                    <Col span={1}>
                      <p>{index + 1}</p>
                    </Col>
                    <Col span={11}>
                      <S.ProductOrder
                        onClick={() =>
                          history.push(
                            generatePath(ROUTER.PRODUCT_DETAIL, {
                              productId: item.id
                            })
                          )
                        }

                      >
                        {item.name} {item.option ? item.option.name : ""}
                      </S.ProductOrder>
                    </Col>
                    <Col span={4}>
                      <p>Price: ${unitPrice}</p>
                    </Col>
                    <Col span={4}>
                      <b>Quantity: {item.quantity}</b>
                    </Col>
                    <Col span={4}>
                      <p>Subtotal: ${unitPrice * item.quantity}</p>
                    </Col>
                  </S.ProductItem>
                );
              });
            },
          }}
          dataSource={tableData}
        />
      </Card>
    </div>
  );
};

export default OrderHistory;
