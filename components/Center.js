import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: fill;
  margin: 0 auto;
  padding: 0 10px;
`;

export default function Center({children}) {
  return (
    <StyledDiv>{children}</StyledDiv>
  );
}