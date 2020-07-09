import styled from "lib/styled";

const SnsButton = styled.img`
  float: left;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  object-fit: cover;
  border: 0;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
  }

  &:active {
    filter: brightness(75%);
  }
`;

export default SnsButton;
