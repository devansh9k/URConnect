import React, { useEffect } from "react";
import StorageUse from "../StorageUse";
import styled from "styled-components";
import { Container } from "@mui/system";

function LoadingBar({ imgfile, setImgfile }) {
  const { url, progress } = StorageUse(imgfile);
  // console.log(url, progress);

  useEffect(() => {
    if (url) {
    }
  }, [url, setImgfile]);

  return (
    <Container__Loader>
      <Loadincomponent style={{ width: progress + "%" }}></Loadincomponent>
    </Container__Loader>
  );
}

const Container__Loader = styled.div``;

const Loadincomponent = styled.div`
  height: 5px;

  background-color: black;
  border-radius: 4px;
  margin-top: 10px;
  transition: width 0.4s ease-in-out;
`;

export default LoadingBar;

// function LoadingBar({ fileload, setFileload }) {
//   const { url, progress } = StorageUse(fileload);
//   console.log(url, progress);

//   useEffect(() => {
//     if (url) {
//       setFileload(null);
//       console.log(fileload);
//       console.log(url);
//       console.log(progress);
//     }
//   }, [url, setFileload]);

//   return (
//     <Container__Loader>
//       <Loadincomponent style={{ width: progress + "%" }}></Loadincomponent>
//     </Container__Loader>
//   );
// }

// const Container__Loader = styled.div``;

// const Loadincomponent = styled.div`
//   height: 5px;

//   background-color: blue;
// `;

// export default LoadingBar;
