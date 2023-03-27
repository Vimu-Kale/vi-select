import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  InputLabel,
  withStyles,
} from "@material-ui/core";
// import "../SelectComponent.css";
import "./PopupAsyncSelect.css";
import { CROSS_ICON, PLUS_ICON, SELECT_CARET } from "../../constants/image";
import { AsyncPaginate } from "react-select-async-paginate";
import { components } from "react-select";
import { InputField } from "../InputField";
import ActionButton from "../ActionButton";
const defaultAdditional = {
  page: 1,
};

const PopupAsyncSelect = ({
  isLabel = false,
  isRequired = false,
  label = "",
  disableSelect = false,
  isOpen = false,
  setIsOpen = () => {},
  placeholder = "Select...",
  otherPlaceholder = "Add Other",
  selectValue = [],
  isValid = true,
  helperText = "",
  name = "",
  loadOptions,
  maxMenuHeight = 200,
  isMulti = false,
  allowCheckBox = false,
  onChangeHandler,
  isDisabled = false,
  allowOther = false,
  otherHelperText = "",
  isValidOther = false,
  otherInputDetails = {},
  setOtherInputDetails,
  clearOtherInputDetails = () => {},
  handleOnCreate = () => {},
}) => {
  const [isOther, setIsOther] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectStyle = {
    control: (base, { isDisabled, isFocused }) => ({
      ...base,
      border: `1px solid ${isFocused ? "#ABDFE2" : "#DCDEE2"} !important`,
      boxShadow: "0 !important",
      cursor: "pointer",
      height: "32px",
      minHeight: "32px",
      borderRadius: "2px",
      paddingTop: "0px",
      color: "#515A6E",
      backgroundColor: isDisabled && "#F8F8F9",
      "&:hover": {
        border: `1px solid ${isFocused ? "#ABDFE2" : "#DCDEE2"} !important`,
      },
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#808695",
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "22px",
      textTransform: "capitalize",
    }),

    singleValue: (provided, state) => ({
      ...provided,
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "16px",
      // ...(Color && { color: Color }),
      ...(state.isDisabled && { color: "rgba(0,0,0,0.38)" }),
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#EEF9F9" : "#ffff",
      borderRadius: "2px",
      color: "#101010",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "16px",
      paddingTop: "5px",
      paddingBottom: "5px",
      "&:hover": {
        backgroundColor: "#EEF9F9",
      },
    }),

    menu: (base, state) => ({
      ...base,
      backgroundColor: "#FFFFFF",
      position: "relative",
      boxShadow: "unset",
      marginTop: "10px",
      right: 0,
    }),
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  const CaretDownIcon = () => {
    return (
      <img
        src={SELECT_CARET}
        alt="select caret indicator"
        style={{
          transition: "all .2s ease",
          transform: isOpen ? "rotate(180deg)" : null,
        }}
      />
    );
  };

  const PlusIcon = () => {
    return (
      <img
        src={PLUS_ICON}
        alt="Plus Icon"
        style={{
          marginLeft: "-7px",
        }}
      />
    );
  };

  const CrossIcon = () => {
    return <img src={CROSS_ICON} alt="cross icon" />;
  };

  const CustomCheckbox = withStyles({
    root: {
      marginLeft: "-20px",
      color: "#DCDEE2",
      "&:hover": {
        backgroundColor: "transparent !important",
      },
      "&$checked": {
        color: "#abdfe2",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const Menu = (props) => {
    return (
      <>
        <components.Menu {...props}>
          <div>{props.children}</div>
        </components.Menu>
      </>
    );
  };

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <div className="option-container select-checkbox">
            <CustomCheckbox
              checked={props.isSelected}
              onChange={() => null}
              size="small"
            />
            <label className="option-label">{props.label}</label>
          </div>
        </components.Option>
      </div>
    );
  };

  const OnChange = (selected, action) => {
    onChangeHandler(selected, action);
    setIsOpen(false);
  };

  const onInputChange = (inputValue, actionMeta) => {
    if (
      actionMeta.action !== "input-blur" &&
      actionMeta.action !== "menu-close"
    ) {
      setSearchValue(inputValue);
    }
  };

  const handleRemoveValue = (e) => {
    const buttonName = e.currentTarget.name;
    const selectName = e.currentTarget.id;

    console.log(selectName, buttonName);
    console.log(selectValue);
    const removedValue = selectValue.find((val) => val.value === buttonName);

    if (!removedValue) return;
    onChangeHandler(
      selectValue.filter((val) => val.value !== buttonName),
      {
        buttonName,
        action: "remove-value",
        removedValue,
        name: selectName,
      }
    );
  };

  return (
    <Box className="popupselect-component-container">
      {/* BUTTON START */}
      {isLabel && (
        <InputLabel className="inputfieldLabel" required={isRequired}>
          {label}
        </InputLabel>
      )}
      <div className="custom-select-popup-container">
        <div
          className={`custom-select-popup-button ${
            isOpen ? `custom-select-button-selected` : ""
          }
        ${disableSelect ? `custom-select-button-disabled` : ""}`}
          onClick={() => {
            !disableSelect && setIsOpen(!isOpen);
          }}
        >
          <div className="custom-select-value">
            {selectValue?.label ? selectValue?.label : placeholder}
          </div>
          <div className="custom-select-endIcon">
            <CaretDownIcon />
          </div>
        </div>
        {/* BUTTON END */}
        {/* HELPER TEXT */}
        <div>
          <small
            style={{
              marginTop: isValid && "2px",
              display: isValid ? "none" : "block",
            }}
            className="inputfield-message"
          >
            {helperText}
          </small>
        </div>
        {/* HELPER TEXT END */}
        {/* POPUP START */}
        {isOpen && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="custom-select-popup-container">
              {/* ACTUAL SELECT COMPONENT */}
              <AsyncPaginate
                menuIsOpen
                name={name}
                styles={selectStyle}
                value={selectValue}
                loadOptions={loadOptions}
                maxMenuHeight={maxMenuHeight}
                controlShouldRenderValue={false}
                isMulti={isMulti}
                components={{
                  DropdownIndicator: null,
                  IndicatorSeparator: null,
                  Menu: Menu,
                  ...(allowCheckBox && {
                    Option: Option,
                  }),
                }}
                defaultOptions={true}
                hideSelectedOptions={false}
                isClearable={false}
                backspaceRemovesValue={false}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                debounceTimeout={500}
                isDisabled={isDisabled}
                onChange={OnChange}
                inputValue={searchValue}
                onInputChange={onInputChange}
                additional={defaultAdditional}
              />
              {/* ACTUAL SELECT COMPONENT END */}
              {/* ADD OTHER COMPONENT */}
              {allowOther ? (
                !isOther ? (
                  <>
                    <Button
                      fullWidth
                      startIcon={<PlusIcon />}
                      style={{
                        textTransform: "none",
                        textAlign: "left",
                        justifyContent: "flex-start",
                        padding: "6px 14px",
                      }}
                      onClick={() => setIsOther(!isOther)}
                    >
                      Other
                    </Button>
                  </>
                ) : (
                  <div className="select-other-container">
                    <InputField
                      Placeholder={otherPlaceholder}
                      Value={otherInputDetails?.inputValue}
                      OnChange={(e) => {
                        setOtherInputDetails({
                          ...otherInputDetails,
                          isValidOther: true,
                          otherHelperText: "",
                          inputValue: e.target.value,
                        });
                      }}
                      isValid={isValidOther}
                      Message={otherHelperText}
                    />
                    <div className="select-other-buttons">
                      <ActionButton
                        type="negative"
                        title="Cancel"
                        onClick={() => {
                          setIsOther(false);
                          clearOtherInputDetails();
                        }}
                        width={"49%"}
                      />

                      <ActionButton
                        title={"Add"}
                        width={"49%"}
                        onClick={() =>
                          handleOnCreate(otherInputDetails?.inputValue, name)
                        }
                      />
                    </div>
                  </div>
                )
              ) : null}
              {/* ADD OTHER COMPONENT END */}
            </div>
          </ClickAwayListener>
        )}
        {/* POPUP END */}

        {(selectValue?.length || selectValue?.length > 0) && (
          <div className="values-container-flex">
            {isMulti
              ? selectValue.map((val) => (
                  <div key={val.value} className="select-value">
                    {val.label}
                    <button
                      name={val.value}
                      id={name}
                      key={val.value}
                      onClick={handleRemoveValue}
                      className="xbutton"
                    >
                      <CrossIcon />
                    </button>
                  </div>
                ))
              : null}
          </div>
        )}
      </div>
    </Box>
  );
};

export default PopupAsyncSelect;
