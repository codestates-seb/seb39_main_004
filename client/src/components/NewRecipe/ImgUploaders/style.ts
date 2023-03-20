import styled from "styled-components";

const SImgInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SImgInput = styled.input`
  display: none;
`;

const SUserImg = styled.img`
  background-color: var(--pale-gray);
  object-fit: cover; // 비율 조정
  overflow: hidden;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100px;
    height: 100px;
  }
`;

const SImg = styled.img`
  width: 430px;
  height: ${(props) => props.height ?? "257px"};
  object-fit: cover; // 비율 조정
  border: 2.5px solid var(--gray);
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    height: 257px;
    margin-top: 10px;
  }
`;

const SThumbNailImg = styled(SImg)`
  @media ${({ theme }) => theme.device.desktop} {
    height: 260px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

export { SImgInputContainer, SImg, SImgInput, SUserImg, SThumbNailImg };
