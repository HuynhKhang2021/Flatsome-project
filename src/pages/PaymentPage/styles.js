import styled from "styled-components";
import { Divider, Button, Card } from "antd";
import { COLOR } from "../../constants/color";
export const PaymentPageContainer = styled.div`
  margin: 1rem auto;
  max-width: 1200px;
  padding:0 16px;
  .ant-steps-item-icon {
    overflow: hidden;
  }
`;

export const StepTitle = styled.p`
  text-transform: capitalize;
`;

export const PaymentSteps = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 1rem;
  color: #cccccc;
`;

export const DividerPayment = styled(Divider)`
  &::before {
    width: 30%;
  }
`;
export const TitleContainer = styled.div`
  background-color: ${COLOR.MAIN_COLOR};
  padding: 4px;
  text-align: center;
  color: #fff;

  display: flex;
  justify-content: space-between;
`;
export const TitleIcon = styled.span`
  width: 6px;
  height: 6px;
  color: #fff;
  border-radius: 10px;
  background-color: ${COLOR.MAIN_COLOR};
`;
export const TitleText = styled.h3`
  margin-bottom: 0;
  font-weight: bold;
  color: ${COLOR.MAIN_COLOR};
`;
export const DiscountCard = styled.div`
  display: inline-flex;
  margin-top: 16px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  overflow: hidden;
`;

export const DiscountInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
  height: 50px;
  background-color: ${COLOR.MINOR_COLOR};

  & p {
    font-size: 14px;
    margin-bottom: 0;
    color: white;
  }

  & span {
    font-size: 12px;
    color: #fafafa;
  }
`;

export const DiscountValue = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  height: 50px;
  font-size: 28px;
  color: ${COLOR.MINOR_COLOR};
`;
export const StepBtn = styled(Button)`
  text-transform: uppercase;
  font-weight:bold;
  background-color: ${COLOR.MAIN_COLOR};
  border: none;
  :hover {
    background-color: ${COLOR.MINOR_COLOR};
    border: none;
  }
  :focus {
    background-color: ${COLOR.MINOR_COLOR};
    border: none;
  }
`;
export const SectionHeading = styled.h3`
  font-weight: bold;
  cursor: pointer;
  background-color: ${COLOR.MAIN_COLOR};
  color: #fff;
  margin-bottom: 0;
  padding: 4px 12px;
  display: inline-block;
  transition: all ease 0.3s;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
`;
/* export const ProductsRelatedName = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 4px 12px;
  text-transform: capitalize;
  background-color: ${COLOR.MINOR_COLOR};
  color: #fff;
  border-radius: 2px;
`; */
export const CartSelectedItem = styled(Card)`
  /* cursor: pointer; */
  /* &:hover {
    border-color: ${COLOR.MINOR_COLOR};
  } */
`;
export const OrderSection = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border: none;
  }
`;
export const OrderSectionTitle = styled.p`
  color: #b2b2b2;
  margin: 0.8rem 0;
`;
export const OrderSectionAmount = styled.p`
  /* color: #b2b2b2; */
  font-weight: bold;
  margin: 0.8rem 0;
`;
export const CartItemOptionName = styled.span`
  /* color: #b2b2b2; */
  position: absolute;
  bottom: -1.9rem;
  left: 0;
  color: #fff;
  padding: 4px;
  margin-bottom: 0;
  font-weight: bold;
  background-color: ${COLOR.MINOR_COLOR};
  border-radius: 4px;
`;
