import React from "react";
import { useHistory } from "react-router-dom";
import { Result, Button, Card, Space,Image } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import { ROUTER } from "../../../../constants/router";
import * as S from '../../styles'

const Success = () => {
  const history = useHistory();
  return (
    <Card size="small">
      <Result
        icon={<Image style={{maxWidth:'400px',height:'auto'}} src="https://73.cdn.ekm.net/ekmps/shops/kirkup1/images/thank-you-for-shopping-small-1--14013-p.jpg?v=56D0E516-9114-4CA7-B421-DC421D0F6CB5" />}
        // title="Thank you for your shopping!"
        extra={
          <Space>
            <S.StepBtn
              type="primary"
              onClick={() => history.push(ROUTER.HOME)}
            >
              Home
            </S.StepBtn>
            <Button
              type="primary"
              ghost
              onClick={() => history.push(ROUTER.PROFILE)}
            >
              Check your order!
            </Button>
          </Space>
        }
      />
    </Card>
  );
};

export default Success;
