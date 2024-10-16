import React from "react";
import { useDispatch } from "react-redux";
import AsyncSelect from "react-select/async";

const AsyncSelectSw = ({ settings }) => {
  const dispatch = useDispatch();
  const createLabel = (res) => {
    return settings.responseLabelKey.map((keyConfig) => {
      const delimiter = keyConfig.delimiter || "";
      const prefix = keyConfig.prefix || "";
      const postfix = keyConfig.postFix || "";
      const fieldValue = res[keyConfig.fieldName] || "";
      return `${delimiter}${prefix}${fieldValue}${postfix}`;
    });
  };
  // Handle search action
  const handleSearch = async (inputValue) => {
    if (
      (!inputValue || inputValue.length) <=
      settings.startActionAfterCharacterLength
    ) {
      return [];
    } else {
      const requestData = settings.mapInputToRequest(inputValue);
      return dispatch(settings.searchAction(requestData)).then((res) => {
        let tempData = res.payload;
        let tempResponse =
          tempData && tempData.length > 0
            ? tempData.map((res) => ({
                label: createLabel(res),
                value: res[settings.responseValueKey],
              }))
            : [];
        return tempResponse;
      });
    }
  };

  // Handle value change and set it in the parent component
  const handleChange = (selectedOption) => {
    settings.setValue(selectedOption);
  };

  return (
    <AsyncSelect
      className={`${settings.cssClasses}`}
      cacheOptions={false}
      loadOptions={handleSearch} // Load options asynchronously
      defaultOptions={settings.defaultOptionValues}
      defaultValue={settings.defaultValue || null} // Set default value from settings
      placeholder={settings.placeholder || "Search"} // Default placeholder if none provided
      isClearable={settings.isClearable !== null ? settings.isClearable : true}
      onChange={handleChange} // Update state on selection change
    />
  );
};

export default AsyncSelectSw;
