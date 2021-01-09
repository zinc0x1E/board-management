import React from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import AMap from "./AMap";
import CategoryIndex from "./category/CategoryIndex";

import axios from "axios";

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

  state = {
    points: null,
    conditionKey: "",
  };

  componentDidMount() {
    this.fetchPointsAbstract("00000000000000000000000000000000")
      .then((response) => {
        this.setState({ points: this.processPoints(response.data) });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onConditionKeyChange = (conditionKey) => {
    this.setState({ conditionKey: conditionKey });

    this.fetchPointsAbstract(conditionKey)
      .then((response) => {
        // this.setState({ points: this.processPoints(response.data) });
        this.setState({ points: this.processPoints(response.data) });
        // console.log(points);
        // this.initMap(points);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  fetechPoints(points) {
    console.log("fetchPoints() -- param -- points = ");
    console.log(points);
    for (let item of points) {
      axios
        .get("/api/queryForAdv", {
          params: {
            advId: item.advId,
          },
        })
        .then((responce) => {
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
              <AMap
                style={{ height: "300px", marginTop: "40px" }}
                // conditionKey={conditionKey}
                points={this.state.points}
                fetechPoints={this.fetechPoints}
              />
            </CRow>
          </CCardBody>
        </CCard>
      </>
    );
  }
}

export default AMapIndex;
