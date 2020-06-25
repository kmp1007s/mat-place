import styled from "lib/styled";

const ProfileBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  padding: 3% 0;
  width: 100%;
  background-color: ${(props) => props.theme.color.PRIMARY};

  & > * {
    display: block;
    width: 100%;
  }
`;

export default ProfileBox;
