import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
} from "@coreui/react";

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
        this.setState({ points: this.processPoints(response.data) });

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
      point.lnglat = [point.longitude, point.latitude];
      point.longitude = null;
      point.latitude = null;
      point.style = 1;
    }
    return points;
  }

  // _fetechPoints = (points) => async (resolve, reject) => {
  fetechPoints = (points) => {
    let promises = [];
    for (let item of points) {
      promises.push(
        axios.get("/api/queryForAdv", {
          params: {
            advId: item.advId,
          },
        })
      );
    }
    return promises;
  };


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
