import React, { useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import Profilelist from "./Profilelist";
import JSONDATA from "../../MOCK_DATA.json";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import SearchUser from "../SearchUser";
import {
  collection,
  query,
  where,
  getDocs,
  startAt,
  endAt,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Suggestion() {
  const size = 5;
  const items = JSONDATA.slice(0, size);

  const [searchdata, setSearchdata] = useState(null);
  const [searchvalue, setSearchValue] = useState("");

  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(true);

  const OnsearchClic = () => {
    setShowSearchResult(!showSearchResult);
    setShowSuggestion(!showSuggestion);
  };

  const [isselect, setIsselect] = useState(null);
  const selection = (user) => {
    setIsselect(user);
  };

  const onsearch = async () => {
    const searchref = collection(db, "users");
    const searchquery = query(
      searchref,
      orderBy("UserName"),
      startAt(searchvalue),
      endAt(searchvalue + "\uf8ff")
    );

    const unsubscribe = await getDocs(searchquery);
    setSearchdata(null);
    if (unsubscribe && searchvalue) {
      let search = [];
      unsubscribe.forEach((doc) => search.push({ ...doc.data(), id: doc.id }));
      setSearchdata(search);
    }
  };

  return (
    <Wrap>
      <MainBox>
        <Searchbar>
          <Search__Field>
            <SearchbarInput
              type="text"
              placeholder="Search"
              value={searchvalue}
              onChange={(e) => setSearchValue(e.currentTarget.value)}
            />

            <IconButton
              onClick={() => {
                OnsearchClic();
                onsearch();
              }}
            >
              <SearchIcon />
            </IconButton>
          </Search__Field>
          <Dropdown show={showSearchResult}>
            <GoBackSearchResult>
              <IconButton
                onClick={() => {
                  OnsearchClic();
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <div>Search Result</div>
            </GoBackSearchResult>
            {searchdata &&
              searchdata.map((search) => (
                <SearchUser
                  key={search.id}
                  search={search}
                  select={selection}
                />
              ))}
          </Dropdown>
        </Searchbar>
        <Sugg__Box__Wrapper show={showSuggestion}>
          <Sugheading>
            <p>Suggestions for You</p>
          </Sugheading>
          <SuggestionBox>
            {items.map((item) => (
              <Fade bottom>
                <Profilelist
                  username={item.username}
                  photoURL={item.imageURL}
                />
              </Fade>
            ))}
          </SuggestionBox>
        </Sugg__Box__Wrapper>
        <About>
          <p>
            <a href="/About">About</a> • <Link to={"/Help"}>Help</Link> •
            PrivacyTerms • Language
          </p>
          <p>c 2022 URCONNECT FROM STUDENT </p>
        </About>
      </MainBox>
    </Wrap>
  );
}

const GoBackSearchResult = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Dropdown = styled.div`
  display: flex;
  display: ${(props) => (props.show ? "block" : "none")};
  margin-top: 10px;

  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 340px;
  z-index: 1;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const Search__Field = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  z-index: 2;
`;

const DropdownItem = styled.div`
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const Wrap = styled.div`
  margin-top: 100px;
  margin-left: 50px;
  width: 400px;

  background-color: white;
  border-radius: 4px;
  padding: 20px;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const MainBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  p {
    margin-top: 15px;
  }
`;
const Sugheading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p:first-child {
    color: grey;
  }
`;

const SuggestionBox = styled.div`
  margin-top: 15px;
  width: 100%;
`;

const About = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  p {
    color: grey;
    font-size: 12px;
    margin-top: 20px;
  }
`;

const Searchbar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`;

const SearchbarInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid lightgrey;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
  &:focus {
    border: 1px solid #00bcd4;
  }

  border: none;
  outline: none;

  font-size: 14px;
  &:focus {
    margin-right: 20px;
  }
`;

const Sugg__Box__Wrapper = styled.div`
  display: flex;
  display: ${(props) => (props.show ? "block" : "none")};

  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 1;
`;

export default Suggestion;
