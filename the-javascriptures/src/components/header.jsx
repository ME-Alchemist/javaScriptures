import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  background: red;
  margin: 0px;
  text-align: center;
  h1 {
    margin: 0px;
  }
`;
const Header = () => {
  return (
    <StyledHeader>
      <h1>Welcome traveler!</h1>
    </StyledHeader>
  );
};

export default Header;
