import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";

import category from "./CategoryConfig";
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

  const [conditionKey, setConditionKey] = useState(
    refers[0].code + refers[0].subCategory[0].code
  );

  const onDropdownItemChange = (category, color) => {
    let conditionKey = "";
    if (color === "primary") {
      setRerferSelected(category);
      conditionKey = category.code + category.subCategory[0].code;
    } else if (color === "secondary") {
      conditionKey = referSelected.code + category.code;
    }
    
    setConditionKey(conditionKey);
    onLocalConditionKeyChange(conditionKey);
  };

  return (
    <CCard style={{ width: "-webkit-fill-available" }}>
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
    </CCard>
  );
};

export default CategoryDropdownGroup;
