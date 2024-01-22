import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";

function Post({ useravatar, username, image, caption, selectUser }) {
  const navigate = useNavigate();

  const handleProfileclick = () => {
    navigate("/Profile", {
      state: { username: username, useravatar: useravatar },
    });
  };

  return (
    <Fade bottom>
      <Container>
        <First__component>
          <div onClick={handleProfileclick}>
            <User__Avatar src={useravatar || "/post1.png"} alt="Devansh" />
            <User__name>
              <h3>{username}</h3>
            </User__name>
          </div>
        </First__component>

        <Second__component>
          <PostImage src={image} alt="UR Connect" />
        </Second__component>

        <Third__component>
          <h4>
            <strong>{username}</strong> {caption}
          </h4>
        </Third__component>
      </Container>
    </Fade>
  );
}

const Container = styled.div`
  margin-bottom: 25px;
  max-width: 600px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

const First__component = styled.div`
  & > div {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }
`;

const User__Avatar = styled(Avatar)`
  margin-right: 10px;
`;

const User__name = styled.div``;

const Second__component = styled.div``;

const PostImage = styled.img`
  width: 100%;
  object-fit: contain;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
`;

const Third__component = styled.div`
  padding: 10px;
  h4 {
    font-weight: normal;
  }
`;

export default Post;
