import React, { useCallback, useState } from "react";
import PopupAsyncSelect from "../../components/PopupAsyncSelect/PopupAsyncSelect";
import axiosInstance from "../../utils/axios";

const PopupAsyncSelectContainer = () => {
  const [asyncIsOpen, setAsyncIsOpen] = useState(false);

  const [completePatientDetails, setCompletePatientDetails] = useState({
    surgeons: [],
    isValidSurgeons: true,
    surgeonsHelperText: "",
  });

  const [otherInputDetails, setOtherInputDetails] = useState({
    inputValue: "",
    isValidOther: true,
    otherHelperText: "",
  });

  const clearOtherInputDetails = useCallback(() => {
    setOtherInputDetails({
      inputValue: "",
      isValidOther: true,
      otherHelperText: "",
    });
  }, []);

  const handleSelectChange = (value, action) => {
    console.log(value, action);

    if (action.action === "pop-value") return;
    const currentTargetName = action.name;
    const CompletePatientDetails = { ...completePatientDetails };
    CompletePatientDetails[action.name] = value;

    if (currentTargetName === "surgeons") {
      CompletePatientDetails.surgeonsHelperText = "";
      CompletePatientDetails.isValidSurgeons = true;
    }

    setCompletePatientDetails(CompletePatientDetails);
  };

  const loadedOptions = async (searchQuery, loadedOptions, { page }) => {
    let newOptions = [];
    try {
      const response = await axiosInstance.get(
        `https://api.dev.birthmodel.com/api/physician/medication_list?medication_type=vaginal_delivery_diagnoses`
      );
      if (response.status === 200 || response.status === 201) {
        const modifiedResults =
          response?.data?.data &&
          response.data.data.map((item) => {
            const Label =
              item?.medication_code === null
                ? item.medication_value
                : `${item.medication_code} | ${item.medication_value}`;

            const newItem = {
              value: `${item.id}`,
              label: Label,
            };
            return newItem;
          });

        newOptions = modifiedResults;
      }
      return {
        options: newOptions,
      };
    } catch (error) {
      return {
        options: newOptions,
      };
    }
  };

  const handleInputBlur = (name) => {
    const CompletePatientDetails = { ...completePatientDetails };
    const currentTargetName = name;
    if (currentTargetName === "surgeons") {
      if (
        !CompletePatientDetails.surgeons ||
        !CompletePatientDetails?.surgeons?.length
      ) {
        CompletePatientDetails.isValidSurgeons = false;
        CompletePatientDetails.surgeonsHelperText = "surgeons is required";
      } else {
        CompletePatientDetails.isValidSurgeons = true;
        CompletePatientDetails.surgeonsHelperText = "";
      }
    }

    setCompletePatientDetails(CompletePatientDetails);
  };

  const handleOnCreate = (inputValue, name) => {
    let value = inputValue.trim();
    const OtherInputDetails = { ...otherInputDetails };
    const CompletePatientDetails = { ...completePatientDetails };

    if (value === "") {
      OtherInputDetails.otherHelperText = "Field cannot stay empty";
      OtherInputDetails.isValidOther = false;
    } else {
      const Capitalized = value?.charAt(0)?.toUpperCase() + value?.slice(1);

      const newOption = {
        value: Date.now().toString(),
        label: Capitalized,
        __isNew__: true,
      };

      if (Array.isArray(completePatientDetails[name])) {
        CompletePatientDetails[name] = [
          ...completePatientDetails[name],
          newOption,
        ];

        OtherInputDetails.inputValue = "";
        OtherInputDetails.isValidOther = true;
        OtherInputDetails.otherHelperText = "";

        setAsyncIsOpen(false);

        CompletePatientDetails.isValidSurgeons = true;
        CompletePatientDetails.surgeonsHelperText = "";
      } else {
        CompletePatientDetails[name] = newOption;
        OtherInputDetails.inputValue = "";
        OtherInputDetails.isValidOther = true;
        OtherInputDetails.otherHelperText = "";
        setAsyncIsOpen(false);

        CompletePatientDetails.isValidSurgeons = true;
        CompletePatientDetails.surgeonsHelperText = "";
      }
    }

    setOtherInputDetails(OtherInputDetails);
    setCompletePatientDetails(CompletePatientDetails);
  };

  return (
    <div
      style={{
        width: "250px",
      }}
    >
      <PopupAsyncSelect
        name="surgeons"
        isRequired={true}
        isLabel={true}
        label={"PopupAsyncSelect"}
        isOpen={asyncIsOpen}
        setIsOpen={setAsyncIsOpen}
        allowOther={true}
        allowCheckBox={true}
        isMulti={true}
        isValid={completePatientDetails.isValidSurgeons}
        helperText={completePatientDetails.surgeonsHelperText}
        otherHelperText={otherInputDetails.otherHelperText}
        isValidOther={otherInputDetails.isValidOther}
        otherInputDetails={otherInputDetails}
        setOtherInputDetails={setOtherInputDetails}
        clearOtherInputDetails={clearOtherInputDetails}
        handleOnCreate={handleOnCreate}
        loadOptions={loadedOptions}
        onChangeHandler={handleSelectChange}
        selectValue={completePatientDetails.surgeons}
        handleInputBlur={handleInputBlur}
      />
    </div>
  );
};

export default PopupAsyncSelectContainer;
