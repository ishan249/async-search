import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/userSlice"; // Ensure this path is correct
import AsyncSelectSw from "./components/AsyncSelectSw";
const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  // settings prop for async select 
  
  const settings = {
    startActionAfterCharacterLength: 2, // number for string length after which search starts
    searchAction: fetchUsers, // search api action
    requestData: { name: "" }, // request data
    responseLabelKey: [
      { prefix: "(", postFix: ")", fieldName: "name", delimiter: " " },
      { prefix: "-", postFix: "", fieldName: "username" },
    ], // response label binding keys in array with prefix, postfix, and delimiter
    responseValueKey: "id", // response value binding key
    placeholder: "Search for a user", // search dropdown place holder
    defaultValue: selectedUser, // value for dropdown
    setValue: setSelectedUser, // function to setState on change
    mapInputToRequest: (inputValue) => ({ name: inputValue }), // function to set selectedoption in requried key in request object
    isClearable: true, // isClearable prop
    cssClasses: "text-danger", // extra css class
    defaultOptionValues: selectedUser ? [selectedUser] : [], // set default options if needed (array)
  };

  return (
    <div>
      <h1>User Search Dropdown</h1>
      <AsyncSelectSw settings={settings} />
    </div>
  );
};

export default App;
