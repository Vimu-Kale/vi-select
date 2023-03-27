import React, { useState } from "react";
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
    OtherHelperText: "",
  });
  const clearOtherInputDetails = () => {
    setOtherInputDetails({
      inputValue: "",
      isValidOther: true,
      OtherHelperText: "",
    });
  };

  const handleSelectChange = (value, action) => {
    console.log(value, action);

    if (action.action === "pop-value") return;
    const currentTargetName = action.name;
    const CompletePatientDetails = { ...completePatientDetails };
    CompletePatientDetails[action.name] = value;

    if (currentTargetName === "surgeon") {
      CompletePatientDetails.surgeonsHelperText = "";
      CompletePatientDetails.isValidSurgeons = true;
    }

    setCompletePatientDetails(CompletePatientDetails);
  };

  const loadedOptions = async (searchQuery, loadedOptions, { page }) => {
    let newOptions;
    const response = await axiosInstance.get(
      `https://api.dev.birthmodel.com/api/physician/medication_list?medication_type=vaginal_delivery_diagnoses`
    );
    if (response.status === 200 || response.status === 201) {
      console.log(response.data.data);
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
  };

  const handleOnCreate = () => {};

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
        otherHelperText={otherInputDetails.OtherHelperText}
        isValidOther={otherInputDetails.isValidOther}
        otherInputDetails={otherInputDetails}
        setOtherInputDetails={setOtherInputDetails}
        clearOtherInputDetails={clearOtherInputDetails}
        handleOnCreate={handleOnCreate}
        loadOptions={loadedOptions}
        onChangeHandler={handleSelectChange}
        selectValue={completePatientDetails.surgeons}
      />
    </div>
  );
};

export default PopupAsyncSelectContainer;
