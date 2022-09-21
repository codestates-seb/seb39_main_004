import styled from "styled-components";
import SNSInfoForm from "../../components/SNSInfo/SNSInfoForm";

const SSNSInfoContainer = styled.div`
  width: 300px;
  // 중앙 정렬
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SNSInfo = () => {
  return (
    <SSNSInfoContainer>
      <SNSInfoForm />
    </SSNSInfoContainer>
  );
};

export default SNSInfo;
