import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ForumIcon from "@mui/icons-material/Forum";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
// import { collection, query, where, onSnapshot } from "firebase/firestore";

import { Avatar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Zoom from "react-reveal/Zoom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import "firebase/storage";
import LoadingBar from "./LoadingBar";
import SearchUser from "./SearchUser";
const storage = getStorage();

function Header() {
  // const [searchdata, setSearchdata] = useState(null);
  const { currentUser, signout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [Isopen, setIsopen] = useState(false);
  const [caption, setCaption] = useState("");
  const [imgfile, setImgfile] = useState(null);
  const [fileload, setFileload] = useState(null);
  const [imgurl, setImgurl] = useState(null);
  // const [searchvalue, setSearchValue] = useState("");
  function handleOpen() {
    setIsopen(true);
  }
  function handleClose() {
    setIsopen(false);
  }

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

  const handleProfileclick = () => {
    navigate("/Profile", {
      state: {
        username: currentUser.displayName,
        useravatar: currentUser.photoURL,
      },
    });
  };

  async function uploadPostImage(imgfile, id) {
    const fileRef = ref(storage, `UserPost/${id}/${imgfile.name}`);

    const snap = await uploadBytes(fileRef, imgfile);
    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

    return url;
  }

  const handlePost = async (e) => {
    e.preventDefault();

    const url = await uploadPostImage(imgfile, currentUser.uid);
    if (url) {
      db.collection("UserPost").add({
        username: currentUser.displayName,
        avatar: currentUser.photoURL,
        caption: caption,
        Postimage: url,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setIsopen(false);
    setImgfile(null);
    setCaption(null);
  };

  const PostOpen = () => {
    setIsopen(true);
  };

  const [prView, setPrView] = useState();
  useEffect(() => {
    if (!imgfile) {
      ////////////////////////////
      setPrView(undefined);
      return;
    }
    const ObjUrl = URL.createObjectURL(imgfile);
    setPrView(ObjUrl);
    return () => URL.revokeObjectURL(ObjUrl);
  }, [imgfile]);

  const ClosePreviewOfImage = () => {
    setPrView(undefined);
  };

  return (
    <div>
      <Container>
        <a href="/Home">
          <Logo src="/logotest2.svg" alt="UR Connect" />
        </a>

        <Menu>
          {/* ///// some bug with search bbarr */}
          <IconButton href="/Home">
            <HomeI />
          </IconButton>

          <IconButton href="/chat">
            <ChatI />
          </IconButton>
          <IconButton href="#">
            <NewPost
              onClick={(event) => {
                PostOpen();
                ClosePreviewOfImage();
              }}
            />
          </IconButton>

          <IconButton href="/Questionnaires">
            <QandA />
          </IconButton>
          <Modal__Component open={Isopen} onClose={handleClose}>
            <Box__Wrapper>
              <Zoom bottom>
                <First_Comp>
                  <Box__Header>
                    <div></div>
                    <h1>Add Post</h1>
                    <IconButton>
                      <CloseIcon
                        onClick={handleClose}
                        className="SvgIconsSec"
                      />
                    </IconButton>
                  </Box__Header>
                  <Box__User>
                    <Avatar src={currentUser.photoURL} />
                    <h2>{currentUser.displayName} </h2>
                  </Box__User>
                </First_Comp>
                <Load>
                  {imgfile && (
                    <div>
                      <LoadingBar imgfile={imgfile} setImgfile={setImgfile} />
                      <br />
                      <br />
                    </div>
                    // <LoadingBar fileload={fileload} setFileload={setFileload} />
                  )}
                </Load>
                <PreViewImage>
                  <img src={prView} alt="Upload Your Picture" />
                </PreViewImage>
                <Box__Post>
                  <Box__Footer>
                    <AttachIcon>
                      <input
                        accept="image/*"
                        id="upload-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setImgfile(event.currentTarget.files[0]);
                          setFileload(event.currentTarget.files[0]);
                        }}
                      />
                      <label htmlFor="upload-button-file">
                        <div>
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                          >
                            <FileUploadIcon className="SvgIcons" />
                          </IconButton>
                        </div>
                      </label>

                      <CaptionInput
                        type="text"
                        placeholder="Add a caption"
                        value={caption}
                        onChange={(e) => setCaption(e.currentTarget.value)}
                      />
                    </AttachIcon>
                    <div></div>
                    <Modal_Buttons>
                      <IconButton onClick={handleClose}>
                        <Cancelcon className="SvgIcons" />
                      </IconButton>
                      <IconButton onClick={handlePost}>
                        <CheckCircleIcon className="SvgIcons" />
                      </IconButton>
                    </Modal_Buttons>
                  </Box__Footer>
                </Box__Post>
              </Zoom>
            </Box__Wrapper>
          </Modal__Component>

          <IconButton onClick={handleProfileclick}>
            <AccountIcon />
          </IconButton>

          <IconButton onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Menu>
      </Container>
    </div>
  );
}

export default Header;

const AccountIcon = styled(AccountCircleIcon)`
  margin-right: 10px;
`;

const CaptionInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 10px;
  border: none;
  padding: 0px 10px;
  font-size: 16px;
  outline: none;
  & hover {
    background-color: lightgray;
  }
`;

const Cancelcon = styled(CancelIcon)`
  margin-right: 10px;
`;

const First_Comp = styled.div`
  margin-bottom: 10px;
`;

const PreViewImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  justify-content: space-between;
  min-height: 60px;
  position: fixed;
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0 20px;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  background-color: white;
  z-index: 1;
`;

const Logo = styled.img`
  margin-left: 30px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  margin-right: 30px;
  with: 100%;
  a {
    font-weight: 600;
    text-transform: uppercase;
    margin-right: 20px;
    flex-wrap: nowrap;
  }

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const Modal__Component = styled(Modal)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const HomeI = styled(HomeIcon)``;

const ChatI = styled(SendIcon)``;

const NewPost = styled(AddCircleIcon)``;

const QandA = styled(ForumIcon)``;

const Box__Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 55%;
  height: 70%;
  background-color: white;
  outline: none;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
`;

const Box__Post = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  align-items: space-between;
`;

const Box__Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const Box__User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h2 {
    margin-left: 10px;
  }
  padding-left: 10px;
`;

const Modal_Buttons = styled.div`
  padding: 10px;
  IconButton {
  }
`;

const Box__Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AttachIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Load = styled.div``;
