import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import GridOnIcon from "@mui/icons-material/GridOn";
import { db } from "../firebase";

import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  addDoc,
} from "firebase/firestore";

function Userposts({ username }) {
  const [postuser, setPostuser] = useState([]);
  const [newusername, setNewusername] = useState("");

  useEffect(() => {
    // setNewusername(username)
    // console.log(username)

    const userRef = collection(db, "UserPost");

    const q = query(userRef, where("username", "==", `${username}`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let newpost = [];
      snapshot.forEach((element) => {
        newpost.push({ ...element.data(), id: element.id });
      });

      setPostuser(newpost);
    });
    return () => unsubscribe;
  }, []);

  return (
    <Wrap>
      <Post__Nav>
        <h2>posts</h2>
      </Post__Nav>
      <Container>
        <Post__Container>
          {postuser &&
            postuser.map((newpost) => <Post_img src={newpost.Postimage} />)}
          {/* <Post_row>
            <Post_img src="./post1.png" alt="post" />
            <Post_img src="./post1.png" alt="post" />
            <Post_img src="./post1.png" alt="post" />
          </Post_row>
          <Post_row>
            <Post_img src="./post1.png" alt="post" />
            <Post_img src="./post1.png" alt="post" />
            <Post_img src="./post1.png" alt="post" />
          </Post_row>
          <Post_row>
            <Post_img src="./post1.png" alt="post" />
          </Post_row> */}
        </Post__Container>
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  width: 60%;
`;

const Post__Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid black;
  h2 {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: normal;
    padding: 10px;
  }
`;

const Post__Container = styled.div`
  disign: flex;
  flex-direction: column;
  align-items: space-between;
  width: 100%;
`;

const Post_row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Post_img = styled.img`
  width: 285px;
  height: 285px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export default Userposts;
