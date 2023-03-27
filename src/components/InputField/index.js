import React from "react"; // { useState }
import { withStyles } from "@material-ui/core/styles";
import {
  InputAdornment,
  // IconButton,
  TextField,
  InputLabel,
  TextareaAutosize,
} from "@material-ui/core";
// import EyeOff from "../../assets/icons/EyeOff.svg";
// import EyeOn from "../../assets/icons/Eye.svg";
import "./inputfield.css";

const styles = {
  root: {
    "& .MuiOutlinedInput-root": {
      height: "32px",
      "& fieldset": {
        border: "1px solid #DCDEE2",
        borderRadius: "2px",
      },
      "&:hover fieldset": {
        border: "1px solid #DCDEE2",
        borderRadius: "2px",
      },
    },
  },
};

export const InputField = withStyles(styles)(function ({
  Label,
  Value = "",
  Color,
  Name,
  OnChange,
  OnBlur,
  isValid,
  Message,
  Type,
  Placeholder,
  classes,
  FullWidth = true,
  Style,
  InputAdornmentComp,
  isRequired = false,
  isLabel = true,
  Disabled = false,
  ClassName,
  allowFloat = false,
  IsEditEmailField = false,
  InputProps,
  maxNumberLength,
  OnClick,
  onMouseDown,
  // onFocus,
  ariaAttributes,
  isFocused,
  // Ref,
}) {
  return (
    <>
      {isLabel && (
        <InputLabel required={isRequired} className="inputfield-label">
          {Label}
        </InputLabel>
      )}
      <TextField
        // ref={Ref}
        {...ariaAttributes}
        onMouseDown={onMouseDown}
        // onFocus={onFocus}
        type={Type}
        className={`
        ${
          Disabled
            ? "inputfield-edit-css"
            : IsEditEmailField
            ? "inputfield-email-edit-css"
            : "inputfield-css"
        }${ClassName}`}
        onWheel={(e) => e.target.blur()}
        classes={classes}
        style={Style}
        variant="outlined"
        autoComplete="off"
        color={Color}
        // disabled={Disabled}
        disabled={Disabled}
        onKeyDown={(evt) => {
          Type === "number" &&
            (evt.key === "e" || evt.key === "-") &&
            evt.preventDefault();
          !allowFloat &&
            Type === "number" &&
            evt.key === "." &&
            evt.preventDefault();
        }}
        InputProps={{
          endAdornment: InputAdornmentComp && (
            <InputAdornment position="end">{InputAdornmentComp}</InputAdornment>
          ),
        }}
        inputProps={InputProps}
        placeholder={Placeholder}
        onChange={OnChange}
        onClick={OnClick}
        onBlur={OnBlur}
        value={Value ? Value : ""}
        fullWidth={FullWidth}
        name={Name}
        views={["year", "month"]}
        onInput={(e) => {
          Type === "number" &&
            maxNumberLength &&
            (e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, maxNumberLength));
        }}
        helperText={
          !isValid ? (
            <small className="inputfield-message">{Message}</small>
          ) : null
        }
        focused={isFocused}
      />
    </>
  );
});

// export const InputPasswordField = withStyles(styles)(function ({
//   Label,
//   Value,
//   Color,
//   Name,
//   OnChange,
//   OnBlur,
//   isValid,
//   Message,
//   Placeholder,
//   classes,
//   isRequired,
//   Style,
//   InputProps,
// }) {
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const handleClickShowPassword = () => {
//     setIsPasswordVisible(isPasswordVisible ? false : true);
//   };
//   // replace(/./g, "*"))
//   return (
//     <div>
//       <InputLabel required={isRequired} className="inputfield-label">
//         {Label}
//       </InputLabel>
//       <TextField
//         type={isPasswordVisible ? "text" : "password"}
//         className="input-password-field"
//         variant="outlined"
//         color={Color}
//         style={Style}
//         onChange={OnChange}
//         classes={classes}
//         placeholder={Placeholder}
//         onBlur={OnBlur}
//         value={Value}
//         fullWidth
//         name={Name}
//         helperText={
//           <small className="inputfield-message">
//             {!isValid ? Message : null}
//           </small>
//         }
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle password visibility"
//                 onClick={handleClickShowPassword}
//               >
//                 {isPasswordVisible ? (
//                   <img src={EyeOn} alt="eye open" />
//                 ) : (
//                   <img src={EyeOff} alt="eye open" />
//                 )}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//         inputProps={InputProps}
//       />
//     </div>
//   );
// });

export const InputBox = withStyles(styles)(function ({
  Label,
  Value = "",
  Name,
  OnChange,
  OnBlur,
  isValid,
  Message,
  Type,
  Placeholder,
  Style,
  isRequired = false,
  isLabel = true,
  Disabled = false,
  Rows,
  minRows,
  minHeight,
}) {
  return (
    <>
      {isLabel && (
        <InputLabel required={isRequired} className="inputfield-label">
          {Label}
        </InputLabel>
      )}
      <div className="text-area-field-container">
        <TextareaAutosize
          type={Type}
          className={"inputbox-css"}
          onWheel={(e) => e.target.blur()}
          style={{
            minHeight: minHeight,
          }}
          variant="outlined"
          autoComplete="off"
          disabled={Disabled}
          placeholder={Placeholder}
          onChange={OnChange}
          onBlur={OnBlur}
          value={Value ? Value : ""}
          name={Name}
          maxRows={Rows}
          minRows={minRows}
          maxLength="1000"
        />
        <div className="textAreaCharLimit">
          {1000 - Value?.length} characters remaining
        </div>
        <div>
          <small
            style={{
              marginTop: isValid && "2px",
              display: isValid ? "none" : "block",
            }}
            className="inputfield-message"
          >
            {Message}
          </small>
        </div>
      </div>
    </>
  );
});

export const TemplateInputBox = withStyles(styles)(function ({
  Value = "",
  Name,
  OnChange,
  OnBlur,
  isValid,
  Message,
  Type,
  Placeholder,
  Style,
  Disabled = false,
}) {
  return (
    <>
      <TextareaAutosize
        type={Type}
        onWheel={(e) => e.target.blur()}
        style={{
          ...Style,
          border: "none",
          resize: "none",
          width: "100%",
          outline: "none",
          marginBottom: "10px",
        }}
        autoComplete="off"
        disabled={Disabled}
        placeholder={Placeholder}
        onChange={OnChange}
        onBlur={OnBlur}
        value={Value ? Value : ""}
        name={Name}
        maxRows={3}
        maxLength="1000"
      />

      <div>
        <small
          style={{
            marginTop: isValid && "2px",
            display: isValid ? "none" : "block",
          }}
          className="inputfield-message"
        >
          {Message}
        </small>
      </div>
    </>
  );
});
