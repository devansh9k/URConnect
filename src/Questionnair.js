import React from "react";

import { useAuth } from "../context/AuthContext";

import styled from "styled-components";

import Header from "../components/Header";
import Feeds from "./Feeds";

function QuestionAnswer() {
  const { currentUser } = useAuth();

  console.log(currentUser);
  return (
    <Wrapper>
      <Header />
      <Feeds />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
`;

export default QuestionAnswer;
