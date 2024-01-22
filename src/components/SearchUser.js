import { React, useState } from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/// Edit this snippet from src\components\RightBoxSugg\Profilelist.js:

function SearchUser({ search, select }) {
  const navigate = useNavigate();
  const handlesearchClick = () => {
    navigate("/Profile", {
      state: { username: search.UserName, useravatar: search.Avatar },
    });
  };
  return (
    <div>
      <Thread__Wrap onClick={handlesearchClick}>
        <Avatar src={search.Avatar} alt="Ur_connect" />
        <Thread__info>
          <h3>{search.UserName}</h3>
        </Thread__info>
      </Thread__Wrap>
    </div>
  );
}

const Thread__Wrap = styled.div`
  widht: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;

  &:hover {
    background-color: var(--bg-hover);
    cursor: pointer;
  }
`;

//const Thread__avatar = styled.img``;

const Thread__info = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  h3 {
    color: var(--text-color);
    font-weight: normal;
    font-size: 14px;
  }
`;
export default SearchUser;
