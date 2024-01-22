import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "./Post";
import Suggestion from "./RightBoxSugg/Suggestion";
import Header from "./Header";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import LoadingBar from "./LoadingBar";
// import SearchUser from "./SearchUser";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   startAt,
//   endAt,
//   orderBy,
// } from "firebase/firestore";

import { db } from "../firebase";

function Home() {
  // const [searchdata, setSearchdata] = useState(null);
  // const [searchvalue, setSearchValue] = useState("");

  // const onsearch = async () => {
  //   const searchref = collection(db, "users");
  //   const searchquery = query(
  //     searchref,
  //     orderBy("UserName"),
  //     startAt(searchvalue),
  //     endAt(searchvalue + "\uf8ff")
  //   );

  //   const unsubscribe = await getDocs(searchquery);
  //   setSearchdata(null);
  //   if (unsubscribe && searchvalue) {
  //     let search = [];
  //     unsubscribe.forEach((doc) => search.push({ ...doc.data(), id: doc.id }));
  //     setSearchdata(search);
  //   }
  // };

  const [imgpost, setImgpost] = useState(null);
  useEffect(() => {
    db.collection("UserPost")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setImgpost(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            userPost: doc.data(),
          }))
        )
      );
  }, []);

  const [isselect, setIsselect] = useState(false);
  const selectUser = (user) => {
    setIsselect(user);
    console.log(user);
  };

  return (
    <Wrap>
      <Header />

      <HomeContainer>
        {imgpost &&
          imgpost.map(({ id, userPost }) => (
            <Post
              key={id}
              ID={id}
              username={userPost.username}
              caption={userPost.caption}
              image={userPost.Postimage}
              useravatar={userPost.avatar}
              selectUser={selectUser}
            />
          ))}
      </HomeContainer>

      <Fade right>
        <RightBox>
          <Suggestion />
        </RightBox>
      </Fade>
    </Wrap>
  );
}

const RightBox = styled.div`
  position: sticky;
`;

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  background-color: lightgrey;
`;

const HomeContainer = styled.div`
  margin-top: 100px;
  width: 500px;
`;

export default Home;
