import React, { Component } from "react";
import { Breadcrumb } from "matx";
import { Card } from "@material-ui/core";
import AMap from "./AMap";

class AppAMap extends Component {
  state = {};
  render() {
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Map" }]} />
        </div>
        <Card>
          <AMap />
        </Card>
        <div className="py-12" />
        <Card>
          <AMap />
        </Card>
      </div>
    );
  }
}


export default AppAMap;
