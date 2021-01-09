import React, { useState } from "react";
import { CCard, CCardBody, CInputGroup } from "@coreui/react";

import CategoryDropdown from "./CategoryDropdown";

/*

refers: [
  {
    name: String
    code: String
    subCategory: [{
      name: String
      code: String
      subCategory: null
    }, ...]
  },
  ...
]

*/
const CategoryDropdownGroup = ({ refers, onLocalConditionKeyChange }) => {
  const [referSelected, setRerferSelected] = useState(refers[0]);

  const onDropdownItemChange = (category, color) => {
    let conditionKey = "";
    if (color === "primary") {
      setRerferSelected(category);
      conditionKey = category.code + category.subCategory[0].code;
    } else if (color === "secondary") {
      conditionKey = referSelected.code + category.code;
    }

    onLocalConditionKeyChange(conditionKey);
  };

  return (
    <div style={{ width: "-webkit-fill-available" }}>
      <CCardBody>
        <CInputGroup>
          <CategoryDropdown
            list={refers}
            style={{ width: "105px" }}
            color={"primary"}
            onSelectedItemChange={onDropdownItemChange}
          ></CategoryDropdown>
          <CategoryDropdown
            list={referSelected.subCategory}
            style={{ width: "105px" }}
            color={"secondary"}
            onSelectedItemChange={onDropdownItemChange}
          ></CategoryDropdown>
        </CInputGroup>
      </CCardBody>
    </div>
  );
};

export default CategoryDropdownGroup;
