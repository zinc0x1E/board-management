import React, { useState } from "react";
import { CDropdownMenu, CDropdownToggle, CDropdown } from "@coreui/react";

import CategoryDropdownItem from "./CategoryDropdownItem";

/*
refer: {
  name: String
  code: String
  subCategory: [{
    name: String
    code: String
    subCategory: null
  }, ...]
},
list: [{
    name: String
    code: String
    subCategory: null
  }, ...]
*/
const CategoryDropdown = ({ list, onSelectedItemChange, color }) => {
  const [subCategorySelected, setSubCategorySelected] = useState(list[0]);

  const onItemClick = (color) => (category) => () => {
    setSubCategorySelected(category);
    onSelectedItemChange(category, color);
    // console.log("IN CategoryDropdown");
    // console.log(color);
    // console.log(category);
  };

  return (
    <CDropdown className="input-group-prepend">
      <CDropdownToggle caret color={color}>
        {subCategorySelected.name}
      </CDropdownToggle>
      <CDropdownMenu>
        {/* {console.log(refer.subCategory)} */}
        {/* {console.log("list")}
        {console.log(list)} */}
        {list.map((item, index) => (
          <CategoryDropdownItem
            category={item}
            key={index}
            onItemClick={onItemClick(color)}
          ></CategoryDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default CategoryDropdown;
