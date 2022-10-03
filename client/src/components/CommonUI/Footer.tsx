import styled from "styled-components";
import { BsGithub } from "react-icons/bs";

const SFooter = styled.footer`
  background-color: var(--deep-green);
  color: var(--pale-gray);
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

const STitleContainer = styled.a`
  color: var(--pale-gray);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
  }
  & > img:first-child {
    width: 280px;
    margin-bottom: 0.6rem;
  }
`;

const SCopyRight = styled.div`
  font-size: 0.6rem;
  align-items: baseline;
  gap: 0.5rem;
`;

const SUl = styled.ul`
  margin-top: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const STeamContainer = styled.li`
  display: flex;
  & :first-child {
    font-size: 0.6rem;
    margin-right: 0.5rem;
  }
  & :nth-child(2) {
    font-size: 1rem;
    margin-right: 1rem;
  }
`;

const Footer = () => {
  return (
    <SFooter>
      <STitleContainer
        href="https://github.com/codestates-seb/seb39_main_004"
        target="_black"
      >
        <img src={`${process.env.PUBLIC_URL}/logoKorean.png`} alt="MMZ logo" />
        <SCopyRight>
          <span>COPYRIGHT &copy;TeamMMZ ALL RIGHT RESERVED.</span>
          <BsGithub size={13} />
        </SCopyRight>
      </STitleContainer>
      <SUl>
        <STeamContainer>
          <div>FRONTEND |</div>
          <div>유현주 윤다현 조은진</div>
        </STeamContainer>
        <STeamContainer>
          <div>BACKEND |</div>
          <div>왕효준 이원용</div>
        </STeamContainer>
        <STeamContainer>
          <div>DESIGN |</div>
          <div>탁나현</div>
          <div>하태경</div>
        </STeamContainer>
      </SUl>
    </SFooter>
  );
};
export default Footer;
