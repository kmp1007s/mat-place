import styled from "lib/styled";

const BlockText = styled.span`
  display: block;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 500;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  color: ${(props) => props.theme.color.WHITE};
`;

export default BlockText;
