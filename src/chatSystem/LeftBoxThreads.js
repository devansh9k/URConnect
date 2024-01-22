import { React } from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import Fade from "react-reveal/Fade";

// add time stamp
//

function LeftBoxThreads({ user, selectUser }) {
  return (
    <Fade bottom>
      <Container__for__Threads>
        <Thread__Wrap onClick={() => selectUser(user)}>
          <Avatar src={user.Avatar} alt="Ur_connect" />
          <Thread__info>
            <h3>{user.UserName}</h3>
          </Thread__info>
          <TimeStamp>
            <div>
              <p>TimeStamp</p>
            </div>
          </TimeStamp>
        </Thread__Wrap>
      </Container__for__Threads>
    </Fade>
  );
}

const Container__for__Threads = styled.div``;

const Thread__Wrap = styled.div`
  widht: 100%;
  height: 60px;
  display: flex;
  padding: 10px;

  &:hover {
    background-color: var(--bg-hover);
    cursor: pointer;
  }
`;

const Thread__info = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    color: var(--text-color);
    font-weight: normal;
    font-size: 14px;
  }
  p {
    color: var(--text2-color);
    font-weight: normal;
    font-size: 12px;
  }
`;

const TimeStamp = styled.div`
  margin-left: auto;
  font-size: 12px;
  p {
    color: var(--text2-color);
  }
`;

export default LeftBoxThreads;
