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
import CategoryGroup from "./CategoryGroup";

const CategoryIndex = ({ onConditionKeyChange }) => {
  const [referConditionKey, setReferConditionKey] = useState(
    "0000000000000000"
  );

  const [proConditionKey, setProConditionKey] = useState(
    "0000000000000000"
  );

  const onLocalConditionKeyChange = (prop) => (conditionKey) => {
    if (prop === "refer") {
      setReferConditionKey(conditionKey);
      onConditionKeyChange(conditionKey + proConditionKey);
    } else if (prop === "pro") {
      setProConditionKey(conditionKey);
      onConditionKeyChange(referConditionKey + conditionKey);
    }
  };

  return (
    <CCard>
      {/* <CDropdown className="mt-2">
        <CDropdownToggle caret color="info">
          Dropdown button
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem header>Header</CDropdownItem>
          <CDropdownItem disabled>Action Disabled</CDropdownItem>
          <CDropdownItem>Action</CDropdownItem>
          <CDropdownItem divider />
          <CDropdownItem>Another Action</CDropdownItem>
        </CDropdownMenu>
      </CDropdown> */}
      {/* {console.log(category)} */}
      <CCardBody>
        <CRow>
          <CCol>
            <CategoryGroup
              refers={category.media}
              onLocalConditionKeyChange={onLocalConditionKeyChange("refer")}
            ></CategoryGroup>
          </CCol>
          <CCol>
            <CategoryGroup
              refers={category.pro}
              onLocalConditionKeyChange={onLocalConditionKeyChange("pro")}
            ></CategoryGroup>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default CategoryIndex;
