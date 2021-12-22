import styled from "styled-components";
import { Select } from "antd";
import { COLOR } from "../../constants/color";

export const ShopWrapper = styled.div`
  margin-top: 60px;
`;

export const ShopPageContainer = styled.div`
  margin: 2rem auto;
  max-width: 1200px;
  width: 100%;
  padding: 0 16px;
  /* margin-bottom: 3rem; */
`;

export const ProductListContainer = styled.div`
  /* padding-right: 1rem; */
`;

export const SearchHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PathSection = styled.div``;

export const PathLink = styled.div`
  display: flex;
  font-size: 1.4rem;
  .search-head__home {
    color: #ccc;
  }
  .search-head__home:hover {
    color: #000;
  }
`;

export const PathType = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
`;

export const SortSection = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  height: 2rem;
  /* margin: auto; */
  .search-head__result {
    margin: auto;
    margin-right: 1rem;
  }
`;

export const SelectTypeOfDevice = styled(Select)`
  width: 160px;
  text-transform: capitalize;
`;
export const FilterContainer = styled.div`
  background-color: #f0f0f0;
  border: 1px solid rgba(102, 102, 102, 0.3);
  /* padding: 1rem; */
  .ant-btn-primary {
    background-color: #000;
    border: none;
    font-weight: 600;
  }
  .ant-input {
    box-shadow: inset 0 0px 0px 1px rgba(0, 0, 0, 0.1);
    border-color: #ccc;
  }
  .ant-input:focus,
  .ant-input:hover {
    border-color: #ccc;
  }
  .ant-input-group-addon {
    background-color: #000;
  }
  // Chỉnh màu thanh Range filter
  .ant-slider-track {
    background-color: #bfbfbf;
    transition: all ease 0.2s;
  }
  .ant-slider-handle {
    background-color: ${COLOR.MAIN_COLOR};
    border: solid 2px ${COLOR.MAIN_COLOR};
    transition: all ease 0.2s;
  }
  .ant-slider:hover .ant-slider-track {
    background-color: ${COLOR.MAIN_COLOR};
  }
  .ant-slider:hover .ant-slider-handle {
    border: solid 2px ${COLOR.MAIN_COLOR};
  }
`;
export const FilterTitle = styled.h4`
  width: 100%;
  /* margin: 0 -1rem 0; */
  margin-bottom: 0;
  padding: 4px 8px;
  color: #fff;
  background-color: ${COLOR.MAIN_COLOR};
  font-weight: 600;
  text-transform: uppercase;
`;

export const FilterSectionContainer = styled.div`
  &:last-child {
    padding: 4px 12px;
  }
`;

export const FilterBtn = styled.button`
  background-color: ${COLOR.MAIN_COLOR};
  color: #fff;
  padding: 4px 16px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 15px;
  border: none;
  cursor: pointer;
`;
export const FilterNumber = styled.div``;

export const FilterItem = styled.div`
  padding: 4px 0.5rem;
  border-bottom: 1px solid rgba(102, 102, 102, 0.3);
`;
