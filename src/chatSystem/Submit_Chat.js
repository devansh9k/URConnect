import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendIcon from "@mui/icons-material/Send";

function Submit_Chat({ handlesubmit, text, setText }) {
  return (
    <Container__Submmit__Chat onSubmit={handlesubmit}>
      <ChatFoot>
        <AttachIcon>
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <AttachmentOutlinedIcon />
            </IconButton>
          </label>
        </AttachIcon>
        <TypeMsg>
          <TextArea
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
        </TypeMsg>

        <EmojiIcon>
          <IconButton>
            <EmojiEmotionsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SubmitMsg disabled={!text}>
              <SendIcon />
            </SubmitMsg>
          </IconButton>
        </EmojiIcon>
      </ChatFoot>
    </Container__Submmit__Chat>
  );
}

const Container__Submmit__Chat = styled.form``;

const ChatFoot = styled.div`
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  bottom: 0;
  right: 0;
  background-color: var(--background-color);
  overflow: hidden;
  padding: 0 10px;
`;

const AttachIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
`;

const TypeMsg = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TextArea = styled.input`
  width: 100%;
  height: 50%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 14px;
  right: 0;
  resize: none;
  color: var(--text-color);
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const EmojiIcon = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  justify-content: space-between;
  margin-left: 15px;
  margin-right: 15px;
`;

const SubmitMsg = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
`;

export default Submit_Chat;
