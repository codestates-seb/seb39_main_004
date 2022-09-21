import styled from "styled-components";
const SFooter = styled.footer`
  background-color: lightblue;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;
const SUl = styled.ul`
  display: flex;
  gap: 1.5rem;
  & li {
    display: flex;
    gap: 1rem;
  }
`;

const Footer = () => {
  return (
    <SFooter>
      <h3>MMZ 뭐먹지</h3>
      <SUl>
        <li>
          <div>FRONTEND</div>
          <div>유현주 | 윤다현 | 조은진</div>
        </li>
        <li>
          <div>BACKEND</div>
          <div>왕효준 | 이원용</div>
        </li>
        <li>
          <div>DESIGN</div>
          <div>탁나현</div>
        </li>
      </SUl>
      <p>팀원의 이름을 누르면 Github 혹은 Blog로 연결됩니다</p>
      <a
        href="https://github.com/codestates-seb/seb39_main_004"
        target="_black"
      >
        Go to Github Repository
      </a>
      <div>Copyrights &copy;2022 seb39_004 Team. All Rights Reserved. </div>
    </SFooter>
  );
};
export default Footer;
