import React, { useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

import category from "./CategoryConfig";
import CategoryGroup from "./CategoryGroup";

const CategoryIndex = ({ onConditionKeyChange }) => {
  const [referConditionKey, setReferConditionKey] = useState(
    "0000000000000000"
  );

  const [proConditionKey, setProConditionKey] = useState("0000000000000000");

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
      <CCardBody>
        <CRow>
          <CCol>
            广告介质类别
          </CCol>
          <CCol>
            广告产品类别
          </CCol>
        </CRow>
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
