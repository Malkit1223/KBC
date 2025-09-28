import React, { useRef } from "react";
import { MDBBtn } from "mdb-react-ui-kit";

const Start = ({ setName, setTimeOut }) => {
  const inputRef = useRef();

  const handleClick = () => {
    setTimeOut(false);
    inputRef.current.value && setName(inputRef.current.value);
  };

  return (
    <div className="start-container">
      <input
        type="text"
        placeholder="Enter Name"
        ref={inputRef}
        className="form-control"
      />
      <MDBBtn className="btn mt-2" onClick={handleClick}>
        Start Game
      </MDBBtn>
    </div>
  );
};

export default Start;
