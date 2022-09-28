import React from "react";
import styled from "styled-components";

const SContainer = styled.div`
  position: relative;
  padding: 0 0 45px;
  .thumbNail {
    width: 100%;
    height: 300px;
  }
`;

const SUserInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;
  height: 130px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid var(--pale-gray);
    display: block;
    margin: 0 auto 5px;
  }
`;

const SUserId = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  color: #333;
  margin-top: 15px;
  font-size: 1.3rem;
`;

const SButtonContaienr = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
  font-size: 0.8rem;
`;

interface Prop {
  thumbNail: string;
  user: {
    ninkname: string;
    email: string;
    userImage: string;
  };
}

const PostUserInfo = ({ thumbNail, user }: Prop) => {
  return (
    <>
      <SContainer>
        <img className="thumbNail" src={thumbNail} alt="profile" />
        <SUserInfo>
          <img src={user.userImage} alt="profile" />
          <SUserId>{user.ninkname}</SUserId>
        </SUserInfo>
        <SButtonContaienr>
          <span>Edit</span>
          <span>Delete</span>
        </SButtonContaienr>
      </SContainer>
    </>
  );
};

export default PostUserInfo;
