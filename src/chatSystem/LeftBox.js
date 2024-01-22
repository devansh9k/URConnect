import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "../Global.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LeftBoxThreads from "./LeftBoxThreads";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import firebase from "firebase/compat/app";
import Submit_Chat from "./Submit_Chat";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  addDoc,
} from "firebase/firestore";
import Conversation from "./Conversation";
import ClearIcon from "@mui/icons-material/Clear";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Flip from "react-reveal/Flip";
import Fade from "react-reveal/Fade";

const LeftBox = () => {
  const { currentUser } = useAuth();
  const [burgerStat, setStat] = React.useState(false);
  const [ischat, setIschat] = useState("");
  const [chatusers, setChatusers] = useState([]);
  const [allmsg, setAllmsg] = useState("");
  const [text, setText] = useState("");

  // const navigate = useNavigate();

  useEffect(() => {
    const userRef = collection(db, "users");

    const q = query(userRef, where("uid", "not-in", [currentUser.uid]));
    //const newquery=query(q,orderBy("timmestamp","desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let users = [];
      snapshot.forEach((element) => {
        users.push(element.data());
      });
      // console.log(users)
      setChatusers(users);
    });
    return () => unsubscribe;
  }, []);

  const selectUser = (user) => {
    setIschat(user);
    // console.log(ischat)

    const id =
      currentUser.uid > ischat.uid
        ? `${currentUser.uid + ischat.uid}`
        : `${ischat.uid + currentUser.uid}`;
    const msgref = collection(db, "chatUser", id, "chat");
    const newquery = query(msgref, orderBy("timestamp", "asc"));

    onSnapshot(newquery, (snapshot) => {
      let chats = [];
      snapshot.forEach((element) => {
        chats.push(element.data());
      });
      setAllmsg(chats);
      // console.log(allmsg)
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const id =
      currentUser.uid > ischat.uid
        ? `${currentUser.uid + ischat.uid}`
        : `${ischat.uid + currentUser.uid}`;
    const chatRef = collection(db, "chatUser", id, "chat");
    await addDoc(chatRef, {
      text,
      from: currentUser.uid,
      to: ischat.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText("");
  };

  // const bottomRef = useRef(null);

  // useEffect(() => {
  //   // 👇️ scroll to bottom every time messages change
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [allmsg]);

  return (
    <Container>
      <BurgerMenu show={burgerStat}>
        <Wrapper>
          <Me>
            <MyAvatar
              src={currentUser.photoURL || "/defaultAvatar.png"}
              alt="avatar"
            />
            <h3>{currentUser.displayName}</h3>
          </Me>
          <div>
            <IconButton onClick={() => setStat(false)}>
              <ClearIcon />
            </IconButton>
          </div>
        </Wrapper>
        <Menu>
          <Option>
            <li>
              <BookmarkAddIcon />
              <p href="#">Saved Messages</p>
            </li>
          </Option>
          <Option>
            <li>
              <SettingsIcon />
              <p href="#">Setting</p>
            </li>
          </Option>
          {/* <Option>
            <li>
              <DarkModeIcon />
              <p href="#">Dark Mode</p>
            </li>
          </Option> */}
        </Menu>
      </BurgerMenu>

      <Search__Header>
        <Hamburger>
          <MenuOutlinedIcon onClick={() => setStat(true)} />
        </Hamburger>
        <Search__input type="text" placeholder="Search" />
      </Search__Header>
      <LeftContainer>
        <Threads__Box>
          {chatusers.map((user) => (
            <LeftBoxThreads
              key={user.uid}
              user={user}
              selectUser={selectUser}
            />
          ))}
          {/* {users.map(user=> <Threads key={user.uid} user={user}/>)} */}
        </Threads__Box>
      </LeftContainer>

      <Right__Container>
        {ischat ? (
          <>
            <Fade>
              <User__info__Header>
                <h4>{ischat.UserName}</h4>
                <IconButton>
                  <ThreeDotMenu href="/Home">
                    <ClearIcon />
                  </ThreeDotMenu>
                </IconButton>
              </User__info__Header>
            </Fade>

            {/* <ChatBox> */}

            <ChatArea>
              {/* {console.log(allmsg.map((id,msg)=>id.text))} */}

              {allmsg.length
                ? allmsg.map((msg, id) => <Conversation key={id} msg={msg} />)
                : null}
            </ChatArea>
            {/* </ChatBox> */}
            <Fade>
              <Submit_Chat
                handlesubmit={handlesubmit}
                text={text}
                setText={setText}
              />
            </Fade>
          </>
        ) : (
          <NoSelect>
            <IconButton>
              <ThreeDotMenu href="/Home">
                <ClearIcon />
              </ThreeDotMenu>{" "}
            </IconButton>

            <strong>Select user to start chat</strong>
            <div></div>
          </NoSelect>
        )}
      </Right__Container>
    </Container>
  );
};

const Threads__Box = styled.div`
  margin-top: 60px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 25%;
  height: 100%;
  z-index: ;
  left: 0;
  top: 0;

  background-color: var(--background-color);
  border-right: 1px solid grey;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Search__Header = styled.div`
  position: absolute;
  width: 25%;
  height: 60px;
  top: 0;
  left: 0;
  margin-right: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  z-index: 1;
`;

const Hamburger = styled(IconButton)`
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  margin: 0 10px 0 0;
  color: white : important;
`;

const Search__input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 14px;
  padding: 0 10px;
  background-color: var(--background-color);
  border-radius: 5px;
  color: var(--text-color);

  &:focus {
    background-color: var(--search-bg);
  }
`;

const BurgerMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  width: 300px;
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 2;
  border-right: 1px solid lightgrey;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
`;

const NoSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const Menu = styled.div`
  margin-top: 20px;
`;

const Option = styled.div`
  border-radius: 5px;
  &:hover {
    background-color: var(--bg-hover);
    cursor: pointer;
  }
  li {
    padding: 15px 0;
    display: flex;
    align-items: center; }
    p {
      color: var(--text-color);
      margin-left: 10px;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Me = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  height: 100px;

  h3 {
    color: var(--text-color);
    margin-top: 20px;
  }

  Avatar {
    transform: scale(1.8);
  }
`;

const MyAvatar = styled(Avatar)`
  width: 100%;
  transform: scale(1.5);
  margin-bottom: 5px;
  margin-left: 10px;
`;

const Right__Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 75%;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 1;
  background-color: var(--bg-hover);

  h3 {
    color: var(--text-color);
  }
  p {
    color: var(white);
  }
  .notselect {
    margin-left: 35px;
    margin-top: 25vh;
    justify-content: center;
    text-align: center;
    width: 100%;
    font-weight: 600;
    font-size: 20px;
  }
`;

const User__info__Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: 60px;
  top: 0;
  right: 0;
  z-index: 1;
  background-color: var(--background-color);
  padding-right: 10px;
  h4 {
    margin-left: 10px;
  }
`;

const ThreeDotMenu = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  right: 0;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  overflow-y: auto;
  margin-bottom: 50px;
  width: 100%;
  height: 100%;

  word-wrap: break-word;
  p {
    break-word: break-all;
  }
`;

export default LeftBox;
