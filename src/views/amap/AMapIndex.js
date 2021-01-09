import React, { lazy, useState } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import AMap from "./AMap";
import CategoryIndex from "./category/CategoryIndex";

import axios from "axios";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

class AMapIndex extends React.Component {
  /*
    selection: {
      media: {
        name: String,
        code: String,
        subSelection: {
          name: String,
          code: String,
        },
      }
      pro: {
        name: String,
        code: String,
        subSelection: {
          name: String,
          code: String,
        },
      }
    }

  */
  // const [conditionKey, setConditionKey] = useState(0);

  state = {
    points: null,
    conditionKey: "",
  }

  componentDidMount() {
    // axios.get('https://528b344a-cd47-4ea0-92ee-01281b90c46c.mock.pstmn.io/songs')
    this.fetchPointsAbstract("00000000000000000000000000000000")
      .then((response) => {
        // this.setState({ points: this.processPoints(response.data) });
        this.setState({points: this.processPoints(response.data)});
        // console.log(points);
        // this.initMap(points);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onConditionKeyChange = (conditionKey) => {
    this.setState({conditionKey: conditionKey})

    this.fetchPointsAbstract(conditionKey)
    .then((response) => {
      // this.setState({ points: this.processPoints(response.data) });
      this.setState({points: this.processPoints(response.data)});
      // console.log(points);
      // this.initMap(points);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  fetchPointsAbstract(conditionKey) {
    return axios.get("/api/queryForAdvId", {
      params: {
        maxLat: 31.5,
        minLat: 30.8,
        maxLng: 121.7667,
        minLng: 121.1515,
        precise: 20,
        conditionKey: conditionKey,
      },
    });
  }

  processPoints(points) {
    for (let point of points) {
      point.lnglat = [point.longtitude, point.latitude];
      point.longtitude = null;
      point.latitude = null;
      point.style = 1;
    }
    return points;
  }

  fetechPoint(advId) {
    return axios.get("/api/queryForAdv", {
      params: {
        advId: advId,
      },
    });
  }

  fetechPoints(points) {
    console.log("fetchPoints() -- param -- points = ");
    console.log(points);
    for (let item of points) {
      this.fetechPoint(item.advId).then((responce) => {
        item.advertisement = responce.data.advertisement;
      });
    }

    console.log("fetchPoints() -- return -- points = ");
    console.log(points);
    return points;
  }

  render() {
  return (
    <>
      <CCard>
        <CCardHeader>
          <CategoryIndex
            onConditionKeyChange={this.onConditionKeyChange}
          ></CategoryIndex>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-muted">November 2017</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {["Day", "Month", "Year"].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === "Month"}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CRow>
            <AMap
              style={{ height: "300px", marginTop: "40px" }}
              // conditionKey={conditionKey}
              points={this.state.points}
            />
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Visits</div>
              <strong>29.703 Users (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Unique</div>
              <strong>24.093 Users (20%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Pageviews</div>
              <strong>78.706 Views (60%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">New Users</div>
              <strong>22.123 Users (80%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Bounce Rate</div>
              <strong>Average Rate (40.15%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  );}
};

export default AMapIndex;
