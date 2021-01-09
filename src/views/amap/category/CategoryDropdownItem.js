import React from "react";
import { CDropdownItem } from "@coreui/react";

/*
category: {
  name: String
  code: String
  subCategory: null
}

*/
const CategoryDropdown = ({ category, onItemClick }) => {
  return (
    <CDropdownItem
      className="input-group-prepend"
      onClick={onItemClick(category)}
    >
      {category.name}
    </CDropdownItem>
  );
};

export default CategoryDropdown;
