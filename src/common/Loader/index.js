import React from "react";
import Loader from "react-loader-spinner";
import "./loader.css";

function LoadingState({ Width, Height }) {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Loader type="TailSpin" color="#00BFFF" height={Height} width={Width} />
    </div>
  );
}

export default LoadingState;
