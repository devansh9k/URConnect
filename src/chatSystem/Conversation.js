import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import Fade from "react-reveal/Fade";

//import Moment from 'react-moment'
import "./Conversation.css";

function Conversation({ id, msg }) {
  const { currentUser } = useAuth();

  return (
    <Fade bottom>
      <Wrapper
        className={`wrapper ${
          msg.from == currentUser.uid
        }? 'currentUserClass' : 'oppositeClass'`}
      >
        <TextMessage
          className={msg.from == currentUser.uid ? "myclass" : "friendclass"}
        >
          <p>{msg.text} </p>
          <br />
          <small>
            {/* <Moment fromNow>{msg.timestamp.todate()}</Moment> */}
          </small>
        </TextMessage>
      </Wrapper>
    </Fade>
  );
}

const TextMessage = styled.p`
  padding: 5px;

  height: auto;
  width: auto;
  max-width: 40%;
  border-radius: 5px;
`;
const Wrapper = styled.div`
  margin-top: 5px;
  padding: 0 5px;
`;

// .wrapper{
//   margin-top: 5px;
//   padding:0px 5px;
// }

// .wrapper p{
//   padding :5px;
//   display: inline-block;
//   height:25px;
//   max-width:  100%;
//   border-radius: 5px;
//   /* fee227 */
// }

// .wrapper.currentUserClass{
//  text-align: right;
// }

// .wrapper.oppositeClass{
//  text-align: left;
// }

export default Conversation;
