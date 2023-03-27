import React from "react";
import { Button } from "@material-ui/core";
// import { DOWNLOAD_ICON } from "../../constants/image";
import "./index.css";
import LoadingState from "../../common/Loader";

const ActionButton = ({
  title,
  type,
  tableButton,
  margin,
  onClick,
  width,
  disabled,
  isLoading,
  height,
  wordCase,
  customClass,
}) => {
  let buttonClass = "";
  if (disabled) {
    buttonClass = "action-button-disabled";
  } else if (!tableButton && type !== "negative" && type !== "download") {
    buttonClass = "action-button-positive";
  } else if (!tableButton && type === "negative") {
    buttonClass = "action-button-negative";
  } else if (!tableButton && type === "download") {
    buttonClass = "action-button-download";
  } else if (tableButton && type === "negative") {
    buttonClass = "active-table-button-negative";
  } else {
    buttonClass = "active-table-button-positive";
  }

  let heightToSet = "";
  if (height) {
    heightToSet = height;
  } else if (tableButton) {
    heightToSet = "28px";
  } else {
    heightToSet = "32px";
  }

  let paddingToSet;
  if (width) {
    paddingToSet = "";
  } else if (!tableButton) {
    paddingToSet = "5px 16px";
  } else {
    paddingToSet = "4px 8px";
  }
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={`${buttonClass} ${customClass ? customClass : ""}`}
      style={{
        height: heightToSet,
        margin: margin ? margin : "0px",
        padding: paddingToSet,
        width: width ? width : "",
        pointerEvents: isLoading ? "none" : "auto",
        textTransform: wordCase ? wordCase : "capitalize",
      }}
    >
      {type === "download" ? (
        <img
          // src={DOWNLOAD_ICON}
          alt="download icon"
          style={{ paddingRight: 5 }}
          className={isLoading ? "visibility-hidden" : ""}
        />
      ) : (
        ""
      )}
      {isLoading && (
        <div className="loader-center">
          <LoadingState Width="24px" Height="24px" />
        </div>
      )}
      <div className={isLoading ? "visibility-hidden" : ""}>{title}</div>
    </Button>
  );
};

export default ActionButton;
