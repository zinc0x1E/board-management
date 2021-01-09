import React from "react";
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

/*
category: {
  name: String
  code: String
  subCategory: null
}
]

*/
const CategoryDropdown = ({ category, onItemClick }) => {
  return (
    <CDropdownItem className="input-group-prepend" onClick={onItemClick(category)}>
      {category.name}
    </CDropdownItem>
  );
};

export default CategoryDropdown;
