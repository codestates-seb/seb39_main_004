import styled from "styled-components";
import SNSInfoForm from "../../components/SNSInfo/SNSInfoForm";

const SSNSInfoContainer = styled.div`
  // 중앙 정렬
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding-top: 200px;
  @media ${({ theme }) => theme.device.desktop} {
    padding-top: 100px;
  }
`;

const SNSInfo = () => {
  return (
    <SSNSInfoContainer>
      <SNSInfoForm />
    </SSNSInfoContainer>
  );
};

export default SNSInfo;
